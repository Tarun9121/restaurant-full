import axios from "axios";

const USER_API = "http://localhost:8080/customer/users"

export async function registerUser(user) {
    const resposne = await axios.post(`${USER_API}/register`, user)
    return resposne;
}

export async function validateLogin(loginDetails) {
    const response = await axios.post(`http://localhost:8080/validate/login`, loginDetails)
    return response;
}

export const updateProfile = (userId, userData) => {
    return axios.patch(`${USER_API}/${userId}/update`, userData);
}

export async function addAddress(userId, addressData) {
    const response = await axios.post(`http://localhost:8080/customer/address/add-address/${userId}`, addressData);
    return response;
}

export const getProfile = (userId) => {
    return axios.get(`${USER_API}/${userId}/profile`);
}
export const setActiveAddress = (userId, addressId) => {
    return axios.put(`http://localhost:8080/customer/address/set-active/${userId}/${addressId}`);
};