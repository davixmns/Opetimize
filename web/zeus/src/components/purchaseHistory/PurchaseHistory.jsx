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
        <div id={"historico-content"}>
            <h2 id="title">Historico</h2>
            <div id="historyBackground">
                <ul>
                    {
                        purchases.map((purchase) => (
                            <Card name={purchase.name} price={purchase.price}/>
                        ))
                    }
                </ul>

            </div>
        </div>

    );
}

export default PurchaseHistory;
