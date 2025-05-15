import "./NavigationBar.css"
import searchItem from "../../../customHook/searchItem";
import { Link } from "react-router-dom";

function NavigationBar({onSearch}) {
  const handleSearch = async () => {
    const results = await searchItem("");
    onSearch(results);
  }
  return (
    <div className="nav-bar">
        <Link className="nav-option" to="/">Home</Link>
        <Link className="nav-option" onClick={handleSearch} to="/store">Store</Link>
        <Link className="nav-option" to="/about">About</Link>
    </div>
        
  );
}

export default NavigationBar;
