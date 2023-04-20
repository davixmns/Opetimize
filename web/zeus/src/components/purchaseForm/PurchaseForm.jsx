import "./styles.css";
import TextInput from "../TextInput/TextInput";

function PurchaseForm() {
    return (
        <div id="formContent">
            <h2 id="title">Cadastrar Ração</h2>
            <div id="formBackground">
                <ul id="inputList">
                    <li>
                        <label htmlFor="inputText">Nome:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Valor:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Preço:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Data:</label>
                        <TextInput/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
