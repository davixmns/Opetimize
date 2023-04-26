import {FlatList, Text} from 'react-native';
import {useEffect, useState} from "react";
import {getAllPurchases} from "../../service/apiService";
import Card from "../card/Card";

function PurchaseHistory(){
    const [purchases, setPurchases] = useState([])

    useEffect( () => {
        const fetchData = async () => {
            const data = await getAllPurchases()
            console.log("data - " + data)
            setPurchases(data)
        };
        fetchData();
        }, []
    )

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
        <FlatList data={purchases} renderItem={renderPurchase} keyExtractor={item => item._id.toString()}/>
    )
}

export default PurchaseHistory