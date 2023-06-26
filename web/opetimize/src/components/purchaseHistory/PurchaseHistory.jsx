import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAllPurchasesByUserToken, verifyToken, deletePurchaseById} from '../../service/apiService';
import {Card} from '../card/Card';
import SearchBar from '../searchBar/SearchBar';
import './styles.css';

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const navigate = useNavigate();

    const handleOnChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token && (await verifyToken(token))) {
                const data = await getAllPurchasesByUserToken(token);
                setPurchases(data);
            } else {
                localStorage.setItem('token', '');
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    useEffect(() => {
        const filterPurchases = () => {
            if (purchases != null) {
                const filteredPurchases = purchases.filter((purchase) => {
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
                setFilteredPurchases(filteredPurchases);
            }
        };

        filterPurchases();
    }, [purchases, searchValue]);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (token && (await verifyToken(token))) {
            await deletePurchaseById(id);
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } else {
            navigate('/login');
        }
    };

    return (
        <div id="historyContent">
            <h2 id="formTitle">Histórico</h2>
            <div id="historyBackground">
                <ul id="cardList">
                    {filteredPurchases.map((purchase) => (
                        <Card key={purchase.purchase_id} purchase={purchase} handleDelete={handleDelete}/>
                    ))}
                </ul>
            </div>
            <SearchBar handleSearch={handleOnChangeSearchValue}/>
        </div>
    );
}

export default PurchaseHistory;





