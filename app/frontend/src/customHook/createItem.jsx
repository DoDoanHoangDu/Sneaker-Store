const createItem = async (formData, resetCreator) => {
  const imageData = new FormData();
  imageData.append("image", formData.image);

  try {
    const res = await fetch("http://localhost:8000/upload-image", {
      method: "POST",
      body: imageData,
    });
    if (!res.ok) throw new Error("Upload failed");

    const data = await res.json();
    alert("Upload ảnh thành công!");

    const payload = { ...formData };
    delete payload.image;
    payload.img_url = data.img_url;

    console.log("Payload:", payload);
    const productRes = await fetch("http://localhost:8000/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!productRes.ok) throw new Error("Product creation failed");

    alert("Tạo sản phẩm thành công!");
    resetCreator();
  } catch (err) {
    console.error("Error:", err);
    alert("Đã xảy ra lỗi. Vui lòng thử lại.");
  }
};

export default createItem;