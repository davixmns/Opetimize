import React, {useState} from 'react';
import {tryLogin} from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {MyTextInput} from '../myTextInput/MyTextInput';
import {Input} from 'react-native-elements';
import {MyButton} from '../myButton/MyButton';
import BottomBar from "../bottomBar/BottomBar";
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from "@react-navigation/native";

const logo = require('../../assets/logo.png');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const navigation = useNavigation();

    async function handleTryLogin() {
        const token = await tryLogin(email, password);
        if (token) {
            await AsyncStorage.setItem('token', token);
            setLoginSuccess(true);
        } else {
            setWrongPassword(true);
            setTimeout(() => {
                setWrongPassword(false);
            }, 3000); // 5 segundos
        }
    }

    function handleGoToRegister() {
        navigation.navigate('Register');
    }

    function handleGoToForgotPassword() {
        navigation.navigate('ForgotPassword');
    }

    if (loginSuccess) {
        return (
            <BottomBar/>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={styles.content}>
                <Image source={logo} style={styles.logo}/>
                <Text style={styles.title}>Opetimize</Text>
                <View style={styles.form}>

                    <Input
                        autoCapitalize='none'
                        keyboardType={'email-address'}
                        placeholder="Email"
                        leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                        onChangeText={setEmail}
                        inputStyle={styles.inputStyle}
                    />

                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setPassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />
                    <View style={{height: 20}}>
                        {wrongPassword && <Text style={styles.errorText}>Email ou senha incorretos</Text>}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleTryLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={handleGoToRegister}>
                        <Text style={styles.buttonText2}>Criar Conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGoToForgotPassword}>
                        <Text style={{color: '#F19020', fontSize: 20}}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;

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
        gap: 10,
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
    button: {
        width: '95%',
        height: 50,
        backgroundColor: '#F19020',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button2: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#F19020',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#F19020',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },
    buttonText2: {
        fontSize: 20,
        color: '#F19020',
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
