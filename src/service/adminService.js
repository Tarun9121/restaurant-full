import axios from "axios";

const ADMIN_API = "http://localhost:8080/restaurant";

export async function addDish(dish) {
    const response = await axios.post(`${ADMIN_API}/add-dish`, dish)
    return response;
}

export async function editDish(dish) {
    const response = await axios.put(`${ADMIN_API}/update-dish`, dish) 
    return response;
}

export async function removeDish(dishId) {
    const response = await axios.put(`${ADMIN_API}/remove-availability/${dishId}`)
    return response;
}

export async function getAllDishes() {
    const response = await axios.get(`${ADMIN_API}/get-all-dishes`)
    return response;
}