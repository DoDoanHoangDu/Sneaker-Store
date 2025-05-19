import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div className="search-bar">
      <img src="/search-icon.png" className="search-icon" onClick={() => onSearch(query)}/>
      <input
        type="search"
        className="search-input"
        placeholder="Tìm sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(query);
        }}
      />
    </div>
  );
}

export default SearchBar;
