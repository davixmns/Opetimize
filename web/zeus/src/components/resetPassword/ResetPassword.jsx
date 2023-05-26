import React, { useEffect, useState } from "react";
import { updatePassword, verifyToken } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "./styles.css";
import { MyTextInput } from "../myTextInput/MyTextInput";
import { MyButton } from "../myButton/MyButton";

export function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (!token || !verifyToken(token)) {
            navigate("/login");
        }
    }, []);

    function handleOnChangeNewPassword(e) {
        setNewPassword(e.target.value);
    }

    function handleOnChangeConfirmNewPassword(e) {
        setConfirmNewPassword(e.target.value);
    }

    function handleUpdatePassword() {
        if (newPassword !== confirmNewPassword) {
            swal("Oops!", "As senhas não coincidem", "error");
            return;
        }
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        updatePassword(token, newPassword)
            .then(async (response) => {
                if (response) {
                    await swal(
                        "Senha alterada!",
                        "Já pode entrar com sua nova senha",
                        "success"
                    );
                    navigate("/login");
                } else {
                    await swal("Oops!", "Erro interno", "error");
                }
            })
            .catch(async () => {
                await swal("Oops!", "Erro interno", "error");
            });
    }

    return (
        <div id="content-reset-password">
            <div id="form-reset-password">
                <div id="description">
                    <h1>Alterar senha</h1>
                    <h3>Digite aqui sua nova senha</h3>
                    <MyTextInput
                        type="password"
                        onChange={handleOnChangeNewPassword}
                        placeholder="Senha"
                    />
                    <MyTextInput
                        type="password"
                        onChange={handleOnChangeConfirmNewPassword}
                        placeholder="Confirmar senha"
                    />
                    <MyButton
                        onClick={handleUpdatePassword}
                        text="Salvar"
                        backgroundColor="#E49052"
                        color="#fff"
                    />
                </div>
            </div>
        </div>
    );
}
