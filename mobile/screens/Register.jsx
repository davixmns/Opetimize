import {useRef, useState} from "react";
import {createAccount} from "../service/apiService";
import {useNavigation} from "@react-navigation/native";
import {Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {useAuthContext} from "../contexts/AuthContext";
import {MyButton} from "../components/MyButton";

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const navigation = useNavigation()
    const {createAccount} = useAuthContext()

    const buttonDisabled = name && email && password && confirmPassword && password === confirmPassword

    async function handleCreateUser() {
        await createAccount({name, email, password})
    }

    function handleGoToLogin() {
        navigation.navigate('Login')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.content}>
                <Text style={styles.title}>Criar Conta</Text>
                <View style={styles.form}>

                    <Input
                        placeholder="Nome Completo"
                        leftIcon={<Icon name="user" size={24} color='#F19020'/>}
                        onChangeText={setName}
                        inputStyle={styles.inputStyle}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />

                    <Input
                        autoCapitalize='none'
                        keyboardType={'email-address'}
                        placeholder="Email"
                        leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                        onChangeText={setEmail}
                        inputStyle={styles.inputStyle}
                        ref={emailRef}
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setPassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={!showPassword1}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
                                <Icon name={showPassword1 ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        ref={passwordRef}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    />

                    <Input
                        placeholder="Confirmar Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setConfirmPassword}
                        inputStyle={styles.inputStyle}
                        secureTextEntry={!showPassword2}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)}>
                                <Icon name={showPassword2 ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        ref={confirmPasswordRef}
                    />
                    <View style={styles.buttons}>
                        <MyButton onPress={handleCreateUser} title={"Criar Conta"} type={1} disabled={!buttonDisabled}/>
                        <MyButton onPress={handleGoToLogin} title={"Cancelar"} type={2}/>
                    </View>
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
    buttons: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 115,
        marginTop: 50,
    }
});
