<<<<<<< Updated upstream
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

=======
import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import { useState } from "react";

const Register = ({ onLoginClick }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = formData;

        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const data = {
            username: email.split('@')[0],  // Extract username from email
            password: password,
            full_name: "Example Name",      // Example name
            dob: new Date().toISOString(),  // Current date for now
            phone_number: "0123456789",     // Example phone number
            address: "123 Example Street",  // Example address
            email: email,
            role: "Customer",               // Customer role
            sex: null                       // Use "unknown" for sex instead of None
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registered successfully:', result);
                onLoginClick(); // Close the registration window and redirect to login
            } else {
                const error = await response.text();
                console.error('Registration failed:', error);
                alert('Registration failed: ' + error);
            }
        } catch (err) {
            console.error('Error connecting to backend:', err);
            alert('Could not connect to server.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Register</h1>
            <form className="inputform" onSubmit={handleSubmit}>
                <div className="inputcontainer">
                    <img src={email_icon} alt="Email Icon" />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="email"
                        required
                    />
                </div>
                <div className="inputcontainer">
                    <img src={lock} alt="Lock Icon" />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="password"
                        required
                    />
                </div>
                <div className="inputcontainer">
                    <img src={lock} alt="Lock Icon" />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="password"
                        required
                    />
                </div>
                <button className="signup" type="submit">Sign Up</button>
            </form>
            <div className="loginredirect">
                <p>Already have an account?</p>
                <button className="login" onClick={onLoginClick}>Login</button>
            </div>
        </div>
    );
};

>>>>>>> Stashed changes
export default Register;