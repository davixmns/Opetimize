import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PurchaseHistory from "../purchaseHistory/PurchaseHistory";
import {UsefulData} from "../usefulData/UsefulData";
import {StyleSheet, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import PurchaseForm from "../purchaseForm/PurchaseForm";

const Tab = createBottomTabNavigator();

function BottomBar() {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#E49052',
                        borderBottomWidth: 0,
                        height: 60
                    }
                }}>

                <Tab.Screen
                    name="List"
                    component={PurchaseHistory}
                    options={{
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
                        tabBarIcon: () => {
                            return <Feather name="plus-circle" size={30} color={"#fff"}/>
                        }
                    }}
                />
                <Tab.Screen
                    name="Data"
                    component={UsefulData}
                    options={{
                        tabBarIcon: () => {
                            return <Feather name="database" size={30} color={"#fff"}/>
                        }
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
});


export default BottomBar;
