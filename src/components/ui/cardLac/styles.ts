import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../styles/colors";

export const s = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.9,
      height: height * 0.1,

      // Sombra
      borderRadius: RFValue(10),
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // Sombra
    },
    cardTitle: {
      backgroundColor: colors.white.base,
      width: "100%", // Largura
      height: "45%", // Altura
      borderColor: "#000",
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      paddingTop: RFValue(10),
      paddingStart: RFValue(25),
      alignItems: "center",

      gap: RFValue(5),
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    cardBody: {
      backgroundColor: colors.white.base,
      width: "100%", // Largura
      height: "55%", // Altura
      alignItems: "center",
      justifyContent: "space-between",
      paddingStart: RFValue(10),
      flexDirection: "row",
      borderBottomEndRadius: 10,
      borderBottomLeftRadius: 10,
    },
    cardFooter: {
      backgroundColor: colors.white.base,
      width: "100%", // Largura
      height: "100%", // Altura
      paddingHorizontal: RFValue(20),
      marginTop: RFValue(0.2),

      // Sombra
      borderBottomWidth: RFValue(0.8),
      borderStartWidth: RFValue(0.8),
      borderEndWidth: RFValue(0.8),
      borderColor: colors.gray.base,
      borderBottomEndRadius: RFValue(10),
      borderBottomLeftRadius: RFValue(10),
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // Sombra
    },
    cardPhoto: {
      backgroundColor: colors.yellow.base,
      width: width * 0.03, // Largura
      height: width * 0.03, // Altura
      borderRadius: "60%",
    },
    cardActions: {
      width: "100%", // Largura
      height: "50%", // Altura
      borderColor: "#000",
      alignItems: "center", // Centraliza Div filha
      flexDirection: "row-reverse",
    },
    cardFundoAtividade: {
      backgroundColor: colors.yellow.base,
      marginRight: RFValue(5),
      borderRadius: RFValue(20), // bordas mais arredondadas
      height: RFValue(20), // altura fixa ou baseada em contexto
      paddingHorizontal: RFValue(10), // padding lateral
      justifyContent: "center", // centraliza o conteúdo verticalmente
    },
  });
