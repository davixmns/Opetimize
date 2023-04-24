import "./styles.css";
import TextInput from "../TextInput/TextInput";
import SaveButton from "../saveButton/SaveButton";
import DatePicker from "../datePicker/DatePicker";
import { useState } from "react";
import { insertPurchase } from "../../service/apiService";

function PurchaseForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSaveClick = async () => {
        const purchase = { name, price, weight, date };
        await insertPurchase(purchase);
        setName("");
        setPrice("");
        setWeight("");
        setDate("");
    };

    return (
        <div id="formContent">
            <h2 id="title">Cadastrar Ração</h2>
            <div id="formBackground">
                <ul id="inputList">
                    <label htmlFor="name">Nome:</label>
                    <TextInput id="name" value={name} onChange={handleNameChange} />

                    <label htmlFor="price">Valor:</label>
                    <TextInput id="price" value={price} onChange={handlePriceChange} />

                    <label htmlFor="weight">Peso:</label>
                    <TextInput id="weight" value={weight} onChange={handleWeightChange} />

                    <label htmlFor="date">Data:</label>
                    <DatePicker id="date" value={date} onChange={handleDateChange} />

                    <label htmlFor="saveButton">Salvar</label>
                    <SaveButton onClick={handleSaveClick} />
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
