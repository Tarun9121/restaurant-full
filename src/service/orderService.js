import axios from "axios";

const ORDER_API = "http://localhost:8080/customer/orders"

export async function palceOrder(userId) {
    const response = await axios.post(`${ORDER_API}/place-order/${userId}`)
    return response;
}

export async function getOrders(userId) {
    const response = await axios.get(`${ORDER_API}/view-orders/${userId}`);
    return response;
}

export async function getRecentOrder(userId) {
    const response = await axios.get(`${ORDER_API}/recent-order/${userId}`)
    return response;
}