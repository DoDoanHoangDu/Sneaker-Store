import "./CartViewer.css";
import CartItem from "../CartItem/CartItem";
import useWindowSize from "../../../customHook/useWindowSize";
import getItemById from "../../../customHook/getItemById";
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import formatPrice from "../../../customHook/formatPrice";

function CartViewer({confirmation = false}) {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [detailedItems, setDetailedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
    const fetchItems = async () => {
        const results = await Promise.all(cartItems.map(i => getItemById(i.product_id)));

        const mergedItems = [];

        results.forEach((item, index) => {
            if (item) {
                mergedItems.push({
                ...item,
                quantity: cartItems[index].quantity,
                size: cartItems[index].size,
                product_id: cartItems[index].product_id
                });
            } else {
                const invalidItem = cartItems[index];
                removeFromCart(invalidItem.product_id, invalidItem.size);
            }
            });

            setDetailedItems(mergedItems);
        };
        fetchItems();
    }, [cartItems]);



    useEffect(() => {
        const total = detailedItems.reduce((sum, item) => {
            const discounted = Math.round(item.price * (1 - item.discount) / 1000) * 1000;
            return sum + discounted * item.quantity;
        }, 0);
        setTotalPrice(total);
    }, [detailedItems]);


    const handleDelete = (id,size) => {
        removeFromCart(id, size);
    }

    const createOrder = () => {
        console.log(cartItems);
        if (cartItems.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }
        navigate('/order-confirmation', { state: { fromTrigger: true } });
    }

    const windowSize = useWindowSize();

    return (
        <div className={`cart-viewer ${windowSize < 1000 ? "cart-viewer-small" : ""}`}>
            {detailedItems.length > 0 ? (
                <div className="cart-has-item">
                    {detailedItems.map((item) => (
                        <CartItem
                            key={item.product_id + item.size}
                            item={item}
                            quantity={item.quantity}
                            size={item.size}
                            onQuantityChange={(newQty) => {
                                updateQuantity(item.product_id, item.size, newQty);
                            }}
                            onRemove={() => {
                                handleDelete(item.product_id, item.size);
                            }}
                            confirmation={confirmation}
                        />

                    ))}
                    <div className="total-price">
                        <div className="total-price-label">Tổng tiền:</div>
                        <div className="total-price-number">{formatPrice(totalPrice)}₫</div>
                    </div>
                    
                    <div className={`order-button ${confirmation ? "confirmation" : ""}`} onClick={createOrder}>ĐẶT HÀNG</div>
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
