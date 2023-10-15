import {View, StyleSheet, Text} from "react-native";
import {useRef, useState} from "react";
import {CircleButton} from "../components/CircleButton";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";
import {AppDatePicker} from "../components/AppDatePicker.jsx";
import StarsRating from "../components/StarsRating";

export function PurchaseDetails(purchase) {
    const {saveEditedPurchase, deletePurchaseById} = usePurchaseContext()
    const [name, setName] = useState(purchase.route.params.name)
    const [price, setPrice] = useState(purchase.route.params.price)
    const [weight, setWeight] = useState(purchase.route.params.weight)
    const [date, setDate] = useState(new Date(purchase.route.params.date))
    const [rating, setRating] = useState(purchase.route.params.rating)
    const purchase_id = purchase.route.params.purchase_id
    const navigation = useNavigation()
    const priceRef = useRef(null)
    const weightRef = useRef(null)

    async function handleSavePurchase() {
        await saveEditedPurchase({
            name,
            price,
            weight,
            date,
            rating,
            purchase_id: purchase_id
        }).then(() => {
            navigation.goBack()
        })
    }

    async function handleDeletePurchase() {
        await deletePurchaseById(purchase_id).then(() => {
            navigation.goBack()
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Ração</Text>
            <View style={styles.content}>
                <View style={styles.data}>
                    <Input
                        keyboardType={'default'}
                        placeholder="Ração/Marca"
                        leftIcon={<Icon name="pencil" size={24} color="#F19020"/>}
                        onChangeText={setName}
                        value={name}
                        onSubmitEditing={() => priceRef.current.focus()}
                    />
                    <Input
                        keyboardType={'numeric'}
                        placeholder="Valor"
                        leftIcon={<Icon name="money" size={24} color="#F19020"/>}
                        onChangeText={setPrice}
                        value={price.toString()}
                        onSubmitEditing={() => weightRef.current.focus()}
                        ref={priceRef}
                    />
                    <Input
                        keyboardType={'numeric'}
                        placeholder="Peso"
                        leftIcon={<Icon name="balance-scale" size={24} color="#F19020"/>}
                        onChangeText={setWeight}
                        value={weight.toString()}
                        ref={weightRef}
                    />
                    <AppDatePicker date={date} setDate={setDate}/>
                    <View style={styles.stars}>
                        <StarsRating rating={rating} setRating={setRating}/>
                    </View>
                </View>
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
        backgroundColor: '#F19020',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        padding: 20,
        width: '95%',
        height: '75%',
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 35,
        position: 'absolute',
        top: 0,
        marginTop: '16%',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: '20%',
        justifyContent: 'space-around',
    },
    data: {
        width: '100%',
        marginTop: '10%',
    },
    stars: {
        marginTop: '7%',
    }
})