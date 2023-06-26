import logo from "../../assets/logo.png";
import titulo from "../../assets/titulo.png"
import "./styles.css"
import {LogoutButton} from "../logout/LogoutButton";

function Header() {
    return (
        <div id={"header"}>
            <img id={"logo"} src={logo} alt={"logo"}/>
            <LogoutButton/>
            <img id={"titulo"} src={titulo} alt={"titulo"}/>
        </div>
    )
}

export default Header