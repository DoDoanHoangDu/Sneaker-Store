import { useState } from "react";

function ItemCreator() {
    const [formData, setFormData] = useState({
        img_url: "",
        image: "",
        product_name: "",
        brand: "brand1",
        description: "",
        discount:0,
        price: 0,
        remaining: 0,
        category: ["category1"],
        promotion: ["promotion1"],
        size:[0]
,   });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "file" ? e.target.files[0] : value
        }));
    };

    const createItem = async () => {
        const input = document.getElementById('input-image');
        const file = input.files[0];
        console.log(file);
        const imageData = new FormData();
        imageData.append("image", file);
        try {
            const response = await fetch('http://localhost:8000/upload-image', {method: 'POST',body: imageData});
            console.log("Response:", response);
            if (!response.ok) {
                throw new Error("Upload failed");
            }
            delete formData.image;
            const data = await response.json();
            formData.img_url = data.img_url;
            console.log(formData);
            alert("Upload ảnh thành công!");
            ///resetCreator();
        } 
        catch (error) {
            console.error("Error uploading image:", error); 
        }

        try {
            const response = fetch("http://localhost:8000/product", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("Response:", response);
        }
        catch (error) {
            console.error("Error creating item:", error);
        }
        alert("Tạo sản phẩm thành công!");
        resetCreator();
    }

  const resetCreator = () => {
    setFormData({
        img_url: "",
        image: "",
        product_name: "",
        brand: "brand1",
        description: "",
        discount: 0,
        price: 0,
        remaining: 0,
        category: ["category1"],
        promotion: ["promotion1"],
        size:[]
    });
  };

  return (
    <div className="item-creator-container">
      <h1 className="item-creator-title">Nhập sản phẩm mới</h1>

      <label className="item-creator-label">Hình ảnh sản phẩm:</label>
      <input id="input-image" type="file" name="image" className="item-creator-input" accept="image/*" onChange={handleChange} />
      {formData.image && (<img src={URL.createObjectURL(formData.image)} alt="Preview" className="item-creator-preview" />)}
      <br/>

      <label className="item-creator-label">Tên sản phẩm:</label>
      <input type="text" name="product_name" className="item-creator-input" placeholder="Nhập tên sản phẩm" value={formData.name} onChange={handleChange} />
      <br/>

      <label className="item-creator-label">Thương hiệu:</label>
      <select name="brand" className="item-creator-select" value={formData.brand} onChange={handleChange}>
        <option value="brand1">Thương hiệu 1</option>
        <option value="brand2">Thương hiệu 2</option>
        <option value="brand3">Thương hiệu 3</option>
      </select>
      <br/>

      <label className="item-creator-label">Mô tả sản phẩm:</label>
      <textarea name="description" className="item-creator-textarea" placeholder="Nhập mô tả sản phẩm" value={formData.description} onChange={handleChange}></textarea>
      <br/>

      <label className="item-creator-label">Giá sản phẩm:</label>
      <input type="number" name="price" className="item-creator-input" placeholder="Nhập giá sản phẩm" value={formData.price} onChange={handleChange} />
      <br/>

      <label className="item-creator-label">Giảm giá (%):</label>
      <input type="number" name="discount" className="item-creator-input" placeholder="Nhập % giảm giá" value={formData.discount} onChange={handleChange} />
      <br/>

      <label className="item-creator-label">Số lượng:</label>
      <input type="number" name="remaining" className="item-creator-input" placeholder="Nhập số lượng" value={formData.remaining} onChange={handleChange} />
      <br/>

      <label className="item-creator-label">Loại sản phẩm:</label>
      <select name="category" className="item-creator-select" value={formData.category} onChange={handleChange}>
        <option value="category1">Loại 1</option>
        <option value="category2">Loại 2</option>
        <option value="category3">Loại 3</option>
      </select>
      <br/>

      <label className="item-creator-label">Ưu đãi:</label>
      <input type="text" name="promotion" className="item-creator-input" placeholder="Nhập ưu đãi" value={formData.promotion} onChange={handleChange} />
      <br/>

      <label className="item-creator-label">Kích cỡ:</label>
      <input type="number" name="size" className="item-creator-input" placeholder="Nhập kích cỡ" value={formData.size} onChange={handleChange} />
      <br/>

      <button className="item-creator-button" onClick={createItem}>Tạo sản phẩm</button>
      <button className="item-creator-button" onClick={resetCreator}>Hủy</button>
    </div>
  );
}
export default ItemCreator;
