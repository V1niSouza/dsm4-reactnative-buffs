import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme"
import { RFValue } from "react-native-responsive-fontsize";

export const s = StyleSheet.create({
    title:{
        color: colors.black.base,
        fontSize: RFValue(15),
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: 0.1,
    }
})