import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, useWindowDimensions, TextInput } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { s } from "./styles";
import TextBody from "../TextBody";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import Button from "../Button";
import ModalCustom from "../ModalCustom";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../../styles/colors";
import DateInput from "../InputDate";
import TextoButton from "../TextButton";


type Props = {

};

export default function CardLot({  }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

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
            <View style={styles.cardPhoto} />
            <TextBody>Grupo</TextBody>
            <TextBody variant="secondary">-</TextBody>
            <TextBody variant="secondary">Lote 10</TextBody>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.column}>
              <TextBody variant="secondary">Quantidade de animais: 10</TextBody>
            </View>
            <View style={styles.columnTwo}>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttons}><TextoButton>Movimentação de lote</TextoButton></TouchableOpacity>
              <TouchableOpacity style={styles.buttons}><TextoButton>Definição de alimentação</TextoButton></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

         <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Mover grupo de lote:"}>
          <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(5) }}>
            <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.054 }}>
              <TextBody variant="secondary">Grupo:</TextBody>
              <TextBody>Lactando</TextBody>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
            <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
              <TextBody>Mover para o Lote:</TextBody>
              <DropDownPicker
                open={openInseminacao}
                value={valueInseminacao}
                items={itemsInseminacao}
                setOpen={setOpenInseminacao}
                setValue={setValueInseminacao}
                setItems={setItemsInseminacao}
                placeholder="Selecione"
                containerStyle={{
                  width: "100%",
                  height: RFValue(40),
                  marginBottom: RFValue(0),
                }}
                style={{
                  borderColor: colors.gray.base,
                  backgroundColor: colors.gray.fundoInput,
                  borderRadius: RFValue(10),
                }}
                dropDownContainerStyle={{
                  backgroundColor: colors.gray.fundoInput,
                  borderColor: colors.gray.base,
                  borderRadius: RFValue(10),
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
            <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
              <Button text={"Atualizar dados"}></Button>
            </View>
          </View>
      </ModalCustom>     
    </>
  );
}
