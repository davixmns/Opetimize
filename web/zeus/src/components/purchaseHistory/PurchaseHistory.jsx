import React, { useState, useEffect } from 'react';
import { getAllPurchases, deletePurchaseById } from '../../service/apiService';
import './styles.css';
import { Card } from '../card/Card';

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPurchases();
            console.log(data);
            setPurchases(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deletePurchaseById(id);
        const data = await getAllPurchases();
        setPurchases(data);
    };

    return (
        <div id="historyContent">
            <h2 id="title">Histórico</h2>
            <div id="historyBackground">
                <ul id="cardList">
                    {purchases.map((purchase) => (
                        <Card
                            key={purchase._id}
                            id={purchase._id}
                            name={purchase.name}
                            price={purchase.price}
                            weight={purchase.weight}
                            date={purchase.date}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PurchaseHistory;
