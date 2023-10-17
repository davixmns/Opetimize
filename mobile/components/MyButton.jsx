import { Text, TouchableOpacity, StyleSheet } from "react-native";

export function MyButton({ onPress, title, disabled, type }) {
    let buttonStyle = styles.buttonEnabled;
    let buttonTextStyle = styles.buttonTextEnabled;

    if (type === 1) {
        buttonStyle = styles.buttonStyle1;
    } else if (type === 2) {
        buttonStyle = [styles.buttonStyle2, styles.buttonStyle2Label];
        buttonTextStyle = [buttonTextStyle, styles.buttonStyle2Label];
    }

    if (disabled) {
        buttonStyle = [buttonStyle, styles.buttonDisabled];
        buttonTextStyle = [buttonTextStyle, styles.buttonTextDisabled];
    }

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
        opacity: 0.5,
    },
    buttonTextDisabled: {
        color: '#fff',
    },
    buttonStyle1: {
        width: '95%',
        height: 50,
        backgroundColor: '#F19020',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle2: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#F19020',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle2Label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F19020',
    }
});
