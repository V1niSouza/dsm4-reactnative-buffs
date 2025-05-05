import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';


type Props = {
    title: string,
    contador: string,
};

export default function CardMatur({ title, contador } : Props) {
    return(
        <TouchableOpacity style={s.cardContainer}>
            <View style={s.cardTitle}>
                <Text style={s.titleCard}>{title}</Text>
                <AntDesign name="arrowright" style={s.iconCard} />
            </View>
            <View style={s.cardBody}>
                <Text style={s.textCard}>{contador}</Text>
            </View>
        </TouchableOpacity>
    )
}