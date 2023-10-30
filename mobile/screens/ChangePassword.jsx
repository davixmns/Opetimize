import {Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {MyButton} from "../components/MyButton";
import {useRef, useState} from "react";
import {useAuthContext} from "../contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";

export function ChangePassword() {
    const {changePassword} = useAuthContext()
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const navigation = useNavigation();

    async function handleChangePassword() {
        await changePassword(oldPassword, password, confirmPassword)
            .then(() => navigation.goBack())
    }

    function handleCancel () {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Alterar senha</Text>
                    <Input
                        placeholder="Senha Antiga"
                        leftIcon={<Icon name="lock" size={32} color='#F19020'/>}
                        onChangeText={setOldPassword}
                        value={oldPassword}
                        inputStyle={styles.inputLabel}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon name={showPassword ? 'eye' : 'eye-slash'} size={28} color='#F19020'/>
                            </TouchableOpacity>
                        }
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <Input
                        placeholder="Nova Senha"
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
                        ref={passwordRef}
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    />
                    <Input
                        placeholder="Confirmar nova senha"
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
                        <MyButton onPress={handleChangePassword} disabled={password !== confirmPassword} title={"Salvar"}
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
        height: 115,
    }
})