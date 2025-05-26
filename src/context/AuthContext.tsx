// app/src/context/AuthContext.tsx
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

type AuthContextType = {
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const API_URL = "https://dsm4-buffs-api.vercel.app"; 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ao iniciar, tenta carregar o token salvo
  useEffect(() => {
    async function loadToken() {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        if (storedToken) {
          setToken(storedToken);
          // já configura axios para enviar o token em todas as requisições
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
      } catch (err) {
        console.log("Erro ao carregar token:", err);
      } finally {
        setLoading(false);
      }
    }
    loadToken();
  }, []);

  // Faz login: chama /auth, recebe o JWT e armazena em SecureStore
  async function signIn(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/auth`, {
        email,
        password,
      });
      const receivedToken: string = response.data.token;

      // Armazena o token no SecureStore
      await SecureStore.setItemAsync("authToken", receivedToken);
      setToken(receivedToken);

      // Configura axios para enviar o token em todas as requisições
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    } catch (err: any) {
      // Repasse a mensagem de erro para a tela de login
      throw new Error(err.response?.data?.message || "Falha ao fazer login");
    }
  }

  // Faz logout: remove o token e limpa o estado
  async function signOut() {
    await SecureStore.deleteItemAsync("authToken");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
