import './LoginHeader.css';

function LoginHeader({ onLoginClick }) {
    const source_login_logo = "/login.png";
    return (
        <div className="login-header" onClick={onLoginClick}>
                <img className="login-logo" src={source_login_logo} alt="Login" />
            <span className="login-block-text">
                <span>Đăng</span> <br />
                <span>nhập</span>
            </span>
        </div>
    );
}

export default LoginHeader;