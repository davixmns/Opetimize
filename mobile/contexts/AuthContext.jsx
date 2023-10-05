import {createContext, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {login} from "../service/apiService";
import utils from "../utils/utils";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export function AuthProvider({children}) {
    const [loginSuccess, setLoginSuccess] = useState(null);
    const navigation = useNavigation();

    const showToast = (type, title, description) => {
        Toast.show({
            type: type,
            text1: title,
            text2: description,
        });
    }

    async function tryLogin(email, password) {
        try {
            const credentialsOk = utils.verifyCredentials(email, password);
            if (credentialsOk !== true) return showToast('warning', 'Aviso', credentialsOk);
            const tokenResponse = await login(email, password);
            console.log(tokenResponse.data.token)
            const token = tokenResponse.data.token.toString();
            if (token) {
                await AsyncStorage.setItem('token', token);
                setLoginSuccess(true);
                navigation.navigate("BottomBar");
            }
        } catch (e) {
            console.log(e.response.data.message);
            showToast('error', 'Erro', e.response.data.message);
            navigation.navigate("Login");
        }
    }

    useEffect(() => {
        async function checkToken() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setLoginSuccess(true);
            } else {
                setLoginSuccess(false);
            }
        }
        checkToken();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                tryLogin,
                loginSuccess,
                setLoginSuccess,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
