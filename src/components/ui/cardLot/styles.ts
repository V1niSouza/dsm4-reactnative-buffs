import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../styles/colors";

export const s = (width: number, height: number) => StyleSheet.create({
  container: {
      backgroundColor: colors.white.base,
      width: width*0.93, // Largura
      height: height*0.09, // Altura 
      borderRadius: 10,
      elevation: 5 // Sombra
  },
  cardTitle: {
    backgroundColor: colors.white.base,
    width: "100%", // Largura
    height: "60%", // Altura
    borderColor: "#000",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    paddingStart: RFValue(25),
    gap: RFValue(5),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  cardBody: {
    backgroundColor: colors.white.base,
    width: "100%", // Largura
    height: "40%", // Altura
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
    flexDirection: "column",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  column:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: RFValue(10),
    flexDirection: 'row',
    marginBottom: "auto"
  },
  columnTwo:{
    width: '100%',
    height: '69%',
    alignItems: 'center',
    paddingHorizontal: RFValue(1),
    flexDirection: 'column',
  },
  buttons:{
    backgroundColor: colors.yellow.base,
    width: '80%',
    height: '47%',
    borderRadius: RFValue(8),
    margin: RFValue(1),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardPhoto: {
    backgroundColor: colors.statusColor.active,
    width: width * 0.09, // Largura
    height: width * 0.09, // Altura
    borderRadius: "60%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardFundoAtividade: {
    backgroundColor: colors.yellow.base,
    marginRight: RFValue(10),
    borderRadius: RFValue(20), // bordas mais arredondadas
    height: RFValue(20), // altura fixa ou baseada em contexto
    paddingHorizontal: RFValue(12), // padding lateral
    justifyContent: "center", // centraliza o conteúdo verticalmente
  },
});
