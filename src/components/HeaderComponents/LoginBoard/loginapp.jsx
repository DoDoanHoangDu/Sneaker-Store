// filepath: c:\Users\TinTin\Documents\GitHub\Sneaker-Store\src\components\HeaderComponents\LoginBoard\loginapp.jsx
import React, { useState } from 'react';
import Login from './login.jsx';
import Register from './register.jsx';

function Loginapp({ onClose }) {
    const [isRegister, setIsRegister] = useState(false);

    const handleRegisterClick = () => {
        setIsRegister(true);
    };

    const handleLoginClick = () => {
        setIsRegister(false);
    };

    return (
        <div>
            {isRegister ? 
                <Register onLoginClick={handleLoginClick} onClose={onClose} /> : 
                <Login onRegisterClick={handleRegisterClick} onClose={onClose} />
            }
        </div>
    );
}

export default Loginapp;