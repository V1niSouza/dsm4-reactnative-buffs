import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { s } from "./styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useWindowDimensions } from 'react-native';

type Props = {
    title: string,
    contador: string,
};

export default function CardMatur({ title, contador } : Props) {
    const { width, height } = useWindowDimensions();
    const styles = s(width, height);
    return(
        <TouchableOpacity style={styles.cardContainer}>
            <View style={styles.cardTitle}>
                <Text style={styles.titleCard}> {title}</Text>
                <AntDesign name="arrowright" style={styles.iconCard} />
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.textCard}>{contador}</Text>
            </View>
        </TouchableOpacity>
    )
}