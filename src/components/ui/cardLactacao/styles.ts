import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // Sombra
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Sombra
    },
    cardTitle:{
        backgroundColor: colors.white.base,
        width: '99.8%', // Largura
        height: '25.8%', // Altura 
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingStart: RFValue(25),
        justifyContent: 'flex-end',
    },
    cardBody:{
        backgroundColor: colors.white.base,
        width: '99.8%', // Largura
        height: '35.8%', // Altura
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: RFValue(7),
    },
    cardFooter:{
        backgroundColor: colors.white.base,
        width: '99.8%', // Largura
        height: '35.8%', // Altura
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: RFValue(10),
    },
    cardPhoto:{
        backgroundColor: colors.yellow.base,
        width: width*0.03, // Largura
        height: width*0.03, // Altura 
        borderRadius: '60%',
        marginLeft: '3%'
    },

})