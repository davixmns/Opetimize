import {View, Text, Image, StyleSheet, Alert,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import default_image from '../assets/default_picture.jpg';
import { useAuthContext } from '../contexts/AuthContext';
import { MyLabelButton } from '../components/MyLabelButton';

export function Profile() {
    const { user, logoutUser, deleteAccount } = useAuthContext();
    const navigation = useNavigation();
    const profileImage = user.profile_image ? { uri: user.profile_image } : default_image;

    function handleGoToEditProfile() {
        navigation.navigate('EditProfile', user);
    }

    function handleGoToChangePassword() {
        navigation.navigate('ChangePassword');
    }

    function handleLogout() {
        Alert.alert(
            'Sair',
            'Tem certeza de que deseja sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    onPress: () => logoutUser(),
                },
            ],
            { cancelable: false }
        );
    }

    function handleDeleteAccount() {
        Alert.alert(
            'Deletar Conta',
            'Tem certeza de que deseja deletar sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Deletar',
                    onPress: () => deleteAccount(),
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.button}>
                    <MyLabelButton
                        iconName={'pen-tool'}
                        label="Editar Perfil"
                        onPress={handleGoToEditProfile}
                    />
                </View>
                <View style={styles.button}>
                    <MyLabelButton
                        iconName={'lock'}
                        label="Alterar Senha"
                        onPress={handleGoToChangePassword}
                    />
                </View>
                <View style={styles.button}>
                    <MyLabelButton
                        iconName={'log-out'}
                        label="Sair"
                        onPress={handleLogout}
                    />
                </View>
                <View style={styles.button}>
                    <MyLabelButton
                        iconName={'trash-2'}
                        label="Deletar Conta"
                        onPress={handleDeleteAccount}
                    />
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
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#E49052',
        alignSelf: 'center',
        marginTop: '15%',
    },
    header: {
        marginTop: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        //sombra
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .2,
        shadowRadius: 1.41,
        elevation: 5,
    },
    content: {
        flex: 1,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginRight: 20,
        overflow: 'hidden',
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
    button: {
        padding: 20
    },
});
