import "./SearchBar.css"
function SearchBar() {
    return (
        <div className="search-bar">
            <img src="/search-icon.png" className="search-icon"></img>
            <input type="search" className="search-input" placeholder="Tìm sản phẩm"></input>
        </div>
    );
};

export default SearchBar