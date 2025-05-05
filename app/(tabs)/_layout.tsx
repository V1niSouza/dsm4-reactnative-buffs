import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";

export default function LayoutAbas() {
  return (
    <Tabs>
      {/* Primeira aba - Página inicial */}
      <Tabs.Screen
        name="index" // Arquivo: app/index.tsx
        options={{
          title: "Início", // Nome visível na aba
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>, // Ícone dinâmico (muda de cor quando selecionado)
          // headerRight: () => ( // Botão de editar no cabeçalho
          //   <Link href="/modal" asChild>
          //     <Pressable style={{ marginRight: 15 }}> 
          //       <Text>ℹ️</Text>
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />

      {/* Segunda aba */}
      <Tabs.Screen
        name="prontuario"
        options={{
          title: "Prontuário",
          tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text>,
        }}
      />
    </Tabs>
  );
}