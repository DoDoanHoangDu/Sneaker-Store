import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";

const Login = ({ onRegisterClick }) => {
    console.log("Login component rendered");

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
        <div className="container">
            <h1 className="title">LOGIN</h1>
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
                        placeholder="Password"
                        className="password"
                        required
                    />
                </div>
                <button className="loginbutton">Login</button>
            </form>
            <div className="forgotpassword"><a href="">Forgot Password?</a></div>
            <div className="registerredirect">
                <p>Don't have an account yet?</p>
                <button className="register" onClick={onRegisterClick}>Register</button>
            </div>
        </div>
    );
};

export default Login;