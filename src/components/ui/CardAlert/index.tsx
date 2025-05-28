import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { s } from "./styles";

type Props = {
    title: string,
    contador: string,
    footerText: string
    onPress?: () => void;
};

export default function CardAlert({ title, contador, footerText, onPress } : Props) {
    const { width, height } = useWindowDimensions();
    const styles = s(width, height);
    return(
        <TouchableOpacity  onPress={onPress} style={styles.cardContainer}>
            <View style={styles.cardTitle}>
                <Text style={styles.titleCard}>{title}</Text>
                <Feather name="alert-triangle" style={styles.iconCard} />
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.textCard}>{contador}</Text>
            </View>
            <View style={styles.cardFooter}>
                <Text style={styles.textFooter}>{footerText}</Text>
            </View>
        </TouchableOpacity>
    )
}