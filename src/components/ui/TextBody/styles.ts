import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme"
import { RFValue } from 'react-native-responsive-fontsize';

export const s = StyleSheet.create({
    textbody:{
        color: colors.black.base,
        fontSize: RFValue(13),
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.01,
    },
    textbodyclean:{
        color: colors.gray.clean,
        fontSize: RFValue(11),
        fontWeight: 'normal',
        fontStyle: 'normal',
        letterSpacing: 0.01,
    },
})