import { Entypo } from '@expo/vector-icons';
import React, { useRef, useState } from "react";
import { Animated, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { colors } from "../../../styles/colors";
import Button from "../Button";
import DateInput from "../InputDate";
import ModalCustom from "../ModalCustom";
import TextBody from "../TextBody";
import { s } from "./styles";

type Props = {
  id: string
  text_tag: string,
  text_name: string,
  text_sex: string,
  text_maturidade: string,
  text_grupo: string,
  text_localizacao: string,
  text_atividade: string,
  text_raca: string,
  text_dataAtt: string
};

export default function CardReproducao({ id, text_tag, text_name, text_sex, text_maturidade, text_atividade, text_grupo, text_dataAtt, text_raca, text_localizacao}: Props) {
  const { width, height } = useWindowDimensions();
  const styles = s(width, height);
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [valueStatus, setValueStatus] = useState(null);
  const [itemsStatus, setItemsStatus] = useState([
    { label: "Monta Natural", value: "Monta Natural" },
    { label: "Inseminação Artificial", value: "IA" },
    { label: "I.A Forçada", value: "IATF" },
  ]);
  
  const [openInseminacao, setOpenInseminacao] = useState(false);
  const [valueInseminacao, setValueInseminacao] = useState(null);
  const [itemsInseminacao, setItemsInseminacao] = useState([
    { label: "Cio", value: "cio" },
    { label: "Prenha", value: "prenha" },
    { label: "Finalizada", value: "finalizada" },
]);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);



  // altura do corpo extra quando expandido 
  const EXTRA_HEIGHT = height * 0.18;

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

  const getStatusColor = () => {
    const status = text_atividade?.toLowerCase();
    if (status?.includes('finalizada')) return colors.statusColor.inactive;
    if (status?.includes('prenha')) return colors.statusColor.active;
    return colors.statusColor.default;
  };

    const atividadeStyle = {
    ...styles.cardFundoAtividade,
    backgroundColor: getStatusColor()
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
            <View style={{ marginRight: RFValue(0), flexDirection: 'row'}}>
              <View style={styles.cardFundoAtividade}>
                <TextBody variant="secondary">{text_sex}</TextBody>
              </View>
              <View style={styles.cardFundoAtividade}>
                <TextBody variant="secondary">{text_maturidade}</TextBody>
              </View>
              <View style={atividadeStyle}>
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
                <View style={{ flexDirection: 'row', gap: RFValue(78), marginBottom: RFValue(15)}}>
                    <View>
                        <TextBody variant="secondary">Raça:</TextBody>
                        <TextBody>{text_raca}</TextBody>
                    </View>
                    <View>
                        <TextBody variant="secondary">Data Atualização:</TextBody>
                        <TextBody>{text_dataAtt}</TextBody>
                    </View>
                </View>
                <View>
                    <View style={styles.cardActions}>
                        <Button text={"Atualizar"} onPress={() => setModalVisible(true)}></Button>
                    </View>
                </View>
            </View>
        )}
        </Animated.View>

        <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Atualizando reprodução:"}>
          <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
            <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.054 }}>
              <TextBody variant="secondary">Tag Bufala:</TextBody>
              <TextBody>BUF001</TextBody>
            </View>
            <View style={{ flexDirection: "column", width: width * 0.42, height: height * 0.05, zIndex: 3000}}>
              <TextBody>Selecione o status:</TextBody>
              <DropDownPicker
                open={openInseminacao}
                value={valueInseminacao}
                items={itemsInseminacao}
                setOpen={setOpenInseminacao}
                setValue={setValueInseminacao}
                setItems={setItemsInseminacao}
                placeholder="Selecione"
                containerStyle={{
                  width: "100%",
                  height: RFValue(40),
                  marginBottom: RFValue(0),
                }}
                style={{
                  borderColor: colors.gray.base,
                  backgroundColor: colors.gray.fundoInput,
                  borderRadius: RFValue(10),
                }}
                dropDownContainerStyle={{
                  backgroundColor: colors.gray.fundoInput,
                  borderColor: colors.gray.base,
                  borderRadius: RFValue(10),
                }}
              />
            </View>
          </View>
          {(valueInseminacao === "prenha" || valueInseminacao === "finalizada") && (
            <>
              {/* Tipo de reprodução */}
              <View style={{ flexDirection: "row", marginBottom: RFValue(15), zIndex: 2000 }}>
                <View style={{ flexDirection: "column", width: width * 0.88 }}>
                  <TextBody>Selecione o tipo de reprodução:</TextBody>
                  <DropDownPicker
                    open={openStatus}
                    value={valueStatus}
                    items={itemsStatus}
                    setOpen={setOpenStatus}
                    setValue={setValueStatus}
                    setItems={setItemsStatus}
                    placeholder="Selecione"
                    containerStyle={{
                      width: "100%",
                      height: RFValue(30),
                    }}
                    style={{
                      borderColor: colors.gray.base,
                      backgroundColor: colors.gray.fundoInput,
                      borderRadius: RFValue(10),
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: colors.gray.fundoInput,
                      borderColor: colors.gray.base,
                      borderRadius: RFValue(10),
                    }}
                    zIndex={2000}
                    zIndexInverse={1000}
                  />
                </View>
              </View>

              {/* Data do evento */}
              <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                  <TextBody>Data do evento:</TextBody>
                  <DateInput value={date} onChange={(newDate) => setDate(newDate)} />
                </View>
              </View>

              {/* Tag do Touro */}
              <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                  <TextBody>Tag Touro:</TextBody>
                  <TextInput
                    style={{
                      backgroundColor: colors.gray.fundoInput,
                      borderRadius: RFValue(10),
                      borderWidth: RFValue(0.6),
                      borderColor: colors.gray.base,
                      width: "100%",
                      height: "100%",
                    }}
                    placeholder="Ex: BUF001"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Se for finalizada, aparece também a tag do bezerro */}
              {valueInseminacao === "finalizada" && (
                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                  <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                    <TextBody>Tag Bezerro:</TextBody>
                    <TextInput
                      style={{
                        backgroundColor: colors.gray.fundoInput,
                        borderRadius: RFValue(10),
                        borderWidth: RFValue(0.6),
                        borderColor: colors.gray.base,
                        width: "100%",
                        height: "100%",
                      }}
                      placeholder="Ex: BUF001"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
              )}
            </>
          )}
          <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
            <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
              <Button text={"Atualizar dados"}></Button>
            </View>
          </View>
      </ModalCustom>     
    </>
  );
}
