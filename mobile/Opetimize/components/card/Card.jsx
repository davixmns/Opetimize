import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View, Modal, Button} from "react-native";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {IconButton} from "react-native-paper";

function Card(props) {
    const date = new Date(props.date);
    const formattedDate = format(date, "dd/MM/yyyy", {locale: ptBR});
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

    function handleDelete() {
        props.handleDelete(props.id);
        setShowDeleteConfirmModal(false);
    }

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
                        icon={() => (
                            <Icon name="trash-can-outline" color={"red"} size={35}/>
                        )}
                        style={styles.icon}
                        color="red"
                        onPress={() => setShowDeleteConfirmModal(true)}
                    />
                </View>
                <Modal visible={showDeleteConfirmModal} transparent={true}>
                    <View style={styles.deleteModal}>
                        <View>
                            <Text style={{color: "white", fontSize: 20}}>
                                Tem certeza que quer deletar esta compra?
                            </Text>
                            <View style={styles.modalButtons}>
                                <Button style={styles.modalButtom} title={"Sim"} onPress={handleDelete}/>
                                <Button
                                    style={styles.modalButtom}
                                    title={"Cancelar"}
                                    onPress={() => setShowDeleteConfirmModal(false)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
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
    },
    deleteModal: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        borderRadius: 30,
        alignItems: "center",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop: 220,
        alignSelf: "center",
        backgroundColor: "#E49052",
        height: 150,
        width: 350,
        position: "absolute"
    },
    modalButtons: {
        gap: 20,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center"
    },

    modalButtom: {
        backgroundColor: "white",
        width: 200,
        height: 30,
    }
});

export default Card;
