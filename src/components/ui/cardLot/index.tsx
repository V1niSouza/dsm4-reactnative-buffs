import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { colors } from "../../../styles/colors";
import TextBody from "../TextBody";
import { s } from "./styles";

type Props = {
  nomeLote: string;
  grupo: string;
  quantidade: string;
};

export default function CardLot({ nomeLote, grupo, quantidade }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  const [modalVisible, setModalVisible] = useState(false);
  const [openInseminacao, setOpenInseminacao] = useState(false);
  const [valueInseminacao, setValueInseminacao] = useState(null);
  const [itemsInseminacao, setItemsInseminacao] = useState([
    { label: "Cio", value: "cio" },
    { label: "Prenha", value: "prenha" },
    { label: "Finalizada", value: "finalizada" },
]);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);


  return (
    <>
      <View>
        <View style={ styles.container }>
          <View style={styles.cardTitle}>
            <View style={styles.cardPhoto}>
              <Ionicons name="leaf-outline" size={24} color={colors.black.base} />
            </View>
            <TextBody>{grupo}</TextBody>
            <TextBody variant="secondary">-</TextBody>
            <TextBody variant="secondary">{nomeLote}</TextBody>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.column}>
              <TextBody variant="secondary">Quantidade de animais:  {quantidade}</TextBody>
            </View>
          </View>
        </View>
      </View>    
    </>
  );
}
