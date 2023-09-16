import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import {insertPurchase} from "../../service/apiService";
import {Snackbar} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {AppDatePicker} from "../datePicker/AppDatePicker";

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
                const newPurchase = {name, price, weight, date};
                const token = await AsyncStorage.getItem('token');
                await insertPurchase(newPurchase, token);
                setName('');
                setPrice('');
                setWeight('');
                setSnackbarSaveVisible(true);
                setDate('');
            } else {
                setSnackbarVisible(true);
            }
        } catch (error) {
            alert('Erro ao salvar a ração');
            console.log(error);
        }
    };

    return (
        <>
            <View style={styles.content}>
                <Text style={styles.title}>Registrar Ração</Text>
                <View style={styles.form}>
                    <Input
                        keyboardType={'default'}
                        placeholder="Ração/Marca"
                        leftIcon={<Icon name="pencil" size={24} color='#F19020'/>}
                        onChangeText={setName}
                        inputStyle={styles.inputStyle}
                        value={name}
                    />

                    <Input
                        keyboardType={'numeric'}
                        placeholder="Valor"
                        leftIcon={<Icon name="money" size={24} color='#F19020'/>}
                        onChangeText={setPrice}
                        inputStyle={styles.inputStyle}
                        value={price}
                    />

                    <Input
                        keyboardType={'numeric'}
                        placeholder="Peso"
                        leftIcon={<Icon name="balance-scale" size={24} color='#F19020'/>}
                        onChangeText={setWeight}
                        inputStyle={styles.inputStyle}
                        value={weight}
                    />

                    <AppDatePicker
                        setDate={setDate}
                        date={date}
                    />

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
                <Text style={styles.snackBarErrorLabel}>Preencha todos os campos</Text>
            </Snackbar>

            <Snackbar
                style={styles.snackBarSave}
                visible={snackbarSaveVisible}
                duration={1000}
                onDismiss={() => setSnackbarSaveVisible(false)}
            >
                <Text style={styles.snackBarSaveLabel}>Ração salva com sucesso</Text>
            </Snackbar>
        </>
    )
}

export default PurchaseForm

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '90%',
        gap: '20%',
        paddingTop: '10%',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        paddingTop: "15%",
        fontSize: 35,
        color: '#F19020',
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
        bottom: 0
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 15,
    },
    snackBarSave: {
        backgroundColor: "#4CBB17"
    },
    snackBarSaveLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    snackBarErrorLabel: {
        color: '#fff',
        fontWeight: 'bold',
    },
    snackBarError: {
        backgroundColor: "red",
        fontWeight: 'bold',
    }

});
