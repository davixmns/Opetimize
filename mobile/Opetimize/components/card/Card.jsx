import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { format } from 'date-fns';
import {ptBR} from "date-fns/locale";

function Card(props){
    const date = new Date(props.date);
    const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
    return (
        <View style={styles.background}>
            <View style={styles.card}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>R${props.price}</Text>
                <Text style={styles.weight}>{props.weight}g</Text>
                <View>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 340,
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: "#4CAF50",
        fontWeight: "bold",
    },
    weight: {
        fontSize: 16,
        color: "#333",
        marginBottom: 8,
    },
    date: {
        alignSelf: "flex-end",
        fontSize: 17,
        color: "#777",
    },
});

export default Card;
