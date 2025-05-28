import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";
import BarSearch from "../components/ui/BarSearch";
import Button from "../components/ui/Button";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import TextoTitle from "../components/ui/TextoTitle";
import { colors } from "../styles/colors";

import { RFValue } from "react-native-responsive-fontsize";
import CardDuble from "../components/ui/CardDuble";
import CardLactacao from "../components/ui/cardLac";
import DateInput from "../components/ui/InputDate";
import LayoutSex from "../components/ui/Layout/layoutSex";

import { useAuth } from "../hooks/useAuth";
import { getAllLactations } from "../services/lactationService";
import { getAllProductions, postProduction } from "../services/productionService";

export default function ScreenLactacao() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const [loading, setLoading] = useState(true);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [empresa, setEmpresa] = React.useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [quantidadeColeta, setQuantidadeColeta] = React.useState<number>(0);
  const [result, setResult] = React.useState<string>('');
  const [desc, setDesc] = React.useState<string>(''); 
  const [pago, setPago] = React.useState<number>(0);
  const { token } = useAuth(); 
  const [lactations, setLactations] = useState<any[]>([]);
  const [productions, setProductions] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!token) return; 
      try {
        setLoading(true);
        const data = await getAllLactations(token);
        setLactations(data);
      } catch (error) {
        console.error("Erro ao carregar as lactações:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);

  const handleCreateColeta = async () => {
    try {
      const id = "682570d083ef13b94d6fd202";

      if (!token || !id) {
        console.error("Token ou ID não disponível");
        return;
      }

      const data = {
        dataAtualizacao: new Date().toISOString(),
        coletas: [{
          dataColeta: date.toISOString(),
          quantidadeColetada: quantidadeColeta,
          empresaColeta: empresa,
          valorPago: pago,
          resultado: result,
          desc: desc
        }]
      };
      console.log(data)
      const response = await postProduction(data, id, token);
      setModalVisible(true);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar búfalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!token) return; 
      try {
        const data = await getAllProductions(token);
        setProductions(data);
      } catch (error) {
        console.error("Erro ao carregar as produções:", error);
      }
    };
    loadData();
  }, [token]);

      const filteredBuffalos = lactations.filter(buffalo => 
  buffalo.tagBufala.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatarData = (dataString: string | Date | undefined): string => {
    if (!dataString) return 'Data não disponível';
    
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextoTitle>Carregando Produções...</TextoTitle>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30) }}>
        <View style={{ width: width, height: height * 0.2, alignItems: "center", justifyContent: "center" }}>
          <LayoutSex>
            <CardDuble title="Estoque" styleIcon="estoque" contador={`${productions[0]?.estoqueAtual ?? 0} L.`}></CardDuble>
            <CardDuble title="Ultima Retirada" styleIcon="retirada" contador={`${productions[0]?.coletas[0]?.quantidadeColetada ?? 0} L.`}></CardDuble>
          </LayoutSex>
          <BarSearch onChangeText={(text) => setSearchTerm(text)} value={searchTerm}/>
        </View>
        <View style={{ width: width, height: height * 0.05, alignItems: "center", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", gap: RFValue(100) }}>
            <TextoTitle>{lactations.length} Registros</TextoTitle>
            <Button text="Novo" onPress={() => setModalVisible(true)} />
          </View>
        </View>
        <View style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}>
          <View style={{ marginBottom: RFValue(10) }}>
            {filteredBuffalos.map((item, index) => (
              <CardLactacao 
                key={index}
                text_tag={item.tagBufala}
                text_name={item.buffalo?.nome}
                text_maturidade={item.buffalo?.maturidade}
                text_atividade={item.status}
                text_dataAtt={item.dataAtualizacao ? formatarData(item.dataAtualizacao): 'Sem data registrada'}
                text_localizacao={item.buffalo?.localizacao}
                text_grupo={item.buffalo?.grupo}
              />
              ))}
          </View>
        </View>
      </ScrollView>

      <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Cadastrando nova Coleta:"}>
        {/* Data do evento */}
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Nome empresa:</TextBody>
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
              value={empresa}
              onChangeText={setEmpresa}
            />
          </View>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Data da coleta:</TextBody>
            <DateInput value={date} onChange={(newDate) => setDate(newDate)} />
          </View>
        </View>
        {/* Tag do Touro */}
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Quantidade Coletada:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: 1000"
              placeholderTextColor="#999"
              value={quantidadeColeta ? String(quantidadeColeta) : ''}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setQuantidadeColeta(numericValue);
                } else {
                  setQuantidadeColeta(0);
                }
              }}
              keyboardType="numeric"
            />
          </View>

          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05 }}>
            <TextBody>Valor pago:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: 1.000,00"
              placeholderTextColor="#999"
              value={pago ? String(pago) : ''}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setPago(numericValue);
                } else {
                  setPago(0);
                }
              }}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <TextBody>Resultado:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: 1000"
              placeholderTextColor="#999"
              value={result}
              onChangeText={setResult}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <TextBody>Descrição:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: 1000"
              placeholderTextColor="#999"
              value={desc}
              onChangeText={setDesc}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <Button text={"Atualizar dados"} onPress={handleCreateColeta}></Button>
          </View>
        </View>
      </ModalCustom>
    </SafeAreaView>
  );
}
