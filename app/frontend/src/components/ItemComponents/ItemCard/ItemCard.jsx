import "./ItemCard.css"
import formatPrice from "../../../customHook/formatPrice"
function ItemCard({item}) {
    return(
        <a href={item.link} className="card-container">
            <div className="card" href = {item.link}>
                <img className="card-image" src={item.img_url}></img>
                <span className="card-name">{item.product_name}</span> 
                <br></br>
                <span className="card-original-price">{formatPrice(item.price)}₫</span>
                <span className="card-discount">-{Math.round(item.discount * 100)}%</span>
                <br></br>
                <span className="card-discounted-price">{formatPrice(Math.round((item.price * (1-item.discount))/1000)*1000)}₫</span>
                
            </div>
        </a>
    )
}
export default ItemCard