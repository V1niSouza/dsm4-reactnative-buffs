import { Link, useRouter } from "expo-router";
import { Button, View, Text } from "react-native";


export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tela Inicial</Text>
      {/* <Button title="Ir para Home" onPress={() => router.push("/prontuario")} /> */}
    </View>
  );
}
