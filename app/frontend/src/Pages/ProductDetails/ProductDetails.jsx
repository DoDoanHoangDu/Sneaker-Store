import "./ProductDetails.css";
import getItemById from "../../customHook/getItemById";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import formatPrice from "../../customHook/formatPrice";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../../components/DropdownComponents/DropdownItem/DropdownItem";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import {Link, useNavigate} from "react-router-dom"
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/useAuth";
import StarButton from "../../components/StarButton/StarButton";
import getFeaturedProducts from "../../customHook/getFeaturedProducts";
import setFeaturedProduct from "../../customHook/setFeaturedProduct";
import removeFeaturedProduct from "../../customHook/removeFeaturedProduct";
import deleteItem from "../../customHook/deleteItem";

function ProductDetails() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const { isLoggedIn, isAdmin } = useAuth();
    const { cartItems,addToCart } = useCart();
    const { id } = useParams();
    const itemID = id || 0;
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([])
    const [ages, setAges] = useState([])
    const [size, setSize] = useState(null)
    const [featured, setFeatured] = useState(false);
    const [refetch, setRefetch] = useState(false);

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

    useEffect(() => {
        const fetchFeatured = async () => {
            const ids = [];
            try {
                const products = await getFeaturedProducts();
                if (products) {
                    products.forEach(product => {
                        if (product.product_id) {
                            ids.push(product.product_id);
                        }
                    });
                    setFeatured(ids.includes(parseInt(itemID)));
                } else {
                    console.error("No featured products found");
                }
            } catch (error) {
                console.error("Error fetching featured products:", error);
            }
        };
        fetchFeatured();
    }, [refetch,itemID]);

    const handleAddToCart = () => {
        if (size) {
            addToCart(itemID,size);
            console.log(cartItems);
        } else {
            alert("Hãy chọn kích thước cho sản phẩm!");
        }
    }

    const handleSetFeatured = async () => {
        try {
            if (isLoggedIn && isAdmin) {
                if (!featured) {
                    console.log("Here",itemID)
                    const response = await setFeaturedProduct(itemID);
                    console.log(response);
                } else {
                    const response = await removeFeaturedProduct(itemID);
                }
                setRefetch(!refetch);
            } else {
                alert("Bạn không có quyền thực hiện hành động này!");
                return;
            }
        } catch (error) {
            console.error("Error setting featured product:", error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        };
    };

    const toggleModal = () => {
        if (isLoggedIn && isAdmin) {
            setModalOpen(!modalOpen);
        } else {
            alert("Bạn không có quyền thực hiện hành động này!");
            return;
        }
    };

    const handleDeleteProduct = async () => {
        toggleModal();
        try {
            const response = await deleteItem(itemID);
            if (response) {
                navigate("/store");
            } else {
                alert("Không thể xóa sản phẩm này. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        }
    };

    if (!product) {
        return (
            <div className="unavailable-product">
                <div className="page-name">
                    <Link  to="/store"><p >Danh sách sản phẩm</p></Link>
                    <p>/</p>
                    <p>Sản phẩm</p>
                </div>
                <div className="product-not-exist">
                    <p>Sản phẩm không tồn tại</p>
                    <Link  to="/store"><p >Quay lại cửa hàng</p></Link>
                </div>
                

            </div>
        );
    }

    return (
        <div className="product-details">
            <div className="page-name">
                <Link  to="/store"><p >Danh sách sản phẩm</p></Link>
                <p>/</p>
                <p>{product.product_name + ((isLoggedIn && isAdmin) ? (" - ID: " + id) : "")  }</p>
            </div>
            {isLoggedIn && isAdmin && (<button className="delete-product-btn" onClick={toggleModal}>Xóa sản phẩm</button>)}
            
            
            
            <div className="product-details-basic">
                <div className="left-part">
                    <img className="product-details-image" src={product.img_url} alt={product.product_name} />
                </div>
                <div className="right-part">
                    <p className="product-details-name">{product.product_name} <StarButton initialStarred = {featured} interactive = {(isLoggedIn && isAdmin)} onClick={handleSetFeatured}/> </p>
                    
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
                    <p className="product-details-condition"><strong>Tình trạng:</strong> {(product.remaining >0 ? "còn hàng" : "hết hàng")}</p>
                    <button className={`add-to-cart-button ${product.remaining>0 ? '' : 'disabled'}`} onClick={handleAddToCart}>{(product.remaining >0 ? "Thêm vào giỏ hàng" : "Hết hàng")}</button>
                </div>
            </div>

            <div className="product-details-indepth">
                <p className="description-start">Mô tả sản phẩm:</p>
                <p className="product-details-description"> {product.description}</p>
            </div>
            <ConfirmationModal
                isOpen={modalOpen}
                onConfirm={handleDeleteProduct}
                onCancel={toggleModal}
                message="Xóa sản phẩm này?"
            />
        </div>
    );
}

export default ProductDetails;
