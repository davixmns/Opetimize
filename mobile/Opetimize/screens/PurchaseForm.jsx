import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { createPurchase } from '../service/apiService';
import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppDatePicker } from '../components/AppDatePicker';
import feeddog from '../assets/feeddog.jpg';

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
                await createPurchase(newPurchase, token);
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Registrar Ração</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.imageView}>
                        <Image source={feeddog} style={styles.image} />
                    </View>
                    <View style={styles.form}>
                        <Input
                            keyboardType={'default'}
                            placeholder="Ração/Marca"
                            leftIcon={<Icon name="pencil" size={24} color="#F19020" />}
                            onChangeText={setName}
                            inputStyle={styles.inputStyle}
                            value={name}
                        />
                        <Input
                            keyboardType={'numeric'}
                            placeholder="Valor"
                            leftIcon={<Icon name="money" size={24} color="#F19020" />}
                            onChangeText={setPrice}
                            inputStyle={styles.inputStyle}
                            value={price}
                        />
                        <Input
                            keyboardType={'numeric'}
                            placeholder="Peso"
                            leftIcon={<Icon name="balance-scale" size={24} color="#F19020" />}
                            onChangeText={setWeight}
                            inputStyle={styles.inputStyle}
                            value={weight}
                        />
                        <AppDatePicker setDate={setDate} date={date} />
                        <TouchableOpacity style={styles.button} onPress={handleSavePurchase}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.snacks}>
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
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default PurchaseForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        width: '90%',
        gap: '10%',
        paddingTop: '10%',
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 200,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        paddingTop: '15%',
        fontSize: 35,
        color: '#F19020',
    },
    inputStyle: {
        marginLeft: 10,
        color: 'black',
        fontSize: 20,
    },
    button: {
        height: 50,
        backgroundColor: '#E49052',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#4CBB17',
        top: 3,
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
        backgroundColor: 'red',
        fontWeight: 'bold',
        top: 9,
    },
    snacks: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
