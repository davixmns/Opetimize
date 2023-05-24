import React, {useState} from 'react';
import {tryLogin} from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {MyTextInput} from '../myTextInput/MyTextInput';
import {Input} from 'react-native-elements';
import {MyButton} from '../myButton/MyButton';
import BottomBar from "../bottomBar/BottomBar";
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const logo = require('../../assets/logo.png');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

    async function handleTryLogin() {
        const token = await tryLogin(email, password);
        if (token) {
            await AsyncStorage.setItem('token', token);
            setLoginSuccess(true);
        }
    }

    if (loginSuccess) {
        return (
            <BottomBar/>
        );
    }

    return (
        <View style={styles.content}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Opetimize</Text>
            <View style={styles.form}>
                {/*<Icon name="envelope-o" size={20} color="#F19020" style={styles.icon} />*/}
                {/*<MyTextInput*/}
                {/*    keyboardType={'default'}*/}
                {/*    placeholder={'Email'}*/}
                {/*    onChangeText={setEmail}*/}
                {/*    style={styles.myTextInput}*/}
                {/*/>*/}
                {/*<Icon name="envelope-o" size={20} color="#F19020" style={styles.icon} />*/}
                {/*<MyTextInput*/}
                {/*    keyboardType={'default'}*/}
                {/*    placeholder={'Senha'}*/}
                {/*    onChangeText={setPassword}*/}
                {/*    style={styles.myTextInput}*/}
                {/*/>*/}


                <Input
                    placeholder="Email"
                    leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                    onChangeText={setEmail}
                    inputStyle={styles.inputStyle}
                />

                <Input
                    placeholder="Senha"
                    leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                    onChangeText={setEmail}
                    inputStyle={styles.inputStyle}
                    //senha oculta
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={handleTryLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.buttonText2}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
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
        paddingTop: 50,
        gap: 10,
        marginBottom: 60,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        marginBottom: 20,
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
        marginTop: 20,
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

});
