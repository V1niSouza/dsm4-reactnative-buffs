import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import CardScannerTop from "../../src/components/ui/CardScannerTop";
import TextoTitle from "../../src/components/ui/TextoTitle";
import CardBuffalo from "../../src/components/ui/cardBufalo";

export default function ScreenScanner() {
  const { width, height } = useWindowDimensions();

  const [buffaloData, setBuffaloData] = useState<any | null>(null);
  const [loadingBuffalo, setLoadingBuffalo] = useState(false);

  const fetchBuffaloData = async (id: string) => {
    setLoadingBuffalo(true);
    try {
      const response = await fetch(`http://192.168.1.73:5000/buffalo/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBuffaloData(data.buffalo);
      } else {
        console.log("Búfalo não encontrado na API.");
        setBuffaloData(null);
      }
    } catch (error) {
      console.log("Erro ao buscar búfalo:", error);
      setBuffaloData(null);
    } finally {
      setLoadingBuffalo(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ width: width, height: height * 0.2 }}>
          <CardScannerTop
            text_qtdBuff={buffaloData ? "1" : "0"}
            onBuffaloFound={fetchBuffaloData}
          />
        </View>

        <View
          style={{
            width: width,
            alignItems: "center",
            marginTop: RFValue(10),
          }}
        >
          <View style={{ marginBottom: RFValue(10) }}>
            <TextoTitle>Búfalos próximos</TextoTitle>

            {loadingBuffalo && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}

            {buffaloData ? (
              <CardBuffalo
                text_tag={buffaloData.tag}
                id={buffaloData._id}
                text_name={buffaloData.nome}
                text_sex={buffaloData.sexo}
                text_grupo={buffaloData.grupo}
                text_localizacao={buffaloData.localizacao}
                text_maturidade={buffaloData.maturidade}
                text_peso={buffaloData.peso}
                text_raca={buffaloData.raca}
                text_saude={buffaloData.saude}
                text_atividade={buffaloData.atividade?.[0]?.status ?? "Sem dados"}
              />
            ) : !loadingBuffalo ? (
              <Text style={{ marginTop: 10 }}>Nenhum búfalo encontrado.</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
