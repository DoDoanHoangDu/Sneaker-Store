import { useState } from "react";
import searchItem from "../../../customHook/searchItem";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const results = await searchItem(query);
    onSearch(results);
  };

  return (
    <div className="search-bar">
      <img src="/search-icon.png" className="search-icon" />
      <input
        type="search"
        className="search-input"
        placeholder="Tìm sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
}

export default SearchBar;
