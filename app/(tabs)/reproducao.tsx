import React from "react";
import { useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View, useWindowDimensions} from "react-native";
import ModalCustom from "../../src/components/ui/ModalCustom";
import TextBody from "../../src/components/ui/TextBody";
import { colors } from "../../src/styles/colors";
import { RFValue } from "react-native-responsive-fontsize";
import CardReproducao from "../../src/components/ui/cardReproducao";
import BarSearch from "../../src/components/ui/BarSearch";

import LayoutSex from "../../src/components/ui/Layout/layoutSex";
import CardSex from "../../src/components/ui/CardSex";


export default function Reproducao() {
   const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
   const [modalVisible, setModalVisible] = useState(false);
   const [active, setActive] = useState("observacao");
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center"}}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30) }}>
        <View style={{width: width, height: height*0.1, alignItems: "center", justifyContent:"center" }}>
          <BarSearch />
        </View>
        <View style={{width: width, height: height*0.17, alignItems: "center", justifyContent:"center"}}>
          <LayoutSex>
            <CardSex title="Prenhas" contador="3" showIcon={false}></CardSex>
            <CardSex title="Não Prenhas" contador="2" showIcon={false}></CardSex>
          </LayoutSex>
        </View>
        <View style={{width: width, alignItems: "center", marginTop: RFValue(10)}}>
              <CardReproducao
                text_tag={"#9999"}
                text_name={"Luna"}
                text_gestacao={"Status: Cio"}
                desc_gesta={"Atualizado em 10/09/2024"}
              />
        </View>
      </ScrollView>

  <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Cadastrando um novo Bubalino"}>
    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.40, height: height * 0.05 }}>
        <TextBody>Tag/Brinco:</TextBody>
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

      <View style={{ flexDirection: "column", width: width * 0.45, height: height * 0.05 }}>
        <TextBody>Nome:</TextBody>
        <TextInput
          style={{
            backgroundColor: colors.gray.fundoInput,
            borderRadius: RFValue(10),
            borderWidth: RFValue(0.6),
            borderColor: colors.gray.base,
            width: '100%',
            height: '100%'
          }}
          placeholder="Ex: Bella"
          placeholderTextColor="#999"
        />
      </View>
    </View>    
  </ModalCustom>

    </SafeAreaView>
  );
}