import "./LoginHeader.css"
import useWindowSize from "../../customHook/useWindowSize";
function LoginHeader() {
    const windowSize = useWindowSize();
    const source_login_logo = "/login.png"
    return(
        <div className="login-header">
            <img className={`login-logo ${windowSize < 1000? "login-logo-small" : "null"}`} src={source_login_logo} alt="Login"></img>
            <span>Đăng nhập</span>
        </div>
    );
};

export default LoginHeader;