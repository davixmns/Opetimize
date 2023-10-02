import {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppDatePicker} from '../components/AppDatePicker';
import feeddog from '../assets/feeddog.jpg';
import {usePurchaseContext} from "../contexts/PurchaseContext";

function PurchaseForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date());
    const {savePurchase} = usePurchaseContext()
    const priceRef = useRef(null)
    const weightRef = useRef(null)

    function handleSavePurchase() {
        if (!name || !price || !weight) {
            alert('Preencha todos os campos')
            return
        }
        const purchase = {name, price, weight, date}
        savePurchase(purchase)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100} style={styles.container}>
                <View>
                    <Text style={styles.title}>Registrar Ração</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.imageView}>
                        <Image source={feeddog} style={styles.image}/>
                    </View>
                    <View style={styles.form}>
                        <Input
                            keyboardType={'default'}
                            placeholder="Ração/Marca"
                            leftIcon={<Icon name="pencil" size={24} color="#F19020"/>}
                            onChangeText={setName}
                            inputStyle={styles.inputStyle}
                            value={name}
                            onSubmitEditing={() => priceRef.current.focus()}
                        />
                        <Input
                            keyboardType={'numeric'}
                            placeholder="Valor"
                            leftIcon={<Icon name="money" size={24} color="#F19020"/>}
                            onChangeText={setPrice}
                            inputStyle={styles.inputStyle}
                            value={price}
                            onSubmitEditing={() => weightRef.current.focus()}
                            ref={priceRef}
                        />
                        <Input
                            keyboardType={'numeric'}
                            placeholder="Peso"
                            leftIcon={<Icon name="balance-scale" size={24} color="#F19020"/>}
                            onChangeText={setWeight}
                            inputStyle={styles.inputStyle}
                            value={weight}
                            ref={weightRef}
                        />
                        <AppDatePicker setDate={setDate} date={date}/>
                        <TouchableOpacity style={styles.button} onPress={handleSavePurchase}>
                            <Text style={styles.buttonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    }
});
