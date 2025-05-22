import { StyleSheet } from "react-native";
import { colors } from "../../../styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export const s = (width: number, height: number) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.black.modalBack,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerModal: {
        width: width * 0.97,
        maxHeight: height * 0.8, // Limita sem travar
        backgroundColor: 'white',
        padding: RFValue(2),
        borderRadius: RFValue(10),
    },

    titleModal: {
        borderBottomWidth: RFValue(0.7),
        borderColor: colors.yellow.dark,
        width: "100%",
        paddingVertical: RFValue(10),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },

    bodyModal: {
        width: width,
        marginTop: RFValue(4),
        padding: RFValue(10),
    },

    footerModal:{ 
        alignSelf: 'flex-end', 

    },


})