import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {getAllPurchases} from "../service/apiService.js";

const PurchaseContext = createContext();

export const usePurchaseContext = () => {
    return useContext(PurchaseContext);
};

export const PurchaseProvider = ({children}) => {
    const [purchases, setPurchases] = useState([]);

    async function fetchData() {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await getAllPurchases(token)
            setPurchases(response.data)
        } catch (e) {
            console.log(e)
            Alert.alert("ERRRO", "Erro ao carregar as compras")
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <PurchaseContext.Provider
            value={{
                purchases
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};
