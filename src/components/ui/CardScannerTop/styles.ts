import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        width: width*0.85, // Largura
        height: height*0.17, // Altura 
        marginBottom: RFValue(15),
        margin: 'auto',
        // Sombra
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5 // Sombra
    },
    cardBody:{
        width: '100%', // Largura
        height: '100%', // Altura 
        borderColor: '#000',
        alignItems: 'center',
        paddingTop: RFValue(10),
        gap: RFValue(2.3)
    },
    cardPhoto:{
        backgroundColor: colors.white.base,
        width: width*0.15, // Largura
        height: width*0.15, // Altura 
        borderRadius: '60%',
        alignItems: 'center',
        paddingTop: RFValue(5),
    },
    cardBody2:{
        backgroundColor: colors.white.base,
        width: '50%', // Largura
        height: '80%', // Altura 
        marginLeft: '18%',
        position: 'relative',
        top: '-50%',
    },
    row: {
        flexDirection: 'row',
    },
    espacador: {
        marginStart: 10,
        marginEnd: 10
    },
    iconCard:{
        color: colors.yellow.dark,
        fontSize: RFValue(40)
    }
})