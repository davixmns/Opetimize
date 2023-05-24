import React, {useState} from "react";
import {Text, StyleSheet, View, Modal, TextInput, ScrollView} from "react-native";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {IconButton} from "react-native-paper";
import DatePicker from "react-native-modern-datepicker";

function Card(props) {
    const today = new Date(props.date);
    const formattedDate = format(today, "dd/MM/yyyy", {locale: ptBR});
    const [showEditModal, setShowEditModal] = useState(false)
    const [name, setName] = useState(props.name)
    const [price, setPrice] = useState(props.price)
    const [weight, setWeight] = useState(props.weight)
    const [date, setDate] = useState(props.date)

    function handleDelete() {
        props.handleDelete(props.id);
        setShowEditModal(false)
    }

    function handleSaveEdit() {
        const editedPurchase = { name, price, weight, date: date};
        props.handleSaveEdit(props.id, editedPurchase);
        setShowEditModal(false);
    }



    function handleEditModalClose() {
        setShowEditModal(false);
    }

    function handleEditModalShow() {
        setShowEditModal(true)
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
                            <Icon name={"pencil"} color={"#E49052"} size={35}/>
                        )}
                        onPress={() => handleEditModalShow()}
                    />
                </View>

                <Modal visible={showEditModal} transparent={true}>
                    <View style={styles.editModal}>
                        <ScrollView style={{flex: 1, width: 300}}>
                            <Text style={styles.editModalTitle}>Editar Ração</Text>

                            <View>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Nome:</Text>
                                    <TextInput style={styles.inputText} value={name} onChangeText={setName}/>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Preço:</Text>
                                    <TextInput style={styles.inputText} value={price.toString()} onChangeText={setPrice}
                                               keyboardType={"numeric"}/>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Peso:</Text>
                                    <TextInput style={styles.inputText} value={weight.toString()}
                                               onChangeText={setWeight} keyboardType={"numeric"}/>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Data:</Text>
                                    <DatePicker style={styles.picker} mode={'calendar'} onDateChange={setDate}/>
                                </View>
                            </View>

                            <View style={styles.editModalButtons}>
                                <IconButton icon={() => (<Icon name="check-circle-outline" color={"green"} size={40}/>)}
                                            onPress={() => handleSaveEdit()}/>
                                <IconButton icon={() => (<Icon name={"close"} color={"black"} size={40}/>)}
                                            onPress={() => handleEditModalClose()}/>
                                <IconButton icon={() => (<Icon name="trash-can-outline" color={"red"} size={40}/>)}
                                            onPress={() => handleDelete()}/>
                            </View>
                        </ScrollView>
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

    editModal: {
        backgroundColor: "white",
        width: 350,
        height: 600,
        alignSelf: "center",
        alignItems: "center",
        marginTop: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 20
    },

    editModalTitle: {
        color: "#E49052",
        fontWeight: "bold",
        fontSize: 25,
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
        marginBottom: 5
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
        marginBottom: 40,
    }
});

export default Card;