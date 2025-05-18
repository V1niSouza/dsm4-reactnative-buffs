import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from 'react-native-responsive-fontsize';

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.yellow.base,
        width: width*0.28, // Largura
        height: height*0.13, // Altura 
        borderWidth: 0.1,
        borderColor: '#FFF',
        borderRadius: 10,
        elevation: 5 // Sombra
    },
    cardTitle:{
        backgroundColor: '#FFF',
        width: '100%', // Largura
        height: '30%', // Altura 
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 0.6, // Sombra
        justifyContent: 'center',
    },
    cardBody:{
        backgroundColor: '#FFF',
        width: '100%', // Largura
        height: '70%', // Altura 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleCard:{
        color: colors.black.base,
        fontSize: RFValue(13),
        fontWeight: '700',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        marginLeft: 1,
        position: 'absolute'
    },
    textCard:{
        color: colors.black.base,
        fontSize: RFValue(30),
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