const updateItem = async (productId,formData) => {
    delete formData.product_id
    delete formData.image
    console.log("Updating item:", formData);
    try {
        
        const response = await fetch(`http://localhost:8000/product/update/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const error = new Error("Failed to update item");
            error.status = response.status;
            throw error
        }
        alert("Item updated successfully");
        return true;
    } catch (error) {
        console.error("Error updating item:", error);
        if (error.status === 404) {
            alert(`Item not found: ${productId}`);
        }
        else alert("Error updating item");
        return false;
    }
}

export default updateItem;