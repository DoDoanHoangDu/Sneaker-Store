const updateItem = async (productId,formData) => {
    try {
        
        const response = await fetch(`http://localhost:8000/product/update/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                formData
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to update item");
        }
        return true;
    } catch (error) {
        console.error("Error updating item:", error);
        alert("Error updating item:", error);
        return false;
    }
}

export default updateItem;