import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const s = (width: number, height: number) => StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.yellow.base,
        width: width*0.93, // Largura
        height: height*0.21, // Altura 
        borderWidth: 0.1,
        borderColor: '#000',
        borderRadius: 10,
        elevation: 5 // Sombra
    },
    cardTitle:{
        backgroundColor: '#fff',
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
        height: "50%", // Altura 
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardFooter:{
        backgroundColor: '#fff',
        width: '100%', // Largura
        height: "20%", // Altura 
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        borderTopColor: '#000',
        borderTopWidth: 0.3, // Sombra
        
    },
    titleCard:{
        color: colors.black.base,
        fontSize: 17,
        fontWeight: '800',
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
    textFooter:{
        color: colors.black.base,
        fontSize: 18,
        fontWeight: 'normal',
        fontStyle: 'italic',
        letterSpacing: 0.2,
        marginLeft: 20,
        
    },
    iconCard:{
        color: 'black',
        position: 'absolute',
        right: 10,
        fontSize: 25
    },
})