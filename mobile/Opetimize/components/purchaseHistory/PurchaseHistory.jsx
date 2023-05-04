import {Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';
import {deletePurchaseById, getAllPurchases} from '../../service/apiService';
import Card from '../card/Card';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getAllPurchases();
        console.log(data)
        setPurchases(data);
    }

    async function handleDeletePurchase(id) {
        try {
            await deletePurchaseById(id);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const renderPurchase = ({item: purchase}) => {
        return (
            <Card
                key={purchase._id}
                id={purchase._id}
                name={purchase.name}
                price={purchase.price}
                weight={purchase.weight}
                date={purchase.date}
                handleDelete={handleDeletePurchase}
            />
        );
    };

    const reloadList = () => {
        fetchData();
    };

    const filteredPurchases = purchases.filter(purchase => {
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
    })

    return (
        <View style={styles.background}>
            <ScrollView>
                <View style={styles.a}>
                    <Text style={styles.title2}>Histórico</Text>
                </View>
                <FlatList
                    style={styles.container}
                    data={filteredPurchases}
                    renderItem={renderPurchase}
                    keyExtractor={(item) => item._id}
                />
                <View style={styles.b}>

                </View>
            </ScrollView>

            <TouchableOpacity onPress={reloadList} style={styles.fab}>
                <Icon name="refresh" size={25} color="white"/>
            </TouchableOpacity>

            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar.."
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
        backgroundColor: '',
        paddingTop: 20,
        paddingBottom: 20
    },

    title2: {
        color: "white",
        fontSize: 30,
        backgroundColor: "#F19020",
        alignSelf: "center",
        marginTop: 10
    },

    title: {
        marginTop: 10,
        fontSize: 25,
        alignSelf: 'center',
        color: 'white',
    },
    background: {
        flex: 1,
        backgroundColor: "#F19020"
    },

    a: {
        backgroundColor: '#F19020',
    },
    b: {
        backgroundColor: "#F19020",
        height: 20
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
    fabIcon: {
        fontSize: 25,
        color: '#fff',
    },

    searchInput: {
        position: "absolute",
        backgroundColor: "#E49052",
        borderRadius: 30,
        width: 285,
        marginTop: 30,
        bottom: 18,
        left: 25,
        height: 50,
        textAlign: "left",
        color: "white",
        fontSize: 17,
        paddingLeft: 15
    },

});

export default PurchaseHistory;
