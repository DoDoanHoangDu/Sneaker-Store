import "./Store.css"
import ItemViewer from "../../components/ItemComponents/ItemViewer/ItemViewer";
import Footer from "../../components/Footer/Footer";
function Store() {   
      return (
        <div className="store">
          <div className="store-content">
          <ItemViewer/>
          </div>
          <Footer/>
        </div>
        
        
      )
}

export default Store;