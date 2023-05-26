import React, {useState} from "react";
import {createUser, getUserByEmail} from "../../service/apiService";
import {useNavigation} from "@react-navigation/native";
import {Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import logo from "../../assets/logo.png";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false);
    const navigation = useNavigation()

    async function handleCreateUser() {
        if (!await verifyForm()) {
            return null
        }
        try {
            const user = {name, email, password}
            const response = await createUser(user)
            if (!response) {
                alert('Email já cadastrado!')
                return null
            }
            navigation.navigate('Login')
            alert('Conta criada com sucesso!')
        } catch (error) {
            console.log(error)
            return null
        }
    }

    function handleGoToLogin() {
        navigation.navigate('Login')
    }

    function verifyEmailRegex() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function verifyForm() {
        if (!name || !email || !password || !confirmPassword) {
            alert('Preencha todos os campos!')
            return false
        }
        if (!verifyEmailRegex()) {
            alert('Email inválido!')
            return false
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!')
            return false
        }
        return true
    }

    function handleOnChangeName(name) {
        setName(name)
    }

    function handleOnChangeEmail(email) {
        setEmail(email)
    }

    function handleOnChangePassword(password) {
        setPassword(password)
    }

    function handleOnChangeConfirmPassword(confirmPassword) {
        setConfirmPassword(confirmPassword)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <Text style={styles.title}>Criar Conta</Text>
                <View style={styles.form}>

                    <Input
                        placeholder="Nome"
                        leftIcon={<Icon name="user" size={24} color='#F19020'/>}
                        onChangeText={handleOnChangeName}
                        inputStyle={styles.inputStyle}
                    />

                    <Input
                        autoCapitalize='none'
                        keyboardType={'email-address'}
                        placeholder="Email"
                        leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                        onChangeText={handleOnChangeEmail}
                        inputStyle={styles.inputStyle}
                    />

                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={handleOnChangePassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />

                    <Input
                        placeholder="Confirmar Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={handleOnChangeConfirmPassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={true}
                    />

                    <View style={{height: 20}}>
                        {wrongPassword && <Text style={styles.errorText}>Email ou senha incorretos</Text>}
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                        <Text style={styles.buttonText}>Criar conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button2} onPress={handleGoToLogin}>
                        <Text style={styles.buttonText2}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Register;

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
        fontSize: 15,
    },
});
