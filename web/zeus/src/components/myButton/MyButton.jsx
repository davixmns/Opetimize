import React from "react";
import "./styles.css";

export function MyButton(props) {
    return (
        <div>
            <button
                id="my-button"
                onClick={props.onClick}
                style={{ backgroundColor: props.backgroundColor, color: props.color }}
            >
                {props.text}
            </button>
        </div>
    );
}