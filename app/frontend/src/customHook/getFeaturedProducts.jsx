const getFeaturedProducts = async () => {
    try {
        const response = await fetch(`http://localhost:8000/product/featured_product`);
        if (!response.ok) {
            const error = new Error(`Failed to set featured product with ID ${id}`);
            error.status = response.status;
            throw error;
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Expected an array of featured products");
        }
        return data;
    } catch (error) {
        if (error && error.status === 404) {
            console.error(`Product ID not found: ${id}`);
            return null;
        }
        console.error("Error setting featured product:", error);
        return null;
    }
};

export default getFeaturedProducts;