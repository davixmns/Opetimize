import {Image, TouchableOpacity, StyleSheet, Keyboard, View, Text} from "react-native";
import default_image from "../assets/default_picture.jpg";
import * as ImagePicker from "expo-image-picker";
import {useRef, useState} from "react";
import {Input} from "react-native-elements";
import {Feather} from "@expo/vector-icons";
import {useAuthContext} from "../contexts/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {CircleButton} from "../components/CircleButton";

export function EditProfile(user) {
    const {saveProfile, fetchUserData} = useAuthContext()
    const [name, setName] = useState(user.route.params.name)
    const [email, setEmail] = useState(user.route.params.email)
    const [image, setImage] = useState(user.route.params.profile_image)
    const emailRef = useRef(null)
    const navigation = useNavigation()

    async function handleImagePicker() {
        const response = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 4],
            allowsEditing: true,
            base64: true,
            quality: 1
        })
        if (!response.canceled) {
            setImage(response.assets[0].uri)
            user.profile_image = image
        }
    }

    async function handleSaveProfile() {
        await saveProfile({name, email, profile_image: image})
    }

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <View style={styles.content}>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                        source={image ? {uri: image} : default_image}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <View style={styles.input}>
                    <Input
                        keyboardType={'default'}
                        placeholder="Nome"
                        leftIcon={<Feather name="user" size={24} color={'#F19020'}/>}
                        onChangeText={setName}
                        inputStyle={styles.inputStyle}
                        value={name}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />
                </View>
                <View style={styles.input}>
                    <Input
                        keyboardType={'default'}
                        placeholder="Email"
                        leftIcon={<Feather name="mail" size={24} color={'#F19020'}/>}
                        onChangeText={setEmail}
                        inputStyle={styles.inputStyle}
                        value={email}
                        onSubmitEditing={Keyboard.dismiss}
                        ref={emailRef}
                    />
                </View>
                <View style={styles.buttons}>
                    <CircleButton onPress={handleSaveProfile} iconName={'check'} color={'green'}/>
                    <CircleButton onPress={navigation.goBack} iconName={'x'} src={'black'}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5E7CC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '95%',
        height: '70%',
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
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        color: "#F19020",
        fontWeight: "bold",
        fontSize: 35,
        alignSelf: "center",
        position: 'absolute',
        top: 0,
        marginTop: "20%"
    },
    input: {
        width: '100%',
        marginTop: 20
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: '17%',
        justifyContent: 'space-around',
    },

})