import "./CartViewer.css";
import CartItem from "../CartItem/CartItem";
import useWindowSize from "../../../customHook/useWindowSize";
import getItemById from "../../../customHook/getItemById";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import formatPrice from "../../../customHook/formatPrice";

function CartViewer() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [detailedItems, setDetailedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const fetchItems = async () => {
            const items = await Promise.all(cartItems.map(i => getItemById(i.product_id)));
            setDetailedItems(items);
        };
        fetchItems();
    }, [cartItems]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            return detailedItems.reduce((total, item, index) => {
                const discountedPrice = Math.round(item.price * (1 - item.discount) / 1000) * 1000;
                return total + discountedPrice * cartItems[index].quantity;
            }, 0);
        };
        const calculatedPrice = calculateTotalPrice();
        setTotalPrice(calculatedPrice);
    }, [detailedItems]);

    const handleDelete = (id,size) => {
        const tempItems = [];
        for (let i =0; i < detailedItems.length; i++) {
            if (cartItems[i].product_id == id && cartItems[i].size == size) {
                continue;
            }
            tempItems.push(detailedItems[i]);
        }
        setDetailedItems(tempItems);
        removeFromCart(id, size);
    }

    const createOrder = () => {
        console.log(cartItems);
    }

    const windowSize = useWindowSize();

    return (
        <div className={`cart-viewer ${windowSize < 1000 ? "cart-viewer-small" : ""}`}>
            {detailedItems.length > 0 ? (
                <div className="cart-has-item">
                    {detailedItems.map((item, index) => (
                        <CartItem
                            key={item.product_id + cartItems[index].size}
                            item={item}
                            quantity={cartItems[index].quantity}
                            size={cartItems[index].size}
                            onQuantityChange={(newQty) => {
                                updateQuantity(cartItems[index].product_id, cartItems[index].size, newQty);
                            }}
                            onRemove={() => {
                                handleDelete(cartItems[index].product_id, cartItems[index].size);
                            }}
                        />

                    ))}
                    <div className="total-price">
                        <div className="total-price-label">Tổng tiền:</div>
                        <div className="total-price-number">{formatPrice(totalPrice)}₫</div>
                    </div>
                    
                    <div className="order-button" onClick={createOrder}>ĐẶT HÀNG</div>
                </div>
            ) : (
                <div className="cart-empty">
                <div className="cart-empty-label">Giỏ hàng trống</div>
                <Link className="cart-empty-link" to = "/store">Quay về cửa hàng</Link>
                </div>
                
            )}
        </div>
    );
}

export default CartViewer;
