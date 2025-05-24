import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const s = (width: number, height: number) => StyleSheet.create({
container: {
  width: width * 0.9,
  height: height * 0.05,
  borderRadius: 10,
  justifyContent: 'center',
  paddingHorizontal: 10,
  },
inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: colors.white.base,
  borderRadius: 10,
  paddingHorizontal: 10,
  flex: 1,
  },
icon: {
  marginRight: 8,
  },
input: {
  flex: 1,
  height: '100%',
  fontSize: 16,
  color: '#000',
},
})