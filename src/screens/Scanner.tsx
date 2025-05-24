import { SafeAreaView, ScrollView, useWindowDimensions, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CardScannerTop from "../../src/components/ui/CardScannerTop";
import TextoTitle from "../../src/components/ui/TextoTitle";
import CardBuffalo from "../../src/components/ui/cardBufalo";

export default function ScreenScanner() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ width: width, height: height * 0.2 }}>
          <CardScannerTop text_qtdBuff={"3"}></CardScannerTop>
        </View>
        <View
          style={{ width: width, alignItems: "center", marginTop: RFValue(10) }}
        >
          <View style={{ marginBottom: RFValue(10) }}>
            <View style={{ marginBottom: RFValue(10) }}>
              <TextoTitle>Búfalos próximos</TextoTitle>
            </View>
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
    </SafeAreaView>
  );
}
