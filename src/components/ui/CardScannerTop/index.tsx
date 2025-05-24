import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, useWindowDimensions, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import Button from "../Button";
import TextBody from "../TextBody";
import { s } from "./styles";

type Props = {
  text_qtdBuff: string;
  onBuffaloFound: (id: string) => void;
};

export default function CardScannerTop({ text_qtdBuff, onBuffaloFound }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  const [bleManager] = useState(new BleManager());
  const [scanning, setScanning] = useState(false);

  const TARGET_ID = "68234a61bf8a65e21cfc2bd7"; // <- ID Bluetooth do dispositivo

  const startScan = () => {
    setScanning(true);

    bleManager.stopDeviceScan();

    bleManager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log("Erro no scan:", error);
        Alert.alert("Erro", "Ocorreu um erro ao escanear dispositivos.");
        setScanning(false);
        return;
      }

      if (device?.name === TARGET_ID) {
        console.log("Dispositivo encontrado:", device.name);

        bleManager.stopDeviceScan();
        setScanning(false);

        onBuffaloFound(device.name); // <- Retorna o ID para buscar na API
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardBody}>
        <View style={styles.cardPhoto}>
          <Ionicons name="scan" style={styles.iconCard} />
        </View>
        <TextBody>{text_qtdBuff} búfalos encontrados</TextBody>

        {scanning ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button text="Reiniciar Busca" onPress={startScan} />
        )}
      </View>
    </View>
  );
}
