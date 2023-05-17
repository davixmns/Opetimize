import {useState} from "react";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";
import "./styles.css"
import {createUser} from "../../service/apiService";
import titleLogo from "../../assets/titulo.png";

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const navigate = useNavigate()

    async function handleTryCreateUser() {
        if (password === passwordConfirmation) {
            if (name && email && password && passwordConfirmation) {
                const user = {name, email, password};
                try {
                    const response = await createUser(user);
                    if (response) {
                        await swal("Sucesso", "Usuário salvo com sucesso!", "success");
                    } else {
                        await swal("Erro", "Email já cadastrado", "error");
                    }
                } catch (error) {
                    console.log(error);
                    await swal("Erro", "Ocorreu um erro no servidor", "error");
                }
            } else {
                await swal("Erro", "Preencha todos os campos", "error");
            }
        } else {
            await swal("Erro", "Senhas não correspondem", "error");
        }
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
        <div id={"content"}>
            <div id={"background"}>
                <div id={"a"}>
                    <div>
                        <h2 id={"title"}>Registrar Conta</h2>
                    </div>
                    <input type={"text"} placeholder={"Nome"} id={"text-input"} onChange={handleChangeName}></input>
                    <input type={"email"} placeholder={"Email"} id={"text-input"} onChange={handleChangeEmail}></input>
                    <input type={"password"} placeholder={"Senha"} id={"text-input"}
                           onChange={handleChangePassword}></input>
                    <input type={"password"} placeholder={"Confirmar senha"} id={"text-input"} onChange={handleChangePasswordConfirmation}></input>
                </div>

                <div id={"b"}>
                    <img id={"logoTitle"} src={titleLogo} alt={"logo"}/>
                    <button id={"button"} onClick={handleTryCreateUser}>Salvar</button>
                    <h3 id={"ou2"}>ou</h3>
                    <button id={"button"} onClick={handleGoToLogin}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}