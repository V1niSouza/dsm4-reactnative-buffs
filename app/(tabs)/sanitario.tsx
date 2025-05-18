import React, { useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View, useWindowDimensions, StyleSheet } from "react-native";
import BarSearch from "../../src/components/ui/BarSearch";
import TextoTitle from "../../src/components/ui/TextoTitle";
import Button from "../../src/components/ui/Button";
import CardBuffalo from "../../src/components/ui/cardBufalo";
import ModalCustom from "../../src/components/ui/ModalCustom";
import TextBody from "../../src/components/ui/TextBody";
import { colors } from "../../src/styles/colors";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import RadioButtonGroup from "../../src/components/ui/RadioButton";
import DateInput from "../../src/components/ui/InputDate";

export default function Sanitario() {
  const { width, height } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [retorno, setRetorno] = useState<string | null>(null);
  const [retornoDate, setRetornoDate] = useState<Date>(new Date());

  const styles = s(width, height);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", paddingTop: RFValue(30) }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={[styles.row, { marginBottom: RFValue(30) }]}>
            <View style={[styles.column, { width: width * 0.40, height: height * 0.05 }]}>
              <TextBody>Doença Combatida:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: BUF001"
                placeholderTextColor="#999"
              />
            </View>
            <View style={[styles.column, { width: width * 0.45, height: height * 0.05 }]}>
              <TextBody>Tipo de Tratamento:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bella"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={[styles.row, { marginBottom: RFValue(30) }]}>
            <View style={[styles.column, { width: width * 0.88, height: height * 0.05 }]}>
              <TextBody>Medicação Aplicada:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: BUF001"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={[styles.row, { marginBottom: RFValue(30) }]}>
            <View style={[styles.column, { width: width * 0.40, height: height * 0.05 }]}>
              <TextBody>Dosagem:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: BUF001"
                placeholderTextColor="#999"
              />
            </View>
            <View style={[styles.column, { width: width * 0.45, height: height * 0.05 }]}>
              <TextBody>Unidade Medida:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: Bella"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={[styles.row, { marginBottom: RFValue(30) }]}>
            <RadioButtonGroup
              label="Necessidade de Retorno?"
              options={[
                { label: "Sim", value: "sim" },
                { label: "Não", value: "nao" },
              ]}
              selectedValue={retorno}
              onValueChange={setRetorno}
            />
          </View>

            {retorno === "sim" && (
            <View style={[styles.row, { marginBottom: RFValue(30) }]}>
                <View style={[styles.column, { width: width * 0.88 }]}>
                <DateInput
                    label="Data do Retorno"
                    value={retornoDate}
                    onChange={(date) => setRetornoDate(date)}
                />
                </View>
            </View>
            )}

        
          <View style={[styles.row, { marginBottom: RFValue(30) }]}>
            <View style={[styles.column, { width: width * 0.88, height: height * 0.05 }]}>
              <TextBody>Observação:</TextBody>
              <TextInput
                style={styles.input}
                placeholder="Ex: BUF001"
                placeholderTextColor="#999"
              />
            </View>
          </View>

            <View style={[styles.row, { marginBottom: RFValue(20) }]}>
            <View style={[styles.column, { width: width * 0.88, height: height * 0.05 }]}>
                <Button
                text={"Atualizar dados"}
                onPress={() => {
                    if (retorno === "sim" && !retornoDate) {
                    alert("Por favor, selecione a data de retorno.");
                    return;
                    }
                    router.push("/bufalos");
                }}
                />
            </View>
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export const s = (width: number, height: number) => StyleSheet.create({
  container: {
    width: width * 0.96,
    maxHeight: height * 0.8,
    backgroundColor: 'white',
    padding: RFValue(10),
    borderRadius: RFValue(10),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: RFValue(30),
  },
  row: {
    flexDirection: "row",
    gap: RFValue(10),
  },
  column: {
    flexDirection: "column",
  },
  input: {
    backgroundColor: colors.gray.fundoInput,
    borderRadius: RFValue(10),
    borderWidth: RFValue(0.6),
    borderColor: colors.gray.base,
    width: "100%",
    height: "100%",
  },
  textArea: {
    backgroundColor: colors.gray.fundoInput,
    borderRadius: RFValue(10),
    borderWidth: RFValue(0.6),
    borderColor: colors.gray.base,
    width: "100%",
    height: RFValue(50),
    textAlignVertical: "top",
  },
});
