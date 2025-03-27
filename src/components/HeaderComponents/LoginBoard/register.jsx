import React from 'react';
import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import login_icon from "/login_icon.png"; // Add the login icon
import close_icon from "/close_icon.png"; // Add the close icon
import './login.css'; // Ensure you have the CSS file for styling

const Register = ({ onLoginClick, onClose }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const emailInput = event.target.elements.email;
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!emailPattern.test(emailInput.value)) {
            alert("Please enter a valid email address.");
        } else {
            // Proceed with form submission or further processing
            console.log("Form submitted successfully");
        }
    };

    return (
        <div className="test">
        <div className="header-row">
            <img src={login_icon} alt="Login Icon" className="login-icon" />
            <h2 className="header-title">Đăng ký</h2>
            <img src={close_icon} alt="Close Icon" className="close-icon" onClick={onClose} />
        </div>
        <div className="container">
            <h1 className="title">Đăng ký</h1>
            <form className="inputform" onSubmit={handleSubmit}>
                <div className="inputcontainer">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                </div>
                <div className="inputcontainer">
                    <img src={lock} alt="Lock Icon" />
                    <input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="password"
                        required
                    />
                </div>
                <div className="inputcontainer">
                    <img src={lock} alt="Lock Icon" />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        className="password"
                        required
                    />
                </div>
                <button className="signup">Đăng ký</button>
            </form>
            <div className="loginredirect">
                <p className="login" onClick={onLoginClick}>Bạn đã có tài khoản?</p>
            </div>
        </div>
        </div>
    );
};

export default Register;