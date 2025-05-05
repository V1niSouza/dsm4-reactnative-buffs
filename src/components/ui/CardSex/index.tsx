import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type Props = {
    title: string,
    contador: string,
};

export default function CardSex({ title, contador } : Props) {
    return(
        <TouchableOpacity style={s.cardContainer}>
            <View style={s.cardTitle}>
                <Text style={s.titleCard}>{title}</Text>
                <MaterialCommunityIcons name="human-male-female" style={s.iconCard} />
            </View>
            <View style={s.cardBody}>
                <Text style={s.textCard}>{contador}</Text>
            </View>
        </TouchableOpacity>
    )
}