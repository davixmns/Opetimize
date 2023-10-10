import React, {useState} from "react";
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import Stars from "./Stars";
import {useNavigation} from "@react-navigation/native";

function Card(props) {
    const today = new Date(props.date);
    const formattedDate = format(today, "dd/MM/yyyy", {locale: ptBR});
    const navigations = useNavigation()

    const handleGoToDetails = () => {
        navigations.navigate("PurchaseDetails", {
            name: props.name,
            price: props.price,
            weight: props.weight,
            date: props.date,
            rating: props.rating,
            purchase_id: props.purchase_id,
        });
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoToDetails}>
                <View style={styles.card}>
                    <View style={styles.content}>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={styles.price}>R${props.price}</Text>
                        <Text style={styles.weight}>{props.weight}g</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                    <View style={styles.stars}>
                        <Stars rating={props.rating}/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "88%",
    },
    card: {
        position: "relative",
        backgroundColor: "#FFF",
        padding: "5%",
        borderRadius: 20,
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
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
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#E49052",
    },
    price: {
        fontSize: 25,
        color: "#4CAF50",
        fontWeight: "bold",
    },
    weight: {
        fontSize: 20,
        color: "#333",
    },
    date: {
        paddingTop: 10,
        fontSize: 17,
        color: "#777",
    },
    stars: {
        position: "absolute",
        right: "7%",
        bottom: "15%",
    },
    leftAction: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 20,
    },
    rightAction: {
        flex: 1,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20,
        borderRadius: 20,
    },
    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Card;
