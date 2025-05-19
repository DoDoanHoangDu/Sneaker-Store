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
    const [selectedSort, setSelectedSort] = useState('mặc định');
    
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

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedAges, setSelectedAges] = useState([]);

    useEffect(() => {
      setSelectedCategories([]);
      setSelectedBrands([]);
      setSelectedGenders([]);
      setSelectedAges([]);
    }, [items]);

    const toggleSelection = (value, setFunction, currentState) => {
      if (currentState.includes(value)) {
        setFunction(currentState.filter(v => v !== value));
      } else {
        setFunction([...currentState, value]);
      }
    };

    useEffect(() => {
      let filtered = items.slice();
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(item => selectedCategories.every(cat => item.category.includes(cat)));
      }
      if (selectedBrands.length > 0) {
        filtered = filtered.filter(item => selectedBrands.some(brand => item.brand.includes(brand)));
      }
      if (selectedGenders.length > 0) {
        filtered = filtered.filter(item => selectedGenders.every(gender => item.category.includes(gender)));
      }
      if (selectedAges.length > 0) {
        filtered = filtered.filter(item => selectedAges.every(age => item.category.includes(age)));
      }

      switch (selectedSort) {
        case 'giá thấp đến cao':
          filtered.sort((a, b) => a.price*(1-a.discount) - b.price*(1-b.discount));
          break;
        case 'giá cao đến thấp':
          filtered.sort((a, b) => b.price*(1-b.discount) - a.price*(1-a.discount));
          break;
        case 'giảm giá ít':
          filtered.sort((a, b) => a.discount - b.discount);
          break;
        case 'giảm giá lớn':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        default:
          break;
      }

      setItems(filtered);
    }, [selectedCategories, selectedBrands, selectedGenders, selectedAges,selectedSort, items]);


    const windowSize = useWindowSize();
    return (
        <div className={`item-viewer ${windowSize < 1000? "item-viewer-small" : "null"}`}>
          <div className="dropdown-container">
            <Dropdown buttonText = "Loại sản phẩm" 
            content = {<>
              {categories.map(c => <DropdownItem checkbox={true} checked={selectedCategories.includes(c)} key = {c} content = {c} onClick={() => toggleSelection(c, setSelectedCategories, selectedCategories)}/>)}
            </>}/>

            <Dropdown buttonText = "Thương hiệu" 
            content = {<>
              {brands.map(c => <DropdownItem checkbox={true} checked={selectedBrands.includes(c)} key = {c} content = {c} onClick={() => toggleSelection(c, setSelectedBrands, selectedBrands)}/>)}
            </>}/>

            <Dropdown buttonText = "Giới tính" 
            content = {<>
              {['nam', 'nữ'].map(c => <DropdownItem checkbox={true} checked={selectedGenders.includes(c)} key = {c} content = {c} onClick={() => toggleSelection(c, setSelectedGenders, selectedGenders)}/>)}
            </>}/>

            <Dropdown buttonText = "Độ tuổi" 
            content = {<>
              {['trẻ em', 'người lớn'].map(c => <DropdownItem checkbox={true} checked={selectedAges.includes(c)} key = {c} content = {c} onClick={() => toggleSelection(c, setSelectedAges, selectedAges)}/>)}
            </>}/>

            <Dropdown buttonText = "Sắp xếp theo" 
            content = {<>
              {['giá thấp đến cao', 'giá cao đến thấp', 'giảm giá ít', 'giảm giá lớn', 'mặc định'].map(c => <DropdownItem key = {c} content = {c} onClick={() => setSelectedSort(c)}/>)}
            </>}/>

            <button className="reset-button" onClick={() => {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setSelectedGenders([]);
                setSelectedAges([]);
                setSelectedSort('mặc định');
            }}>Đặt lại</button>

          </div>
          

          {currentItems && currentItems.length > 0 ? (
            <>
            <div className="product-showing-count">{currentItems.length} sản phẩm</div>
            <div className={`product-container ${windowSize < 1000 ? "product-container-small" : ""}`}>
              {currentItems.map(item => (
                <ItemCard key={item.product_id} item={item} />
              ))}
            </div>
            </>
            
          ) : (
            <p>Không có sản phẩm nào để hiển thị.</p>
      )}
        </div>
    )
};
export default ItemViewer;