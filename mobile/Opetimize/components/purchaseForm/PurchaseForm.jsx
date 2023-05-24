import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {insertPurchase} from "../../service/apiService";
import DatePicker from "react-native-modern-datepicker";
import { Snackbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";


function PurchaseForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarSaveVisible, setSnackbarSaveVisible] = useState(false);

    const handleSavePurchase = async () => {
        try {
            if (name && price && weight && date) {
                const newPurchase = { name, price, weight, date };
                const token = await AsyncStorage.getItem('token');
                await insertPurchase(newPurchase, token);
                setSnackbarSaveVisible(true)
                setName('');
                setPrice('');
                setWeight('');
                setDate(new Date());
            } else {
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Cadastrar Ração</Text>
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
                <Text style={styles.label}>Data:</Text>
                <DatePicker mode={'calendar'} date={date} onChange={setDate} />
                <TouchableOpacity style={styles.button} onPress={handleSavePurchase}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <Snackbar
                    visible={snackbarVisible}
                    duration={1000}
                    onDismiss={() => setSnackbarVisible(false)}
                    style={styles.snackBarError}
                >
                    Preencha todos os campos para salvar a ração
                </Snackbar>

                <Snackbar
                    style={styles.snackBarSave}
                    visible={snackbarSaveVisible}
                    duration={1000}
                    onDismiss={() => setSnackbarSaveVisible(false)}
                >
                    Ração salva com sucesso!
                </Snackbar>
            </ScrollView>
        </View>
    );
}

export default PurchaseForm

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 0,
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
        backgroundColor: '#F19020',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 38,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginBottom:20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    title: {
        marginTop: 70,
        fontSize: 30,
        paddingBottom: 20,
        color: "#F19020"
    },
    snackBarSave: {
        backgroundColor: "#E49052"
    },
    snackBarError: {
        backgroundColor: "red"
    }
});

