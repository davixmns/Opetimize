import { Text } from "react-native";
import { format } from 'date-fns';
import {ptBR} from "date-fns/locale";

function Card(props){
    const date = new Date(props.date);
    const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    return (
        <Text>{props.name} R${props.price} {props.weight}g {formattedDate}</Text>
    )
}

export default Card;
