import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, useWindowDimensions } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { s } from "./styles";
import TextBody from "../TextBody";
import { RFValue } from "react-native-responsive-fontsize";
import TextoButton from "../TextButton";

type Props = {
  text_tag: string,
  text_name: string,
  text_sex: string,
  text_maturidade: string,
  text_saude: string,
  text_nascimento: string,
  text_grupo: string,
  text_localizacao: string,
  text_prodLeite: string
};

export default function CardBuffalo({ text_tag, text_name, text_sex, text_maturidade, text_saude, text_nascimento, text_grupo, text_localizacao, text_prodLeite }: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);

  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // altura do corpo extra quando expandido 
  const EXTRA_HEIGHT = height * 0.23;

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
      <TouchableOpacity onPress={toggleExpand} activeOpacity={1}>
        <View style={styles.container}>
          <View style={styles.cardTitle}>
            <TextBody>{text_tag}</TextBody>
          </View>
          <View style={containerStyle}>
            <View style={styles.cardPhoto} />
            <View style={{ marginRight: RFValue(80) }}>
              <TextBody>{text_name}</TextBody>
            </View>
            <View style={{ marginLeft: RFValue(80) }}>
              <TextBody variant="secondary">{text_sex}</TextBody>
            </View>
            <Entypo name={expanded ? "chevron-small-up" : "chevron-small-down"} size={24} color="#333" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Área extra que “desliza” para baixo */}
        <Animated.View
        style={{
            height: animExtraHeight,
            overflow: 'hidden',
            width: '90%',
            alignSelf: 'center',
        }}
        >
            {showContent && (
            <View style={styles.cardFooter}>
                <View style={{ flexDirection: 'row', gap: RFValue(70), marginBottom: RFValue(5)}}>
                    <View>
                        <TextBody variant="secondary">Maturidade:</TextBody>
                        <TextBody>{text_maturidade}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Saúde:</TextBody>
                        <TextBody>{text_saude}</TextBody>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: RFValue(58), marginBottom: RFValue(5)}}>
                    <View>
                        <TextBody variant="secondary">Nascimento:</TextBody>
                        <TextBody>{text_nascimento}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Grupo:</TextBody>
                        <TextBody>{text_grupo}</TextBody>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', gap: RFValue(70), marginBottom: RFValue(5)}}>
                    <View>
                        <TextBody variant="secondary">Localização:</TextBody>
                        <TextBody>{text_localizacao}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Produção de Leite:</TextBody>
                        <TextBody>{text_prodLeite}</TextBody>
                    </View>
                </View>
                <View>
                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.actionOne}><TextoButton>Zootécnico</TextoButton></TouchableOpacity>
                        <TouchableOpacity style={styles.actionOne}><TextoButton>Sanitário</TextoButton></TouchableOpacity>
                        <TouchableOpacity style={styles.actionOne}><TextoButton>Atividade</TextoButton></TouchableOpacity>
                    </View>
                </View>

            </View>
        )}
        </Animated.View>
    </>
  );
}
