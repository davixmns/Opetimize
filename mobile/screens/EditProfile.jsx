import {Image, TouchableOpacity, StyleSheet, Keyboard, View} from "react-native";
import default_image from "../assets/default_picture.jpg";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../service/apiService";
import {useEffect, useRef, useState} from "react";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {Feather} from "@expo/vector-icons";
import {MyButton} from "../components/MyButton";
import {useAuthContext} from "../contexts/AuthContext";
import utils from "../utils/utils";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";
import {CircleButton} from "../components/CircleButton";

export function EditProfile(user) {
    const {saveProfile, fetchUserData} = useAuthContext()
    const [name, setName] = useState(user.route.params.name)
    const [email, setEmail] = useState(user.route.params.email)
    const [image, setImage] = useState(user.route.params.profile_image)
    const emailRef = useRef(null)
    const navigation = useNavigation()

    const showToast = (type, title, description) => {
        Toast.show({
            type: type,
            text1: title,
            text2: description,
        })
    }

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
        const userOk = utils.verifyUser(name, email)
        if (userOk !== true) return showToast('error', 'Aviso', userOk)
        console.log(image)
        const res = await saveProfile({name, email, profile_image: image})
        await fetchUserData()
        if (res) navigation.goBack()
    }

    return (
        <>
            <View style={styles.container}>
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
        </>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 150
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
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
        marginBottom: '38%',
        justifyContent: 'space-around',
    },

})