import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import PurchaseHistory from './components/purchaseHistory/PurchaseHistory';
import BottomBar from "./components/bottomBar/BottomBar";
import {NavigationContainer} from "@react-navigation/native";

function App() {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar backgroundColor="#000" barStyle="light-content" translucent={false}/>
                <PurchaseHistory/>
                <BottomBar/>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E49052',
    },
});

export default App;
