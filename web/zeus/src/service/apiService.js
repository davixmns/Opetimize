import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export const getAllPurchases = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/purchases`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


