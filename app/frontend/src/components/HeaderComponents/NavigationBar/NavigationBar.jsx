import "./NavigationBar.css"
import { Link } from "react-router-dom";

function NavigationBar({onSearch}) {
  return (
    <div className="nav-bar">
        <Link className="nav-option" to="/">Home</Link>
        <Link className="nav-option" onClick={() => onSearch("")} to="/store">Store</Link>
        <Link className="nav-option" to="/account">Account</Link>
    </div>
        
  );
}

export default NavigationBar;
