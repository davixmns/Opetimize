import React from "react";
import {View, ActivityIndicator, StyleSheet, Image} from "react-native";
import logo from "../assets/logo.png";

export function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image}/>
            <ActivityIndicator size={'large'} color="#F19020" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    image: {
        marginTop: '15%',
        width: 100,
        height: 100,
        borderRadius: 18,
        marginBottom: 20,
    }
});
