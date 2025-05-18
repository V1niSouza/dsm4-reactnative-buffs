import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.yellow.base,
        width: width*0.85, // Largura
        height: height*0.17, // Altura 
        borderRadius: 10,
        marginBottom: RFValue(15),
        margin: 'auto',

        // Sombra
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5 // Sombra
        
    },
    cardTitle:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '26%', // Altura 
        borderColor: '#000',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        paddingStart: RFValue(50),
        justifyContent: 'flex-end'
    },
    cardBody:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '40%', // Altura 
        borderColor: '#000',
    },
    cardActions:{
        backgroundColor: colors.white.base,
        width: '100%', // Largura
        height: '35%', // Altura 
        borderColor: '#000',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Centraliza Div filha
        paddingHorizontal: 10
    },

    actionOne:{
        backgroundColor: colors.white.base,
        width: width * 0.36,
        height: height*0.04,
        borderWidth: RFValue(1.3),
        borderColor: colors.yellow.dark,
        borderRadius: 10,
        alignItems: 'center',       // alinha verticalmente (em row)
        justifyContent: 'center',   // alinha horizontalmente
        
    },

    actionTwo:{
        backgroundColor: colors.white.base,
        width: width*0.36, // Largura
        height: height*0.04, // Altura 
        borderWidth: RFValue(1.3),
        borderColor: colors.yellow.dark,
        borderRadius: 10,
        alignItems: 'center',       // alinha verticalmente (em row)
        justifyContent: 'center',   // alinha horizontalmente
    },
    cardPhoto:{
        backgroundColor: colors.gray.base,
        width: width*0.11, // Largura
        height: width*0.11, // Altura 
        borderWidth: width*0.002,
        borderRadius: '60%',
        marginLeft: '3%'
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
    }
})