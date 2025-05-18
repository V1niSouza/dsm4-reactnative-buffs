import React from "react";
import { s } from "./styles";
import { TouchableOpacity, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  text: string;
  onPress?: () => void;
};

export default function Button({ text, onPress }: Props) {
    const getIconName = () => {
        if (text === "Reiniciar Busca") return "reload1";
        if (text === "Novo") return "plus";
        return null;
      };
      
      const iconName = getIconName();
  return (
    <TouchableOpacity style={s.buttonContainer} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconName && <AntDesign name={iconName} style={s.iconCard} />}
        <Text style={s.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
