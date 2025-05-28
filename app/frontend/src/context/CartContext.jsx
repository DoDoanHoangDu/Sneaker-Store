import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product_id, size) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                i => i.product_id === product_id && i.size === size
            );

            if (existingItem) {
                return prevItems.map(i =>
                    i.product_id === product_id && i.size === size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prevItems, { product_id, size, quantity:1 }];
        });
    };

    const removeFromCart = (product_id, size) => {
        setCartItems(prevItems =>
            prevItems.filter(i => i.product_id !== product_id || i.size !== size)
        );
    };

    const updateQuantity = (product_id, size, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(i =>
                i.product_id === product_id && i.size === size
                    ? { ...i, quantity }
                    : i
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity,clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
