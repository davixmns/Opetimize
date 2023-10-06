import {TouchableOpacity, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons";

export function CircleButton({onPress, iconName, color}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Feather name={iconName} size={40} color={color}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        marginHorizontal: '10%'
    }
})