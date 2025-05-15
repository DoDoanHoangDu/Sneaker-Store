const getItemById = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8000/product/id/${productId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        delete data.start_date;
        delete data.end_date;
        return data;
    } catch (error) {
        console.error("Error fetching item:", error);
        return null;
    }
}

export default getItemById;