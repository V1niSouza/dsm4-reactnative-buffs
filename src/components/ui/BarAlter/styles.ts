import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../styles/colors";

export const s = (width: number, height: number) => StyleSheet.create({
  container: {
    width: width * 0.85,
    height: height * 0.05,
    borderRadius: RFValue(12),
    paddingHorizontal: 10,
    backgroundColor: colors.gray.fundoInput,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFValue(10),
    // Sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra
  },

  button: {
    width: '45%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(9),
    borderBottomWidth: RFValue(1.4)
  }

});
