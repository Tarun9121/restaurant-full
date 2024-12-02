import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { getOrders } from "../service/orderService";
import BackButton from './BackButton';

const ViewOrder = () => {
    const userId = localStorage.getItem("userId");
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        getOrders(userId)
            .then((response) => {
                setOrders(response.data); 
            })
            .catch((error) => console.error("Error fetching orders:", error));
    }, [userId]);
    

    // useEffect(() => {
    //     getOrders(userId)
    //         .then((response) => {
    //             const sortedOrders = response.data.sort(
    //                 (a, b) => new Date(b.orderedDateTime) - new Date(a.orderedDateTime)
    //             );
    //             setOrders(sortedOrders);
    //         })
    //         .catch((error) => console.error("Error fetching orders:", error));
    // }, [userId]);

    return (
        <div className="container mt-4">
            <BackButton />
            <Card className="p-4">
                <h2 className="mb-4">Previous Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <div>
                        {orders.map((order, orderIndex) => (
                            <Card className="mb-4" key={order.id}>
                                <Card.Body>
                                    <h5 className="mb-3">
                                        <strong>Order #{orderIndex + 1}</strong>
                                    </h5>
                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {order.orderedDateTime
                                            ? new Date(order.orderedDateTime).toLocaleString(undefined, {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : "N/A"}
                                    </p>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Dish Name</th>
                                                <th>Price (₹)</th>
                                                <th>Quantity</th>
                                                <th>Subtotal (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderItems.map((item, itemIndex) => (
                                                <tr key={item.id}>
                                                    <td>{itemIndex + 1}</td>
                                                    <td>{item.foodItem.name}</td>
                                                    <td>₹{item.foodItem.price}</td> 
                                                    <td>{item.quantity}</td>
                                                    <td>₹{item.totalPrice}</td> 
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="text-end mt-3">
                                        <p>
                                            <strong>Total:</strong> ₹{order.bill || "N/A"} 
                                        </p>
                                        <p>
                                            <strong>Delivery Address:</strong>{" "}
                                            {order.address
                                                ? `${order.address.houseNo}, ${order.address.area}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`
                                                : "N/A"}
                                        </p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ViewOrder;
