import React from "react";
import { s } from "./styles";
import { View, TextInput,  } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useWindowDimensions } from 'react-native';


export default function BarSearch() {
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
        />
      </View>
    </View>
  );
}
