import {useState, useRef, useEffect} from 'react';
import {tryLogin} from '../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from "@react-navigation/native";

const logo = require('../assets/logo.png');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorOcurred, setErrorOcurred] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const passwordRef = useRef(null);

    useEffect(() => {
        async function getToken() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setLoginSuccess(true);
            }
        }
        getToken();
    }, [])

    useEffect(() => {
        if(loginSuccess) {
            navigation.navigate("BottomBar");
        }
    }, [loginSuccess])

    function showError(e){
        setErrorOcurred(true);
        setErrorMessage(e);
        setTimeout(() => {
            setErrorOcurred(false);
            setErrorMessage('');
        }, 3000);
    }

    async function handleTryLogin() {
        try {
            if(!email || !password) {
                showError("Preencha todos os campos")
                return;
            }
            const tokenResponse = await tryLogin(email, password);
            const token = tokenResponse.data.token.toString();
            if (token) {
                await AsyncStorage.setItem('token', token);
                setLoginSuccess(true);
            }
        } catch (e) {
            console.log(e.response.data.message);
            showError(e.response.data.message);
        }
    }

    function handleGoToRegister() {
        navigation.navigate('Register');
    }

    function handleGoToForgotPassword() {
        navigation.navigate('ForgotPassword');
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
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setPassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        ref={passwordRef}
                        onSubmitEditing={handleTryLogin}
                    />
                    <View style={{height: 20}}>
                        {errorOcurred && <Text style={styles.errorText}>{errorMessage}</Text>}
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
                <Text style={{top: 50}}>Made by github.com/davixmns</Text>
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
        width: '100%',
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
        fontWeight: 'bold',
    },
    buttonText2: {
        fontSize: 20,
        color: '#F19020',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});
