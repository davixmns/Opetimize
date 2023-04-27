import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './components/bottomBar/BottomBar';
import {StatusBar} from "react-native";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#E49052" barStyle="light-content" translucent={false}/>
            <BottomBar/>
        </NavigationContainer>
    );
}
