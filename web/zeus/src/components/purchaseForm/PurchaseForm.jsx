import DatePicker from "../datePicker/DatePicker";
import {useState} from "react";
import {insertPurchase} from "../../service/apiService";
import ErrorModal from "../errorModal/ErrorModal";
import {useNavigate} from "react-router-dom";
import "./styles.css";
import {MyTextInput} from "../myTextInput/MyTextInput";
import {MyButton} from "../myButton/MyButton";

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

    const handleSaveCard = async () => {
        console.log("handleSaveCard")
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
            <div id="background-purchase-form">
                <ul id="inputList">
                    <div className={"formItem"}>
                        <MyTextInput type="text" className={"inputText"} onChange={handleNameChange}
                                     placeholder={"Nome/Marca"}/>
                    </div>

                    <div className={"formItem"}>
                        <MyTextInput type={"number"} onChange={handlePriceChange} placeholder={"R$"}/>
                    </div>

                    <div className={"formItem"}>
                        <MyTextInput type={"number"} className={"inputText"} onChange={handleWeightChange}
                                     placeholder={"gramas"}/>
                    </div>

                    <div className={"formItem"}>
                        <DatePicker id="date" value={date} onChange={handleDateChange}/>
                    </div>

                    <div className={"formItem"}>
                        <MyButton
                            onClick={handleSaveCard}
                            backgroundColor={'#E49052'}
                            color={'#fff'}
                            text={"Salvar"}
                        />
                    </div>

                    {error && <ErrorModal title="Erro" message={errorMessage} onClose={handleCloseErrorModal}/>}
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
