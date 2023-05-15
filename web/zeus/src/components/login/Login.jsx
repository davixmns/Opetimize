import "./login.css"
import {useState} from "react";
import {tryLogin} from "../../service/apiService";
import { useNavigate } from "react-router-dom";


export function Login() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate();


    async function handleTryLogin(){
        const token = await tryLogin(email, password)
        if(token){
            localStorage.setItem("token", token)
            na
        } else {
            alert("Email ou senha incorretos")
        }
    }

    return (
        <div id={"content"}>
            <div id={"form-background"}>
                <div>
                    <h1 id={"title"}>Login</h1>
                </div>
                <input type={"text"} placeholder={"email"} id={"text-input"} onChange={setEmail}></input>
                <input type={"password"} placeholder={"senha"} id={"text-input"} onChange={setPassword}></input>
                <button id={"button"}>Entrar</button>
                <text>ou</text>
                <button id={"button"}>Registrar</button>
            </div>
        </div>
    )
}