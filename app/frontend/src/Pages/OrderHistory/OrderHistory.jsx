import "./OrderHistory.css"
import { useAuth } from "../../context/useAuth";
import { useEffect,useState } from "react";
import getOrderHistory from "../../customHook/getOrderHistory";

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
                    console.log("Order History Data:", data);
                    setOrderHistory(data);
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

    return (
        <></>
    )
};

export default OrderHistory;