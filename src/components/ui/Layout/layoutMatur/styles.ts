import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row", // deixa os children lado a lado
    justifyContent: "space-around", // ou 'center', 'space-around' dependendo do layout
    paddingTop: 2,
    paddingStart:2
  },
});