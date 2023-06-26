import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { editPurchase } from '../../service/apiService';
import EditModal from '../editModal/EditModal';
import DeleteModal from '../deleteModal/DeleteModal';

import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as EditIcon } from '../../assets/pencil.svg';

import './styles.css';

export function Card({ purchase, handleDelete }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState(purchase.name);
    const [price, setPrice] = useState(purchase.price);
    const [weight, setWeight] = useState(purchase.weight);
    const [date, setDate] = useState(purchase.date);
    const navigate = useNavigate();

    const handleSaveEdit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const newCard = {
            id: purchase.purchase_id,
            name,
            price,
            weight,
            date,
        };

        await editPurchase(purchase.purchase_id, newCard);
        setShowEditModal(false);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    const handleCancelEditModal = () => {
        setShowEditModal(false);
    };

    const handleCancelDeleteModal = () => {
        setShowDeleteModal(false);
    };

    function formatDate(date) {
        const modifiedDate = addDays(new Date(date), 1);
        return format(modifiedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }

    return (
        <div id="card">
            <div id="left">
                <h3>{name}</h3>
                <p id="price">R${price}</p>
                <p id="weight">{weight}g</p>
                <p id="date">{formatDate(date)}</p>
            </div>
            <div id="right">
                <button id="edit" onClick={() => setShowEditModal(true)}>
                    <EditIcon />
                </button>
                <button id="trash" onClick={() => setShowDeleteModal(true)}>
                    <TrashIcon />
                </button>
            </div>
            {showEditModal && (
                <EditModal
                    id={purchase.id}
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
                    id={purchase.id}
                    name={name}
                    date={date}
                    handleDeleteCard={() => handleDelete(purchase.purchase_id)}
                    handleCancelDeleteModal={handleCancelDeleteModal}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}
        </div>
    );
}
