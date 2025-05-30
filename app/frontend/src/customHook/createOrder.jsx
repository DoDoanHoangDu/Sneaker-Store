import getSizeId from "./getSizeId";
const createOrder = async (userOrderData,cartItems,totalPrice) => {
    console.log("Creating order with data:", userOrderData, cartItems);
    const orderData = {
        ...userOrderData,
        total_price: totalPrice,
        items: []
    };
    try {
        orderData.items = await Promise.all(
            cartItems.map(async (item) => {
                const sizeId = await getSizeId(item.product_id, item.size);
                if (sizeId) {
                    return {
                        size_id: sizeId,
                        quantity: item.quantity,
                        product_price: item.product_price
                    };
                } else {
                    console.error(`Failed to get size ID for product ${item.product_id} and size ${item.size}`);
                    return null;
                }
            })
        );
        orderData.items = orderData.items.filter(Boolean);
        console.log("Order data prepared:", orderData);
        const res = await fetch("http://localhost:8000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error("Order creation failed");

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error:", err);
        alert("An error occurred while creating the order. Please try again.");
    }
}

export default createOrder;