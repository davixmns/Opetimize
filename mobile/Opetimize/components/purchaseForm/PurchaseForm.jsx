import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {insertPurchase} from "../../service/apiService";

function PurchaseForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const handleSavePurchase = async () => {
        try {
            const newPurchase = {name, price, weight, date}
            await insertPurchase(newPurchase)
            console.log("ração " + name + " salva com sucesso!")
            setName("")
            setPrice("")
            setWeight("")
            setDate("")
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ração/Marca"
            />

            <Text style={styles.label}>Valor:</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="R$"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Peso:</Text>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="gramas"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleSavePurchase}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PurchaseForm

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 20,
        backgroundColor: "#F5E7CC"
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 30,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "white",
        fontSize: 18,
    },
    button: {
        backgroundColor: '#7C8046',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginTop:38,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
