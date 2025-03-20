import React from 'react';
import './login.css';
import Loginapp from './loginapp.jsx';

const LoginPage = ({ onClose }) => {
  return (
    <div className="login-page-container">
      <Loginapp />
    </div>
  );
};

export default LoginPage;