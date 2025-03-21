import email_icon from "/email_icon.png";
import lock from "/lock_icon.png";

const Register = ({ onLoginClick }) => {
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
            <h1 className="title">Register</h1>
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
                <div className="inputcontainer">
                    <img src={lock} alt="Lock Icon" />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="password"
                        required
                    />
                </div>
                <button className="signup">Sign Up</button>
            </form>
            <div className="loginredirect">
                <p>Already have an account?</p>
                <button className="login" onClick={onLoginClick}>Login</button>
            </div>
        </div>
    );
};

export default Register;