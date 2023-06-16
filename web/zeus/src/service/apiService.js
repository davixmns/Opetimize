import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const sendEmailForgotPassword = async (email) => {
    try {
        const response = await axios.get(`${BASE_URL}/forgot-password/${email}`);
        console.log(response.data);
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


export const tryLogin = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, {email, password});
        return response.data.token;
    } catch (error) {
        console.log(error);
        return null;
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






