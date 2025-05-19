import "./CartItem.css";
import formatPrice from "../../../customHook/formatPrice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartItem({ item, quantity,size, onQuantityChange, onRemove }) {
    const [tempQuantity, setTempQuantity] = useState(quantity.toString());

    useEffect(() => {
        setTempQuantity(quantity.toString());
    }, [quantity]);

    const increaseQuantity = () => {
        const newQty = quantity + 1;
        setTempQuantity(newQty.toString());
        onQuantityChange(newQty);
    };

    const decreaseQuantity = () => {
        const newQty = quantity > 1 ? quantity - 1 : 1;
        setTempQuantity(newQty.toString());
        onQuantityChange(newQty);
    };

    const handleTempQuantityChange = (e) => {
        setTempQuantity(e.target.value);
    };

    const applyQuantityChange = () => {
        const parsedValue = parseInt(tempQuantity, 10);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            onQuantityChange(parsedValue);
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

    const removeItem = () => {
        onRemove();
    }

    return (
        <div className="cart-item-container">
            <div className="cart-item">
                <Link to={`/product/${item.product_id}`} className="cart-item-left">
                    <img className="cart-item-image" src={item.img_url} alt={item.product_name} />
                </Link>
                <Link to={`/product/${item.product_id}`} className="cart-item-name">
                    {item.product_name + (size ? ` (size ${size})` : "")}
                </Link>
                <div className="cart-item-right">
                    <span className="cart-item-discounted-price">
                        {formatPrice(Math.round(item.price * (1 - item.discount) / 1000) * 1000)}₫
                    </span>
                    <span className="cart-item-original-price">{formatPrice(item.price)}₫</span>
                    <br />
                    <div className="item-quantity-container">
                        <button className="decrease-btn" onClick={decreaseQuantity}> - </button>
                        <input
                            className="quantity-input"
                            value={tempQuantity}
                            onChange={handleTempQuantityChange}
                            onBlur={applyQuantityChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button className="increase-btn" onClick={increaseQuantity}> + </button>
                    </div>
                    <button className="remove-from-cart-btn" onClick={removeItem}>Xóa</button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
