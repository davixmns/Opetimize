import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const StarsRating = ({rating, setRating}) => {
    const handleStarPress = (star) => {
        setRating(star);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Avalie a ração:</Text>
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => handleStarPress(star)}
                        style={styles.starButton}
                    >
                        <FontAwesome
                            name={star <= rating ? 'star' : 'star-o'}
                            size={45}
                            color="#FFD700"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: 'row',
    },
    starButton: {
        marginHorizontal: 5,
    },
});

export default StarsRating;
