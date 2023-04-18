import React, {useState, useEffect} from 'react';
import {getAllPurchases} from '../../service/apiService';
import "./styles.css";

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
        <div className="firstcomponent">

            <ul>
                {
                    purchases.map((purchase) => (
                            <li key={purchase.id}>
                                <div className={"content"}>
                                {JSON.stringify(purchase) + "\n"}
                                </div>
                            </li>
                    ))
                }
            </ul>

        </div>
    );
}

export default PurchaseHistory;
