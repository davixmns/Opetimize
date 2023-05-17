import {useState} from "react";
import {tryLogin} from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import "./styles.css"
import swal from "sweetalert";
import logoTitle from "../../assets/titulo.png"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleTryLogin() {
        const token = await tryLogin(email, password);
        if (token) {
            localStorage.setItem("token", token);
            navigate("/home");
        } else {
            await swal("Erro", "Email ou senha incorretos", "error")
        }
    }

    function handleGoToRegister() {
        setEmail("")
        setPassword("")
        navigate("/register");
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }

    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    return (
        <div id={"content"}>
            <img src={logoTitle} alt={"logo"} id={"titleLogo"}/>
            <div id={"form-background"}>
                <div>
                    <h2 id={"title"}>Login</h2>
                </div>
                <input type={"text"} placeholder={"email"} id={"text-input"} onChange={handleChangeEmail}></input>
                <input type={"password"} placeholder={"senha"} id={"text-input"}
                       onChange={handleChangePassword}></input>
                <button id={"button"} onClick={handleTryLogin}>Entrar</button>
                <h3 id={"ou"}>ou</h3>
                <button id={"button"} onClick={handleGoToRegister}>Criar conta</button>
            </div>
        </div>
    )
}
