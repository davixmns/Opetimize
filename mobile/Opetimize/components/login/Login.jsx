import {useState} from "react";
import {tryLogin} from "../../service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {Text, View} from "react-native";
import {MyTextInput} from "../myTextInput/MyTextInput";
import {MyButton} from "../myButton/MyButton";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigation();

    async function handleTryLogin() {
        const token = await tryLogin(email, password);
        if (token) {
            await AsyncStorage.setItem("token", token);
            navigate.navigate("Home");
        }
    }

    return (
        <View>
            <Text>Login</Text>
            <MyTextInput
                keyboardType={"default"}
                placeholder={"Email"}
                onChangeText={setEmail}/>
            <MyTextInput
                keyboardType={"default"}
                placeholder={"Senha"}
                onChangeText={setPassword}/>
            <MyButton title={"Entrar"} onPress={handleTryLogin}/>
        </View>
    )
}

export default Login;