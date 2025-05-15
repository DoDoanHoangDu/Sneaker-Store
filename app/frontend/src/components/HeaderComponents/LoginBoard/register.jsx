import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import { useState } from "react";
import login_icon from "/login_icon.png"; 
import close_icon from "/close_icon.png"; 
import './login.css';
import './error.css';

const Register = ({ onLoginClick, onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
        setError('');
    };    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirmPassword } = formData;
        
        setError('');
        setIsLoading(true);

        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!emailPattern.test(email)) {
            setError("Vui lòng nhập địa chỉ email hợp lệ.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp.");
            setIsLoading(false);
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
        };        try {
            const response = await fetch('http://127.0.0.1:8000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('User registered successfully:', result);
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
        }
    };

    return (
        <div className="test">
            <div className="header-row">
                <img src={login_icon} alt="Login Icon" className="login-icon" />
                <h2 className="header-title">Đăng ký</h2>                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={onClose} />
            </div>
            <div className="container">
                <h1 className="title">Đăng ký</h1>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
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