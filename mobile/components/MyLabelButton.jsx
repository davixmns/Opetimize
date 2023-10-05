import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons";

export function MyLabelButton({label, onPress, iconName}) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Feather name={iconName} size={35} color="#E49052"/>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 20,
        color: '#E49052',
        fontWeight: 'bold',
        marginLeft: 10,
    },
})
