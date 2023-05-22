import React, {useState} from "react";
import {sendEmailForgotPassword} from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import "./styles.css";
import {MyTextInput} from "../myTextInput/MyTextInput";
import {MyButton} from "../myButton/MyButton";
import backImg from "../../assets/forgot-back.jpg";

export function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function handleGoToLogin() {
        navigate("/login");
    }

    function handleOnChangeEmail(event) {
        setEmail(event.target.value);
    }

    function verifyEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    function showChargin() {
        Swal.fire({
            title: "Enviando email...",
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
    }

    async function handleSendEmailForgotPassword() {
        if (!verifyEmail(email)) {
            swal("Email inválido!", "Digite um email válido", "error");
            return;
        }

        showChargin();
        const response = await sendEmailForgotPassword(email);

        if (response) {
            await swal(
                "Email enviado!",
                "Verifique seu email para redefinir sua senha",
                "success"
            );
            navigate("/login");
        } else {
            await swal(
                "Email não encontrado!",
                "Conta não cadastrada no banco de dados",
                "error"
            );
            setEmail("");
        }
    }

    return (
        <div id="content-forgot-password" style={{backgroundImage: `url(${backImg})`}}>
            <div id="form-forgot-password">
                <div id="description">
                    <h1>Esqueceu a senha?</h1>
                    <h3>Vamos enviar um email de recuperação pra você</h3>
                    <MyTextInput
                        type="text"
                        onChange={handleOnChangeEmail}
                        placeholder="email"
                    />
                    <MyButton
                        onClick={handleSendEmailForgotPassword}
                        text="Enviar"
                        backgroundColor="#E49052"
                        color="#fff"
                    />
                    <MyButton
                        onClick={handleGoToLogin}
                        text="Voltar"
                        backgroundColor="transparent"
                        color="#E49052"
                    />
                </div>
            </div>
        </div>
    );
}
