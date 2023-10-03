import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import React, {useState} from "react";
import logo from "../assets/logo.png";
import {useNavigation} from "@react-navigation/native";
import {sendEmailForgotPassword} from "../service/apiService";
import {ActivityIndicator} from "react-native";

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
    const navigation = useNavigation();

    function handleOnChangeEmail(text) {
        setEmail(text);
    }

    function handleGoToLogin() {
        navigation.navigate('Login');
    }

    async function handleSendEmail() {
        try {
            setLoading(true); // Define o estado de carregamento como true
            const response = await sendEmailForgotPassword(email);
            if (response) {
                alert('Email enviado com sucesso!');
                navigation.navigate('Login');
            } else {
                alert('Email não encontrado :(');
            }
        } catch (e) {
            console.log(e);
            alert(e);
            return null;
        } finally {
            setLoading(false); // Define o estado de carregamento como false, independentemente do resultado
        }
    }

    return (
        <View style={styles.content}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <Text style={{ fontSize: 15 }}>Vamos enviar um email para você</Text>
            <View style={styles.form}>
                <Input
                    autoCapitalize='none'
                    keyboardType={'email-address'}
                    placeholder="Email"
                    leftIcon={<Icon name="envelope" size={24} color='#F19020' />}
                    onChangeText={handleOnChangeEmail}
                    inputStyle={styles.inputStyle}
                />

                <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
                    {loading ? (
                        <ActivityIndicator color="white" size={"large"}/>
                    ) : (
                        <Text style={styles.buttonText}>Enviar Email</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2} onPress={handleGoToLogin}>
                    <Text style={styles.buttonText2}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
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
