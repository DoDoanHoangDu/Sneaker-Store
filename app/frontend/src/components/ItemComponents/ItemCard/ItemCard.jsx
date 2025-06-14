import "./ItemCard.css"
import formatPrice from "../../../customHook/formatPrice"
import {Link} from "react-router-dom"
function ItemCard({item}) {
    return(
        <Link to={`/product/${item.product_id}`} key={item.product_id}>
            <div className="card-container">
                <div className="card">
                    <div className="card-image-container">
                        <img className="card-image" src={item.img_url}></img>
                    </div>
                    <div className="card-name">{item.product_name}</div> 
                    <div className="card-price-container">
                        <span className="card-original-price">{formatPrice(item.price)}₫</span>
                        <span className="card-discount">-{Math.round(item.discount * 100)}%</span>
                        <div className="card-discounted-price">{formatPrice(Math.round((item.price * (1-item.discount))/1000)*1000)}₫</div>
                    </div>   
                </div>
            </div>
        </Link>
    )
}
export default ItemCard