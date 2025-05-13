const getCategories = async () => {
    try {
        const response = await fetch("http://localhost:8000/product/subtable?limit=100000");
        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("Categories data:", data);
        console.log(Array.isArray(data));
        const categories = data.category.filter(item => !["nam", "nữ", "trẻ em", "người lớn"].includes(item));
        return categories;
    } catch (error) {
        console.error("Error fetching brands:", error);
        return [];
    }
}

export default getCategories;