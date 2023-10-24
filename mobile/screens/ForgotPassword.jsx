import {Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {useEffect, useState} from "react";
import logo from "../assets/logo.png";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator} from "react-native";
import {useAuthContext} from "../contexts/AuthContext";
import {MyButton} from "../components/MyButton";
import utils from "../utils/utils";

export function ForgotPassword() {
    const {sendResetToken} = useAuthContext()
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function handleSendForgotPasswordEmail() {
        setLoading(true);
        await sendResetToken(email).finally(() => setLoading(false));
        setEmail('');
    }

    function handleGoToLogin() {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.title}>Esqueceu a senha?</Text>
                <Text style={{fontSize: 15}}>Vamos enviar um email para você</Text>
                <View style={styles.form}>
                    <Input
                        autoCapitalize='none'
                        keyboardType={'email-address'}
                        placeholder="Email"
                        leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                        onChangeText={setEmail}
                        inputStyle={styles.inputStyle}
                    />
                    <View style={styles.buttons}>
                        <MyButton title={"Enviar"} disabled={!utils.emailRegex.test(email)} type={1} onPress={handleSendForgotPasswordEmail}
                                  loading={loading}/>
                        <MyButton title={"Cancelar"} disabled={false} type={2} onPress={handleGoToLogin}
                                  loading={false}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        paddingTop: 30,
        marginTop: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius: 15,
    },
    title: {
        fontSize: 40,
        color: '#F19020',
    },
    myTextInput: {
        fontSize: 30,
        width: 300,
        height: 50,
        backgroundColor: '#F19020',
    },
    inputStyle: {
        marginLeft: 10,
        color: 'black',
    },
    buttons: {
        width: '100%',
        justifyContent: 'space-between',
        height: 115,
        alignItems: 'center',
        marginTop: 45,
    }
});
