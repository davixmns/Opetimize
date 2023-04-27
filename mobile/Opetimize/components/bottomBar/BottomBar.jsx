import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PurchaseHistory from "../purchaseHistory/PurchaseHistory";
import {PurchaseForm} from "../purchaseForm/PurchaseForm";
import {UsefulData} from "../usefulData/UsefulData";
import {View} from "react-native";
import {StyleSheet} from "react-native";
import {Feather} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

function BottomBar() {
    return (
        <View style={styles.bottomBar}>
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#E49052',
                        borderTopWidth: 0
                    }
                }}
            >
                <Tab.Screen
                    name="List"
                    component={PurchaseHistory}
                    options={{
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
    bottomBar: {
        bottom: 0,
        height: 50,
        width: '100%',
    }
})

export default BottomBar;
