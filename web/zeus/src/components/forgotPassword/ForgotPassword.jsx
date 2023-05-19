import {useState} from "react";
import {sendEmailForgotPassword} from "../../service/apiService";

export function ForgotPassword() {
    const [email, setEmail] = useState("");

    function handleOnChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleSendEmailForgotPassword() {
        return sendEmailForgotPassword(email);
    }

    return (
        <div>
            <h1>Digite seu email</h1>
            <input type={"email"} onChange={handleOnChangeEmail}/>
            <button onClick={handleSendEmailForgotPassword}>Enviar Email</button>
        </div>
    )
}