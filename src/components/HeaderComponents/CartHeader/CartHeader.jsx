import "./CartHeader.css"
function CartHeader() {
    const source_cart_logo = "/cart-logo.png"
    return(
        <a className="cart-header" href="/cart">
            <img className={"cart-logo"} src={source_cart_logo} alt="Cart"></img>
            <span className="cart-count-icon">0</span>
            <div className="cart-block-text">
                <span>Giỏ</span> <br/>
                <span>hàng</span>
            </div>
        </a>
    );
};

export default CartHeader;