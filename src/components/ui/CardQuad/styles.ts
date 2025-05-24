import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from 'react-native-responsive-fontsize';

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        width: width * 0.22, // Largura
        height: height * 0.081, // Altura 

        borderWidth: RFValue(0.06),
        borderColor: '#000',
        borderRadius: RFValue(10),
        elevation: RFValue(5)
    },
    cardTitle:{
        backgroundColor: '#FFF',
        width: '100%', // Largura
        height: '35%', // Altura 
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBody:{
        backgroundColor: '#FFF',
        width: '100%', // Largura
        height: '65%', // Altura 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleCard:{
        color: colors.black.base,
        fontSize: RFValue(12),
        fontWeight: '700',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        marginLeft: 1,
        position: 'absolute'
    },
    textCard:{
        color: colors.black.base,
        fontSize: RFValue(27),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.2
    },
    iconCard:{
        color: 'black',
        position: 'absolute',
        right: 10,
        fontSize: RFValue(20)
    }
})