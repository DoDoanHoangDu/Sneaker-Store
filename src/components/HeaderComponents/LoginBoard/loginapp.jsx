import React, { useState } from 'react';
import Login from './login.jsx';
import Register from './register.jsx';

function loginapp() {
    const [isRegister, setIsRegister] = useState(false);

    const handleRegisterClick = () => {
        setIsRegister(true);
    };

    const handleLoginClick = () => {
        setIsRegister(false);
    };

    return (
        <div>
            {isRegister ? <Register onLoginClick={handleLoginClick} /> : <Login onRegisterClick={handleRegisterClick} />}
        </div>
    );
}

export default loginapp;