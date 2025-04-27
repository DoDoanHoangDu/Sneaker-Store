import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import LoginHeader from "../LoginHeader/LoginHeader";
import CartHeader from "../CartHeader/CartHeader";

function Header({ onLoginClick }) {
    const source_logo = "/logo.png";

    return (
        <div className="header">
            <a className="brand-signature" href='/'>
                <img className="logo" src={source_logo} alt="ShoeVN"></img>
                <span className="brand-name">topShoe</span>
            </a>
            <SearchBar />
            <CartHeader />
            <LoginHeader onLoginClick={onLoginClick} />
        </div>
    );
}

export default Header;