import "./OrderConfirmation.css";
import { useLocation } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import UserProfile from "../UserProfile/UserProfile";
import CartViewer from "../../components/ItemComponents/CartViewer/CartViewer";
import Dropdown from "../../components/DropdownComponents/Dropdown/Dropdown";
function OrderConfirmation() {
    const location = useLocation();
    if (!location.state?.fromTrigger) {
        return <div className="page-unavailable">Page Unavailable</div>;
    }
    return (
    <div className="order-confirmation-container">
        <Dropdown buttonText = "Đơn hàng" content = {<CartViewer confirmation={true}/>}/>
        
        <UserProfile/>
    </div>
    );
}

export default OrderConfirmation;