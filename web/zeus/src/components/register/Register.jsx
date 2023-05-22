import {useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import "./styles.css"
import {createUser} from "../../service/apiService";
import titleLogo from "../../assets/titulo.png";
import {MyTextInput} from "../myTextInput/MyTextInput";
import {MyButton} from "../myButton/MyButton";
import backImg from "../../assets/login-back.jpg";

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const navigate = useNavigate()

    async function handleTryCreateUser() {
        if (password !== passwordConfirmation) {
            await swal("Erro", "Senhas não correspondem", "error");
            return;
        }
        if (!name || !email || !password || !passwordConfirmation) {
            await swal("Erro", "Preencha todos os campos", "error");
            return;
        }
        if (!verifyEmail(email)) {
            await swal("Erro", "Email inválido", "error");
            return;
        }
        const user = {name, email, password};
        try {
            const response = await createUser(user);
            if (response) {
                await swal("Sucesso", "Usuário salvo com sucesso!", "success");
                navigate("/login");
            } else {
                await swal("Erro", "Email já cadastrado", "error");
            }
        } catch (error) {
            console.log(error);
            await swal("Erro", "Ocorreu um erro no servidor", "error");
        }
    }

    function verifyEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

    async function handleGoToLogin() {
        setName('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
        navigate("/login")
    }

    function handleChangeName(event) {
        setName(event.target.value)
    }

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }

    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    function handleChangePasswordConfirmation(event) {
        setPasswordConfirmation(event.target.value)
    }

    return (
        <div id="content" style={{backgroundImage: `url(${backImg})`}}>
            <div id="background">
                <div id="a">
                    <div>
                        <h2 id="title">Criar Conta</h2>
                    </div>
                    <MyTextInput type="text" placeholder="Nome" onChange={handleChangeName}/>
                    <MyTextInput type="email" placeholder="Email" onChange={handleChangeEmail}/>
                    <MyTextInput type="password" placeholder="Senha" onChange={handleChangePassword}/>
                    <MyTextInput type="password" placeholder="Confirmar senha" onChange={handleChangePasswordConfirmation}/>
                </div>

                <div id="b">
                    <img id="logoTitle" src={titleLogo} alt="logo"/>
                    <MyButton onClick={handleTryCreateUser} text="Salvar" backgroundColor="#E49052" color="#fff"/>
                    <h3 id="ou2">ou</h3>
                    <MyButton onClick={handleGoToLogin} text="Cancelar" backgroundColor="#E49052" color="#fff"/>
                </div>
            </div>
        </div>
    );

}