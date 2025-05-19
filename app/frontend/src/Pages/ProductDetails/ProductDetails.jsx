import "./ProductDetails.css";
import getItemById from "../../customHook/getItemById";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../customHook/formatPrice";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../../components/DropdownComponents/DropdownItem/DropdownItem";
import {Link} from "react-router-dom"
import { useCart } from "../../context/CartContext";

function ProductDetails() {
    const { cartItems,addToCart } = useCart();
    const { id } = useParams();
    const itemID = id || 0;
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([])
    const [ages, setAges] = useState([])
    const [size, setSize] = useState(null)


    useEffect(() => {
        const fetchItem = async () => {
            const data = await getItemById(itemID);
            console.log(data)
            setProduct(data);
        };
        fetchItem();
    }, [itemID]);

    useEffect(() => {
        if (product) {
            const filteredCategories = product.category.filter(
                item => !["nam", "nữ", "trẻ em", "người lớn"].includes(item)
            );
            setCategories(filteredCategories);

            const genderList = product.category.filter(item => ["nam", "nữ"].includes(item));
            setGenders(genderList);

            const ageList = product.category.filter(item => ["trẻ em", "người lớn"].includes(item));
            setAges(ageList);

            setSize(Math.min(...product.size))

            console.log({ categories, genders, ages, size });
        }
    }, [product]);

    const handleAddToCart = () => {
        if (size) {
            addToCart(itemID,size);
            console.log(cartItems);
        } else {
            alert("Hãy chọn kích thước cho sản phẩm!");
        }
        
    }


    if (!product) {
        return <p>Sản phẩm không tồn tại</p>;
    }

    return (
        <div className="product-details">
            <div className="page-name">
                <Link  to="/store"><p >Danh sách sản phẩm</p></Link>
                <p>/</p>
                <p>{product.product_name}</p>
            </div>
            
            
            <div className="product-details-basic">
                <div className="left-part">
                    <img className="product-details-image" src={product.img_url} alt={product.product_name} />
                </div>
                <div className="right-part">
                    <p className="product-details-name">{product.product_name}</p>
                    <div className="product-details-price">
                        <span className="product-details-price-discounted">{formatPrice(Math.round((product.price * (1-product.discount))/1000)*1000)}₫</span>
                        <span className="product-details-price-original">{formatPrice(product.price)}₫</span>
                        <span className="product-details-discount">-{Math.round(product.discount * 100)}%</span>
                    </div>
                    <div className="product-details-size">
                        <p><strong>Kích cỡ:</strong></p>
                    
                    <Dropdown buttonText = {size}
                        content = {<>
                            {product.size.map(s => <DropdownItem key = {s} content={s} onClick={() => setSize(s)}/>)}
                        </>}
                    />
                    </div>
                    <p className="product-details-brand"><strong>Thương hiệu:</strong> {product.brand}</p>
                    <p className="product-details-categories"><strong>Loại giày:</strong> {categories.join(", ")}</p>
                    <p className="product-details-brand"><strong>Tình trạng:</strong> {(product.remaining >0 ? "còn hàng" : "hết hàng")}</p>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div className="product-details-indepth">
                <p className="description-start">Mô tả sản phẩm:</p>
                <p className="product-details-description"> {product.description}</p>
            </div>
        </div>
    );
}

export default ProductDetails;
