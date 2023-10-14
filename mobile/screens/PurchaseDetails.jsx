import {View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import {useRef, useState} from "react";
import {CircleButton} from "../components/CircleButton";
import {usePurchaseContext} from "../contexts/PurchaseContext";
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";

export function PurchaseDetails(purchase) {
    const {saveEditedPurchase, deletePurchaseById} = usePurchaseContext()
    const [name, setName] = useState(purchase.route.params.name)
    const [price, setPrice] = useState(purchase.route.params.price)
    const [weight, setWeight] = useState(purchase.route.params.weight)
    const [date, setDate] = useState(purchase.route.params.date)
    const [rating, setRating] = useState(purchase.route.params.rating)
    const navigation = useNavigation()
    const priceRef = useRef(null)
    const weightRef = useRef(null)

    async function handleSavePurchase() {
        await saveEditedPurchase({name, price, weight, date, rating})
    }

    function onChangePrice(text) {
        const formattedText = text.replace(/[^0-9]/g, 'g')
        setPrice(formattedText)
    }

    async function handleDeletePurchase() {
        const purchase_id = purchase.route.params.purchase_id
        await deletePurchaseById(purchase_id).then(() => {
            navigation.goBack()
        })
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.content}>
                    <Text style={styles.title}>Editar Ração</Text>
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
                            onChangeText={onChangePrice}
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
                    </View>
                    <View style={styles.buttons}>
                        <CircleButton onPress={handleSavePurchase} iconName={'check'} color={'green'}/>
                        <CircleButton onPress={navigation.goBack} iconName={'x'} src={'black'}/>
                        <CircleButton onPress={handleDeletePurchase} iconName={'trash'} color={'red'}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        paddingBottom: '35%',
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
        marginVertical: '15%',
        fontSize: 35,
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
    data: {
        width: '100%',
    },
    cardData: {
        marginTop: '25%',
        backgroundColor: 'blue',
    }
})