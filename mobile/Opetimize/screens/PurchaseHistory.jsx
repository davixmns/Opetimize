import React, {useEffect, useState} from 'react';
import {deletePurchase, updatePurchase, getAllPurchases, verifyToken} from '../service/apiService';
import Card from '../components/Card';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {FlatList, TextInput, TouchableOpacity, View, Text, ScrollView, Alert} from "react-native";
import {StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await getAllPurchases(token);
            setPurchases(response.data);
        } catch (error) {
            Alert.alert("Erro", error.response.message);
        }
    }

    async function refresh() {
        try{
            const token = await AsyncStorage.getItem('token');
            const response = await getAllPurchases(token);
            setPurchases(response.data);
        }catch (e) {
            console.log(e);
            Alert.alert("Erro", e.data.toString());
        }
    }

    async function handleDeletePurchase(id) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token && await verifyToken(token)) {
                await deletePurchase(id, token);
                await fetchData();
            } else {
                await AsyncStorage.removeItem('token');
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSaveEditPurchase(id, purchase) {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token && await verifyToken(token)) {
                await updatePurchase(id, purchase);
                await fetchData();
            } else {
                await AsyncStorage.removeItem('token');
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderPurchase = ({item: purchase, index}) => {
        const animationDelay = index * 200; // Define um atraso para a animação com base no índice do item

        return (
            <Animatable.View animation="fadeInUp" delay={animationDelay}>
                <Card
                    key={purchase.purchase_id}
                    id={purchase.purchase_id}
                    name={purchase.name}
                    price={purchase.price}
                    weight={purchase.weight}
                    date={purchase.date}
                    handleDelete={handleDeletePurchase}
                    handleSaveEdit={handleSaveEditPurchase}
                />
            </Animatable.View>
        );
    };

    const filteredPurchases = purchases ? purchases.filter(purchase => {
        const searchValueLowerCase = searchTerm.toLowerCase();

        if (purchase.name.toLowerCase().includes(searchValueLowerCase)) {
            return true;
        }

        if (purchase.date.includes(searchValueLowerCase)) {
            return true;
        }

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
                    data={filteredPurchases}
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item.purchase_id}
                    ListHeaderComponent={<Text style={styles.title2}>Histórico</Text>}
                    ListHeaderComponentStyle={styles.headerContainer}
                    contentContainerStyle={styles.contentContainer}
                />
                <View style={{height: 50}}/>
            </ScrollView>
            <TouchableOpacity onPress={refresh} style={styles.fab}>
                <Icon name="refresh" size={25} color="white"/>
            </TouchableOpacity>
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
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E49052',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
