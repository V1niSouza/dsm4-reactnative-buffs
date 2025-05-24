import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { s } from "./styles";
import TextBody from "../TextBody";
import { RFValue } from "react-native-responsive-fontsize";
import TextoButton from "../TextButton";
import ModalCustom from "../ModalCustom";
import { colors } from "../../../styles/colors";
import Button from "../Button";
import DropDownPicker from "react-native-dropdown-picker";
import DateInput from "../InputDate";

type Props = {
  text_tag: string;
  text_name: string;
  text_gestacao: string;
  desc_gesta: string;
};

export default function CardLactacao({
  text_tag,
  text_name,
  text_gestacao,
  desc_gesta,
}: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  const [modalVisible, setModalVisible] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [openBuf, setOpenBuf] = useState(false);
  const [valueBuf, setValueBuf] = useState(null);
  const [itemsBuf, setItemsBuf] = useState([
    { label: "Bezerro", value: "Bezerro" },
    { label: "Novilha", value: "Novilha" },
    { label: "Vaca", value: "Vaca" },
    { label: "Touro", value: "Touro" },
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [itemsStatus, setItemsStatus] = useState([
    { label: "Bezerro", value: "Bezerro" },
    { label: "Novilha", value: "Novilha" },
    { label: "Vaca", value: "Vaca" },
    { label: "Touro", value: "Touro" },
  ]);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  return (
    <>
      <View>
        <View style={styles.container}>
          <View style={styles.cardTitle}>
            <TextBody>{text_tag}</TextBody>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardPhoto} />
            <View style={{ marginRight: RFValue(65) }}>
              <TextBody>{text_name}</TextBody>
            </View>
            <View style={{ marginRight: RFValue(10) }}>
              <TextBody variant="secondary">{text_gestacao}</TextBody>
              <TextBody variant="secondary">{desc_gesta}</TextBody>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <View style={{ flexDirection: "row", gap: RFValue(120) }}>
              <View />
              <Button text="Atualizar dados" onPress={() => setModalVisible(true)} />
            </View>
          </View>
        </View>
      </View>

      <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Atualizar dados Lactação:"}>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(15) }}>
          <View style={{ flexDirection: "column", width: width * 0.88 }}>
            <TextBody>Status:</TextBody>
            <DropDownPicker
              open={openStatus}
              value={valueStatus}
              items={itemsStatus}
              setOpen={setOpenStatus}
              setValue={setValueStatus}
              setItems={setItemsStatus}
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
              <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                  <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                      <TextBody>Quantidade (Litros):</TextBody>
                      <TextInput
                      style={{
                          backgroundColor: colors.gray.fundoInput,
                          borderRadius: RFValue(10),
                          borderWidth: RFValue(0.6),
                          borderColor: colors.gray.base,
                          width: '100%',
                          height: '100%'
                      }}
                      placeholder="Ex: BUF001"
                      placeholderTextColor="#999"
                      />
                  </View>
              </View>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <TextBody>Data do evento:</TextBody>
            <DateInput value={date} onChange={(newDate) => setDate(newDate)} />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
            <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                <TextBody>Observação:</TextBody>
                <TextInput
                style={{
                    backgroundColor: colors.gray.fundoInput,
                    borderRadius: RFValue(10),
                    borderWidth: RFValue(0.6),
                    borderColor: colors.gray.base,
                    width: '100%',
                    height: '100%'
                }}
                placeholder="Ex: BUF001"
                placeholderTextColor="#999"
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
