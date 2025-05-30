import "./OrderHistory.css"
import { useAuth } from "../../context/useAuth";
import { useEffect,useState } from "react";
import getOrderHistory from "../../customHook/getOrderHistory";
import OrderView from "../../components/OrderView/OrderView";

function OrderHistory() {
    const {isLoggedIn,username} = useAuth();
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const { access_token } = JSON.parse(storedUser);
                const data = await getOrderHistory(access_token);
                console.log("Fetched Order History:", data);
                if (data) {
                    setOrderHistory(data.reverse());
                } else {
                    setOrderHistory([]);
                }
            } catch (error) {
                alert("Error fetching order history");
            }
        }
        fetchOrderHistory();
    }, [username]);

    if (!isLoggedIn) {
        return <div className="order-history-guest">Quý khách vui lòng đăng nhập để xem lịch sử mua hàng.</div>;
    }

    if (orderHistory.length === 0) {
        return <div className="order-history-empty">Bạn chưa có đơn hàng nào.</div>;
    }

    return (
        <div className="order-history-container">
            <div className="order-history">
                <p className="order-history-title">Lịch sử mua hàng</p>
                {orderHistory.map((order,index) => (
                    <OrderView key={index} order={order} />
                ))}
            </div>
        </div>
    )
};

export default OrderHistory;