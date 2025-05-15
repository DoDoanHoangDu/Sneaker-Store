import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import { useState } from "react";
import login_icon from "/login_icon.png"; 
import close_icon from "/close_icon.png"; 
<<<<<<< HEAD
import './login.css'; 

const Register = ({ onLoginClick }) => {
=======
import './login.css';
import './error.css';

const Register = ({ onLoginClick, onClose }) => {
>>>>>>> main
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
<<<<<<< HEAD
=======
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
>>>>>>> main

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
<<<<<<< HEAD
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = formData;
=======
        setError('');
    };    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = formData;
        
        setError('');
        setIsLoading(true);
>>>>>>> main

        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!emailPattern.test(email)) {
<<<<<<< HEAD
            alert("Please enter a valid email address.");
=======
            setError("Vui lòng nhập địa chỉ email hợp lệ.");
            setIsLoading(false);
>>>>>>> main
            return;
        }

        if (password !== confirmPassword) {
<<<<<<< HEAD
            alert("Passwords do not match.");
=======
            setError("Mật khẩu không khớp.");
            setIsLoading(false);
>>>>>>> main
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
<<<<<<< HEAD
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/signup', {
=======
        };        try {
            const response = await fetch('http://127.0.0.1:8000/auth/signup', {
>>>>>>> main
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registered successfully:', result);
<<<<<<< HEAD
                onLoginClick(); // Close the registration window and redirect to login
            } else {
                const error = await response.text();
                console.error('Registration failed:', error);
                alert('Registration failed: ' + error);
            }
        } catch (err) {
            console.error('Error connecting to backend:', err);
            alert('Could not connect to server.');
=======
                alert('Đăng ký thành công! Vui lòng đăng nhập.');
                onLoginClick(); // Close the registration window and redirect to login
            } else {
                let errorMessage = 'Unknown error';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.detail || 'Unknown error';
                } catch (e) {
                    const errorText = await response.text();
                    errorMessage = errorText || 'Server error';
                }
                console.error('Registration failed:', errorMessage);
                setError(`Đăng ký thất bại: ${errorMessage}`);
            }
        } catch (err) {
            console.error('Error connecting to backend:', err);
            setError('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
>>>>>>> main
        }
    };

    return (
        <div className="test">
            <div className="header-row">
                <img src={login_icon} alt="Login Icon" className="login-icon" />
<<<<<<< HEAD
                <h2 className="header-title">Đăng ký</h2>
                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={() => console.log('Close clicked')} />
            </div>
            <div className="container">
                <h1 className="title">Đăng ký</h1>
=======
                <h2 className="header-title">Đăng ký</h2>                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={onClose} />
            </div>
            <div className="container">
                <h1 className="title">Đăng ký</h1>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
>>>>>>> main
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
<<<<<<< HEAD
                            className="password"
                            required
                        />
                    </div>
                    <button className="signup" type="submit">Đăng ký</button>
=======
                            className="password"                            required
                        />
                    </div>
                    <button 
                        className="signup" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>
>>>>>>> main
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