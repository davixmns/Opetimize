import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, ScrollView, TextInput} from 'react-native';
import {deleteUserById, getUserByToken, updatePassword, updateUserById, verifyToken} from "../../service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import {IconButton} from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from 'expo-image-picker';
import default_image from '../../assets/default_picture.jpg'

export function Profile() {
    const [user, setUser] = useState({});
    const navigation = useNavigation();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCPasswordModal, setShowCPasswordModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const user = await getUserByToken(token);
                setUser(user);
                setName(user.name);
                setEmail(user.email);
                setImage(user.profile_image);
            } catch (error) {
                alert('Erro ao carregar usuário');
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    };

    function verifyEmailRegex() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function verifyForm() {
        if (!newPassword || !confirmNewPassword) {
            alert('Preencha todos os campos!')
            return false
        }
        if (!verifyEmailRegex()) {
            alert('Email inválido!')
            return false
        }
        if (newPassword !== confirmNewPassword) {
            alert('As senhas não coincidem!')
            return false
        }
        return true
    }

    async function handleSaveEditProfile() {
        const token = await AsyncStorage.getItem('token')
        if (!token || !await verifyToken(token)) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }
        try {
            user.name = name
            user.email = email
            user.profile_image = image
            console.log(user)
            await updateUserById(user.user_id, user)
            handleEditModalClose()
            await alert('Perfil Salvo!')
        } catch (e) {
            console.log(e)
            await alert('Erro ao editar perfil')
        }
    }

    async function handleSaveNewPassword() {
        const token = await AsyncStorage.getItem('token')
        if (!token || !await verifyToken(token)) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        }
        try {
            if (await verifyForm()) {
                user.password = newPassword
                await updatePassword(token, newPassword)
                handleCPasswordModalClose()
                await alert('Senha alterada com sucesso!')
            }
        } catch (e) {
            console.log(e)
            alert('Erro ao alterar senha')
        }
    }

    function handleEditModalShow() {
        setShowEditModal(true)
    }

    function handleEditModalClose() {
        setShowEditModal(false);
    }

    function handleCPasswordModalShow() {
        setShowCPasswordModal(true);
    }

    function handleCPasswordModalClose() {
        setShowCPasswordModal(false)
    }


    const handleDeleteAccount = async () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja deletar sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteUserById(user.user_id);
                            Alert.alert('Sucesso', 'Conta deletada com sucesso');
                            await AsyncStorage.removeItem('token');
                            navigation.reset({
                                index: 0,
                                routes: [{name: 'Login'}]
                            });
                        } catch (e) {
                            Alert.alert('Erro', 'Erro ao deletar conta');
                            console.log(e);
                        }
                    }
                }
            ],
            {cancelable: false}
        );
    };

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
                await updateUserById(user.user_id, user)
            } catch (e) {
                alert('Erro ao atualizar imagem')
                console.log(e)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={image ? {uri: image} : default_image} style={styles.profileImage}/>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleEditModalShow}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleCPasswordModalShow}>
                        <Text style={styles.buttonText}>Alterar Senha</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                        <Text style={styles.buttonText}>Deletar Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/*MODAL DE EDIÇÃO*/}
            <Modal visible={showEditModal} transparent={true}>
                <View style={styles.editModalContainer}>
                    <View style={styles.editModalContent}>
                        <Text style={styles.editModalTitle}>Editar Perfil</Text>
                        <TouchableOpacity onPress={handleImagePicker}>
                            <Image source={image ? {uri: image} : default_image} style={styles.profileImage2}/>
                        </TouchableOpacity>
                        <ScrollView style={{flex: 1, width: '80%'}}>
                            <View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Nome:</Text>
                                    <TextInput style={styles.inputText} value={name} onChangeText={setName}/>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email:</Text>
                                    <TextInput style={styles.inputText} value={email} onChangeText={setEmail}/>
                                </View>
                            </View>

                            <View style={styles.editModalButtons}>
                                <IconButton icon={() => (<Icon name="check-circle-outline" color={"green"} size={40}/>)}
                                            onPress={() => handleSaveEditProfile()}/>
                                <IconButton icon={() => (<Icon name={"close"} color={"black"} size={40}/>)}
                                            onPress={() => handleEditModalClose()}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </Modal>

            <Modal visible={showCPasswordModal} transparent={true}>
                <View style={styles.changePasswordContainer}>
                    <View style={styles.changePasswordContent}>
                        <Text style={styles.editModalTitle}>Alterar Senha</Text>
                        <View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Nova Senha:</Text>
                                <TextInput style={styles.inputText} value={newPassword} onChangeText={setNewPassword}/>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Confirmar Nova Senha:</Text>
                                <TextInput style={styles.inputText} value={confirmNewPassword}
                                           onChangeText={setConfirmNewPassword}/>
                            </View>
                        </View>

                        <View style={styles.editModalButtons}>
                            <IconButton icon={() => (<Icon name="check-circle-outline" color={"green"} size={40}/>)}
                                        onPress={() => handleSaveNewPassword()}/>
                            <IconButton icon={() => (<Icon name={"close"} color={"black"} size={40}/>)}
                                        onPress={() => handleCPasswordModalClose()}/>
                        </View>
                    </View>
                </View>

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginTop: "10%",
        marginLeft: 20,
    },
    item: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        padding: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginRight: 20,
        overflow: 'hidden',
    },

    profileImage2: {
        width: 130,
        height: 130,
        borderRadius: 100,
        marginRight: 20,
        marginVertical: 30,

    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
    buttonText: {
        fontSize: 20,
        color: '#E49052',
    },
    editModalContainer: {
        display: "flex",
        backgroundColor: "white",
        height: '100%',
        width: '100%',
    },

    editModalContent: {
        display: "flex",
        alignContent: "center",
        backgroundColor: "white",
        width: '100%',
        height: '100%',
        alignSelf: "center",
        alignItems: "center",
        marginTop: '26%'
    },

    editModalTitle: {
        color: "#E49052",
        fontWeight: "bold",
        fontSize: 35,
        marginTop: 20
    },

    a: {
        alignItems: "center"
    },

    b: {
        alignItems: "center",
        display: "flex",
        gap: 20,
        marginTop: 0,
        marginLeft: 140
    },

    inputTextEdit: {
        height: 30,
        width: 300,
        fontSize: 30,
    },

    inputGroup: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 20,
        color: "#333",
        marginBottom: 5,
    },
    inputText: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#999",
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: "100%"
    },
    picker: {
        width: "100%",
        marginTop: 5
    },

    editModalButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 40,
    },

    changePasswordContainer: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        width: '100%',
        height: '100%',
    },

    changePasswordContent: {
        width: '80%',
        marginTop: '50%',
    },
});

export default Profile;
