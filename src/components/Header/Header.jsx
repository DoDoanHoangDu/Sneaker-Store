import "./Header.css"
import useWindowSize from "../../customHook/useWindowSize";
import SearchBar from "../SearchBar/SearchBar";
import LoginHeader from "../LoginHeader/LoginHeader";
import CartHeader from "../CartHeader/CartHeader";
function Header() {
    const source_logo = "/logo.png"
    const windowSize = useWindowSize()
    return (
        <div className="header">
            
            <img className={`logo ${windowSize < 1000? "logo-small" : "null"}`} src={source_logo} alt="ShoeVN"></img>
            <div className="brand-name">topShoe</div>
            <SearchBar/>
            <CartHeader/>
            <LoginHeader/>            
        </div>
    );
};

export default Header