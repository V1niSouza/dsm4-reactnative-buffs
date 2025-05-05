import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const s = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.yellow.base,
        width: 200, // Largura
        height: 150, // Altura 
        borderWidth: 0.1,
        borderColor: '#000',
        borderRadius: 10,
        elevation: 5 // Sombra
    },
    cardTitle:{
        backgroundColor: '#FFF',
        width: 200, // Largura
        height: 60, // Altura 
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomColor: '#000',
        borderBottomWidth: 0.6, // Sombra
        top: -1,
        flex: 1,
        justifyContent: 'center',

    },
    cardBody:{
        backgroundColor: '#FFF',
        width: 200, // Largura
        height: 90, // Altura 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleCard:{
        color: colors.black.base,
        fontSize: 17,
        fontWeight: '700',
        fontStyle: 'normal',
        letterSpacing: 0.2,
        marginLeft: 20,
        position: 'absolute'
    },
    textCard:{
        color: colors.black.base,
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.2
    },
    iconCard:{
        color: 'black',
        position: 'absolute',
        right: 10,
        fontSize: 25
    }
})