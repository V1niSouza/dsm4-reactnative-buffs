import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/ui/Button";
import CardBuffalo from "../components/ui/cardBufalo";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import TextoTitle from "../components/ui/TextoTitle";
import { colors } from "../styles/colors";

import BarSearch from "../components/ui/BarSearch";
import { useAuth } from '../hooks/useAuth';
import { getBuffalos, postBuffalo } from '../services/buffaloService';

export default function ScreenBufalos() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const [searchTerm, setSearchTerm] = useState('');

  const { token } = useAuth(); 
  const [buffalos, setBuffalos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [tag, setTag] = React.useState<string>('');
  const [nome, setNome] = React.useState<string>('');
  const [openSex, setOpenSex] = React.useState(false);
  const [valueSex, setValueSex] = React.useState(null);
  const [itemsSex, setItemsSex] = useState([
    { label: "Fêmea", value: "Fêmea" },
    { label: "Macho", value: "Macho" },
  ]);
  const [openMatur, setOpenMatur] = React.useState(false);
  const [valueMatur, setValueMatur] = React.useState(null);
  const [itemsMatur, setItemsMatur] = useState([
    { label: "Bezerro", value: "Bezerro" },
    { label: "Novilha", value: "Novilha" },
    { label: "Vaca", value: "Vaca" },
    { label: "Touro", value: "Touro" },
  ]);
  const [raca, setRaca] = React.useState<string>('');
  const [tagPai, setTagPai] = React.useState<string>('');
  const [tagMae, setTagMae] = React.useState<string>('');
  const [localizacao, setLocalizacao] = React.useState<string>('');
  const [openGrupo, setOpenGrupo] = React.useState(false);
  const [valueGrupo, setValueGrupo] = React.useState(null);
  const [itemsGrupo, setItemsGrupo] = useState([
    { label: "Em lactação", value: "Em lactação" },
    { label: "Secagem", value: "Secagem" },
    { label: "Seca", value: "Seca" },
    { label: "Pré-parto", value: "Pré-parto" },
    { label: "Bezerros", value: "Bezerros" },
  ]);

  useEffect(() => {
    const loadBuffalos = async () => {
      if (!token) { 
        return;
      }
      try {
        setLoading(true);
        const data = await getBuffalos(token);
        setBuffalos(data);
      } catch (error) {
        console.log('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBuffalos();
  }, [token]);

  const filteredBuffalos = buffalos.filter(buffalo => 
    buffalo.tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
    buffalo.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBuffalo = async () => {
    try {
      if (!token) {
        console.error("Token não disponível");
        return;
      }

      const data = {
          tag: tag,
          nome: nome,
          sexo: valueSex,
          maturidade: valueMatur,
          raca: raca,
          tagPai: tagPai,
          tagMae: tagMae,
          localizacao: localizacao,
          grupo: valueGrupo
      };
      console.log(data)
      await postBuffalo(data, token);
      const buffalosAtualizados = await getBuffalos(token);
      setBuffalos(buffalosAtualizados);

      setModalVisible(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar búfalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (token) {
        const data = await getBuffalos(token);
        setBuffalos(data);
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
        <TextoTitle>Carregando búfalos...</TextoTitle>
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
        <View
          style={{
            width: width,
            height: height * 0.05,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: RFValue(100) }}>
            <TextoTitle>{buffalos.length} Bubalinos</TextoTitle>
            <Button text="Novo" onPress={() => setModalVisible(true)} />
          </View>
        </View>
        <View style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}>
          <View style={{ marginBottom: RFValue(10) }}>
            {filteredBuffalos.map((item) => (
              <CardBuffalo
                key={item._id}
                id={item._id}
                text_tag={item.tag}           
                text_name={item.nome}           
                text_sex={item.sexo}             
                text_grupo={item.grupo}         
                text_localizacao={item.localizacao}
                text_maturidade={item.maturidade} 
                text_peso={`${item.zootecnico[0]?.peso} KG`}  
                text_raca={item.raca}          
                text_saude={item.zootecnico?.condicaoCorporal?.[0]} 
                text_atividade={item.atividade[0]?.status} 
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ModalCustom
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Cadastrando um novo Bubalino"}
      >
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
            <TextBody>Tag/Brinco:</TextBody>
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
              value={tag}
              onChangeText={setTag}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
            <TextBody>Nome:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: Bella"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(20),
            zIndex: 1000,
          }}
        >
          {/* Select de Sexo */}
          <View style={{ flexDirection: "column", width: width * 0.4 }}>
            <TextBody>Sexo:</TextBody>
            <DropDownPicker
              open={openSex}
              value={valueSex}
              items={itemsSex}
              setOpen={setOpenSex}
              setValue={setValueSex}
              setItems={setItemsSex}
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

          {/* Select de Maturidade */}
          <View style={{ flexDirection: "column", width: width * 0.45 }}>
            <TextBody>Maturidade:</TextBody>
            <DropDownPicker
              open={openMatur}
              value={valueMatur}
              items={itemsMatur}
              setOpen={setOpenMatur}
              setValue={setValueMatur}
              setItems={setItemsMatur}
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

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
            <TextBody>Raça:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: Murrah"
              placeholderTextColor="#999"
              value={raca}
              onChangeText={setRaca}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
            <TextBody>Localização:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: Ordenha"
              placeholderTextColor="#999"
              value={localizacao}
              onChangeText={setLocalizacao}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
            <TextBody>Grupo:</TextBody>
            <DropDownPicker
              open={openGrupo}
              value={valueGrupo}
              items={itemsGrupo}
              setOpen={setOpenGrupo}
              setValue={setValueGrupo}
              setItems={setItemsGrupo}
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

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
            <TextBody>Tag/Brinco Mãe:</TextBody>
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
              value={tagMae}
              onChangeText={setTagMae}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
            <TextBody>Tag/Brinco Pai:</TextBody>
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: BUF002"
              placeholderTextColor="#999"
              value={tagPai}
              onChangeText={setTagPai}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(20),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
            <Button text={"Cadastrar novo Bubalino"} onPress={handleCreateBuffalo}></Button>
          </View>
        </View>
      </ModalCustom>
    </SafeAreaView>
  );
}
