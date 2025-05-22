import React from "react";
import { Platform } from "react-native";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../src/styles/colors";
import { RFValue } from "react-native-responsive-fontsize";

export default function LayoutAbas() {
  return (
    <Tabs
      screenOptions={{
        // --- CABEÇALHO (HEADER) ---
        headerStyle: {
          height: Platform.OS === "ios" ? 70 : 60,
          backgroundColor: colors.yellow.base,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: colors.black.base,
        },
        headerTitleAlign: "center",
        // headerShown: false, // se quiser esconder por completo

        // --- BARRA DE ABAS (TAB BAR) ---
        tabBarStyle: {
          height: Platform.OS === "ios" ? 65 : 65,
          paddingBottom: Platform.OS === "ios" ? 10 : 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === "ios" ?  2 : 0,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },

        // --- CORES ATIVAS / INATIVAS ---
        tabBarActiveTintColor: colors.yellow.dark,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="bufalos"
        options={{
          title: "Búfalos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reproducao"
        options={{
          title: "Reprodução",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />   

      <Tabs.Screen
        name="lactacao"
        options={{
          title: "Lactação",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lotes"
        options={{
          title: "Lotes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />   
    </Tabs>
  );
}
