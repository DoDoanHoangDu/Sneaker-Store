import "./OrderSuccess.css";
import { useLocation,useNavigate,Link } from "react-router-dom";
import { useEffect } from "react";

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state?.fromTrigger) {
        navigate("/cart", { replace: true });
        }
    }, []);
    
    return (
        <div className="order-success-container">
            <div className="order-success">
                <img className="order-success-image" src="/success-icon.png" alt="Order Success" />
                <div className="order-success-label">Đặt hàng thành công!</div>
                <Link className="order-success-link" to = "/store">Tiếp tục mua hàng</Link>
            </div>
        </div>
    )
}

export default OrderSuccess;