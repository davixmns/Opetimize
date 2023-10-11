import Icon from "react-native-vector-icons/FontAwesome";
import {TouchableOpacity, StyleSheet} from "react-native";
import * as Haptic from "expo-haptics";

export function ReloadButtom({onPress}){
    return (
        <TouchableOpacity onPress={() => {
            onPress()
            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light)
        }} style={styles.fab}>
            <Icon name="refresh" size={25} color="white"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E49052',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});