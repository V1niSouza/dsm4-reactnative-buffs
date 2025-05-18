import { Link, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import LayoutSex from "../../src/components/ui/Layout/layoutSex";
import CardSex from "../../src/components/ui/CardSex";
import LayoutMatur from "../../src/components/ui/Layout/layoutMatur";
import CardMatur from "../../src/components/ui/CardMatur";
import TextoTitle from "../../src/components/ui/TextoTitle";
import CardAlert from "../../src/components/ui/CardAlert";
import { useWindowDimensions } from 'react-native'; //  Nativo do react-native e é para responsividade

export default function Index() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
  return (
    <View style={{ flex: 1, alignItems: "center"}}>
      <ScrollView>
        <View style={{ width: width, height: height*0.22, paddingHorizontal: 10, marginTop: 20}}>
          <TextoTitle>Búfalos por Sexo</TextoTitle>
          <LayoutSex>
            <CardSex title="Fêmeas" contador="3"></CardSex>
            <CardSex title="Machos" contador="2"></CardSex>
          </LayoutSex>
        </View>

        <View style={{ width: width, height: height*0.25, paddingHorizontal: 10, marginTop: 0}}>
          <TextoTitle>Búfalos por Maturidade</TextoTitle>
          <LayoutMatur>
            <CardMatur title="Bezerros" contador="3"></CardMatur>
            <CardMatur title="Novilhas" contador="3"></CardMatur>
            <CardMatur title="Adultos" contador="3"></CardMatur>
          </LayoutMatur>
        </View>

        <View style={{width: width, height: height*0.3, paddingHorizontal: 10, marginTop: 20}}>
          <CardAlert title="Alertas Pendentes" contador="3" footerText="Possui alertas"></CardAlert>
        </View>
        {/* <Button title="Ir para Home" onPress={() => router.push("/prontuario")} /> */}
      </ScrollView>
    </View>
  );
}
