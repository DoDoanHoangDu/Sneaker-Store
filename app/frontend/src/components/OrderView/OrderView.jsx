import "./OrderView.css"
import Dropdown from "../DropdownComponents/Dropdown/Dropdown";
import DropdownItem from "../DropdownComponents/DropdownItem/DropdownItem";

function OrderView({order}) {
    return(
        <div className="order-view"> 
            <Dropdown buttonText={`${new Date(order.ordered_time).toLocaleString()}`} 
            content = {null}>

            </Dropdown>
        </div>
    )
}

export default OrderView;