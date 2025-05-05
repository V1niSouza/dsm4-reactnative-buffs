import React from "react";
import { Text } from "react-native";
import { s } from "./styles"

type Props = {
  children: string;
};

export default function TextoTitle({ children } : Props) {
  return (
    <Text style={s.title}>{children}</Text>
    )
}
