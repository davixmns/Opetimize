import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { deletePurchaseById, getAllPurchases } from '../../service/apiService';
import Card from '../card/Card';

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPurchases();
            setPurchases(data);
        };
        fetchData();
    }, []);

    async function handleDeletePurchase(id) {
        try {
            await deletePurchaseById(id);
            const data = await getAllPurchases();
            setPurchases(data);
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

    return (
        <FlatList
            style={styles.container}
            data={purchases}
            renderItem={renderPurchase}
            keyExtractor={(item) => item._id}
        />
    );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        backgroundColor: '#7C8046',
        paddingTop: 20,
    },
});

export default PurchaseHistory;
