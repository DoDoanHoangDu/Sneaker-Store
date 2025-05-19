import "./Store.css";
import ItemViewer from "../../components/ItemComponents/ItemViewer/ItemViewer";
import searchItem from "../../customHook/searchItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Store() {
  const { keyword } = useParams();
  const searchTerm = keyword || '';   
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const results = await searchItem(searchTerm);
      setItems(results);
      console.log(results);
    };
    fetchItems();
  }, [searchTerm]);

  return (
    <div className="store">
      {searchTerm !== "" ? (<div className="keyword-searched">Tìm kiếm theo từ khóa: "{searchTerm}"</div>) : (<></>)}
      
      <div className="store-content">
        <ItemViewer items={items} />
      </div>
    </div>
  );
}

export default Store;
