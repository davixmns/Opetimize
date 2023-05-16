import React, {useState, useEffect} from 'react';
import {deletePurchaseById, getAllPurchasesByUserToken, verifyToken} from '../../service/apiService';
import './styles.css';
import {Card} from '../card/Card';
import SearchBar from "../searchBar/SearchBar";
import {useNavigate} from "react-router-dom";

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (token && (await verifyToken(token))) {
                const data = await getAllPurchasesByUserToken(token);
                setPurchases(data);
            } else {
                localStorage.setItem("token", "");
                navigate("/login");
            }
        };
        fetchData();
    }, [navigate]);


    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (token && (await verifyToken(token))) {
            await deletePurchaseById(id);
            const data = await getAllPurchasesByUserToken(token);
            setPurchases(data);
        } else {
            navigate("/login");
        }
    };

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredPurchases = purchases.filter(purchase => {
        const searchValueLowerCase = searchValue.toLowerCase();

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
    });

    return (
        <div id="historyContent">
            <h2 id="title">Histórico</h2>
            <div id="historyBackground">
                <ul id="cardList">
                    {filteredPurchases.map((purchase) => (
                        <Card
                            key={purchase.purchase_id} //substituir o _id por purchase_id para funcionar na api do mysql
                            purchase_id={purchase.purchase_id}
                            name={purchase.name}
                            price={purchase.price}
                            weight={purchase.weight}
                            date={purchase.date}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </div>
            <SearchBar handleSearch={handleSearch}/>
        </div>
    );
}

export default PurchaseHistory;
