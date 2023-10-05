import {TextInput, View} from "react-native";

export function MyTextInput(props){
    return(
        <View>
            <TextInput
                style={props.style}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}>
            </TextInput>
        </View>
    )
}