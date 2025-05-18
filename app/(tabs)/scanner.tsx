import { ScrollView, View, SafeAreaView} from "react-native";
import CardBufsProx from "../../src/components/ui/CardBufsProx";
import { useWindowDimensions } from 'react-native'; //  Nativo do react-native e é para responsividade
import TextoTitle from "../../src/components/ui/TextoTitle";
import { RFValue } from "react-native-responsive-fontsize";
import CardScannerTop from "../../src/components/ui/CardScannerTop";

export default function Scanner() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView>
        <View style={{width: width, height: height*0.2}}>
          <CardScannerTop text_qtdBuff={"3"}></CardScannerTop>
        </View>
          <View style={{width: width, height: height*0.74,paddingHorizontal: 10, paddingBottom: RFValue(100)}}>
                <TextoTitle>Búfalos próximos</TextoTitle>
                <CardBufsProx text_tag={"#9999"} text_name={"Luna"} text_sex={"Fêmea"} text_grupo={"Gurpo A"}></CardBufsProx>
                <CardBufsProx text_tag={"a"} text_name={"b"} text_sex={"v"} text_grupo={"d"}></CardBufsProx>
                <CardBufsProx text_tag={"a"} text_name={"b"} text_sex={"v"} text_grupo={"d"}></CardBufsProx>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}