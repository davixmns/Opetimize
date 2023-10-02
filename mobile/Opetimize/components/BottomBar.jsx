import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {UsefulData} from "../screens/UsefulData";
import {StatusBar, StyleSheet, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import PurchaseForm from "../screens/PurchaseForm";
import PurchaseHistory from "../screens/PurchaseHistory";
import {Profile} from "../screens/Profile";

const Tab = createMaterialTopTabNavigator();

function BottomBar() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#F19020" barStyle="light-content" translucent={false}/>
            <Tab.Navigator
                tabBarPosition={"bottom"}
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#E49052',
                        height: 80,
                    }
                }}>
                <Tab.Screen
                    name="List"
                    component={PurchaseHistory}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name="list"
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={styles.icon}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={PurchaseForm}
                    options={{
                        tabBarHideOnKeyboard: true,
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name="plus-circle"
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={styles.icon}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Data"
                    component={UsefulData}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name="bar-chart"
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={styles.icon}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name={"Profile"}
                    component={Profile}
                    options={{
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <Feather
                                name="user"
                                size={30}
                                color={focused ? '#e07e38' : '#fff'}
                                style={styles.icon}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export default BottomBar;
