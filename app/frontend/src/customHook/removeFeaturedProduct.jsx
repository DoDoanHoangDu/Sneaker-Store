const removeFeaturedProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/product/featured_product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const error = new Error(`Failed to delete featured product with ID ${id}`);
            error.status = response.status;
            throw error;
        }
        return true;
    } catch (error) {
        if (error && error.status === 404) {
            console.error(`Product ID not found: ${id}`);
            return false;
        }
        console.error("Error deleting featured product:", error);
        return false;
    }
};

export default removeFeaturedProduct;