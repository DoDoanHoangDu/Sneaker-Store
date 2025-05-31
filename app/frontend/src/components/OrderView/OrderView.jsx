import "./OrderView.css"
import Dropdown from "../DropdownComponents/Dropdown/Dropdown";
import { useEffect,useState } from "react";
import parseSizeId from "../../customHook/parseSizeId";
import getItemById from "../../customHook/getItemById";
import formatPrice from "../../customHook/formatPrice";
import {Link} from "react-router-dom";

function OrderView({order}) {
    const [orderDetails, setOrderDetails] = useState(null);
    useEffect(() => {
        const transformOrder = async () => {
            const transformedItems = await Promise.all(
                order.items.map(async(item) => {
                    const sizeInfo = await parseSizeId(item.size_id);
                    if (!sizeInfo) {
                        return {
                            product_id: -1,
                            size: -1,
                            product_price: item.product_price,
                            quantity: item.quantity
                        };
                    }
                    return {
                        product_id: sizeInfo.product_id,
                        size: sizeInfo.size,
                        product_price: item.product_price,
                        quantity: item.quantity
                    };
                })
            );
            setOrderDetails({...order, items: transformedItems })
            console.log("Transformed Order Details:", {...order, items: transformedItems });
        }
        transformOrder();
        
    }, [order]);

    useEffect(() => {
        const fetchItemDetails = async () => {
            const itemsWithDetails = await Promise.all(
                orderDetails.items.map(async(item) => {
                    const itemDetails = await getItemById(item.product_id);
                    if (!itemDetails) {
                        return {
                            ...item,
                            product_name: "Unknown Item",
                            img_url: ""
                        };
                    }
                    return {
                        ...item,
                        product_name: itemDetails.product_name,
                        img_url: itemDetails.img_url
                    };
                })
            );
            setOrderDetails(prevDetails => ({
                ...prevDetails,
                items: itemsWithDetails
            }));
        }
        if (orderDetails) {
            fetchItemDetails();
        }

    }, [orderDetails])

    if (!orderDetails) return <div>Loading order details...</div>;

    return(
        <div className="order-view"> 
            <Dropdown buttonText={`${new Date(orderDetails.ordered_time).toLocaleString()}`} 
                content = {
                    <div className="order-view-content">
                        {orderDetails.items.map((item) => 
                            <div className="order-item" key={item.product_id}>
                                <Link to={`/product/${item.product_id}`} className="order-item-name">{item.product_name}</Link>
                                <img className="order-item-image" src={item.img_url} alt={item.product_name} />
                                <div className="order-item-size">Size: {item.size}</div>
                                <div className="order-item-quantity">Số lượng: {item.quantity}</div>
                                <div className="order-item-price">{formatPrice(item.product_price)}₫</div>
                            </div>
                        )}
                        <div className="order-delivery-address">
                            <p className="order-delivery-address-text">Địa chỉ: </p>
                            <p className="order-delivery-address-value">{orderDetails.customer_address}</p>
                        </div>
                        <div className="order-delivery-method">
                            <p className="order-delivery-method-text">Giao hàng: </p>
                            <p className="order-delivery-method-value">{orderDetails.delivery_method} ({orderDetails.delivery_method === "nhanh" ? "50.000" : "30.000"})₫</p>
                        </div>
                        <div className="order-total-price">
                            <p className="order-total-price-text">Tổng tiền: </p>
                            <p className="order-total-price-value">{formatPrice(orderDetails.total_price)}₫</p>
                        </div>
                    </div>
                    }>
            </Dropdown>
        </div>
    )
}

export default OrderView;