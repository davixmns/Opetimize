import {useEffect, useState} from "react";
import {updatePassword, verifyToken} from "../../service/apiService";
import {useNavigate} from "react-router-dom";

export function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem('token')
            if (!await verifyToken(token)) {
                navigate('/login')
            }
        }
        verify()
    }, [])

    function handleOnChangeNewPassword(e) {
        setNewPassword(e.target.value)
    }

    function handleUpdatePassword() {
        const token = localStorage.getItem('token')
        return updatePassword(token, newPassword)
    }

    return (
        <div>
            <input type={"text"} onChange={handleOnChangeNewPassword}/>
            <button onClick={handleUpdatePassword}>Update Password</button>
        </div>
    )
}