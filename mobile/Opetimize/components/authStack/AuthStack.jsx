import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../login/Login';
import BottomBar from "../bottomBar/BottomBar";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen
                    name="BottomBar"
                    component={BottomBar}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
