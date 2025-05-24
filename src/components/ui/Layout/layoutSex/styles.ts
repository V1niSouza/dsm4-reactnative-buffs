import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../../styles/colors";

export const s = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "row", // deixa os children lado a lado
    justifyContent: "center",     
    alignItems: "center", // alinha verticalmente se tiver altura definida
    gap: RFValue(10), // se quiser espaçamento entre os blocos (React Native 0.71+)
    padding: 10,
  },
});
