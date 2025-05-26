import React from "react";
import { SafeAreaView, View } from "react-native";
import CustomLayout from "../../../src/components/ui/CustomLayout";
import ScreenPerfil from "../../../src/screens/Perfil";

import { useLocalSearchParams } from "expo-router";

export default function Perfil() {

  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <CustomLayout title="Perfil Bufala" />
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <ScreenPerfil id={id as string} /> 
      </SafeAreaView>
    </View>
  );
}
