import axios from "axios";

// const BASE_URL = 'http://172.18.9.85:3000'; //vortex
const BASE_URL = 'http://192.168.1.2:3000'; //casa
// const BASE_URL = 'http://localhost:3000';

export const getAllPurchases = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/purchases`);
        const purchases = response.data;
        purchases.sort((a, b) => new Date(b.date) - new Date(a.date));
        return purchases;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const deletePurchaseById = async (purchaseID) => {
    try{
        const response = await axios.delete(`${BASE_URL}/purchases/${purchaseID}`)
        return response.data
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const insertPurchase = async (purchase) => {
    try{
        const response = await axios.post(`${BASE_URL}/purchase`, purchase)
        return response.data
    }catch (error){
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





