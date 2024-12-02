import axios from "axios";

const CART_API = "http://localhost:8080/customer/cart"

export async function addToCart(userId, dishId, quantity) {
    const response = await axios.post(`${CART_API}/add-to-cart/${userId}/${dishId}/${quantity}`)
    return response;
}

export async function viewCart(userId) {
    const response = await axios.get(`${CART_API}/view-cart/${userId}`)
    return response;
}

export async function updateCart(userId, dishId, quantity) {
    const response = await axios.patch(`${CART_API}/update-quantity/${userId}/${dishId}/${quantity}`)
    return response;
}

export async function removeFromCart(userId, dishId) {
    const response = await axios.delete(`${CART_API}/remove-elements/${userId}/${dishId}`)
    return response;
}

export async function addQuantity(userId, dishId) {
    const response = await axios.put(`${CART_API}/add-quantity/${userId}/${dishId}`)
    return response;
}

export async function removeQuantity(userId, dishId) {
    const response = await axios.put(`${CART_API}/remove-quantity/${userId}/${dishId}`)
    return response;
}

export async function totalCost(userId) {
    const response = await axios.get(`${CART_API}/total-cost/${userId}`)
    return response;
}