import {View, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import {ResetTokenInput} from "../components/ResetTokenInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";

export function ResetTokenVerification() {
    const navigation = useNavigation();

    async function sendTokenAgain() {

    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <Text style={styles.title}>Insira abaixo o código recebido</Text>
                    <ResetTokenInput/>
                    <TouchableOpacity onPress={sendTokenAgain}>
                        <Text style={styles.sendAgain}>Reenviar código</Text>
                    </TouchableOpacity>
                    <View style={styles.buttons}>
                        <MyButton title={"Verificar código"} disabled={false} type={2}/>
                        <MyButton title={"Voltar"} onPress={navigation.goBack} disabled={false} type={1}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F19020",
    },
    content: {
        flex: 1,
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    title: {
        fontSize: 50,
        color: "#fff",
        width: "95%",

    },
    sendAgain: {
        fontSize: 20,
        color: '#F19020',
        fontWeight: 'bold',
        marginTop: '5%',
    },
    buttons: {
        justifyContent: "space-between",
        width: "100%",
    }
})