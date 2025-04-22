import "./CartViewer.css"
import CartItem from "../CartItem/CartItem";
import useWindowSize from "../../../customHook/useWindowSize";
function  CartViewer() {
    const source = "/shoe.jpg"
    const item1 = {
        image : source,
        name : "One two three four five six seven eight nine ten eleven",
        originalPrice : 200000,
        discountedPrice: 100000,
        link: "#"
      }
    const item2 = {
        image : source,
        name : "Shoe 2",
        originalPrice : 400000,
        discountedPrice: 300000,
        link: "#"
    }

    const item3 = {
        image : source,
        name : "Shoe Shi",
        originalPrice : 100000,
        discountedPrice: 100000,
        link: "#"
    }
    const windowSize = useWindowSize();
    return (
        <div className={`cart-viewer ${windowSize < 1000? "cart-viewer-small" : "null"}`}>
            <CartItem item = {item1}/>
            <CartItem item = {item2}/>
            <CartItem item = {item3}/>
            <div className="total-price">Tổng tiền:</div>
            <div className="order-button">ĐẶT HÀNG</div>
        </div>
    )
}

export default CartViewer