import {Image, TouchableOpacity} from "react-native";
import default_image from "../assets/default_picture.jpg";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../service/apiService";
import {useState} from "react";

export function EditProfile(user) {
    const [image, setImage] = useState(user.profile_image)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)

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
            try {
                await updateUser(user)
            } catch (e) {
                alert('Erro ao atualizar imagem')
                console.log(e)
            }
        }
    }

    return (
        <>
            <TouchableOpacity onPress={handleImagePicker}>
                <Image source={image ? {uri: image} : default_image} style={styles.profileImage2}/>
            </TouchableOpacity>
        </>
    )
}