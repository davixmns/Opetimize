import {useEffect, useState} from 'react';
import Card from '../components/Card';
import {
    FlatList,
    TextInput,
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    RefreshControl
} from "react-native";
import * as Animatable from "react-native-animatable";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import {ReloadButtom} from "../components/ReloadButtom";
import AnimatedLottieView from "lottie-react-native";
import emptyBox from "../assets/empty_box.json";

function PurchaseHistory() {
    const {purchases, loadPurchases} = usePurchaseContext()
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadPurchases();
    }, []);

    const renderPurchase = ({item: purchase, index}) => {
        const animationDelay = index * 200;
        return (
            <Animatable.View animation="fadeInUp" delay={animationDelay}>
                <Card
                    key={purchase.purchase_id}
                    id={purchase.purchase_id}
                    name={purchase.name}
                    price={purchase.price}
                    weight={purchase.weight}
                    date={purchase.date}
                />
            </Animatable.View>
        );
    };

    const filteredPurchases = purchases ? purchases.filter(purchase => {
        const searchValueLowerCase = searchTerm.toLowerCase();
        if (purchase.name.toLowerCase().includes(searchValueLowerCase)) return true;
        if (purchase.date.includes(searchValueLowerCase)) return true;
        const dateParts = purchase.date.split("-");
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        if (day.includes(searchValueLowerCase) || month.includes(searchValueLowerCase) || year.includes(searchValueLowerCase)) {
            return true;
        }
        const monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const monthIndex = monthNames.indexOf(searchValueLowerCase);
        return monthIndex !== -1 && parseInt(month) === monthIndex + 1;
    }) : [];

    return (
        <View style={styles.background}>
            {purchases.length === 0 && (
                <View style={styles.emptyBox}>
                    <AnimatedLottieView source={emptyBox} autoPlay={true} loop={true} resizeMode={"cover"}
                                        speed={0.6}/>
                </View>
            )}
            <FlatList
                data={filteredPurchases}
                renderItem={renderPurchase}
                keyExtractor={(item) => item.purchase_id}
                ListHeaderComponent={<Text style={styles.title}>Histórico</Text>}
                contentContainerStyle={styles.contentContainer}
                refreshing={refreshing}
                onRefresh={loadPurchases}
                refreshControl={
                    <RefreshControl
                        tintColor={"white"}
                        refreshing={refreshing}
                        onRefresh={loadPurchases}
                        progressViewOffset={50}
                    />
                }
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios'? 'position': "height"} keyboardVerticalOffset={10}>
                <ReloadButtom onPress={loadPurchases}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                    placeholderTextColor={"white"}
                />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontSize: 35,
        alignSelf: "center",
        paddingVertical: 20,
        paddingTop: 50,
    },
    background: {
        flex: 1,
        backgroundColor: "#F19020",
    },
    searchInput: {
        position: "absolute",
        backgroundColor: "#E49052",
        borderRadius: 30,
        width: "70%",
        bottom: 20,
        marginLeft: "5%",
        height: 50,
        textAlign: "left",
        color: "white",
        fontSize: 17,
        paddingLeft: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontWeight: "bold"
    },
    contentContainer: {
        flexGrow: 1,
    },
    emptyBox: {
        width: "50%",
        height: "30%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{translateX: -100}, {translateY: -100}],
    }
});

export default PurchaseHistory;
