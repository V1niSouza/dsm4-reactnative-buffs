import React from "react";
import { Text, View} from "react-native";
import { s } from "./styles"

type Props = {
  children: string;
};

export default function TextoButton({ children } : Props) {
  return (
    <View><Text style={s.textbody}>{children}</Text></View>
    )
}
