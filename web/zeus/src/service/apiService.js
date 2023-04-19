import axios from "axios";

const BASE_URL = 'http://localhost:3000';

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




