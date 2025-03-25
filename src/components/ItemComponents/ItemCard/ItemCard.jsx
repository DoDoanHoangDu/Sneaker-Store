import "./ItemCard.css"
import formatPrice from "../../../customHook/formatPrice"
function ItemCard({item}) {
    return(
        <a href={item.link} className="card-container">
            <div className="card" href = {item.link}>
                <img className="card-image" src={item.image}></img>
                <span className="card-name">{item.name}</span> 
                <br></br>
                <span className="card-original-price">{formatPrice(item.originalPrice)}₫</span>
                <span className="card-discount">-{Math.round(100*(1 - item.discountedPrice/item.originalPrice))}%</span>
                <br></br>
                <span className="card-discounted-price">{formatPrice(item.discountedPrice)}₫</span>
                
            </div>
        </a>
    )
}
export default ItemCard