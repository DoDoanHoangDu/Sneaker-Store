import "./Store.css"
import Header from "../components/Header/Header"
import ItemViewer from "../components/ItemViewer/ItemViewer"
function Store() {   
      return (
        <div className="store">
          <div className="store-content">
          <ItemViewer/>
          </div>
        </div>   
      )
}

export default Store;