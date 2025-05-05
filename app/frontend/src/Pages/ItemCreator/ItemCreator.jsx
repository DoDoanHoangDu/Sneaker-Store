import { useState } from "react";
import createItem from "../../customHook/createItem";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../../components/DropdownComponents/DropdownItem/DropdownItem";

function ItemCreator() {
  const brands = [1,2,3,4,5]
  const [categories, setCategories] = useState([1,2,3,4,5,6,7,8,9,10]);
  const [formData, setFormData] = useState({
      img_url: "",
      image: "",
      product_name: "",
      brand: "",
      description: "",
      discount:0,
      price: 0,
      remaining: 0,
      category: [],
      promotion: [],
      size:[]
,   });

  const resetCreator = () => {
    setFormData({
        img_url: "",
        image: "",
        product_name: "",
        brand: "",
        description: "",
        discount: 0,
        price: 0,
        remaining: 0,
        category: [],
        promotion: [],
        size:[]
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
      return;
    }
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    return;
  }

  const handleSubmit = async () => {
    console.log("Form data:", formData);
    await createItem(formData, resetCreator);
  }

  const genderOptions = ["Nam", "Nữ"];
  const ageGroupOptions = ["Trẻ em", "Người lớn"];

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const newCategory = prev.category.includes(option)
        ? prev.category.filter((cat) => cat !== option)
        : [...prev.category, option];
      return {
        ...prev,
        category: newCategory,
      };
    });
  };

  return (
    <div className="item-creator-container">
      <h1 className="item-creator-title">Nhập sản phẩm mới</h1>

      <label className="item-creator-label">Hình ảnh sản phẩm:</label>
      <input id="input-image" type="file" name="image" className="item-creator-input" accept="image/*" onChange={handleChange}/>
      <br/>

      {formData.image && (<img src={URL.createObjectURL(formData.image)} alt="Preview" className="item-creator-preview" />)}
      <br/>

      <label className="item-creator-label">Tên sản phẩm:</label> <></>
      <input type="text" name="product_name" className="item-creator-input" placeholder="Nhập tên sản phẩm" value={formData.product_name} onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Thương hiệu:</label>
      <input type="text" name="brand" className="item-creator-input" placeholder="Nhập tên hãng" value={formData.brand} onChange={handleChange}/>
      <div className="dropdown-container">
            <Dropdown buttonText = "Chọn hãng" name="brand-select"
            content = {<> {brands.map(brand => <DropdownItem checkbox={false} key = {brand} content = {brand} onClick={() => setFormData(prev => ({ ...prev, brand: brand }))}/>)}</>}/>
      </div>
      <br/>

      <label className="item-creator-label">Mô tả sản phẩm:</label>
      <textarea name="description" className="item-creator-textarea" placeholder="Nhập mô tả sản phẩm" value={formData.description} onChange={handleChange}></textarea>
      <br/>

      <label className="item-creator-label">Giá sản phẩm:</label>
      <input type="number" min={0} name="price" className="item-creator-input" placeholder="Nhập giá sản phẩm" value={formData.price} onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Giảm giá (%):</label>
      <input type="number" min={0} max={100} name="discount" className="item-creator-input" value={formData.discount} placeholder="Nhập % giảm giá" onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Số lượng:</label>
      <input type="number" min={0} name="remaining" className="item-creator-input" placeholder="Nhập số lượng" value={formData.remaining} onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Loại sản phẩm:</label>
      <input type="text" placeholder="Thêm phân khúc mới" className="item-creator-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const newCat = e.target.value.trim();
              setCategories(prev => prev.includes(newCat) ? prev : [...prev, newCat]);
              if (newCat && !formData.category.includes(newCat)) {
                setFormData((prev) => ({
                  ...prev,
                  category: [...prev.category, newCat],
                }));
                e.target.value = "";
              }
            }
          }}/>

      <div className="dropdown-container">
            <Dropdown
              buttonText="Chọn phân khúc"
              name="category-select"
              content={
                <><DropdownItem checkbox={false} key="clear-all" content="Bỏ chọn tất cả"
                      onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            category: [],
                          }))
                  }/>
                  {categories.map((cat) => {
                    const isChecked = formData.category.includes(cat);
                    return (
                      <DropdownItem checkbox={true} checked={isChecked} key={cat} content={cat}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            category: isChecked
                              ? prev.category.filter((c) => c !== cat)
                              : [...prev.category, cat]
                          }))
                        }/>
                    );
                  })}</>
              }/>
          </div>
      <br/>

      <label className="item-creator-label">Giới tính:</label>
      {genderOptions.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={formData.category.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
      <br/>

      <label className="item-creator-label">Độ tuổi:</label>
      {ageGroupOptions.map((option) => (
        <label key={option}>
          <input
            type="checkbox"
            checked={formData.category.includes(option)}
            onChange={() => handleCheckboxChange(option)}
          />
          {option}
        </label>
      ))}
      <br/>

      <label className="item-creator-label">Ưu đãi:</label>
      <input type="text" name="promotion" className="item-creator-input" placeholder="Nhập mã ưu đãi" onChange={handleChange}/>
      <br/>

      <label className="item-creator-label">Kích cỡ:</label>
      <input type="text" name="size" className="item-creator-input" placeholder="Nhập kích cỡ, vd: 34-38" onChange={handleChange}/>
      <br/>

      <button className="item-creator-button" onClick={handleSubmit}>Tạo sản phẩm</button>
      <button className="item-creator-button" onClick={resetCreator}>Hủy</button>
    </div>
  );
}
export default ItemCreator;
