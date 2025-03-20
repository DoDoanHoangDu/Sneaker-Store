import Dropdown from "../../DropdownComponents/Dropdown/Dropdown";
import ItemCard from "../ItemCard/ItemCard";
import DropdownItem from "../../DropdownComponents/DropdownItem/DropdownItem";
import useWindowSize from "../../../customHook/useWindowSize";
import "./ItemViewer.css"
function ItemViewer() {
    const source = "/shoe.jpg"
    const categories = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(c => "Categories " + c)
    const item1 = {
        image : source,
        name : "One two three four five six seven eight nine ten",
        originalPrice : 200000,
        discountedPrice: 100000,
        link: "#"
      }
      const item2 = {
        image : source,
        name : "Shoe 2",
        originalPrice : 400000,
        discountedPrice: 300000,
        link: "#"
      }

      const item3 = {
        image : source,
        name : "Shoe Shi",
        originalPrice : 100000,
        discountedPrice: 100000,
        link: "#"
      }

    const windowSize = useWindowSize()
    return (
        <div className={`item-viewer ${windowSize < 1000? "item-viewer-small" : "null"}`}>
          <div className="dropdown-container">
            <Dropdown buttonText = "Filter 1" 
            content = {<>
              {categories.map(c => <DropdownItem key = {c} content = {c}/>)}
            </>}/>

            <Dropdown buttonText = "Filter 2" 
            content = {<>
              {categories.map(c => <DropdownItem key = {c} content = {c}/>)}
            </>}/>
          </div>
          <div className={`product-container ${windowSize < 1000? "product-container-small" : "null"}`}>
              <ItemCard item = {item1}/>
              <ItemCard item = {item2}/>
              <ItemCard item = {item3}/>
              <ItemCard item = {item1}/>
              <ItemCard item = {item2}/>
              <ItemCard item = {item3}/>
              <ItemCard item = {item1}/>
              <ItemCard item = {item2}/>
              <ItemCard item = {item3}/>
              <ItemCard item = {item1}/>
              <ItemCard item = {item2}/>
              <ItemCard item = {item3}/>
              <ItemCard item = {item1}/>
              <ItemCard item = {item2}/>
              <ItemCard item = {item3}/>
          </div>
        </div>
    )
};
export default ItemViewer;