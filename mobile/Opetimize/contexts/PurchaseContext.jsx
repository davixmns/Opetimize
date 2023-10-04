import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {createPurchase, getAllPurchases} from "../service/apiService.js";
import utils from "../utils/utils";
import Toast from "react-native-toast-message";

const PurchaseContext = createContext();

export const usePurchaseContext = () => {
    return useContext(PurchaseContext);
};

export const PurchaseProvider = ({children}) => {
    const [purchases, setPurchases] = useState([]);

    const showToast = (type, title, description) => {
        Toast.show({
            type: type,
            text1: title,
            text2: description,
        });
    }

    async function loadPurchases() {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await getAllPurchases(token)
            setPurchases(response.data)
            console.log("Compras carregadas")
        } catch (e) {
            console.log(e)
            Alert.alert("ERRRO", "Erro ao carregar as compras")
        }
    }

    async function savePurchase(purchase) {
        try {
            const token = await AsyncStorage.getItem('token');
            const purchaseIsOk = utils.verifyPurchase(purchase)
            if (purchaseIsOk !== true) return showToast('warning', "Aviso", purchaseIsOk)
            await createPurchase(token, purchase).then((response) => {
                console.log("response.data",response.data)
                setPurchases((state)=>[...state, purchase])
                showToast('success', "Sucesso", "Sua compra foi cadastrada!")
            }).catch((error) => {
                console.log(error)
            })
            return true
        } catch (e) {
            console.log(e)
            showToast('error', "Erro", "Erro interno no servidor")
        }
    }

    useEffect(() => {
        loadPurchases()
    }, []);

    return (
        <PurchaseContext.Provider
            value={{
                purchases,
                loadPurchases,
                savePurchase,
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};
