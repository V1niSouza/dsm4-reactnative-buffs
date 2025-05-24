import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import BarSearch from "../components/ui/BarSearch";
import TextoTitle from "../components/ui/TextoTitle";
import Button from "../components/ui/Button";
import CardBuffalo from "../components/ui/cardBufalo";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import { colors } from "../styles/colors";

import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import DateInput from "../components/ui/InputDate";

export default function ScreenBufalos() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const [modalVisible, setModalVisible] = useState(false);

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

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFValue(30) }}>
        <View
          style={{
            width: width,
            height: height * 0.1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BarSearch />
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
            <TextoTitle>6 Búfalos</TextoTitle>
            <Button text="Novo" onPress={() => setModalVisible(true)} />
          </View>
        </View>
        <View
          style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}
        >
          <View style={{ marginBottom: RFValue(10) }}>
            <CardBuffalo
              text_tag={"BUF006"}
              text_name={"Luna"}
              text_sex={"Fêmea"}
              text_grupo={"Gurpo A"}
              text_localizacao={"Lote 1"}
              text_maturidade={"Bezerro"}
              text_peso={"400 KG"}
              text_raca={"Murrah"}
              text_saude={"Saudável"}
              text_atividade={"Ativo"}
            ></CardBuffalo>
            <CardBuffalo
              text_tag={"BUF006"}
              text_name={"Luna"}
              text_sex={"Fêmea"}
              text_grupo={"Gurpo A"}
              text_localizacao={"Lote 1"}
              text_maturidade={"Bezerro"}
              text_peso={"400 KG"}
              text_raca={"Murrah"}
              text_saude={"Saudável"}
              text_atividade={"Ativo"}
            ></CardBuffalo>
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
            <TextBody>Data de Nascimento:</TextBody>
            <DateInput value={date} onChange={(newDate) => setDate(newDate)} />
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
            <TextInput
              style={{
                backgroundColor: colors.gray.fundoInput,
                borderRadius: RFValue(10),
                borderWidth: RFValue(0.6),
                borderColor: colors.gray.base,
                width: "100%",
                height: "100%",
              }}
              placeholder="Ex: Secagem"
              placeholderTextColor="#999"
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
            <Button text={"Cadastrar novo Bubalino"}></Button>
          </View>
        </View>
      </ModalCustom>
    </SafeAreaView>
  );
}
