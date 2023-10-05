import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import BottomBar from "./BottomBar";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import Register from "../screens/Register";
import {ForgotPassword} from "../screens/ForgotPassword";
import {StatusBar} from "react-native";
import {AuthProvider, useAuthContext} from "../contexts/AuthContext";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name={"Login"}
                component={Login}/>

            <Stack.Screen
                name={"Register"}
                component={Register}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"BottomBar"}
                component={BottomBar}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"ForgotPassword"}
                component={ForgotPassword}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
