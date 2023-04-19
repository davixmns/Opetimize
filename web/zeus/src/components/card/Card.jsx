import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './styles.css';

export function Card(props) {
    return (
        <div id="card">
            <h3>{props.name + ' - ' + props.weight + 'g - R$' + props.price + ' - ' + format(new Date(props.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</h3>
            <div id="buttons">
                <button><i className="edit">editar</i></button>
                <button><i className="trash">lixo</i></button>
            </div>
        </div>
    );
}
