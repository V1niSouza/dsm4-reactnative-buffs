import React from "react";
import { s } from "./styles";
import { TouchableOpacity, Text, View } from "react-native";
import { useWindowDimensions } from 'react-native';
import TextoButton from "../TextButton";
import TextBody from "../TextBody";


type Props = {
    text_tag: string,
    text_name: string,
    text_sex: string,
    text_grupo: string
};
  
export default function CardBufsProx({ text_tag, text_name, text_sex, text_grupo }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardTitle}> <TextBody>{text_tag}</TextBody> </View>
        <View style={styles.cardBody}>
          <View style={styles.cardPhoto}></View>
          <View style={styles.cardBody2}>
            <TextBody>{text_name}</TextBody>
              <View style={styles.row}>
                <TextBody variant="secondary">{text_sex}</TextBody>
                <View style={styles.espacador}><Text>-</Text></View>
                <TextBody variant="secondary">{text_grupo}</TextBody>
              </View>
          </View>
        </View>
        <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionOne}><TextoButton>Registrar Saúde</TextoButton></TouchableOpacity>
            <TouchableOpacity style={styles.actionTwo}><TextoButton>Atualizar Lactação</TextoButton></TouchableOpacity>
        </View>
      </View>
    );
}
  