import {View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from "react-native";
import {ResetTokenInput} from "../components/ResetTokenInput";
import {MyButton} from "../components/MyButton";
import {useNavigation} from "@react-navigation/native";
import Timer from "../components/Timer";
import {useState} from "react";
import {ResendButton} from "../components/ResendButton";
import {useAuthContext} from "../contexts/AuthContext";

export function ResetTokenVerification(user) {
    const {sendResetToken, verifyResetTokenn} = useAuthContext()
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
    const navigation = useNavigation();
    const [timerIsRunning, setTimerIsRunning] = useState(true);
    const sendAgainOpacity = timerIsRunning ? {opacity: 0.4} : {opacity: 1};
    const [loading, setLoading] = useState(false)
    const userEmail = user.route.params.email

    function finishTimer() {
        setTimerIsRunning(false);
    }

    async function handleSendTokenAgain() {
        setLoading(true);
        await sendResetToken(userEmail).finally(() => setLoading(false));
    }

    async function handleVerifyResetToken(){
        const resetCode = input1 + input2 + input3 + input4
        await verifyResetTokenn(resetCode, userEmail)
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
                    <ResetTokenInput
                        input1={input1}
                        input2={input2}
                        input3={input3}
                        input4={input4}
                        setInput1={setInput1}
                        setInput2={setInput2}
                        setInput3={setInput3}
                        setInput4={setInput4}
                    />
                    <View style={styles.timer}>
                        {timerIsRunning ? (
                            <>
                                <Text style={styles.timerText}>Este código irá vencer em</Text>
                                <Timer finishTimer={finishTimer} tokenSeconds={300} isRunning={timerIsRunning}/>
                            </>
                        ) : (
                            <Text style={styles.timerText}>O código expirou</Text>
                        )}
                    </View>
                    <View style={[styles.sendAgain, sendAgainOpacity]}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#fff"/>
                        ) : (
                            <ResendButton onPress={handleSendTokenAgain} title={"Clique aqui para reenviar"} disabled={timerIsRunning}/>
                        )}
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
        width: "90%",
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
