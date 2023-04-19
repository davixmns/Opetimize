import React, {useState, useEffect} from 'react';
import {getAllPurchases} from '../../service/apiService';
import "./styles.css";
import {Card} from "../card/Card";


function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPurchases();
            setPurchases(data);
        };

        fetchData();
    }, [purchases]);

    return (
        <div id="historyContent">
            <h2 id="title">Histórico</h2>
            <div id="historyBackground">
                <ul id="cardList">
                    {purchases.map((purchase) => (
                        <Card name={purchase.name}
                              price={purchase.price}
                              weight={purchase.weight}
                              date={purchase.date}
                        />
                    ))}
                </ul>
            </div>
        </div>

    );
}

export default PurchaseHistory;

