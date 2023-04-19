import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import './styles.css';
import {deletePurchaseById, getAllPurchases} from '../../service/apiService';

export function Card(props) {
    const handleDelete = async () => {
        await deletePurchaseById(props.id);

    };

    return (
        <div id="card">
            <h3>
                {props.name} - {props.weight}g - R${props.price} -{' '}
                {format(new Date(props.date), "dd 'de' MMMM 'de' yyyy", {locale: ptBR})}
            </h3>
            <div id="buttons">
                <button>
                    <i className="edit">editar</i>
                </button>
                <button onClick={handleDelete}>
                    <i className="trash">lixo</i>
                </button>
            </div>
        </div>
    );
}
