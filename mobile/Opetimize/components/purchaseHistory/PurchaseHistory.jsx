import { FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllPurchases } from '../../service/apiService';
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

    const renderPurchase = ({ item: purchase }) => {
        return (
            <Card
                name={purchase.name}
                price={purchase.price}
                weight={purchase.weight}
                date={purchase.date}
            />
        );
    };

    return (
        <FlatList
            style={styles.container}
            data={purchases}
            renderItem={renderPurchase}
            keyExtractor={(item) => item._id.toString()}
        />
    );

}
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 0,
        paddingBottom: 40,
    },
});

export default PurchaseHistory;