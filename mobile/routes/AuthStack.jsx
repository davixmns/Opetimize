import {} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import BottomBar from "./BottomBar";
import Register from "../screens/Register";
import {ForgotPassword} from "../screens/ForgotPassword";
import {EditProfile} from "../screens/EditProfile";

const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
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
            <Stack.Screen
                name={"EditProfile"}
                component={EditProfile}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
