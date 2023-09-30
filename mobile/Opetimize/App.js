import React from 'react';

import {AuthStack} from './components/AuthStack';
import {PurchaseProvider} from "./contexts/PurchaseContext";

export default function App() {
    return (
        <PurchaseProvider>
            <AuthStack/>
        </PurchaseProvider>
    )
}