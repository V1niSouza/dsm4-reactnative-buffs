import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import BarSearch from "../components/ui/BarSearch";
import TextoTitle from "../components/ui/TextoTitle";
import Button from "../components/ui/Button";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import { colors } from "../styles/colors";

import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import DateInput from "../components/ui/InputDate";
import CardReproducao from "../components/ui/cardReprod";
import LayoutSex from "../components/ui/Layout/layoutSex";
import CardDuble from "../components/ui/CardDuble";
import CardLot from "../components/ui/cardLot";

export default function ScreenLotes() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const [modalVisible, setModalVisible] = useState(false);
 
  const [openInseminacao, setOpenInseminacao] = useState(false);
  const [valueInseminacao, setValueInseminacao] = useState(null);
  const [itemsInseminacao, setItemsInseminacao] = useState([
    { label: "Disponivel", value: "Disponivel" },
    { label: "Em uso", value: "Em uso" },
    { label: "Em Restauração", value: "Em Restauração" },
]);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30), paddingTop: RFValue(30) }}>
        <View style={{ width: width, height: height * 0.05, alignItems: "flex-end", justifyContent: "center", paddingHorizontal: RFValue(10) }}>
            <Button text="Novo" onPress={() => setModalVisible(true)} />
        </View>
        <View style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}>
            <CardLot/>
        </View>
      </ScrollView>

      <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Cadastrando novo Lote:"}>
        {/* Data do evento */}
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <TextBody>Nome do Lote:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: BUF001"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        {/* Tag do Touro */}
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Tamanho area:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: BUF001"
              placeholderTextColor="#999"
            />
          </View>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Unidade medida:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: BUF001"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Quantidade comporta:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: BUF001"
              placeholderTextColor="#999"
            />
          </View>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Status:</TextBody>
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
            <Button text={"Criar Lote"}></Button>
          </View>
        </View>
      </ModalCustom>
    </SafeAreaView>
  );
}
