const getOrderHistory = async (access_token) => {
    try {
        const response = await fetch("http://localhost:8000/order/all", {
            method: "GET",
            headers: {'Authorization': `Bearer ${access_token}`}
        });
        if (!response.ok) {
            throw new Error("Failed to fetch order history");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching order history:", error);
        return null;
    }
}

export default getOrderHistory;