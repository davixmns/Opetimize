import {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
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
import {MyButton} from "../components/MyButton";
import StarsRating from "../components/StarsRating";

function PurchaseForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [rating, setRating] = useState(0);
    const {savePurchase} = usePurchaseContext()
    const priceRef = useRef(null)
    const weightRef = useRef(null)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (name === undefined || name === '' ||
            price === undefined || price === '' ||
            weight === undefined || weight === '') {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [name, price, weight])

    function onChangePrice(text) {
        setPrice(text.replace(/[^0-9.]/g, ''))
    }

    function onChangeWeight(text) {
        setWeight(text.replace(/[^0-9.]/g, ''))
    }

    async function handleSavePurchase() {
        if (await savePurchase({name, price, weight, date, rating})) {
            setName('')
            setPrice('')
            setWeight('')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50}
                                  style={styles.container}>
                <Text style={styles.title}>Registrar Ração</Text>
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
                            onChangeText={onChangePrice}
                            inputStyle={styles.inputStyle}
                            value={price}
                            onSubmitEditing={() => weightRef.current.focus()}
                            ref={priceRef}
                        />
                        <Input
                            keyboardType={'numeric'}
                            placeholder="Peso"
                            leftIcon={<Icon name="balance-scale" size={24} color="#F19020"/>}
                            onChangeText={onChangeWeight}
                            inputStyle={styles.inputStyle}
                            value={weight}
                            ref={weightRef}
                        />
                        <AppDatePicker setDate={setDate} date={date}/>
                        <View style={styles.stars}>
                            <StarsRating rating={rating} setRating={setRating}/>
                        </View>
                        <View style={styles.button}>
                            <MyButton disabled={buttonDisabled} title={'Salvar'} onPress={handleSavePurchase}/>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )

}

export default PurchaseForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    content: {
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
        paddingTop: '3%',
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
        paddingVertical: 20,
        paddingTop: 50,
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
        marginTop: '12%',
    },
    pickerAndRating: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stars: {
        marginLeft: 10,
    }
});
