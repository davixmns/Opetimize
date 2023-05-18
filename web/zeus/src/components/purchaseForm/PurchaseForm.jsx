import DatePicker from "../datePicker/DatePicker";
import {useState} from "react";
import {insertPurchase} from "../../service/apiService";
import ErrorModal from "../errorModal/ErrorModal";
import {useNavigate} from "react-router-dom";
import "./styles.css";

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
                    <div className={"formItem"}>
                        <label htmlFor="name" className={"labelFormItem"}>Ração:</label>
                        <input type="text" className={"inputText"} onChange={handleNameChange} placeholder={"Nome/Marca"}/>
                    </div>

                    <div className={"formItem"}>
                        <label htmlFor="price" className={"labelFormItem"}>Valor:</label>
                        <input type={"number"} className={"inputText"} value={price} onChange={handlePriceChange} placeholder={"R$"}/>
                    </div>

                    <div className={"formItem"}>
                        <label htmlFor="weight" className={"labelFormItem"}>Peso:</label>
                        <input type={"number"} className={"inputText"} value={weight} onChange={handleWeightChange} placeholder={"gramas"}/>
                    </div>

                    <div className={"formItem"}>
                        <label htmlFor="date" className={"labelFormItem"}>Data:</label>
                        <DatePicker id="date" value={date} onChange={handleDateChange}/>
                    </div>

                    <button type="button" id="buttonSave" onClick={handleSaveClick} title="Salvar">
                        <span style={{color: "white", fontSize: 20}}>Salvar</span>
                    </button>

                    {error && <ErrorModal title="Erro" message={errorMessage} onClose={handleCloseErrorModal}/>}
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
