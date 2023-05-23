import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../login/Login';

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}
