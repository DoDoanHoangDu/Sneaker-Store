const getBrands = async () => {
    try {
        const response = await fetch("http://localhost:8000/product/all_brand?limit=100000");
        if (!response.ok) {
            throw new Error("Failed to fetch brands");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
}

export default getBrands;