import {Button, View} from "react-native";

export function MyButton(props) {
    return (
        <View>
            <Button
                onPress={props.onPress}
                style={{backgroundColor: props.backgroundColor, color: props.color, hover: props.hover}}
                title={props.title}>
            </Button>
        </View>
    );
}
