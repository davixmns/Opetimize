import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={[styles.baseToast, styles.successToast]}>
            <Feather
                name="check-circle"
                size={35}
                color="#ffffff"
                style={{ paddingBottom: 4, paddingLeft: 4 }}
            />
            <View style={styles.content}>
                <Text style={[styles.titleBase, styles.titleSuccess]}>{text1}</Text>
                <Text style={[styles.textBase, styles.textSuccess]}>{text2}</Text>
            </View>
        </View>
    ),

    warning: ({ text1, text2 }) => (
        <View style={[styles.baseToast, styles.warningToast]}>
            <Feather
                name="alert-triangle"
                size={35}
                color="black"
                style={{ paddingBottom: 4, paddingLeft: 4 }}
            />
            <View style={styles.content}>
                <Text style={[styles.titleBase, styles.titleWarning]}>{text1}</Text>
                <Text style={[styles.textBase, styles.textWarning]}>{text2}</Text>
            </View>
        </View>
    ),

    error: ({ text1, text2 }) => (
        <View style={[styles.baseToast, styles.errorToast]}>
            <Feather
                name="x-octagon"
                size={35}
                color="#ffffff"
                style={{ paddingBottom: 4, paddingLeft: 4 }}
            />
            <View style={styles.content}>
                <Text style={[styles.titleBase, styles.titleError]}>{text1}</Text>
                <Text style={[styles.textBase, styles.textError]}>{text2}</Text>
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    baseToast: {
        width: "90%",
        height: 60,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 10,
        marginBottom: 10,
        // Sombra
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
    },
    textBase: {
        fontSize: 16,
        fontWeight: "bold",
    },
    textSuccess: {
        color: "#ffffff",
    },
    textWarning: {
        color: "#000000",
    },
    textError: {
        color: "#ffffff",
    },
    titleBase: {
        fontSize: 18,
        fontWeight: "bold",
    },
    titleWarning: {
        color: "#000000",
    },
    titleSuccess: {
        color: "#ffffff",
    },
    titleError: {
        color: "#ffffff",
    },
    successToast: {
        backgroundColor: "#4CAF50", // Cor de fundo para sucesso (verde)
    },
    warningToast: {
        backgroundColor: "#FFC107", // Cor de fundo para aviso (amarelo)
    },
    errorToast: {
        backgroundColor: "#F44336", // Cor de fundo para erro (vermelho)
    },
});
