import React from 'react';
import "./styles.css"
function ErrorModal(props) {
    return (
        <div className="error-modal">
            <div className="error-modal-content">
                <h3 id={"erro"}>{props.title}</h3>
                <p>{props.message}</p>
                <button onClick={props.onClose}>OK</button>
            </div>
        </div>
    );
}

export default ErrorModal;
