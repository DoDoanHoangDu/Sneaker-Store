import "./NavigationBar.css"
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="nav-bar">
        <Link className="nav-option" to="/">Home</Link>
        <Link className="nav-option" to="/store">Store</Link>
        <Link className="nav-option" to="/about">About</Link>
    </div>
        
  );
}

export default NavigationBar;
