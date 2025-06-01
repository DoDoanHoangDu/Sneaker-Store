const setFeaturedProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/product/featured_product?product_id=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const error = new Error(`Failed to set featured product with ID ${id}`);
            error.status = response.status;
            throw error;
        }
        console.log(response)
        return true;
    } catch (error) {
        if (error && error.status === 404) {
            console.error(`Product ID not found: ${id}`);
            return false;
        }
        console.error("Error setting featured product:", error);
        return false;
    }
};

export default setFeaturedProduct;