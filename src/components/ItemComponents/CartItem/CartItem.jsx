import "./CartItem.css"
import formatPrice from "../../../customHook/formatPrice"
import { useState } from "react";
function CartItem({item}) {
    const [quantity, setQuantity] = useState(1);
    const [tempQuantity, setTempQuantity] = useState("1");

    const increaseQuantity = () => {
        applyQuantityChange();
        setQuantity(prevQuantity => prevQuantity + 1);
        setTempQuantity((quantity + 1).toString());
    };

    const decreaseQuantity = () => {
        applyQuantityChange();
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
        setTempQuantity((quantity > 1 ? quantity - 1 : 1).toString());
    };

    const handleTempQuantityChange = (e) => {
        setTempQuantity(e.target.value);
    };

    const applyQuantityChange = () => {
        const parsedValue = parseInt(tempQuantity, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setQuantity(parsedValue);
        } else {
            setTempQuantity(quantity.toString());
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            applyQuantityChange();
            e.target.blur();
        }
    };
    return(
        <div className="cart-item-container">
            <div className="cart-item">
                <a href="/#" className="cart-item-left">
                    <img className="cart-item-image" src={item.image}></img>
                </a>
                <a className="cart-item-name">{item.name}</a> 
                <div className="cart-item-right">
                    <span className="cart-item-discounted-price">{formatPrice(item.discountedPrice)}₫</span>
                    <span className="cart-item-original-price">{formatPrice(item.originalPrice)}₫</span>
                    <br/>
                    <div className="item-quantity-container">
                        <button className="decrease-btn" onClick={decreaseQuantity}> - </button>
                        <input 
                            className="quantity-input" 
                            value={tempQuantity} 
                            onChange={handleTempQuantityChange} 
                            onBlur={applyQuantityChange} 
                            onKeyDown={handleKeyDown} />
                        <button className="increase-btn" onClick={increaseQuantity}> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem