import {View, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

function Stars({rating}) {
    return (
        <View style={styles.container}>
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                        name={star <= rating ? 'star' : 'star-o'}
                        size={31}
                        color="#FFD700"
                        style={styles.starButton}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    starRow: {
        flexDirection: 'row',
    },
    starButton: {
        //sombra
        shadowColor: '#000',
        shadowOffset: {width: -1.5, height: 1.5},
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 0.1,
    },
});


export default Stars;