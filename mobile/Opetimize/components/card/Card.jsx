import React, {useState} from "react";
import { Text, StyleSheet, View } from "react-native";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton } from "react-native-paper";

function Card(props) {
    const [showDeleteModal, setShowDeleModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const date = new Date(props.date);
    const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });

    return (
        <View style={styles.background}>
            <View style={styles.card}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.price}>R${props.price}</Text>
                <Text style={styles.weight}>{props.weight}g</Text>
                <View>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <View style={styles.content2}>
                    <IconButton
                        icon={(p) => <Icon name="pencil" {...p} size={35} />}
                        style={styles.icon}
                    />
                    <IconButton
                        icon={(props) => (
                            <Icon name="trash-can-outline" {...props} size={35} />
                        )}
                        style={styles.icon}
                        iconColor={'red'}
                        onPress={() => props.handleDelete(props.id)}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 150,
        width: 340,
        backgroundColor: "#FFF",
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        position: 'relative',
    },
    content2: {
        display: "flex",
        flexDirection: "row",
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 0,
        color: "#E49052"
    },
    price: {
        fontSize: 25,
        color: "#4CAF50",
        fontWeight: "bold",
    },
    weight: {
        fontSize: 20,
        color: "#333",
    },
    date: {
        alignSelf: "flex-end",
        fontSize: 17,
        color: "#777",
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 10,
    }
});

export default Card;
