import React, {useState, useEffect} from 'react';
import "./styles.css"

export function Card(props){
    return (
        <div id="card">
            <p>{props.name + " - R$" + props.price}</p>
        </div>
    )
}



