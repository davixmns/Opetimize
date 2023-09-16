import React, {useState} from "react";
import {TouchableOpacity, useColorScheme, View, Text} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import {Input} from "react-native-elements";

export const AppDatePicker = ({date, setDate}) => {
    const colorScheme = useColorScheme();
    const maximumSelectableDate = new Date();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const toggleDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setDatePickerVisibility(false);
    };

    return (
        <TouchableOpacity onPress={toggleDatePicker} style={Styles.button}>
            <View style={Styles.inputContainer}>
                <Input
                    keyboardType={"numeric"}
                    placeholder={date ? date.toLocaleDateString() : "Selecione uma data"}
                    leftIcon={<Icon name="calendar" size={24} color="#F19020" style={{ paddingRight: 13 }} />}
                    onPressIn={toggleDatePicker}
                />
            </View>
            <DateTimePicker
                locale="pt_BR"
                maximumDate={maximumSelectableDate}
                isVisible={isDatePickerVisible}
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                mode="date"
                isDarkModeEnabled={colorScheme === "dark"}
            />
        </TouchableOpacity>
    );
};

const Styles = {
    button: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        flex: 1,
    },
};
