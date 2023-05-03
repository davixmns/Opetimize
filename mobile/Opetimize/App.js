import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomBar from './components/bottomBar/BottomBar';
import {StatusBar, View} from "react-native";
import {StyleSheet} from "react-native";

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
            <BottomBar/>
        </NavigationContainer>
    );
}


