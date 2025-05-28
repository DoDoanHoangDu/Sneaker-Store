import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import login_icon from "/login_icon.png"; 
import close_icon from "/close_icon.png"; 
import './login.css'; 
import './error.css';
import { useState } from "react";
import { useAuth } from "../../../context/useAuth.jsx";

const Login = ({ onRegisterClick, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();const handleSubmit = async (event) => {
        event.preventDefault();
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const username = email.split('@')[0]; // Extract username from email
        
        const formData = new URLSearchParams();
        formData.append('grant_type', 'password');
        formData.append('username', username);  // API expects username, not email
        formData.append('password', password);
        formData.append('scope', '');
        formData.append('client_id', '');
        formData.append('client_secret', '');        setIsLoading(true);
        setErrorMessage('');
        
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });            if (response.ok) {
                const data = await response.json();                
                console.log('Login successful:', data);
                
                // Get role from backend response or fallback to 'Customer' if not available
                const role = data.account?.role || 'Customer';
                
                console.log('Login successful - Username:', username);
                console.log('Login successful - Assigned role:', role);
                
                // Use our auth context to save the user's login state
                login({
                    username: username,
                    email: email,
                    access_token: data.access_token, // Use access_token to match what useAuth is expecting
                    role: role,
                    originalPassword: password // Store password for token refresh (only in development)
                });
                
                onClose(); // Close the login window after successful login
            } else {
                let errorText = '';
                try {
                    const errorData = await response.json();
                    errorText = errorData.detail || 'Unknown error';
                } catch (e) {
                    errorText = await response.text();
                }
                console.error('Login failed:', errorText);
                setErrorMessage('Đăng nhập thất bại: ' + errorText);
            }
        } catch (err) {
            console.error('Error connecting to backend:', err);
            setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="test">
            <div className="header-row">
                <img src={login_icon} alt="Login Icon" className="login-icon" />
                <h2 className="header-title">Đăng nhập</h2>
                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={onClose} />
            </div>
            <div className="container">
                <h1 className="title">Đăng Nhập</h1>
                <form className="inputform" onSubmit={handleSubmit}>                    <div className="inputcontainer">
                        <img src={email_icon} alt="Email Icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    </div>
                    <div className="inputcontainer">
                        <img src={lock} alt="Lock Icon" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            className="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    )}
                    <button className="loginbutton" disabled={isLoading}>
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
                <div className="registerredirect">
                    <a href="#" className="forgotpassword">Quên mật khẩu?</a>
                    <p className="register" onClick={onRegisterClick}>Đăng ký tài khoản mới</p>
                </div>
            </div>
        </div>
    );
};

export default Login;