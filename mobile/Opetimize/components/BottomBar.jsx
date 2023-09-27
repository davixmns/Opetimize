import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {UsefulData} from "../screens/UsefulData";
import {StatusBar, StyleSheet, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import PurchaseForm from "../screens/PurchaseForm";
import PurchaseHistory from "./PurchaseHistory";
import {Profile} from "../screens/Profile";

const Tab = createBottomTabNavigator();

function BottomBar() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#E49052',
                        borderBottomWidth: 0,
                        height: 60,
                    }
                }}>

                <Tab.Screen
                    name="List"
                    component={PurchaseHistory}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        tabBarActiveBackgroundColor: "#e07e38",
                        headerShown: false,
                        tabBarIcon: () => {
                            return <Feather name="list" size={30} color={"#fff"}/>
                        }
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={PurchaseForm}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        tabBarActiveBackgroundColor: "#e07e38",
                        headerShown: false,
                        tabBarIcon: () => {
                            return <Feather name="plus-circle" size={30} color={"#fff"}/>
                        }
                    }}
                />
                <Tab.Screen
                    name="Data"
                    component={UsefulData}
                    options={{
                        tabBarActiveBackgroundColor: "#e07e38",
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: () => {
                            return <Feather name="database" size={30} color={"#fff"}/>
                        }
                    }}
                />
                <Tab.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{
                        tabBarActiveBackgroundColor: "#e07e38",
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: () => {
                            return <Feather name="user" size={30} color={"#fff"}/>
                        }
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


export default BottomBar;
