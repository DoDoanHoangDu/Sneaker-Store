import "./CartHeader.css"
function CartHeader() {
    const source_cart_logo = "/cart-logo.png"
    return(
        <div className="cart-header">
            <img className={"cart-logo"} src={source_cart_logo} alt="Cart"></img>
            <div className="cart-block-text">
                <span>Giỏ</span> <br/>
                <span>hàng</span>
            </div>
        </div>
    );
};

export default CartHeader;