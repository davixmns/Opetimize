import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import BottomBar from './components/bottomBar/BottomBar';
import {AuthStack} from './components/authStack/AuthStack';

export default function App(){
    return (
        <NavigationContainer>
            <AuthStack/>
            <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
            <BottomBar/>
        </NavigationContainer>
    );
}
