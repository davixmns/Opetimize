import {useEffect, useState} from "react";
import {updatePassword, verifyToken} from "../../service/apiService";
import {useNavigate} from "react-router-dom";
import swal from "sweetalert";

export function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()

    function handleOnChangeNewPassword(e) {
        setNewPassword(e.target.value)
    }

    function handleUpdatePassword() {
        const token = localStorage.getItem('token')
        updatePassword(token, newPassword)
            .then(async () => {
                await swal("Password updated!", "You can now login with your new password", "success")
                navigate('/login')
            })
    }

    return (
        <div>
            <input type={"text"} onChange={handleOnChangeNewPassword}/>
            <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
    )
}