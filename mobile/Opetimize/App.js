import React from 'react';

import {AuthStack} from './components/AuthStack';
import {PurchaseProvider} from "./contexts/PurchaseContext";
import Toast from "react-native-toast-message";
import {toastConfig} from "./components/MyToast";

export default function App() {
    return (
        <PurchaseProvider>
            <AuthStack/>
            <Toast config={toastConfig}/>
        </PurchaseProvider>
    )
}

