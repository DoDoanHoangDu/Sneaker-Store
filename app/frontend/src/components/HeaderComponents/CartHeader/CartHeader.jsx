import "./CartHeader.css"
import { Link } from "react-router-dom";

function CartHeader({cartLength}) {
    const source_cart_logo = "/cart-logo.png"
    return(
        <Link className="cart-header" to="/cart">
            <img className={"cart-logo"} src={source_cart_logo} alt="Cart"></img>
            <span className="cart-count-icon">{cartLength}</span>
            <div className="cart-block-text">
                <span>Giỏ</span> <br/>
                <span>hàng</span>
            </div>
        </Link>
    );
};

export default CartHeader;