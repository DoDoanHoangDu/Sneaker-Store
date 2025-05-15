import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import LoginHeader from "../LoginHeader/LoginHeader";
import CartHeader from "../CartHeader/CartHeader";
import { useAuth } from "../../../customHook/useAuth";
import { Link } from "react-router-dom";

function Header({ onLoginClick,onSearch }) {
    const source_logo = "/logo.png";
    const { isLoggedIn, username, userRole } = useAuth();

    return (
        <div className="header">            
        <Link className="brand-signature" to='/'>
            <img className="logo" src={source_logo} alt="ShoeVN"></img>
            <span className="brand-name">topShoe</span>
            </Link>
            <SearchBar onSearch = {onSearch}/>
            <CartHeader />            
            <LoginHeader 
                onLoginClick={onLoginClick} 
                isLoggedIn={isLoggedIn} 
                username={username}
                userRole={userRole}
            />
        </div>
    );
}

export default Header;