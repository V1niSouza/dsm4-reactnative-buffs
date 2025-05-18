import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "row", // deixa os children lado a lado
    justifyContent: "center",     
    alignItems: "center", // alinha verticalmente se tiver altura definida
    gap: 20, // se quiser espaçamento entre os blocos (React Native 0.71+)
    padding: 10,
  },
});
