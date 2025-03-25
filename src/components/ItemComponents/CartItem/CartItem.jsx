import "./CartItem.css"
import formatPrice from "../../../customHook/formatPrice"
function CartItem({item}) {
    return(
        <a className="cart-item-container">
            <div className="cart-item">
                <img src={item.image}></img>
                <span className="cart-item-name">{item.name}</span> 
                <span className="cart-item-original-price">{formatPrice(item.originalPrice)}₫</span>
                <span className="cart-item-discount">-{Math.round(100*(1 - item.discountedPrice/item.originalPrice))}%</span>
                <span className="cart-item-discounted-price">{formatPrice(item.discountedPrice)}₫</span>
            </div>
        </a>
    )
}

export default CartItem