import { useState } from "react";
import createItem from "../../customHook/createItem";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../../components/DropdownComponents/DropdownItem/DropdownItem";

function ItemCreator() {
  const brands = [1,2,3,4,5]
  const categories = [1,2,3,4,5];
  const [formData, setFormData] = useState({
      img_url: "",
      image: "",
      product_name: "",
      brand: `${brands[0]}`,
      description: "",
      discount:0,
      price: 0,
      remaining: 0,
      category: [""],
      promotion: [""],
      size:[]
,   });

  const resetCreator = () => {
    setFormData({
        img_url: "",
        image: "",
        product_name: "",
        brand: `${brands[0]}`,
        description: "",
        discount: 0,
        price: 0,
        remaining: 0,
        category: [""],
        promotion: [""],
        size:[]
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
      return;
    }
    else if (e.target.name === "brand-select") {
      const brandText = document.querySelector("brand");
      brandText.value = e.target.value;
    }
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    return;
    console.log(formData);
  }

  return (
    <div className="item-creator-container">
      <h1 className="item-creator-title">Nhập sản phẩm mới</h1>

      <label className="item-creator-label">Hình ảnh sản phẩm:</label>
      <input id="input-image" type="file" name="image" className="item-creator-input" accept="image/*"
            onChange={(e) => {handleChange}}/>
      <br/>

      {formData.image ? (<img id="preview-image" src={URL.createObjectURL(formData.image)} alt="Preview" className="item-creator-image"/>) : null}

      <label className="item-creator-label">Tên sản phẩm:</label> <></>
      <input type="text" name="product_name" className="item-creator-input" placeholder="Nhập tên sản phẩm"/>
      <br/>

      <label className="item-creator-label">Thương hiệu:</label>
      <input type="text" name="brand" className="item-creator-input" placeholder="Nhập tên hãng"/>
      <select name="brand-select" className="item-creator-select" onChange={handleChange}>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
      <br/>

      <label className="item-creator-label">Mô tả sản phẩm:</label>
      <textarea name="description" className="item-creator-textarea" placeholder="Nhập mô tả sản phẩm"></textarea>
      <br/>

      <label className="item-creator-label">Giá sản phẩm:</label>
      <input type="number" name="price" className="item-creator-input" placeholder="Nhập giá sản phẩm" onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Giảm giá (%):</label>
      <input type="number" min={0} max={100} name="discount" className="item-creator-input" placeholder="Nhập % giảm giá"/>
      <br/>

      <label className="item-creator-label">Số lượng:</label>
      <input type="number" min={0} name="remaining" className="item-creator-input" placeholder="Nhập số lượng"/>
      <br/>

      <label className="item-creator-label">Loại sản phẩm:</label>
      <select name="category" className="item-creator-select">
        <option value="category1">Loại 1</option>
        <option value="category2">Loại 2</option>
        <option value="category3">Loại 3</option>
      </select>
      <br/>

      <label className="item-creator-label">Ưu đãi:</label>
      <input type="text" name="promotion" className="item-creator-input" placeholder="Nhập ưu đãi"/>
      <br/>

      <label className="item-creator-label">Kích cỡ:</label>
      <input type="text" name="size" className="item-creator-input" placeholder="Nhập kích cỡ"/>
      <br/>

      <button className="item-creator-button" onClick={createItem}>Tạo sản phẩm</button>
      <button className="item-creator-button" onClick={resetCreator}>Hủy</button>
    </div>
  );
}
export default ItemCreator;
