import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import { useState } from "react";
import login_icon from "/login_icon.png"; 
import close_icon from "/close_icon.png"; 
import './login.css'; 

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
            username: email.split('@')[0],
            password: password,
            full_name: "Example Name",
            dob: new Date().toISOString(),
            phone_number: "0123456789",
            address: "123 Example Street",
            email: email,
            role: "Customer",
            sex: null
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
        <div className="test">
            <div className="header-row">
                <img src={login_icon} alt="Login Icon" className="login-icon" />
                <h2 className="header-title">Đăng ký</h2>
                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={() => console.log('Close clicked')} />
            </div>
            <div className="container">
                <h1 className="title">Đăng ký</h1>
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
                            placeholder="Nhập mật khẩu"
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
                            placeholder="Xác nhận mật khẩu"
                            className="password"
                            required
                        />
                    </div>
                    <button className="signup" type="submit">Đăng ký</button>
                </form>
                <div className="loginredirect">
                    <p onClick={onLoginClick} style={{ cursor: "pointer", color: "#646cff" }}>
                        Already have an account?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;