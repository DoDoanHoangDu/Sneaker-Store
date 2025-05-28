const createOrder = async (userOrderData,cartItems) => {
    console.log("Creating order with data:", userOrderData, cartItems);
    const orderData = {};
    try {
        /*
        const res = await fetch("http://localhost:8000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error("Order creation failed");

        const data = await res.json();
        return data;
        */
       return 1;
    } catch (err) {
        console.error("Error:", err);
        alert("An error occurred while creating the order. Please try again.");
    }
}

export default createOrder;