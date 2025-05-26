// app/(auth)/_layout.tsx
import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAuth } from "../../src/hooks/useAuth"; // ajuste o caminho se necessário

export default function AuthLayout() {
  const { token, loading } = useAuth();

  // Enquanto o contexto ainda estiver carregando (verificando SecureStore), 
  // não renderize nada (ou exiba um splash, se preferir)
  if (loading) {
    return null;
  }

  // Se não estiver logado (sem token), redireciona para /login
  if (!token) {
    return <Redirect href="/login" />;
  }

  // Se estiver logado, renderiza o Stack com as Tabs
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
