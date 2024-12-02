import axios from "axios";

const DISH_API = "http://localhost:8080/customer/dish"

export async function searchFood(foodName) {
    const response = await axios.get(`${DISH_API}/search/${foodName}`)
    return response;
}

export async function getAllAVLFoodItems() {
    const response = await axios.get(`${DISH_API}/get-all-dishes`)
    return response;
}

export async function getCategories() {
    const response = await axios.get(`${DISH_API}/get-categories`)
    return response;
}

export async function getDishById(dishId) {
    const response = await axios.get(`${DISH_API}/get-dish-by-id/${dishId}`);
    return response;
}