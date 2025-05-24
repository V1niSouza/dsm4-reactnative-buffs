import React from "react";
import { View, Text, Platform } from "react-native";
import { colors } from "../../../styles/colors";

interface CustomHeaderProps {
  title: string;
}

export default function CustomHeader({ title }: CustomHeaderProps) {
  return (
    <View
      style={{
        height: Platform.OS === "ios" ? 70 : 60,
        backgroundColor: colors.yellow.base,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 20 : 0,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.black.base }}>
        {title}
      </Text>
    </View>
  );
}
