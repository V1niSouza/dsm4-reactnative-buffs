import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useWindowDimensions } from "react-native";
import TextoButton from "../TextButton";
import { s } from "./styles";
import { colors } from "../../../styles/colors";
import TextBody from "../TextBody";

interface Props {
  active: string;
  setActive: (value: string) => void;
}

export default function BarAlter({ active, setActive }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  return (
 <View style={styles.container}>
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: active === "observacao" ? colors.white.base : colors.gray.base, borderColor: active === "observacao" ? colors.gray.fundo : colors.gray.base }
    ]}
    onPress={() => setActive("observacao")}
  >
    <TextBody variant={active === "observacao" ? "primary" : "secondary"}>
      Em Observação
    </TextBody>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: active === "confirmadas" ? colors.white.base : colors.gray.base, borderColor: active === "confirmadas" ? colors.gray.fundo : colors.gray.base}
    ]}
    onPress={() => setActive("confirmadas")}
  >
    <TextBody variant={active === "confirmadas" ? "primary" : "secondary"}>
      Confirmadas
    </TextBody>
  </TouchableOpacity>
</View>

  );
}
