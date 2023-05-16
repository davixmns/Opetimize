import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';
import './styles.css';
import {editPurchase} from "../../service/apiService";
import EditModal from "../editModal/EditModal";
import DeleteModal from "../deleteModal/DeleteModal";
import {useNavigate} from "react-router-dom";

export function Card(props) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [weight, setWeight] = useState(props.weight);
    const [date, setDate] = useState(props.date);
    const navigate = useNavigate()

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/")
            return
        }
        await props.handleDelete(props.purchase_id);
    };

    async function handleSaveEdit(){
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/")
            return
        }
        const newCard = {
            id: props.purchase_id,
            name: name,
            price: price,
            weight: weight,
            date: date,
        };
        await editPurchase(props.purchase_id, newCard)
        setShowEditModal(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    const handleCancelEditModal = () => {
        setShowEditModal(false);
    };

    const handleCancelDeleteModal = () => {
        setShowDeleteModal(false)
    }

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
                <button id="edit" onClick={() => setShowEditModal(true)}>
                    <EditIcon/>
                </button>
                <button id="trash" onClick={() => setShowDeleteModal(true)}>
                    <TrashIcon />
                </button>
            </div>
            {showEditModal && (
                <EditModal
                    id={props.id}
                    name={name}
                    price={price}
                    weight={weight}
                    date={date}
                    handleSaveEditModal={handleSaveEdit}
                    handleCancelEditModal={handleCancelEditModal}
                    setName={setName}
                    setPrice={setPrice}
                    setWeight={setWeight}
                    setDate={setDate}
                    setShowEditModal={setShowEditModal}
                    showEditModal={showEditModal}
                />
            )}
            {showDeleteModal && (
                <DeleteModal
                    id={props.id}
                    name={name}
                    date={date}
                    handleDeleteCard={handleDelete}
                    handleCancelDeleteModal={handleCancelDeleteModal}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}

        </div>
    );
}
