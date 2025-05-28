import React, { useEffect, useState } from "react";
import {
  RefreshControl,
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

import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import DateInput from "../components/ui/InputDate";
import CardReproducao from "../components/ui/cardReprod";
import { useAuth } from "../hooks/useAuth";
import { getAllReproductions, postReproduction } from "../services/reproductionService";

export default function ScreenReproducao() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const { token } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState('');
  const [itemsStatus, setItemsStatus] = useState([
    { label: "Cio", value: "Cio" },
    { label: "Prenha", value: "Prenha" },
    { label: "Finalizada", value: "Finalizada" },
  ]);
  const [openInseminacao, setOpenInseminacao] = useState(false);
  const [valueInseminacao, setValueInseminacao] = useState(null);
  const [itemsInseminacao, setItemsInseminacao] = useState([
    { label: "Monta Natural", value: "Monta Natural" },
    { label: "Inseminação Artificial", value: "Artificial" },
]);
  const [date, setDate] = useState<Date>(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [tagBufala, setTagBufala] = React.useState<string>('');
  const [tagTouro, setTagTouro] = React.useState<string>('');
  const [tagBezerro, setTagBezerro] = React.useState<string>('');

  const [reproducoes, setReproducoes] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!token) return; 
      try {
        setLoading(true);
        const data = await getAllReproductions(token);
        setReproducoes(data);
      } catch (error) {
        console.error("Erro ao carregar as reproduções:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [token]);
  
    const filteredBuffalos = reproducoes.filter(buffalo => 
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

  const handleCreateReproduction = async () => {
    try {
      if (!token) {
        console.error("Token não disponível");
        return;
      }

      const data = {
          tagBufala: tagBufala,
          status: valueStatus,
          tipoInseminacao: valueInseminacao,
          tagPai: tagTouro,
          tagBezerro: tagBezerro,
          vetResponsavel: ["681e836c2f3e788744f0ea69"],
          dataInseminacao: date.toISOString(),
          tagNascido: tagBezerro          
      };
      console.log(data)
      await postReproduction(data, token);
      const buffalosAtualizados = await getAllReproductions(token);
      setReproducoes(buffalosAtualizados);
      setModalVisible(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar bufalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (token) {
        const data = await getAllReproductions(token);
        setReproducoes(data);
      }
    } catch (error) {
      console.log('Erro no refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextoTitle>Carregando registro de Reproduções...</TextoTitle>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30) }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View
          style={{
            width: width,
            height: height * 0.1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BarSearch onChangeText={(text) => setSearchTerm(text)} value={searchTerm}/>
        </View>
        <View style={{ width: width, height: height * 0.05, alignItems: "center", justifyContent: "center" }}>
          <View style={{ flexDirection: "row", gap: RFValue(100) }}>
            <TextoTitle>{reproducoes.length} Registros</TextoTitle>
            <Button text="Novo" onPress={() => setModalVisible(true)} />
          </View>
        </View>
        <View style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}>
          <View style={{ marginBottom: RFValue(10) }}>
            {filteredBuffalos.map((item, index) => (
              <CardReproducao 
                key={index}
                id={item._id}
                text_tag={item.tagBufala}
                text_name={item.buffalo?.nome}
                text_sex={item.buffalo?.sexo}
                text_maturidade={item.buffalo?.maturidade}
                text_atividade={item.status}
                text_dataAtt={item.dataStatus ? formatarData(item.dataStatus): 'Sem data registrada'}
                text_raca={item.buffalo?.raca}
                text_localizacao={item.buffalo?.localizacao}
                text_grupo={item.buffalo?.grupo}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Cadastrando nova reprodução:"}>
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.054 }}>
            <TextBody>Tag Bufala:</TextBody>
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
                value={tagBufala}
                onChangeText={setTagBufala}
                />
          </View>
          <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05, zIndex: 3000}}>
            <TextBody>Selecione o status:</TextBody>
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
                    height: RFValue(30),
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
                  zIndex={1000}
                  zIndexInverse={1000}
                />
          </View>
        </View>
        {(valueStatus === "Prenha" || valueStatus === "Finalizada") && (
          <>
            {/* Tipo de reprodução */}
            <View style={{ flexDirection: "row", marginBottom: RFValue(15), zIndex: 2000 }}>
              <View style={{ flexDirection: "column", width: width * 0.88 }}>
                <TextBody>Selecione o tipo de reprodução:</TextBody>
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

            {/* Data do evento */}
            <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
              <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                <TextBody>Data do evento:</TextBody>
                <DateInput value={date} onChange={(newDate) => setDate(newDate)} />
              </View>
            </View>

            {/* Tag do Touro */}
            <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
              <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                <TextBody>Tag Touro:</TextBody>
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
                  value={tagTouro}
                  onChangeText={setTagTouro}
                />
              </View>
            </View>

            {/* Se for finalizada, aparece também a tag do bezerro */}
            {valueInseminacao === "Finalizada" && (
              <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                  <TextBody>Tag Bezerro:</TextBody>
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
                    value={tagBezerro}
                    onChangeText={setTagBezerro}
                  />
                </View>
              </View>
            )}
          </>
        )}
        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
          <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
            <Button text={"Cadastrar"} onPress={handleCreateReproduction}></Button>
          </View>
        </View>
      </ModalCustom>
    </SafeAreaView>
  );
}
