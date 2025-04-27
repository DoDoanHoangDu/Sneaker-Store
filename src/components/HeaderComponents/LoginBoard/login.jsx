import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";
import login_icon from "/login_icon.png"; 
import close_icon from "/close_icon.png"; 
import './login.css'; 

const Login = ({ onRegisterClick, onClose }) => {
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
                <h2 className="header-title">Đăng nhập</h2>
                <img src={close_icon} alt="Close Icon" className="close-icon" onClick={onClose} />
            </div>
            <div className="container">
                <h1 className="title">Đăng Nhập</h1>
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
                    <button className="loginbutton">Đăng nhập</button>
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