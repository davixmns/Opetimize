import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {deleteMyAccount, getMyData} from "../service/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import default_image from '../assets/default_picture.jpg'

export function Profile() {
    const [user, setUser] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await getMyData(token);
                setUser(response.data);
            } catch (error) {
                alert('Erro ao carregar usuário');
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
        } catch (e) {
            console.log(e);
            Alert.alert('Erro ao sair da conta');
        }
    };

    async function handleDeleteAccount() {
        try {
            const token = await AsyncStorage.getItem('token');
            await deleteMyAccount(token);
        } catch (e) {
            console.log(e);
            Alert.alert('Erro ao deletar conta');
        }
    }

    function handleGoToEditProfile() {
        navigation.navigate('EditProfile');
    }

    function handleGoToChangePassword() {
        navigation.navigate('ChangePassword');
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={user.image ? {uri: user.image} : default_image} style={styles.profileImage}/>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleGoToEditProfile}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={styles.button} onPress={handleGoToChangePassword}>
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

    buttonText: {
        fontSize: 20,
        color: '#E49052',
        fontWeight: 'bold',
    },
});

export default Profile;
