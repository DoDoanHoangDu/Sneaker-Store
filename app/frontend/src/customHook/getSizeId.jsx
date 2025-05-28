const getSizeId = async (productId,size) => {
    try {
        const res = await fetch(`http://127.0.0.1:8000/product/size_id?product_id=${productId}&size=${size}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Get size ID failed");
        const data = await res.json();
        return data.size_id
    } catch (err) {
        console.error("Error getting size ID:", err);
        return null;
    }

}

export default getSizeId;