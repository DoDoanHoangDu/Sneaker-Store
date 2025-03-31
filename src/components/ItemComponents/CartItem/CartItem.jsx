import "./CartItem.css"
import formatPrice from "../../../customHook/formatPrice"
function CartItem({item}) {
    return(
        <div className="cart-item-container">
            <div className="cart-item">
                <a href="/#" className="cart-item-left">
                    <img className="cart-item-image" src={item.image}></img>
                </a>
                <div className="cart-item-right">
                    <a className="cart-item-name">{item.name}</a> 
                    <span className="cart-item-original-price">{formatPrice(item.originalPrice)}₫</span>
                    <span className="cart-item-discount">-{Math.round(100*(1 - item.discountedPrice/item.originalPrice))}%</span>
                    <span className="cart-item-discounted-price">{formatPrice(item.discountedPrice)}₫</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem