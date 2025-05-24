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
      { backgroundColor: active === "zootecnico" ? colors.white.base : colors.gray.fundoInput, borderColor: active === "zootecnico" ? colors.yellow.dark : colors.gray.base }
    ]}
    onPress={() => setActive("zootecnico")}
  >
    <TextBody variant={active === "zootecnico" ? "primary" : "secondary"}>
      Zootécnico
    </TextBody>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: active === "sanitario" ? colors.white.base : colors.gray.fundoInput, borderColor: active === "sanitario" ? colors.yellow.dark : colors.gray.base}
    ]}
    onPress={() => setActive("sanitario")}
  >
    <TextBody variant={active === "sanitario" ? "primary" : "secondary"}>
      Sanitario
    </TextBody>
  </TouchableOpacity>
</View>

  );
}
