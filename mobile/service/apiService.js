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

export const sendForgotPasswordEmail = async (email) => {
    return await axios.post(
        `${BASE_URL}/reset-password`,
        {email}
    );
};

export const verifyResetTokenCode = async (token, email) => {
    return await axios.post(
        `${BASE_URL}/verify-reset-token`,
        {token, email}
    );
}

export const deletePurchase = async (token, purchase_id) => {
    return await axios.delete(
        `${BASE_URL}/purchase/${purchase_id}`,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const createPurchase = async (token, purchase) => {
    return await axios.post(
        `${BASE_URL}/purchase`,
        purchase,
        {headers: {authorization: `Bearer ${token}`}}
    )
}

export const updatePurchase = async (token, purchase) => {
    return await axios.put(
        `${BASE_URL}/purchase/${purchase.purchase_id}`,
        purchase,
        {headers: {authorization: `Bearer ${token}`}}
    )
}

export const verifyJWT = async (token) => {
    return await axios.get(
        `${BASE_URL}/verify-jwt`,
        {headers: {authorization: `Bearer ${token}`}}
    );
}






