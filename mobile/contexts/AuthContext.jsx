import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {deleteMyAccount, getMyData, login, updateUser, createUser} from "../service/apiService";
import utils from "../utils/utils";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const navigation = useNavigation();
    const [user, setUser] = useState({});

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
        if (token) await enterInApp()
    }

    async function enterInApp() {
        await fetchUserData()
        showToast('success', 'Sucesso', `Bem Vindo!`);
        navigation.navigate("BottomBar");
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
        await createUser(user).then(() => {
            showToast('success', 'Sucesso', `Conta criada com sucesso!`);
            navigation.navigate("Login");
        }).catch((error) => {
            console.log(error);
            showToast('error', 'Erro', `Erro ao criar conta!`);
        })
    }

    async function tryLogin(email, password) {
        const credentialsOk = utils.verifyCredentials(email, password);
        if (credentialsOk !== true) return showToast('warning', 'Aviso', credentialsOk);
        await login(email, password).then((response) => {
            const token = response.data.token;
            AsyncStorage.setItem('token', token);
            enterInApp();
        }).catch((error) => {
            console.log(error.response.data.message);
            showToast('error', 'Erro', error.response.data.message);
        })

    }

    async function logoutUser() {
        try {
            await AsyncStorage.clear();
            navigation.reset({
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
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
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

    return (
        <AuthContext.Provider
            value={{
                tryLogin,
                user,
                logoutUser,
                deleteAccount,
                saveProfile,
                createAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
