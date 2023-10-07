import {MY_IP} from "../config";
import axios from "axios";

const BASE_URL = `http://${MY_IP}:3001`;

export const login = async (email, password) => {
    return await axios.post(
        `${BASE_URL}/login`,
        {email, password}
    );
};

export async function updateUser(token, user) {
    return await axios.put(
        `${BASE_URL}/user`,
        user,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const getMyData = async (token) => {
    return await axios.get(
        `${BASE_URL}/user`,
        {headers: {authorization: `Bearer ${token}`}}
    );
};

export const getAllPurchases = async (token) => {
    return await axios.get(
        `${BASE_URL}/purchases`,
        {headers: {authorization: `Bearer ${token}`}}
    );
};

export const deleteMyAccount = async (token) => {
    return await axios.delete(
        `${BASE_URL}/user`,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const createUser = async (user) => {
    return await axios.post(`${BASE_URL}/user`, user);
};

export const sendEmailForgotPassword = async (email) => {
    return await axios.get(`${BASE_URL}/forgot-password/${email}`);
};


export const updatePassword = async (token, newPassword) => {
    return await axios.put(`${BASE_URL}/reset-password/${token}`, {newPassword});
};

export const deletePurchase = async (id) => {
    return await axios.delete(`${BASE_URL}/purchases/${id}`);
}

export const createPurchase = async (token, purchase) => {
    return await axios.post(
        `${BASE_URL}/purchase`,
        purchase,
        {headers: {authorization: `Bearer ${token}`}}
    )
}






