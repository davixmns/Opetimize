import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export function ResetTokenInput() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    return (
        <View style={styles.inputs}>
            <TextInput
                value={input1}
                onChangeText={(text) => handleTextChange(text, 1)}
                style={styles.input}
                maxLength={1}
                onKeyPress={(e) => handleBackspacePress(e, 1)}
                ref={input1Ref}
            />
            <TextInput
                value={input2}
                onChangeText={(text) => handleTextChange(text, 2)}
                style={styles.input}
                maxLength={1}
                onKeyPress={(e) => handleBackspacePress(e, 2)}
                ref={input2Ref}
            />
            <TextInput
                value={input3}
                onChangeText={(text) => handleTextChange(text, 3)}
                style={styles.input}
                maxLength={1}
                onKeyPress={(e) => handleBackspacePress(e, 3)}
                ref={input3Ref}
            />
            <TextInput
                value={input4}
                onChangeText={(text) => handleTextChange(text, 4)}
                style={styles.input}
                maxLength={1}
                onKeyPress={(e) => handleBackspacePress(e, 4)}
                ref={input4Ref}
            />
        </View>
    );

    function handleTextChange(text, inputNumber) {
        text = text.toUpperCase();
        if (text.length > 1) {
            return;
        }

        switch (inputNumber) {
            case 1:
                setInput1(text);
                if (text) {
                    input2Ref.current.focus();
                }
                break;
            case 2:
                setInput2(text);
                if (text) {
                    input3Ref.current.focus();
                }
                break;
            case 3:
                setInput3(text);
                if (text) {
                    input4Ref.current.focus();
                }
                break;
            case 4:
                setInput4(text);
                if(text) {
                    input4Ref.current.focus();
                }
                break;
            default:
                break;
        }
    }

    function handleBackspacePress(e, inputNumber) {
        if (e.nativeEvent.key === "Backspace" && inputNumber > 1) {
            switch (inputNumber) {
                case 2:
                    input1Ref.current.focus();
                    break;
                case 3:
                    input2Ref.current.focus();
                    break;
                case 4:
                    input3Ref.current.focus();
                    break;
                default:
                    break;
            }
        }
    }
}

const styles = StyleSheet.create({
    inputs: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        height: 80,
        width: 70,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 40,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        textAlign: "center",
        fontWeight: "bold",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
    },
});
