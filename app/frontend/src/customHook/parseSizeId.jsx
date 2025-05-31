const parseSizeId = async (sizeId) => {
    try {
        const response = await fetch(`http://localhost:8000/product/size?size_id=${sizeId}`);
        if (!response.ok) {
            const error = new Error(`Failed to fetch size ${sizeId}`);
            error.status = response.status;
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        if (error && error.status === 404) {
            alert(`Item ID not found: ${sizeId}`);
            return null;
        }
        console.error("Error fetching item:", error);
        return null;
    }
}

export default parseSizeId;