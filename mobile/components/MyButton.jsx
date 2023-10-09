import {Text, TouchableOpacity, StyleSheet} from "react-native";

export function MyButton({onPress, title, disabled}) {
    const buttonStyle = disabled ? styles.buttonDisabled : styles.buttonEnabled;
    const buttonTextStyle = disabled ? styles.buttonTextDisabled : styles.buttonTextEnabled;

    return (
        <TouchableOpacity style={buttonStyle} disabled={disabled} onPress={onPress}>
            <Text style={buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonEnabled: {
        height: '100%',
        backgroundColor: '#E49052',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextEnabled: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        height: '100%',
        backgroundColor: '#E49052',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    buttonTextDisabled: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
})
