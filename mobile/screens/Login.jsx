import {useState, useRef} from 'react';
import {Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {Input} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from "@react-navigation/native";
import {useAuthContext} from "../contexts/AuthContext";
import {MyButton} from "../components/MyButton";

const logo = require('../assets/logo.png');

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();
    const passwordRef = useRef(null);
    const {tryLogin} = useAuthContext()

    async function handleTryLogin() {
        await tryLogin(email, password)
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
                    <View style={styles.input}>
                        <Input
                            autoCapitalize='none'
                            keyboardType={'email-address'}
                            placeholder="Email"
                            leftIcon={<Icon name="envelope" size={24} color='#F19020'/>}
                            onChangeText={setEmail}
                            inputStyle={styles.inputLabel}
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            placeholder="Senha"
                            leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                            onChangeText={setPassword}
                            inputStyle={styles.inputLabel}
                            secureTextEntry={!showPassword}
                            rightIcon={
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Icon name={showPassword ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                                </TouchableOpacity>
                            }
                            ref={passwordRef}
                            onSubmitEditing={handleTryLogin}
                        />
                    </View>

                    <View style={styles.button}>
                        <MyButton onPress={handleTryLogin} disabled={false} title={'Entrar'} type={1}/>
                    </View>
                    <View style={styles.button}>
                        <MyButton onPress={handleGoToRegister} disabled={false} title={"Criar Conta"} type={2}/>
                    </View>

                    <TouchableOpacity onPress={handleGoToForgotPassword}>
                        <Text style={styles.forgot}>Esqueci minha senha</Text>
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
    input: {
        width: '100%',
        marginBottom: '3%',
    },
    inputLabel: {
        marginLeft: 10,
        color: 'black',
    },
    forgot: {
        fontSize: 20,
        color: '#F19020',
        marginTop: '5%',
    },
    button: {
        width: '100%',
        paddingTop: '5%',
    },
});
