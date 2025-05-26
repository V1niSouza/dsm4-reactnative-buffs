import { useAuth } from "@/src/hooks/useAuth";
import { Stack } from "expo-router";
import React from "react";
import { AuthProvider } from "../src/context/AuthContext";

function RootRoutes() {
  const { token, loading } = useAuth();

  if (loading) {
    // Enquanto o contexto carrega (checando SecureStore), não renderiza nada
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {token ? (
        // Se há token, renderiza as rotas protegidas (tabs)
        <Stack.Screen name="(auth)" />
      ) : (
        // Se não há token, renderiza a tela de login
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootRoutes />
    </AuthProvider>
  );
}
