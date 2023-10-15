import React, {useState} from "react";
import {Text, StyleSheet, View, TouchableOpacity, Vibration, Platform} from "react-native";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import Stars from "./Stars";
import {useNavigation} from "@react-navigation/native";
import {Swipeable} from "react-native-gesture-handler";
import {Feather} from "@expo/vector-icons";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import * as Haptic from "expo-haptics";

function Card(props) {
    const today = new Date(props.date);
    const formattedDate = format(today, "dd/MM/yyyy", {locale: ptBR});
    const navigations = useNavigation()
    const {deletePurchaseById} = usePurchaseContext()

    async function handleDeletePurchase() {
        await deletePurchaseById(props.purchase_id)
    }

    const renderLeftActions = (progress, dragX) => {
        return (
            <TouchableOpacity onPress={handleDeletePurchase}>
                <View style={styles.leftAction}>
                    <Feather name={'trash'} size={30} color={'#fff'} style={{paddingHorizontal: 15}}/>
                </View>
            </TouchableOpacity>
        );
    };

    const renderRightActions = (progress, dragX) => {
        return (
            <TouchableOpacity onPress={handleGoToDetails}>
                <View style={styles.rightAction}>
                    <Feather name={'edit'} size={30} color={'#fff'} style={{paddingHorizontal: 15}}/>
                </View>
            </TouchableOpacity>
        );
    };


    const handleGoToDetails = async () => {
        navigations.navigate("PurchaseDetails", {
            name: props.name,
            price: props.price,
            weight: props.weight,
            date: props.date,
            rating: props.rating,
            purchase_id: props.purchase_id,
        });
    };

    async function vibrate() {
        await Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Heavy)
    }

    return (
        <View style={styles.container}>
            <Swipeable
                renderLeftActions={renderLeftActions}
                renderRightActions={renderRightActions}
                onSwipeableWillOpen={vibrate}
            >
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
            </Swipeable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        width: "88%",
        borderRadius: 20,
    },
    card: {
        position: "relative",
        backgroundColor: "#FFF",
        padding: "5%",
        borderRadius: 20,
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
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightAction: {
        flex: 1,
        backgroundColor: "#3498DB",
        justifyContent: "center",
        alignItems: "flex-end",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    },
    actionText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Card;
