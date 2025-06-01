const getItemById = async (productId) => {
    try {
        console.log("Fetch by Id")
        const response = await fetch(`http://localhost:8000/product/id/${productId}`);
        if (!response.ok) {
            const error = new Error(`Failed to fetch product ${productId}`);
            error.status = response.status;
            throw error;
        }
        const data = await response.json();
        delete data.start_date;
        delete data.end_date;
        return data;
    } catch (error) {
        if (error && error.status === 404) {
            console.error(`Item ID not found: ${productId}`);
            return null;
        }
        console.error("Error fetching item:", error);
        return null;
    }
}

export default getItemById;