import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"

export function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('token', '');
        navigate('/login');
    };

    return (
        <div>
            <button className={"logoutButton"} onClick={handleLogout}>Sair</button>
        </div>
    );
}
