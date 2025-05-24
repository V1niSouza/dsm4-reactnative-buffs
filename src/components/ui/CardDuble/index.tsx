import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
} from "react-native";
import { s } from "./styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  title: string;
  contador: string;
  showIcon?: boolean;
};

export default function CardDuble({ title, contador, showIcon = true }: Props) {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const styles = s(width, height);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTitle}>
        <Text style={styles.titleCard}>{title}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardPhoto}>
          {showIcon && (
            <MaterialCommunityIcons
              name="human-male-female"
              style={styles.iconCard}
            />
          )}
        </View>
        <Text style={styles.textCard}>{contador}</Text>
      </View>
    </View>
  );
}
