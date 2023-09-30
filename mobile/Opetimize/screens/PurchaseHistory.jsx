import React, { useState } from 'react';
import Card from '../components/Card';
import { FlatList, TextInput, View, Text, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { usePurchaseContext } from '../contexts/PurchaseContext';

function PurchaseHistory() {
    const { purchases } = usePurchaseContext(); // Obtenha o contexto aqui
    const [searchTerm, setSearchTerm] = useState("");

    const renderPurchase = ({ item: purchase, index }) => {
        const animationDelay = index * 200;
        return (
            <Animatable.View animation="fadeInUp" delay={animationDelay}>
                <Card
                    key={purchase.purchase_id}
                    id={purchase.purchase_id}
                    name={purchase.name}
                    price={purchase.price}
                    weight={purchase.weight}
                    date={purchase.date}
                />
            </Animatable.View>
        );
    };

    return (
        <View style={styles.background}>
            <ScrollView>
                <FlatList
                    style={styles.container}
                    data={purchases} // Use o estado de purchases do contexto
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item.purchase_id}
                    ListHeaderComponent={<Text style={styles.title2}>Histórico</Text>}
                    ListHeaderComponentStyle={styles.headerContainer}
                    contentContainerStyle={styles.contentContainer}
                />
                <View style={{ height: 50 }} />
            </ScrollView>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar..."
                onChangeText={(text) => setSearchTerm(text)}
                value={searchTerm}
                placeholderTextColor={"white"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingTop: 20,
        paddingBottom: "4%"
    },
    headerContainer: {
        marginTop: "2%",
        backgroundColor: "#F19020",
    },
    title2: {
        color: "white",
        fontSize: 35,
        alignSelf: "center",
        paddingVertical: 20
    },
    background: {
        flex: 1,
        backgroundColor: "#F19020"
    },
    searchInput: {
        position: "absolute",
        backgroundColor: "#E49052",
        borderRadius: 30,
        width: "70%",
        bottom: "2.2%",
        marginLeft: "5%",
        height: 50,
        textAlign: "left",
        color: "white",
        fontSize: 17,
        paddingLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontWeight: "bold"
    },
    contentContainer: {
        flexGrow: 1,
    }
});

export default PurchaseHistory;
