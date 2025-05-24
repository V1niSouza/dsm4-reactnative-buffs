import React from "react";
import { Text } from "react-native";
import { s } from "./styles"

type Props = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'
};

export default function TextBody({ children, variant = 'primary'} : Props) {
  return (
    <Text style={variant === 'primary' ? s.textbody : s.textbodyclean}>{children}</Text>
    )
}
