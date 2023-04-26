import React, { useState } from 'react';
import Modal from 'react-modal';
import {editPurchase} from "../../service/apiService";
import "./styles.css"

function EditModal(props) {
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [weight, setWeight] = useState(props.weight);
    const [date, setDate] = useState(props.date);
    const [isOpen, setIsOpen] = useState(false);

    const handleSaveClick = async () => {
        const updatedPurchase = { name, price, weight, date };
        await editPurchase(props.id, updatedPurchase)
        setIsOpen(false);
    }

    const handleCancelClick = () => {
        setIsOpen(false);
    };

    return (
        <div id="edit-modal">
            <button onClick={() => setIsOpen(true)}>
                <i className="edit">editar</i>
            </button>
            <Modal isOpen={isOpen} onRequestClose={handleCancelClick}>
                <h2>Editar compra</h2>
                <label>
                    Nome:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Preço:
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    Peso:
                    <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </label>
                <label>
                    Data:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <div>
                    <button onClick={handleSaveClick}>Salvar</button>
                    <button onClick={handleCancelClick}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
}

export default EditModal;
