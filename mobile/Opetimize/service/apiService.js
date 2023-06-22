import axios from "axios";

const ipAddress = "172.18.9.85"
const BASE_URL = `http://${ipAddress}:3000`;

export const getUserByToken = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/getUserByToken/${token}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteUserById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const sendEmailForgotPassword = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/forgot-password/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const tryLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {email, password});
        return response.data.token;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${email}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updatePassword = async (token, newPassword) => {
    try {
        const response = await axios.put(`${BASE_URL}/reset-password/${token}`, { newPassword });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAllPurchasesByUserToken = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${token}/purchases`);
        const purchases = response.data;
        purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
        return purchases;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const deletePurchaseById = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/purchases/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const insertPurchase = async (purchase, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/purchases/${token}`, purchase)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const editPurchase = async (id, purchase) => {
    try {
        const response = await axios.put(`${BASE_URL}/purchases/${id}`, purchase);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function verifyToken(token) {
    try {
        const response = await axios.get(`${BASE_URL}/verifyToken/${token}`);
        const { valid } = response.data;
        return valid;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateUserById(id, user){
    try {
        const response = await axios.put(`${BASE_URL}/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}






