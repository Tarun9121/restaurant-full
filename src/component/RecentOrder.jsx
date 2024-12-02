import axios from "axios";
import { useEffect, useState } from "react";
import { getRecentOrder } from "../service/orderService";

export default function RecentOrder() {
    const [recentOrder, setRecentOrder] = useState(null);

    async function handleGetRecentOrder() {
        try {
            const userId = localStorage.getItem("userId");
            const response = await getRecentOrder(userId);
            console.log(response)
            if(response.status == 200) {
                setRecentOrder(response.data);
            }
        } catch(error) {
            setRecentOrder(error);
        }
    }

    useEffect(() => {
        handleGetRecentOrder();
    }, []);

    return (
        <div>
            
            {
                recentOrder != null && 
                <div>
            <h2>Order Details</h2>
            <div>
                <p>Order Id: {recentOrder.id}</p>
                <div>Food Items:</div>
                {   
                    Array.isArray(recentOrder.orderItems) ?
                    recentOrder.orderItems.length != 0 ? 
                    recentOrder.orderItems.map(item => (
                        <div>
                        <div>Item: {item.foodItem.name}</div>
                        <div>Cost per Item: {item.costPerItem}</div>
                        <div>Total price: {item.totalPrice}</div>
                        <div>quantity: {item.quantity}</div>
                        </div>
                    )) : <div></div> : <div>Sorry something went wrong</div>
                }
            </div>
            </div>
            }

            <div className="flex gap-3">
               <div>
               <button className="btn btn-dark">Home</button>
               </div>
               <div>
                <button className="btn btn-dark">View Orders</button>
                </div>
            </div>
        </div>
    );
}