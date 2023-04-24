import "./styles.css";
import TextInput from "../TextInput/TextInput";
import SaveButton from "../saveButton/SaveButton";

function PurchaseForm() {
    return (
        <div id="formContent">
            <h2 id="title">Cadastrar Ração</h2>
            <div id="formBackground">
                <ul id="inputList">
                        <label htmlFor="inputText">Nome:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Valor:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Preço:</label>
                        <TextInput/>

                        <label htmlFor="inputText">Data:</label>
                        <TextInput/>

                        <label htmlFor="saveButton">Salvar</label>
                        <SaveButton/>
                </ul>
            </div>
        </div>
    );
}

export default PurchaseForm;
