import {View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import {ResetTokenInput} from "../components/ResetTokenInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import Timer from "../components/Timer";
import {useState} from "react";
import {ResendButton} from "../components/ResendButton";
import {useAuthContext} from "../contexts/AuthContext";

export function ResetTokenVerification(user) {
    const {sendResetToken} = useAuthContext()
    const navigation = useNavigation();
    const [timerIsRunning, setTimerIsRunning] = useState(true);
    const sendAgainOpacity = timerIsRunning ? {opacity: 0.4} : {opacity: 1};
    const [loading, setLoading] = useState(false)

    function finishTimer() {
        setTimerIsRunning(false);
    }

    async function handleSendTokenAgain() {
        setLoading(true);
        const email = user.route.params.email
        await sendResetToken(email).finally(() => setLoading(false));
    }

    async function handleVerifyResetToken(){

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.texts}>
                        <Text style={styles.title}>Insira abaixo o código recebido</Text>
                        <Text style={styles.description}>Enviamos para o seu email um código de 4 digitos, com ele você
                            poderá alterar sua
                            senha</Text>
                    </View>
                    <ResetTokenInput/>
                    <View style={styles.timer}>
                        {timerIsRunning ? (
                            <>
                                <Text style={styles.timerText}>Este código irá vencer em</Text>
                                <Timer finishTimer={finishTimer} tokenSeconds={10} isRunning={timerIsRunning}/>
                            </>
                        ) : (
                            <Text style={styles.timerText}>O código expirou</Text>
                        )}
                    </View>
                    <View style={[styles.sendAgain, sendAgainOpacity]}>
                        <ResendButton onPress={handleSendTokenAgain} title={"Clique aqui para reenviar"} disabled={timerIsRunning}/>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <MyButton title={"Verificar código"} onPress={handleVerifyResetToken} disabled={false} type={2}/>
                    <MyButton title={"Voltar"} onPress={navigation.goBack} disabled={false} type={1}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
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
        marginBottom: "40%",
    },
    title: {
        fontSize: 50,
        color: "#fff",
        fontWeight: "bold",
    },
    texts: {
        width: "95%",
        alignItems: "center",
        marginBottom: "6%",
    },
    description: {
        fontSize: 20,
        color: "#000",
    },
    buttons: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        bottom: 0,
        marginBottom: 60,
    },
    sendAgain: {
        alignSelf: "center",
    },
    timer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    timerText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
});
