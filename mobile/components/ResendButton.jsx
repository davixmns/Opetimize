import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons";

export function ResendButton({title, onPress, disabled}) {
    return (
        <TouchableOpacity style={styles.sendAgainView} onPress={onPress} disabled={disabled}>
            <Text style={styles.sendAgain}>{title}</Text>
            <Feather name="repeat" size={24} color="#fff"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sendAgainView: {
        flexDirection: "row",
        // backgroundColor: "#fff",
        borderRadius: 5,
        alignSelf: "flex-start",
        alignItems: "center",
        marginLeft: "4%",
        marginTop: "5%",
    },
    sendAgain: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        padding: 10,
    },
})