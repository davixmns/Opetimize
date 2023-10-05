import React from 'react';

import {AuthStack} from './routes/AuthStack';
import Toast from "react-native-toast-message";
import {toastConfig} from "./components/MyToast";
import {AuthProvider} from "./contexts/AuthContext";
import {StatusBar} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
                <AuthStack/>
                <Toast config={toastConfig}/>
            </AuthProvider>
        </NavigationContainer>

    )
}

