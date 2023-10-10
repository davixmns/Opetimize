import {View, StyleSheet, Text} from "react-native";
import {useState} from "react";
import {CircleButton} from "../components/CircleButton";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import {useNavigation} from "@react-navigation/native";

export function PurchaseDetails(purchase) {
    const {saveEditedPurchase, deletePurchaseById} = usePurchaseContext()
    const [name, setName] = useState(purchase.route.params.name)
    const [price, setPrice] = useState(purchase.route.params.price)
    const [weight, setWeight] = useState(purchase.route.params.weight)
    const [date, setDate] = useState(purchase.route.params.date)
    const [rating, setRating] = useState(purchase.route.params.rating)
    const navigation = useNavigation()

    async function handleSavePurchase(){
        await saveEditedPurchase({name, price, weight, date, rating})
    }

    async function handleDeletePurchase(){
        const purchase_id = purchase.route.params.purchase_id
        await deletePurchaseById(purchase_id).then(() => {
            navigation.goBack()
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Editar Ração</Text>
                <Text>{name}</Text>
                <Text>{price}</Text>
                <Text>{weight}</Text>
                <Text>{date}</Text>
                <Text>{rating}</Text>
                <View style={styles.buttons}>
                    <CircleButton onPress={handleSavePurchase} iconName={'check'} color={'green'}/>
                    <CircleButton onPress={navigation.goBack} iconName={'x'} src={'black'}/>
                    <CircleButton onPress={handleDeletePurchase} iconName={'trash'} color={'red'}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: '38%',
        justifyContent: 'space-around',
    },
})