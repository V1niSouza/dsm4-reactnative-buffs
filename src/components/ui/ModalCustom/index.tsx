import React, { Children } from 'react';
import { Modal, View, TouchableOpacity, useWindowDimensions, Text, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import TextoButton from '../TextButton';
import { s } from "./styles";
import TextBody from '../TextBody';
import Button from '../Button';
import TextoTitle from '../TextoTitle';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
};

export default function ModalCustom({ visible, onClose, title , children }: Props) {
    const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
    const styles = s(width, height);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.container}>
        <View style={styles.containerModal}>
        <View style={styles.titleModal}>
            <TextoTitle>{title}</TextoTitle>
        </View>
        <View style={styles.bodyModal}>
            {children}
        </View>
        <View style={styles.footerModal}>
            <Button text={"Fechar"} onPress={onClose}></Button>
        </View>
        </View>
    </View>
    </Modal>
  );
}
