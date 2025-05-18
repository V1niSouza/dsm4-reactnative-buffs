import React from "react";
import { s } from "./styles";
import { TouchableOpacity, Text, View } from "react-native";
import { useWindowDimensions } from 'react-native';
import TextoButton from "../TextButton";
import TextBody from "../TextBody";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
    text_qtdBuff: string,
};
  
export default function CardScannerTop({ text_qtdBuff }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardBody}>
          <View style={styles.cardPhoto}><Ionicons name="scan" style={styles.iconCard} /></View>
          <TextBody>{text_qtdBuff} búfalos encontrados</TextBody>
          <Button text="Reiniciar Busca"></Button>
        </View>
      </View>
    );
}
  