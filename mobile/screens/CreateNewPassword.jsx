import {View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";
import {useRef, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";

export function CreateNewPassword() {
    const {createPassword} = useAuthContext()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const confirmPasswordRef = useRef(null)
    const navigation = useNavigation()

    async function handleCreatePassword() {
        await createPassword(password, confirmPassword)
    }

    function handleCancel() {
        navigation.navigate('Login')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Crie sua nova senha</Text>
                    <Input
                        placeholder="Senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setPassword}
                        value={password}
                        inputStyle={styles.inputLabel}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    />
                    <Input
                        placeholder="Confirmar senha"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setConfirmPassword}
                        inputStyle={styles.inputLabel}
                        value={confirmPassword}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        ref={confirmPasswordRef}
                    />
                    <View style={styles.buttons}>
                        <MyButton onPress={handleCreatePassword} disabled={false} title={"Salvar"}
                                  type={1}/>
                        <MyButton onPress={handleCancel} disabled={false} title={"Voltar"} type={2}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    content: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        // fontWeight: 'bold',
        color: '#F19020',
        marginBottom: 20,
        alignSelf: 'flex-start',
        paddingLeft: 8,
    },
    inputLabel: {
        marginLeft: 10,
        color: 'black',
    },
    buttons: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: 20,
        height: 120,
    }
})