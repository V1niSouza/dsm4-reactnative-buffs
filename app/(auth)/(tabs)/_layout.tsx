import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { colors } from "../../../src/styles/colors";
export default function LayoutAbas() {  
    const { signOut } = useAuth();
  return (
    <Tabs
      screenOptions={{
        // --- CABEÇALHO (HEADER) ---
        headerStyle: {
          height: Platform.OS === "ios" ? 90 : 80,
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
          height: Platform.OS === "ios" ? 85 : 85,
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
        headerRight: () => (
            <TouchableOpacity
              onPress={() => signOut()} style={{ marginRight: 15, marginTop: 10 }}>
              <Ionicons name="log-out-outline" size={30} color={colors.black.base} />
            </TouchableOpacity>
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
            <Ionicons name="paw-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reproducao"
        options={{
          title: "Reprodução",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sync-outline" size={size} color={color} />
          ),
        }}
      />   

      <Tabs.Screen
        name="lactacao"
        options={{
          title: "Lactação",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="water-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="lotes"
        options={{
          title: "Lotes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />   
    </Tabs>
  );
}
