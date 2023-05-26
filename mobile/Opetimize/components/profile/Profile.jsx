import React, {useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function Profile(){


    const handleLogout = () => {
        // Lógica para fazer logout
    };

    const handleDeleteAccount = () => {
        // Lógica para deletar a conta
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/logo.png')} style={styles.profileImage} />

                <View style={styles.userInfo}>
                    <Text style={styles.username}>John Doe</Text>
                    <Text style={styles.email}>johndoe@example.com</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Nome:</Text>
                    <Text style={styles.infoValue}>John Doe</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>johndoe@example.com</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Data de Nascimento:</Text>
                    <Text style={styles.infoValue}>10 de janeiro de 1990</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Sair da Conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
                    <Text style={styles.buttonText}>Deletar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginTop: 70,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
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
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#F19020',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Profile;
