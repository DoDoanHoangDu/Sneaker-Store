import "./LoginHeader.css"
function LoginHeader() {
    const source_login_logo = "/login.png"
    return(
        <div className="login-header">
            <img className={"login-logo"} src={source_login_logo} alt="Login"></img>
            <span className="login-block-text">
                <span>Đăng</span> <br/>
                <span>nhập</span>
            </span>
        </div>
    );
};

export default LoginHeader;