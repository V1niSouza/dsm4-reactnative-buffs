import React from 'react';
import { Modal, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { s } from "./styles";
import Button from '../Button';
import TextoTitle from '../TextoTitle';
import { Entypo } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

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
            <TouchableOpacity onPress={onClose} style={{alignItems:"flex-end"}}>
                <Entypo name={"cross"} size={RFValue(25)} color="#333" />
            </TouchableOpacity>
        <View style={styles.titleModal}>
            <TextoTitle>{title}</TextoTitle>
        </View>
        <View style={styles.bodyModal}>
            {children}
        </View>
        </View>
    </View>
    </Modal>
  );
}
