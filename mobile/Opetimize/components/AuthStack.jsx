import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import BottomBar from "./BottomBar";
import {NavigationContainer} from "@react-navigation/native";
import Register from "../screens/Register";
import {ForgotPassword} from "../screens/ForgotPassword";
import {StatusBar} from "react-native";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
            <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name={"Login"}
                    component={Login}/>
                <Stack.Screen
                    name={"BottomBar"}
                    component={BottomBar}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"Register"}
                    component={Register}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={"ForgotPassword"}
                    component={ForgotPassword}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
