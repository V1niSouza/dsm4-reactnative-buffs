import React from "react";
import CustomLayout from "../../src/components/ui/CustomLayout";
import { SafeAreaView, View } from "react-native";
import ScreenPerfil from "../../src/screens/Perfil";
import { RFValue } from "react-native-responsive-fontsize";

export default function Perfil() {
  return (
    <View style={{ flex: 1 }}>
      <CustomLayout title="Perfil Bufala" />
      <SafeAreaView style={{ alignItems: "center" }}>
        <ScreenPerfil />
      </SafeAreaView>
    </View>
  );
}
