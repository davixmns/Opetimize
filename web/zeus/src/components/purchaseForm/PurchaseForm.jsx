import TextInput from "../TextInput/TextInput";
import SaveButton from "../saveButton/SaveButton";
import DatePicker from "../datePicker/DatePicker";
import {useState} from "react";
import {insertPurchase} from "../../service/apiService";
import ErrorModal from "../errorModal/ErrorModal";
import {useNavigate} from "react-router-dom";
import "./styles.css";
import {LogoutButton} from "../logout/LogoutButton";

function PurchaseForm() {
    const today = new Date().toISOString().substr(0, 10);
    const [error, setModalError] = useState(false);
    const [errorMessage, setModalErrorMessage] = useState('');
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState(today);
    const navigate = useNavigate();

    const handleCloseErrorModal = () => {
        setModalError(false);
    };

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
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const newPurchase = {name, price, weight, date};
                if (name && price && weight) {
                    if (!date) {
                        setDate(today)
                    }
                    await insertPurchase(newPurchase, token)
                    setName("");
                    setPrice("");
                    setWeight("");
                    setDate("");
                    // eslint-disable-next-line no-restricted-globals
                    location.reload()
                } else {
                    setModalErrorMessage("Todos os campos precisam ser preenchidos");
                    setModalError(true);
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            setModalError(error.message)
            setModalError(true)
        }
    };

    return (
        <div id="formContent">
            <h2 id={"formTitle"}>Cadastrar Ração</h2>
            <div id="formBackground">
                <ul id="inputList">
                    <div id="name-text-input">
                        <label htmlFor="name" id="label-name">Nome:</label>
                        <TextInput id="name" value={name} onChange={handleNameChange} placeHolder="Ração/Marca"/>
                    </div>

                    <div id="price-text-input">
                        <label htmlFor="price" id="label-price">Valor:</label>
                        <TextInput id="price" value={price} onChange={handlePriceChange} placeHolder={"R$"}/>
                    </div>

                    <div id="weight-text-input">
                        <label htmlFor="weight" id="label-weight">Peso:</label>
                        <TextInput id="weight" value={weight} onChange={handleWeightChange} placeHolder={"gramas"}/>
                    </div>

                    <div id="date-datepicker">
                        <label htmlFor="date" id="label-date">Data:</label>
                        <DatePicker id="date" value={date} onChange={handleDateChange}/>
                    </div>

                    <SaveButton onClick={handleSaveClick} title={"Salvar"}/>
                    {error && <ErrorModal title="Erro" message={errorMessage} onClose={handleCloseErrorModal}/>}
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
