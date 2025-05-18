import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.1,
        
        // Sombra
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5 // Sombra
    },
    cardTitle:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '30%', // Altura 
        borderColor: '#000',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingStart: RFValue(25),
        justifyContent: 'flex-end'
    },
    cardBody:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '70%', // Altura
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: RFValue(7),
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
    },
    cardFooter:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '100%', // Altura
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: RFValue(10)
    },
    cardPhoto:{
        backgroundColor: colors.yellow.base,
        width: width*0.03, // Largura
        height: width*0.03, // Altura 
        borderRadius: '60%',
        marginLeft: '3%'
    },
    cardActions:{
        width: '100%', // Largura
        height: '50%', // Altura 
        borderColor: '#000',
        alignItems: 'center', // Centraliza Div filha
        flexDirection: 'row',
        gap: RFValue(3)
    },
    actionOne:{
        backgroundColor: colors.white.base,
        width: width * 0.27,
        height: height*0.037,
        borderWidth: RFValue(1.3),
        borderColor: colors.yellow.dark,
        borderRadius: RFValue(7),
        alignItems: 'center',       // alinha verticalmente (em row)
        justifyContent: 'center',   // alinha horizontalmente
    }
})