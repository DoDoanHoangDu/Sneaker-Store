import { useState,useEffect,useRef  } from "react";
import "./ItemCreator.css";
import createItem from "../../customHook/createItem";
import getBrands from "../../customHook/getBrands";
import getCategories from "../../customHook/getCategories";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../../components/DropdownComponents/DropdownItem/DropdownItem";

function ItemCreator() {
  const fileInputRef = useRef(null);
  const sizeInputRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchBrands = async () => {
    const data = await getBrands();
    setBrands(data);
  };
  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };
  fetchBrands();
  fetchCategories();
  }, []);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    if (sizeInputRef.current) {
      sizeInputRef.current.value = null;
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
      return;
    }
    if (e.target.name === "promotion") {
      const value = e.target.value.split(",").map((s) => s.trim());
      setFormData((prevData) => ({ ...prevData, promotion: value }));
      return;
    }
    let { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    return;
  }

  const handleSubmit = async () => {
    console.log("Form data:", formData);
    try {
      if (!(formData.image instanceof File)) {
        alert("Vui lòng chọn hình ảnh hợp lệ cho sản phẩm.");
        return;
      }
      if (!Array.isArray(formData.size)) {
        const [min, max] = formData.size.split("-").map(s => parseInt(s.trim()));
        if (!isNaN(min) && !isNaN(max) && min <= max) {
          formData.size = Array.from({ length: max - min + 1 }, (_, i) => min + i);
        } else {
          alert("Kích cỡ không hợp lệ. Vui lòng nhập theo định dạng 'min-max', ví dụ: 34-38.");
          return;
        }
      }
      if (!Array.isArray(formData.promotion)) {
        setFormData((prev) => ({...prev ,promotion: prev.promotion.split(",").map((s) => s.trim()),}));
      }
      if (!formData.category.includes("nam") && !formData.category.includes("nữ")) {
        alert("Vui lòng chọn giới tính cho sản phẩm");
        return;
      }
      if (!formData.category.includes("trẻ em") && !formData.category.includes("người lớn")) {
        alert("Vui lòng chọn độ tuổi cho sản phẩm");
        return;
      }
      if (formData.discount < 0 || formData.discount > 100) {
        alert("Giảm giá phải nằm trong khoảng từ 0 đến 100");
        return;
      }
      if (formData.price <= 0) {
        alert("Giá sản phẩm phải lớn hơn 0");
        return;
      }
      if (formData.remaining < 0) {
        alert("Số lượng sản phẩm không được nhỏ hơn 0");
        return;
      }
      const submitData = { ...formData, discount: formData.discount / 100 };
      console.log("Submit data:", submitData);
      await createItem(submitData, resetCreator);
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Đã xảy ra lỗi khi tạo sản phẩm. Vui lòng thử lại.");
    }
  }

  const genderOptions = ["nam", "nữ"];
  const ageGroupOptions = ["trẻ em", "người lớn"];

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

      <div className="item-image-input">
        <label className="item-creator-label">Hình ảnh sản phẩm:</label>
        <input id="input-image" ref={fileInputRef} type="file" name="image" className="item-creator-input" accept="image/*" onChange={handleChange}/>
        <br/>
      </div>
      
      {formData.image && (<img src={URL.createObjectURL(formData.image)} alt="Preview" className="item-creator-preview" />)}
      <br/>

      <div className="item-name-input">
        <label className="item-creator-label">Tên sản phẩm:</label> <></>
        <input type="text" name="product_name" className="item-creator-input" placeholder="Nhập tên sản phẩm" value={formData.product_name} onChange={handleChange}/>
        <br/>
      </div>

      <div className="item-brand-input">
        <label className="item-creator-label">Thương hiệu:</label>
        <input type="text" name="brand" className="item-creator-input" placeholder="Nhập tên hãng" value={formData.brand} onChange={handleChange}/>
        <div className="dropdown-container">
              <Dropdown buttonText = "Chọn thương hiệu" name="brand-select"
              content = {<> {brands.map(brand => <DropdownItem checkbox={false} key = {brand} content = {brand} onClick={() => setFormData(prev => ({ ...prev, brand: brand }))}/>)}</>}/>
        </div>
        <br/>
      </div>

      <div className="item-description-input">
        <label className="item-creator-label">Mô tả sản phẩm:</label>
        <textarea name="description" className="item-creator-textarea" placeholder="Nhập mô tả sản phẩm" value={formData.description} onChange={handleChange}></textarea>
        <br/>
      </div>

      <div className="item-price-input">
        <label className="item-creator-label">Giá sản phẩm:</label>
        <input type="number" onWheel={(e) => e.target.blur()} min={0} name="price" className="item-creator-input" placeholder="Nhập giá sản phẩm" value={formData.price} onChange={handleChange}/>
        <br/>
      </div>

      <div className="item-discount-input">
        <label className="item-creator-label">Giảm giá (%):</label>
        <input type="number" onWheel={(e) => e.target.blur()} min={0} max={100} name="discount" className="item-creator-input" value={formData.discount} placeholder="Nhập % giảm giá" onChange={handleChange}/>
        <br/>
      </div>

      <div className="item-remaining-input">
        <label className="item-creator-label">Số lượng:</label>
        <input type="number" onWheel={(e) => e.target.blur()} min={0} name="remaining" className="item-creator-input" placeholder="Nhập số lượng" value={formData.remaining} onChange={handleChange}/>
        <br/>
      </div>

      <div className="item-category-input">
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
      </div>

      <div className="item-gender-input">
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
      </div>

      <div className="item-age-input">
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
      </div>

      <div className="item-promotion-input">
        <label className="item-creator-label">Ưu đãi:</label>
        <input type="text" name="promotion" className="item-creator-input" placeholder="Nhập mã ưu đãi" value={formData.promotion} onChange={handleChange}/>
        <br/>
      </div>

      <div className="item-size-input">
        <label className="item-creator-label">Kích cỡ:</label>
        <input type="text" name="size" className="item-creator-input" placeholder="Nhập kích cỡ, vd: 34-38" ref={sizeInputRef} onChange={handleChange}/>
        <br/>
      </div>

      <div className="creator-button-container">
        <button className="item-creator-button" onClick={handleSubmit}>Tạo sản phẩm</button>
        <button className="item-creator-button" onClick={resetCreator}>Hủy</button>
      </div>
    </div>
  );
}
export default ItemCreator;
