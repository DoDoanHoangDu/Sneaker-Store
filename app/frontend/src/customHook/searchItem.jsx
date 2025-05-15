const searchItem = async (
    product_name = "",
    brand = "",
    price_min = 0,
    price_max = 999999999,
    discount_min = 0,
    category = [],
    promotion = [],
    size = [],
    exactly = false
) => {
    try {
        const params = new URLSearchParams();

        if (product_name) params.append("product_name", product_name);
        if (brand) params.append("brand", brand);
        if (price_min !== null) params.append("price_min", price_min.toString());
        if (price_max !== null) params.append("price_max", price_max.toString());
        if (discount_min !== null) params.append("discount_min", discount_min.toString());
        params.append("exactly", exactly.toString());

        category.forEach(c => params.append("category", c));
        promotion.forEach(p => params.append("promotion", p));
        size.forEach(s => params.append("size", s.toString()));

        const response = await fetch(`http://localhost:8000/product/search?${params.toString()}`);

        if (!response.ok) {
            throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching item:", error);
        alert("Error fetching item");
        return [];
    }
};

export default searchItem;
