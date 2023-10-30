import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
    deleteMyAccountService,
    getMyDataService,
    tryLoginService,
    updateUserService,
    createUserService,
    verifyJWTService,
    sendForgotPasswordEmailService,
    verifyResetTokenCodeService,
    createNewPasswordService,
    connect,
    changePasswordService
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
        checkIfUserIsLogged();
    }, []);

    async function checkIfUserIsLogged() {
        const token = await AsyncStorage.getItem('token');
        if (token === null) return setLoading(false)
        await verifyJWTService(token)
            .then(() => {
                enterInApp()
            })
            .catch(() => {
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
        await getMyDataService(token)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', `Erro ao buscar dados da conta`);
            })
    }

    async function createAccount(user) {
        const userOk = utils.verifyUserOnRegister(user);
        if (userOk !== true) return showToast('warning', 'Aviso', userOk);
        await createUserService(user)
            .then(async (response) => {
                showToast('success', 'Sucesso', response.data.message);
                await AsyncStorage.setItem('token', response.data.jwt);
                enterInApp()
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', error.response.data.message);
            })
    }

    async function tryLogin(email, password) {
        const credentialsOk = utils.verifyCredentials(email, password);
        if (credentialsOk !== true) return showToast('warning', 'Aviso', credentialsOk);
        await tryLoginService(email, password)
            .then(async (response) => {
                await AsyncStorage.setItem('token', response.data.jwt);
                enterInApp();
            })
            .catch((error) => {
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
        await deleteMyAccountService(token)
            .then(async () => {
                showToast('success', 'Sucesso', "Conta deletada com sucesso");
                await AsyncStorage.clear();
                navigation.navigate("Login")
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', "Erro ao deletar conta")
            })
    }

    async function saveProfile(user) {
        const userOk = utils.verifyUser(user.name, user.email)
        if (userOk !== true) return showToast('error', 'Aviso', userOk)
        const token = await AsyncStorage.getItem('token');
        await updateUserService(token, user)
            .then(() => {
                showToast('success', 'Sucesso', "Perfil atualizado com sucesso");
                fetchUserData();
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', "Erro ao atualizar perfil")
            })
    }

    async function sendResetToken(email) {
        const validEmail = utils.emailRegex.test(email);
        if (!validEmail) return showToast('warning', 'Aviso', "Email inválido");
        await sendForgotPasswordEmailService(email)
            .then((response) => {
                showToast('success', 'Sucesso', response.data.message);
                navigation.navigate("ResetTokenVerification", {email: email})
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', error.response.data.message)
            })
    }

    async function verifyResetTokenn(token, email) {
        if (token.length !== 4) return showToast('warning', 'Aviso', "Token inválido");
        await verifyResetTokenCodeService(token, email)
            .then(async (response) => {
                showToast('success', 'Sucesso', response.data.message);
                await AsyncStorage.setItem('token', response.data.jwt.toString());
                navigation.navigate("CreateNewPassword")
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', error.response.data.message)
            })
    }

    async function createPassword(password, confirmPassword) {
        if (password.length < 6) return showToast('warning', 'Aviso', "Senha deve ter no mínimo 6 letras");
        if (password !== confirmPassword) return showToast('warning', 'Aviso', "Senhas não coincidem");
        const token = await AsyncStorage.getItem('token');
        await createNewPasswordService(token, password)
            .then(() => {
                showToast('success', 'Sucesso', "Senha salva com sucesso");
                enterInApp()
            })
            .catch((error) => {
                console.log(error);
                showToast('error', 'Erro', error.response.data.message)
            })
    }

    async function changePassword(oldPassword, newPassword, confirmNewPassword) {
        if (newPassword !== confirmNewPassword) return showToast('warning', 'Aviso', "Senhas não coincidem");
        if (newPassword.length < 6) return showToast('warning', 'Aviso', "Senha deve ter no mínimo 6 letras");
        const token = await AsyncStorage.getItem('token');
        await changePasswordService(token, oldPassword, newPassword)
            .then((response) => {
                showToast('success', 'Sucesso', response.data.message);
            })
            .catch((error) => {
                console.log(error)
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
                createPassword,
                changePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
