import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import './styles.css';
import {editPurchase} from "../../service/apiService";

export function Card(props) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [weight, setWeight] = useState(props.weight);
    const [date, setDate] = useState(props.date);

    const handleDelete = async () => {
        await props.handleDelete(props.id);
    };

    async function handleSave(){
        const newCard = {
            id: props.id,
            name: name,
            price: price,
            weight: weight,
            date: date,
        };
        await editPurchase(props.id, newCard)
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div id="card">
            <div id="left">
                <h3>{name}</h3>
                <p id="price">R${price}</p>
                <p id="weight">{weight}g</p>
                <p id="date">
                    {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
            </div>
            <div id="right">
                <button id="edit" onClick={() => setShowModal(true)}>
                    <EditIcon />
                </button>
                <button id="trash" onClick={handleDelete}>
                    <TrashIcon />
                </button>
            </div>
            {showModal && (
                <div id="modal">
                    <div id="modal-content">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="price">Preço:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="weight">Peso:</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <label htmlFor="date">Data:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <div id="modal-buttons">
                            <button onClick={handleSave}>Salvar</button>
                            <button onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
