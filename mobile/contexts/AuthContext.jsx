import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {deleteMyAccount, getMyData, login, updateUser} from "../service/apiService";
import utils from "../utils/utils";
import {Alert} from "react-native";

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

    function enterInApp() {
        showToast('success', 'Sucesso', `Bem Vindo!`);
        navigation.navigate("BottomBar");
        fetchUserData()
    }

    async function tryLogin(email, password) {
        try {
            const credentialsOk = utils.verifyCredentials(email, password);
            if (credentialsOk !== true) return showToast('warning', 'Aviso', credentialsOk);
            const tokenResponse = await login(email, password);
            const token = tokenResponse.data.token.toString();
            if (token) {
                await AsyncStorage.setItem('token', token);
                enterInApp();
            }
        } catch (e) {
            console.log(e.response.data.message);
            showToast('error', 'Erro', e.response.data.message);
            navigation.navigate("Login");
        }
    }

    useEffect(() => {
        async function checkIfUserIsLogged() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                enterInApp()
            }
        }
        checkIfUserIsLogged();
    }, []);

    async function fetchUserData() {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await getMyData(token);
            setUser(response.data);
        } catch (error) {
            showToast('error', 'Erro', "Erro ao buscar dados do usuário");
            console.log(error);
        }
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
            Alert.alert('Erro ao sair da conta');
        }
    };

    async function deleteAccount() {
        try {
            const token = await AsyncStorage.getItem('token');
            await deleteMyAccount(token);
            showToast('success', 'Sucesso', "Conta deletada com sucesso");
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        } catch (e) {
            console.log(e);
            showToast('error', 'Erro', "Erro ao deletar conta")
        }

    }

    async function saveProfile(user){
        try{
            const token = await AsyncStorage.getItem('token');
            await updateUser(token, user);
            showToast('success', 'Sucesso', "Suas edições foram efetuadas");
            return true
        }catch (e) {
            console.log(e);
            showToast('error', 'Erro', "Erro ao salvar perfil")
        }
    }

    return (
        <AuthContext.Provider
            value={{
                tryLogin,
                user,
                logoutUser,
                deleteAccount,
                saveProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
