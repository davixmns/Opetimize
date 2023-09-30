import React, {useContext, useState} from 'react';
import Card from '../components/Card';
import {FlatList, TextInput, View, Text, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {ReloadButtom} from "../components/ReloadButtom";

function PurchaseHistory() {
    const {purchases, loadPurchases} = usePurchaseContext()
    const [searchTerm, setSearchTerm] = useState("");

    const renderPurchase = ({item: purchase, index}) => {
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

    const filteredPurchases = purchases ? purchases.filter(purchase => {
        const searchValueLowerCase = searchTerm.toLowerCase();
        if (purchase.name.toLowerCase().includes(searchValueLowerCase)) return true;
        if (purchase.date.includes(searchValueLowerCase)) return true;
        const dateParts = purchase.date.split("-");
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        if (day.includes(searchValueLowerCase) || month.includes(searchValueLowerCase) || year.includes(searchValueLowerCase)) {
            return true;
        }
        const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const monthIndex = monthNames.indexOf(searchValueLowerCase);
        return monthIndex !== -1 && parseInt(month) === monthIndex + 1;
    }) : [];

    return (
        <View style={styles.background}>
            <ScrollView>
                <FlatList
                    style={styles.container}
                    data={filteredPurchases} // Use o estado de purchases do contexto
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item.purchase_id}
                    ListHeaderComponent={<Text style={styles.title2}>Histórico</Text>}
                    ListHeaderComponentStyle={styles.headerContainer}
                    contentContainerStyle={styles.contentContainer}
                />
                <View style={{height: 50}}/>
            </ScrollView>
            <ReloadButtom onPress={loadPurchases}/>
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
    },
});

export default PurchaseHistory;
