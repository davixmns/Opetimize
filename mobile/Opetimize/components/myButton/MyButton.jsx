import {Button, View} from "react-native";

export function MyButton(props) {
    return (
        <View>
            <Button
                onPress={props.onPress}
                styles={props.button}
                title={props.title}>
            </Button>
        </View>
    );
}
