const deleteItem = async (productId) => {
    try {
        const response = await fetch(`http://localhost:8000/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            const error = new Error(`Failed to delete product ${productId}`);
            error.status = response.status;
            throw error;
        }
        alert(`Product with ID ${productId} has been deleted successfully.`);
        return true;
    } catch (error) {
        if (error && error.status === 404) {
            console.error(`Item ID not found: ${productId}`);
            return false;
        }
        console.error("Error deleting item:", error);
        return false;
    }
};

export default deleteItem;