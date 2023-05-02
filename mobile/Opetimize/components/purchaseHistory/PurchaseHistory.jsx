import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { deletePurchaseById, getAllPurchases } from '../../service/apiService';
import Card from '../card/Card';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await getAllPurchases();
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

    const renderPurchase = ({ item: purchase }) => {
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

    return (
        <View style={styles.background}>
            <FlatList
                style={styles.container}
                data={purchases}
                renderItem={renderPurchase}
                keyExtractor={(item) => item._id}
            />
            <TouchableOpacity onPress={reloadList} style={styles.fab}>
                <Icon name="refresh" size={25} color="green" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        backgroundColor: '#7C8046',
        paddingTop: 20,
    },
    title: {
        marginTop: 10,
        fontSize: 25,
        alignSelf: 'center',
        color: 'white',
    },
    background: {
        backgroundColor: '#7C8046',
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
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
        color: '#7C8046',
    },
});

export default PurchaseHistory;
