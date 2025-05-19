import "./CartViewer.css";
import CartItem from "../CartItem/CartItem";
import useWindowSize from "../../../customHook/useWindowSize";
import getItemById from "../../../customHook/getItemById";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartViewer({ cart, setCart, resetCart }) {
    const [cartItems, setCartItems] = useState([]);
    const [itemQuantity, setItemQuantity] = useState([]);
    const [itemSize, setItemSize] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            const tempItems = await Promise.all(cart.items.map(id => getItemById(id)));
            const tempQuantities = [...cart.quantities];
            const tempSizes = [...cart.sizes];
            setCartItems(tempItems);
            setItemQuantity(tempQuantities);
            setItemSize(tempSizes);
        };

        fetchItems();
        console.log(cartItems);
    }, [cart]);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item, index) => {
            const discountedPrice = Math.round(item.price * (1 - item.discount) / 1000) * 1000;
            return total + discountedPrice * itemQuantity[index];
        }, 0);
    };

    const windowSize = useWindowSize();

    return (
        <div className={`cart-viewer ${windowSize < 1000 ? "cart-viewer-small" : ""}`}>
            {cartItems.length > 0 ? (
                <div className="cart-has-item">
                    {cartItems.map((item, index) => (
                        <CartItem
                            key={item.product_id}
                            item={item}
                            quantity={itemQuantity[index]}
                            size = {itemSize[index]}
                            onQuantityChange={(newQty) => {
                                const updatedQuantities = [...itemQuantity];
                                updatedQuantities[index] = newQty;
                                setItemQuantity(updatedQuantities);

                                const updatedCart = { ...cart };
                                updatedCart.quantities = updatedQuantities;
                                setCart(updatedCart);
                            }}
                            onRemove={() => {
                                const updatedItems = [...cart.items];
                                const updatedQuantities = [...cart.quantities];
                                updatedItems.splice(index, 1);
                                updatedQuantities.splice(index, 1);

                                const updatedCart = {
                                    ...cart,
                                    items: updatedItems,
                                    quantities: updatedQuantities,
                                };

                                setCart(updatedCart);
                            }}
                        />
                    ))}
                    <div className="total-price">
                        <div className="total-price-label">Tổng tiền:</div>
                        <div className="total-price-number">{calculateTotalPrice().toLocaleString()}₫</div>
                    </div>
                    
                    <div className="order-button">ĐẶT HÀNG</div>
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
