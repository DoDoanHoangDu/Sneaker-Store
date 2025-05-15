import "./Store.css"
import ItemViewer from "../../components/ItemComponents/ItemViewer/ItemViewer";
function Store({items}) {   
      return (
        <div className="store">
          <div className="store-content">
          <ItemViewer items = {items}/>
          </div>
        </div>
        
        
      )
}

export default Store;