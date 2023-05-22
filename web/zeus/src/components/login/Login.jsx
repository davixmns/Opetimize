import {useState} from "react";
import {tryLogin} from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import "./styles.css"
import swal from "sweetalert";
import logoTitle from "../../assets/titulo.png"
import {MyTextInput} from "../myTextInput/MyTextInput";
import {MyButton} from "../myButton/MyButton";
import backImg from "../../assets/login-back.jpg"

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

    function handleGoToForgotPassword() {
        setEmail("")
        setPassword("")
        navigate("/forgotPassword");
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
        <div id="content" style={{backgroundImage: `url(${backImg})`}}>
            <img src={logoTitle} alt="logo" id="titleLogo" />
            <div id="form-background">
                <div>
                    <h2 id="title">Login</h2>
                </div>
                <MyTextInput
                    type="text"
                    placeholder="email"
                    id="text-input"
                    onChange={handleChangeEmail}
                />
                <MyTextInput
                    type="password"
                    placeholder="senha"
                    id="text-input"
                    onChange={handleChangePassword}
                />
                <button id="forgotPassword" onClick={handleGoToForgotPassword}>
                    esqueci a senha
                </button>
                <MyButton
                    onClick={handleTryLogin}
                    text="Entrar"
                    backgroundColor="#E49052"
                    color="white"
                />
                <h3 id="ou">ou</h3>
                <MyButton
                    onClick={handleGoToRegister}
                    text="Criar conta"
                    backgroundColor="#E49052"
                    color="#fff"
                />
            </div>
        </div>
    );

}
