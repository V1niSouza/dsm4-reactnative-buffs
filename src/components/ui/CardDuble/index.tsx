import { colors } from "@/src/styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import React from "react";
import {
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { s } from "./styles";


type StyleIconType = 'macho' | 'femea' | 'estoque' | 'retirada';

type Props = {
  title: string;
  contador: string;
  showIcon?: boolean;
  styleIcon?: StyleIconType;
};

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const iconAndColorMap: Record<StyleIconType, { iconName: IconName; bgColor: string }> = {
  macho: { iconName: "human-male", bgColor: colors.typeCard.mac },
  femea: { iconName: "human-female", bgColor: colors.typeCard.fem },
  estoque: { iconName: "archive", bgColor: colors.typeCard.est },
  retirada: { iconName: "truck-fast", bgColor: colors.typeCard.ret },
};


export default function CardDuble({ title, contador, showIcon = true, styleIcon = 'estoque' }: Props) {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const styles = s(width, height);
  const { iconName, bgColor } = iconAndColorMap[styleIcon];
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTitle}>
        <Text style={styles.titleCard}>{title}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={[styles.cardPhoto, { backgroundColor: bgColor }]}>
          {showIcon && (
            <MaterialCommunityIcons
              name={iconName}
              style={styles.iconCard}
            />
          )}
        </View>
        <Text style={styles.textCard}>{contador}</Text>
      </View>
    </View>
  );
}
