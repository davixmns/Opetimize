import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {insertPurchase} from "../../service/apiService";
import DatePicker from "react-native-modern-datepicker";
import {Snackbar} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";


function PurchaseForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarSaveVisible, setSnackbarSaveVisible] = useState(false);

    function handleOnChangeName(name) {
        setName(name);
    }

    function handleOnChangePrice(price) {
        setPrice(price);
    }

    function handleOnChangeWeight(weight) {
        setWeight(weight);
    }

    function handleOnChangeDate(date) {
        setDate(date);
    }

    const handleSavePurchase = async () => {
        try {
            if (name && price && weight && date) {
                const newPurchase = { name, price, weight, date };
                const token = await AsyncStorage.getItem('token');
                await insertPurchase(newPurchase, token);
                setName('');
                setPrice('');
                setWeight('');
                setSnackbarSaveVisible(true);
                setDate(new Date());
            } else {
                setSnackbarVisible(true);
            }
        } catch (error) {
            alert('Erro ao salvar a ração');
            console.log(error);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <Text style={styles.title}>Registrar Ração</Text>
                <View style={styles.form}>

                    <Input
                        keyboardType={'default'}
                        placeholder="Ração/Marca"
                        leftIcon={<Icon name="pencil" size={24} color='#F19020'/>}
                        onChangeText={handleOnChangeName}
                        inputStyle={styles.inputStyle}
                        value={name}
                    />

                    <Input
                        keyboardType={'numeric'}
                        placeholder="Valor"
                        leftIcon={<Icon name="money" size={24} color='#F19020'/>}
                        onChangeText={handleOnChangePrice}
                        inputStyle={styles.inputStyle}
                        value={price}
                    />

                    <Input
                        keyboardType={'numeric'}
                        placeholder="Peso"
                        leftIcon={<Icon name="balance-scale" size={24} color='#F19020'/>}
                        onChangeText={handleOnChangeWeight}
                        inputStyle={styles.inputStyle}
                        value={weight}
                    />

                    <DatePicker mode={'calendar'} date={date} onDateChange={handleOnChangeDate}/>

                    <TouchableOpacity style={styles.button} onPress={handleSavePurchase}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    )
}

export default PurchaseForm

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        paddingTop: 30,
        gap: 10,
        marginTop: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        marginTop: 60,
        fontSize: 35,
        color: '#F19020',
    },
    myTextInput: {
        fontSize: 30,
        width: 300,
        height: 50,
        backgroundColor: '#F19020',
    },
    inputStyle: {
        marginLeft: 10,
        color: 'black',
        fontSize: 20,
    },
    button: {
        width: '95%',
        height: 50,
        backgroundColor: '#E49052',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        width: '95%',
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#F19020',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: '#F19020',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
    },
    buttonText2: {
        fontSize: 20,
        color: '#F19020',
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
    },
    snackBarSave: {
        backgroundColor: "green"
    },
    snackBarError: {
        backgroundColor: "red"
    }
});
