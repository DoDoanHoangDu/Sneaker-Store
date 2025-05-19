import "./Cart.css"
import CartViewer from "../../components/ItemComponents/CartViewer/CartViewer"
function Cart({cart,setCart,resetCart}) {
    return(
        <div className="cart">
            <div className="cart-content">
                <CartViewer cart = {cart} setCart = {setCart} resetCart = {resetCart}/>
            </div>
        </div>
    )
}

export default Cart