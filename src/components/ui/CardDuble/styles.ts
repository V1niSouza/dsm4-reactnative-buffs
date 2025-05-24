import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        width: width * 0.45, // Largura
        height: height * 0.09, // Altura 

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
        borderBottomColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBody:{
        backgroundColor: '#FFF',
        width: '100%', // Largura
        height: '65%', // Altura 
        borderBottomRightRadius: RFValue(10),
        borderBottomLeftRadius: RFValue(10),
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    cardPhoto: {
        backgroundColor: '#DCDCDC',
        width: RFValue(35),
        height: RFValue(35), 
        borderRadius: RFValue(60), 
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: RFValue(20),
        marginBottom:  RFValue(5)
    },
    titleCard:{
        color: colors.black.base,
        fontSize: RFValue(12),
        fontWeight: '700',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        marginLeft: 20,
        position: 'absolute',
    },
    textCard:{
        color: colors.black.base,
        fontSize: RFValue(30),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        marginStart: 30
    },
    iconCard:{
        color: 'black',
        fontSize: RFValue(25)
    }
})