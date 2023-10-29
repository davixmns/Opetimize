import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import BottomBar from "./BottomBar";
import Register from "../screens/Register";
import {ForgotPassword} from "../screens/ForgotPassword";
import {EditProfile} from "../screens/EditProfile";
import {PurchaseDetails} from "../screens/PurchaseDetails";
import {useAuthContext} from "../contexts/AuthContext";
import {SplashScreen} from "../screens/SplashScreen";
import {ResetTokenVerification} from "../screens/ResetTokenVerification";
import {CreateNewPassword} from "../screens/CreateNewPassword";
import {ChangePassword} from "../screens/ChangePassword";

const Stack = createStackNavigator();

export function AuthStack() {
    const {isLogged, loading} = useAuthContext();

    if (loading) return <SplashScreen/>

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
            {isLogged ? (
                <>
                    <Stack.Screen
                        name={"BottomBar"}
                        component={BottomBar}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"PurchaseDetails"}
                        component={PurchaseDetails}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
                        }}
                    />
                    <Stack.Screen
                        name={"EditProfile"}
                        component={EditProfile}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                        }}
                    />
                    <Stack.Screen
                        name={"ChangePassword"}
                        component={ChangePassword}
                        options={{
                            headerShown: false,
                            // cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name={"Login"}
                        component={Login}
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
                    <Stack.Screen
                        name={"ResetTokenVerification"}
                        component={ResetTokenVerification}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"CreateNewPassword"}
                        component={CreateNewPassword}
                        options={{headerShown: false}}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
