import {MY_IP} from "../config";
import axios from "axios";

const BASE_URL = `http://${MY_IP}:3001`;

console.log(`BASE_URL: ${BASE_URL}`)

export const tryLoginService = async (email, password) => {
    return await axios.post(
        `${BASE_URL}/login`,
        {email, password}
    );
};

export const createNewPasswordService = async (token, password) => {
    return await axios.put(
        `${BASE_URL}/new-password`,
        {password},
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export async function updateUserService(token, user) {
    return await axios.put(
        `${BASE_URL}/user`,
        user,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const getMyDataService = async (token) => {
    return await axios.get(
        `${BASE_URL}/user`,
        {headers: {authorization: `Bearer ${token}`}}
    );
};

export const getAllPurchasesService = async (token) => {
    return await axios.get(
        `${BASE_URL}/purchases`,
        {headers: {authorization: `Bearer ${token}`}}
    );
};

export const deleteMyAccountService = async (token) => {
    return await axios.delete(
        `${BASE_URL}/user`,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const createUserService = async (user) => {
    return await axios.post(`${BASE_URL}/user`, user);
};

export const sendForgotPasswordEmailService = async (email) => {
    return await axios.post(
        `${BASE_URL}/reset-password`,
        {email}
    );
};

export const verifyResetTokenCodeService = async (token, email) => {
    return await axios.post(
        `${BASE_URL}/verify-reset-token`,
        {token, email}
    );
}

export const deletePurchaseService = async (token, purchase_id) => {
    return await axios.delete(
        `${BASE_URL}/purchase/${purchase_id}`,
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const createPurchaseService = async (token, purchase) => {
    return await axios.post(
        `${BASE_URL}/purchase`,
        purchase,
        {headers: {authorization: `Bearer ${token}`}}
    )
}

export const updatePurchaseService = async (token, purchase) => {
    return await axios.put(
        `${BASE_URL}/purchase/${purchase.purchase_id}`,
        purchase,
        {headers: {authorization: `Bearer ${token}`}}
    )
}

export const verifyJWTService = async (token) => {
    return await axios.post(
        `${BASE_URL}/verify-jwt`,
        {},
        {headers: {authorization: `Bearer ${token}`}}
    );
}

export const changePasswordService = async (token, oldPassword, newPassword) => {
    return await axios.put(
        `${BASE_URL}/password`,
        {
            old_password: oldPassword,
            new_password: newPassword
        },
        {headers: {authorization: `Bearer ${token}`}}
    );
}



