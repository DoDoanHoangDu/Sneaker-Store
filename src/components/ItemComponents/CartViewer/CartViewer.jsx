import "./CartViewer.css"
import CartItem from "../CartItem/CartItem";
function  CartViewer() {
    const source = "/shoe.jpg"
    const item1 = {
        image : source,
        name : "One two three four five six seven eight nine ten",
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
    return (
        <div className={`cart-viewer`}>
            <CartItem item = {item1}/>
            <CartItem item = {item2}/>
            <CartItem item = {item3}/>
        </div>
    )
}

export default CartViewer