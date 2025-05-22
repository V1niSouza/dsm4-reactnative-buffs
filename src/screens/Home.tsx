import { ScrollView, View } from "react-native";
import LayoutSex from "../../src/components/ui/Layout/layoutSex";
import CardDuble from "../../src/components/ui/CardDuble";
import LayoutMatur from "../../src/components/ui/Layout/layoutMatur";
import CardQuad from "../../src/components/ui/CardQuad";
import TextoTitle from "../../src/components/ui/TextoTitle";
import CardAlert from "../../src/components/ui/CardAlert";
import { useWindowDimensions } from 'react-native'; //  Nativo do react-native e é para responsividade
import { RFValue } from "react-native-responsive-fontsize";

export default function ScreenHome() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
  return (
    <View style={{ flex: 1}}>
      <ScrollView>
        <View style={{ width: width, paddingHorizontal: 10, marginTop: 20 }}>
          <TextoTitle>Visão geral da propriedade:</TextoTitle>
          <LayoutSex>
            <CardDuble title="Fêmeas" contador="3"></CardDuble>
            <CardDuble title="Machos" contador="2"></CardDuble>
          </LayoutSex>
        </View>

        <View style={{ width: width, paddingHorizontal: 10 }}>
          <LayoutMatur>
            <CardQuad title="Bezerros" contador="3"></CardQuad>
            <CardQuad title="Novilhas" contador="3"></CardQuad>
            <CardQuad title="Vacas" contador="3"></CardQuad>
            <CardQuad title="Touros" contador="3"></CardQuad>
          </LayoutMatur>
        </View>

        <View style={{width: width, height: height*0.3, paddingHorizontal: 10, marginTop: 20, justifyContent: 'center'}}>
          <View style={{marginBottom: RFValue(10)}}>
            <TextoTitle>Alertas da propriedade:</TextoTitle>
          </View>
          <CardAlert title="Alertas Pendentes" contador="3" footerText="Possui alertas"></CardAlert>
        </View>
        {/* <Button title="Ir para Home" onPress={() => router.push("/prontuario")} /> */}
      </ScrollView>
    </View>
  );
}
