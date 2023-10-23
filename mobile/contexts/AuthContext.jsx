import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
    deleteMyAccount,
    getMyData,
    login,
    updateUser,
    createUser,
    verifyJWT,
    sendForgotPasswordEmail, verifyResetTokenCode, createNewPassword, connect
} from "../service/apiService";
import utils from "../utils/utils";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const navigation = useNavigation();
    const [user, setUser] = useState({});
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    const showToast = (type, title, description) => {
        Toast.show({
            type: type,
            text1: title,
            text2: description,
        });
    }

    useEffect(() => {
        async function connectAndFetch() {
            await connect().then(async () => {
                await checkIfUserIsLogged();
            }).catch(() => {
                setLoading(false)
                showToast('error', 'Erro', "Erro ao conectar com o servidor");
            })
        }
        connectAndFetch()
    }, []);

    async function checkIfUserIsLogged() {
        const token = await AsyncStorage.getItem('token');
        if (token === null) return setLoading(false)
        await verifyJWT(token).then(() => {
            enterInApp()
        }).catch(() => {
            setLoading(false)
        })
    }

    async function enterInApp() {
        await fetchUserData()
        showToast('success', 'Sucesso', `Bem Vindo!`);
        setIsLogged(true);
        setLoading(false)
    }

    async function fetchUserData() {
        const token = await AsyncStorage.getItem('token');
        await getMyData(token).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', `Erro ao buscar dados da conta`);
        })
    }

    async function createAccount(user) {
        const userOk = utils.verifyUserOnRegister(user);
        if (userOk !== true) return showToast('warning', 'Aviso', userOk);
        await createUser(user).then(async (response) => {
            showToast('success', 'Sucesso', response.data.message);
            await AsyncStorage.setItem('token', response.data.jwt);
            enterInApp()
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', error.response.data.message);
        })
    }

    async function tryLogin(email, password) {
        const credentialsOk = utils.verifyCredentials(email, password);
        if (credentialsOk !== true) return showToast('warning', 'Aviso', credentialsOk);
        await login(email, password).then(async (response) => {
            await AsyncStorage.setItem('token', response.data.jwt);
            enterInApp();
        }).catch((error) => {
            console.log(error.response.data.message);
            showToast('error', 'Erro', error.response.data.message);
        })

    }

    async function logoutUser() {
        try {
            setIsLogged(false)
            await AsyncStorage.clear();
            await navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        } catch (e) {
            console.log(e);
            showToast('error', 'Erro', "Erro ao sair da conta");
        }
    }

    async function deleteAccount() {
        const token = await AsyncStorage.getItem('token');
        await deleteMyAccount(token).then(async () => {
            showToast('success', 'Sucesso', "Conta deletada com sucesso");
            await AsyncStorage.clear();
            navigation.navigate("Login")
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', "Erro ao deletar conta")
        })
    }

    async function saveProfile(user) {
        const userOk = utils.verifyUser(user.name, user.email)
        if (userOk !== true) return showToast('error', 'Aviso', userOk)
        const token = await AsyncStorage.getItem('token');
        await updateUser(token, user).then(() => {
            showToast('success', 'Sucesso', "Perfil atualizado com sucesso");
            fetchUserData();
            navigation.goBack()
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', "Erro ao atualizar perfil")
        })
    }

    async function sendResetToken(email) {
        const validEmail = utils.emailRegex.test(email);
        if (!validEmail) return showToast('warning', 'Aviso', "Email inválido");
        await sendForgotPasswordEmail(email).then((response) => {
            showToast('success', 'Sucesso', response.data.message);
            navigation.navigate("ResetTokenVerification", {email: email})
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', error.response.data.message)
        })
    }

    async function verifyResetTokenn(token, email) {
        if (token.length !== 4) return showToast('warning', 'Aviso', "Token inválido");
        await verifyResetTokenCode(token, email).then(async (response) => {
            showToast('success', 'Sucesso', response.data.message);
            console.log(response.data)
            await AsyncStorage.setItem('token', response.data.jwt.toString());
            navigation.navigate("CreateNewPassword")
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', error.response.data.message)
        })
    }

    async function createPassword(password, confirmPassword) {
        if (password.length < 6) return showToast('warning', 'Aviso', "Senha deve ter no mínimo 6 letras");
        if (password !== confirmPassword) return showToast('warning', 'Aviso', "Senhas não coincidem");
        const token = await AsyncStorage.getItem('token');
        await createNewPassword(token, password).then(() => {
            showToast('success', 'Sucesso', "Senha criada com sucesso");
            enterInApp()
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', error.response.data.message)
        })
    }

    return (
        <AuthContext.Provider
            value={{
                tryLogin,
                user,
                logoutUser,
                deleteAccount,
                saveProfile,
                createAccount,
                isLogged,
                loading,
                sendResetToken,
                verifyResetTokenn,
                createPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
