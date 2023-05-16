import {useState} from "react";
import {tryLogin} from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import "./styles.css"

export function Login() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleTryLogin() {
        const token = await tryLogin(email, password);
        if (token) {
            localStorage.setItem("token", token);
            navigate("/home");
        } else {
            alert("Email ou senha incorretos");
        }
    }

    function handleChangeEmail(event){
        setEmail(event.target.value)
    }

    function handleChangePassword(event){
        setPassword(event.target.value)
    }

    return (
        <div id={"content"}>
            <div id={"form-background"}>
                <div>
                    <h1 id={"title"}>Login</h1>
                </div>
                <input type={"text"} placeholder={"email"} id={"text-input"} onChange={handleChangeEmail}></input>
                <input type={"password"} placeholder={"senha"} id={"text-input"} onChange={handleChangePassword}></input>
                <button id={"button"} onClick={handleTryLogin}>Entrar</button>
                <text>ou</text>
                <button id={"button"}>Registrar</button>
            </div>
        </div>
    )
}
