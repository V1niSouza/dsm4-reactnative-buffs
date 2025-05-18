import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";

export const s = StyleSheet.create({
    buttonContainer:{
        backgroundColor: colors.yellow.base,
        paddingHorizontal: 20,
        height: 40, // Altura
        elevation: 5, // Sombra
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.yellow.dark,
    },
    buttonText:{
        fontSize: 15,
        color: colors.black.base,
        fontStyle: 'normal',
        letterSpacing: 0.2,
        fontWeight: 'semibold'
    },
    iconCard: {
        fontSize: 20,
        color: '#000',
        marginRight: 20, // espaçamento entre o texto e o ícone
        alignSelf: 'center'
    }
})