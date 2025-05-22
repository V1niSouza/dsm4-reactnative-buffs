import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, useWindowDimensions, TextInput, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { s } from "./styles";
import TextBody from "../TextBody";
import { RFValue } from "react-native-responsive-fontsize";
import TextoButton from "../TextButton";
import { router } from "expo-router";
import Button from "../Button";


type Props = {
  text_tag: string,
  text_name: string,
  text_sex: string,
  text_maturidade: string,
  text_saude: string,
  text_grupo: string,
  text_localizacao: string,
  text_atividade: string,
  text_peso: string,
  text_raca: string
};

export default function CardBuffalo({ text_tag, text_name, text_sex, text_maturidade, text_grupo, text_localizacao, text_atividade, text_raca, text_peso}: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);
  const [modalVisibleZootecnico, setModalVisibleZootecnico] = useState(false);
  const [modalVisibleSanitario, setModalVisibleSanitario] = useState(false);
  const [modalVisibleAtividade, setModalVisibleAtividade] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [openSex, setOpenSex] = React.useState(false);
  const [valueSex, setValueSex] = React.useState(null);
  const [itemsSex, setItemsSex] = useState([
    { label: 'Ativo', value: 'Ativo' },
    { label: 'Descartado', value: 'Descarte' }
  ]);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  // altura do corpo extra quando expandido 
  const EXTRA_HEIGHT = height * 0.16;

  // anima apenas a área extra, de 0 → EXTRA_HEIGHT
  const animExtraHeight = useRef(new Animated.Value(0)).current;

    const containerStyle = [
        styles.cardBody,
        expanded && {
            borderBottomEndRadius: 0,
            borderBottomLeftRadius: 0,
        },
    ];

const toggleExpand = () => {
  if (!expanded) {
    Animated.timing(animExtraHeight, {
      toValue: EXTRA_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Atrasar a exibição do conteúdo (ex: 150ms após início da animação)
    setTimeout(() => {
      setShowContent(true);
    }, 150);
  } else {
    // Oculta o conteúdo imediatamente (ou você pode esperar a animação terminar)
    setShowContent(false);

    Animated.timing(animExtraHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  setExpanded(!expanded);
};



  return (
    <>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={1} >
        <View style={ styles.container }>
          <View style={styles.cardTitle}>
            <View style={styles.cardPhoto} />
            <TextBody>{text_tag}</TextBody>
              <TextBody>-</TextBody>
              <TextBody>{text_name}</TextBody>

          </View>
          <View style={containerStyle}>
            <View style={{ marginRight: RFValue(40), flexDirection: 'row' }}>
              <View style={styles.cardFundoAtividade}>
                <TextBody variant="secondary">{text_sex}</TextBody>
              </View>
              <View style={styles.cardFundoAtividade}>
                <TextBody variant="secondary">{text_maturidade}</TextBody>
              </View>
              <View style={styles.cardFundoAtividade}>
                <TextBody variant="secondary">{text_atividade}</TextBody>
              </View>
            </View>
            <View>
              <Entypo name={expanded ? "chevron-small-up" : "chevron-small-down"} size={24} color="#333" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Área extra que “desliza” para baixo */}
        <Animated.View
        style={{
            height: animExtraHeight,
            overflow: 'hidden',
            width: width * 0.903,
            alignSelf: 'center',
            borderBottomEndRadius: RFValue(10),
            borderBottomStartRadius: RFValue(10),
            marginBottom: RFValue(8) 
        }}
        >
            {showContent && (
            <View style={styles.cardFooter} >
                <View style={{ flexDirection: 'row', gap: RFValue(70), marginBottom: RFValue(5)}}>
                    <View>
                        <TextBody variant="secondary">Raça:</TextBody>
                        <TextBody>{text_raca}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Peso:</TextBody>
                        <TextBody>{text_peso}</TextBody>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: RFValue(58), marginBottom: RFValue(5)}}>
                    <View>
                        <TextBody variant="secondary">Localização:</TextBody>
                        <TextBody>{text_localizacao}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Grupo:</TextBody>
                        <TextBody>{text_grupo}</TextBody>
                    </View>
                </View>
                <View>
                    <View style={styles.cardActions}>
                        <Button text={"Abrir Perfil"} onPress={() => router.navigate("/perfil")}></Button>
                    </View>
                </View>
            </View>
        )}
        </Animated.View>     
    </>
  );
}
