import "./Cart.css"
import CartViewer from "../../components/ItemComponents/CartViewer/CartViewer"
function Cart() {
    return(
        <div className="cart">
            <div className="cart-content">
                <CartViewer/>
            </div>
        </div>
    )
}

export default Cart