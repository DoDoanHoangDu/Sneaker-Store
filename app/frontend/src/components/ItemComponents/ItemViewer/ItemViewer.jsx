import Dropdown from "../../DropdownComponents/Dropdown/Dropdown";
import ItemCard from "../ItemCard/ItemCard";
import DropdownItem from "../../DropdownComponents/DropdownItem/DropdownItem";
import useWindowSize from "../../../customHook/useWindowSize";
import getBrands from "../../../customHook/getBrands";
import getCategories from "../../../customHook/getCategories";
import { useEffect, useState } from "react";
import "./ItemViewer.css"

function ItemViewer({items}) {
    const [currentItems, setItems] = useState(items);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
      setItems(items);
    }, [items]);

    useEffect(() => {
      const fetchCategories = async () => {
        const data = await getCategories({ short: true });
        data.sort();
        setCategories(data);
      };

      const fetchBrands = async () => {
        const data = await getBrands();
        data.sort();
        setBrands(data);
      };

      fetchCategories();
      fetchBrands();
      console.log(items)
    }, []);


    const windowSize = useWindowSize();
    return (
        <div className={`item-viewer ${windowSize < 1000? "item-viewer-small" : "null"}`}>
          <div className="dropdown-container">
            <Dropdown buttonText = "Loại sản phẩm" 
            content = {<>
              {categories.map(c => <DropdownItem checkbox={true} key = {c} content = {c}/>)}
            </>}/>

            <Dropdown buttonText = "Thương hiệu" 
            content = {<>
              {brands.map(c => <DropdownItem key = {c} content = {c}/>)}
            </>}/>

            <Dropdown buttonText = "Giới tính" 
            content = {<>
              {['nam', 'nữ'].map(c => <DropdownItem checkbox={true} key = {c} content = {c}/>)}
            </>}/>

            <Dropdown buttonText = "Độ tuổi" 
            content = {<>
              {['trẻ em', 'người lớn'].map(c => <DropdownItem checkbox={true} key = {c} content = {c}/>)}
            </>}/>

          </div>
          {currentItems && currentItems.length > 0 ? (
            <div className={`product-container ${windowSize < 1000 ? "product-container-small" : ""}`}>
              {currentItems.map(item => (
                <ItemCard key={item.product_id} item={item} />
              ))}
            </div>
          ) : (
            <p>Không có sản phẩm nào để hiển thị.</p>
      )}
        </div>
    )
};
export default ItemViewer;