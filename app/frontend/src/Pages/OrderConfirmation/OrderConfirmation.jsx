import "./OrderConfirmation.css";
import { useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import useWindowSize from "../../customHook/useWindowSize";
import UserProfile from "../UserProfile/UserProfile";
import CartViewer from "../../components/ItemComponents/CartViewer/CartViewer";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
function OrderConfirmation() {
    const location = useLocation();
    const windowSize = useWindowSize();
    const navigate = useNavigate();
    useEffect(() => {
        if (!location.state?.fromTrigger) {
        navigate("/cart", { replace: true });
        }
    }, []);
    return (
    <div className={`order-confirmation-container ${windowSize < 1000? "order-confirmation-small" : "null"}`}>
        <h1>Xác nhận đơn hàng</h1>
        <Dropdown buttonText = "Đơn hàng" content = {<CartViewer confirmation={true}/>}/>
        <UserProfile/>
    </div>
    );
}

export default OrderConfirmation;