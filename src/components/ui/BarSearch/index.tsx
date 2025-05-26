import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TextInput, useWindowDimensions, View } from "react-native";
import { s } from "./styles";

// Adicione as tipagens para as props (opcional, mas recomendado)
interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function BarSearch({ value, onChangeText }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <AntDesign name="search1" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Pesquisa por nome ou tag..."
          placeholderTextColor="#999"
          style={styles.input}
          value={value} // Valor controlado pelo estado do pai
          onChangeText={onChangeText} // Atualiza o estado no pai
        />
      </View>
    </View>
  );
}