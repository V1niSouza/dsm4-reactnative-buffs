import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import Button from "../components/ui/Button";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import { colors } from "../styles/colors";

import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import CardLot from "../components/ui/cardLot";
import TextoTitle from "../components/ui/TextoTitle";
import { useAuth } from "../hooks/useAuth";
import { getLotsWithBuffalos } from "../services/LoteService";

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

  const { token } = useAuth(); 
  const [buffalos, setBuffalos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBuffalos = async () => {
      if (!token) { 
        return;
      }
      try {
        setLoading(true);
        const data = await getLotsWithBuffalos(token);
        setBuffalos(data.lots || []);
      } catch (error) {
        console.log('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBuffalos();
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextoTitle>Carregando Produções...</TextoTitle>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30), paddingTop: RFValue(30) }}>
          {buffalos.filter((item) => item.status === 'Em uso').map((item) => (
            <View key={item._id} style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}>
                <CardLot
                  nomeLote={`Lote: ${item.buffalos?.[0]?.localizacao}`} 
                  grupo={item.buffalos?.[0]?.grupo} 
                  quantidade={item.buffalos?.length || 0} />
            </View>
          ))}
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
