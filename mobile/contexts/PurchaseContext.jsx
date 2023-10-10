import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createPurchase, deletePurchase, getAllPurchases, updatePurchase} from "../service/apiService.js";
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
        } catch (e) {
            console.log(e)
            showToast('error', "Erro", "Erro ao carregar as compras")
        }
    }

    async function savePurchase(purchase) {
        const token = await AsyncStorage.getItem('token');
        const purchaseIsOk = utils.verifyPurchase(purchase)
        if (purchaseIsOk !== true) return showToast('warning', "Aviso", purchaseIsOk)
        await createPurchase(token, purchase).then(() => {
            showToast('success', "Sucesso", "Compra cadastrada com sucesso")
            loadPurchases()
        }).catch((error) => {
            showToast('error', "Erro", "Erro ao cadastrar a compra")
            console.log(error)
        })
    }

    async function saveEditedPurchase(purchase){
        const token = await AsyncStorage.getItem('token');
        const purchaseIsOk = utils.verifyPurchase(purchase)
        if (purchaseIsOk !== true) return showToast('warning', "Aviso", purchaseIsOk)
        await updatePurchase(token, purchase).then(() => {
            showToast('success', "Sucesso", "Compra atualizada com sucesso")
            loadPurchases()
        }).catch((error) => {
            showToast('error', "Erro", "Erro ao atualizar a compra")
            console.log(error)
        })
    }

    async function deletePurchaseById(purchase_id){
        const token = await AsyncStorage.getItem('token');
        await deletePurchase(token, purchase_id).then(() => {
            showToast('success', "Sucesso", "Compra deletada com sucesso")
            loadPurchases()
        }).catch((error) => {
            showToast('error', "Erro", "Erro ao deletar a compra")
            console.log(error)
        })
    }

    return (
        <PurchaseContext.Provider
            value={{
                purchases,
                loadPurchases,
                savePurchase,
                saveEditedPurchase,
                deletePurchaseById
            }}
        >
            {children}
        </PurchaseContext.Provider>
    );
};
