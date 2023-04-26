import {FlatList, StyleSheet, Text, View} from 'react-native';
import PurchaseHistory from "./components/purchaseHistory/PurchaseHistory";

function App() {
  return (
    <View style={styles.container}>
    <PurchaseHistory/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E49052',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
