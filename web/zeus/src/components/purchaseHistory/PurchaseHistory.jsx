import React, { useState, useEffect } from 'react';
import { getAllPurchases, deletePurchaseById } from '../../service/apiService';
import './styles.css';
import { Card } from '../card/Card';
import SearchBar from "../searchBar/SearchBar";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllPurchases();
            setPurchases(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deletePurchaseById(id);
        const data = await getAllPurchases();
        console.log(data)
        setPurchases(data);
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredPurchases = purchases.filter(purchase => {
        const searchValueLowerCase = searchValue.toLowerCase();

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


    });





    return (
        <div id="historyContent">
            <h2 id="title">Histórico</h2>
            <div id="historyBackground">
                <ul id="cardList">
                    {filteredPurchases.map((purchase) => (
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
            <SearchBar handleSearch={handleSearch} />
        </div>
    );
}

export default PurchaseHistory;
