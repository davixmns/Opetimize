import {MY_IP} from "../config";
import axios from "axios";

const BASE_URL = `http://${MY_IP}:3001`;

export const getUserByToken = async (token) => {
    return await axios.get(`${BASE_URL}/getUserByToken/${token}`);
};

export const deleteUserById = async (id) => {
    return await axios.delete(`${BASE_URL}/users/${id}`);
};

export const sendEmailForgotPassword = async (email) => {
    return await axios.get(`${BASE_URL}/forgot-password/${email}`);
};

export const tryLogin = async (email, password) => {
    return await axios.post(`${BASE_URL}/login`, {email, password});
};

export const getUserByEmail = async (email) => {
    return await axios.get(`${BASE_URL}/users/${email}`);
};

export const updatePassword = async (token, newPassword) => {
    return await axios.put(`${BASE_URL}/reset-password/${token}`, {newPassword});
};

export const createUser = async (user) => {
    return await axios.post(`${BASE_URL}/users`, user);
};

export const getAllPurchasesByUserToken = async (token) => {
    return await axios.get(`${BASE_URL}/users/${token}/purchases`);
};


export const deletePurchaseById = async (id) => {
    return await axios.delete(`${BASE_URL}/purchases/${id}`);
}

export const insertPurchase = async (purchase, token) => {
    return await axios.post(`${BASE_URL}/purchases/${token}`, purchase)
}

export const editPurchase = async (id, purchase) => {
    return await axios.put(`${BASE_URL}/purchases/${id}`, purchase);
};

export async function verifyToken(token) {
    return await axios.get(`${BASE_URL}/verifyToken/${token}`);
}

export async function updateUserById(id, user) {
    return await axios.put(`${BASE_URL}/users/${id}`, user);
}






