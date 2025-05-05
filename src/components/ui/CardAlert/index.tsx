import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";
import Feather from '@expo/vector-icons/Feather';


type Props = {
    title: string,
    contador: string,
    footerText: string
};

export default function CardAlert({ title, contador, footerText } : Props) {
    return(
        <TouchableOpacity style={s.cardContainer}>
            <View style={s.cardTitle}>
                <Text style={s.titleCard}>{title}</Text>
                <Feather name="alert-triangle" style={s.iconCard} />
            </View>
            <View style={s.cardBody}>
                <Text style={s.textCard}>{contador}</Text>
            </View>
            <View style={s.cardFooter}>
                <Text style={s.textFooter}>{footerText}</Text>
            </View>
        </TouchableOpacity>
    )
}