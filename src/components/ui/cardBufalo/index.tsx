import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Animated, useWindowDimensions, TextInput, ScrollView } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { s } from "./styles";
import TextBody from "../TextBody";
import { RFValue } from "react-native-responsive-fontsize";
import TextoButton from "../TextButton";
import ModalCustom from "../ModalCustom";
import { colors } from "../../../styles/colors";
import Button from "../Button";
import { router } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";

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
                        <TouchableOpacity style={styles.actionOne} onPress={() => setModalVisibleZootecnico(true)}><TextoButton>Zootécnico</TextoButton></TouchableOpacity>
                        <TouchableOpacity style={styles.actionOne} onPress={() => setModalVisibleSanitario(true)}><TextoButton>Sanitário</TextoButton></TouchableOpacity>
                        <TouchableOpacity style={styles.actionOne} onPress={() => setModalVisibleAtividade(true)}><TextoButton>Atividade</TextoButton></TouchableOpacity>
                    </View>
                </View>

            </View>
        )}
        </Animated.View>

  <ModalCustom visible={modalVisibleZootecnico} onClose={() => setModalVisibleZootecnico(false)} title={"Prontuário dados Zootécnicos"}>
    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.09 }}>
        <TextBody>Historico de Peso:</TextBody>
        <View style={{ flexDirection: "column", width: "100%", height: "100%", backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), borderWidth: RFValue(0.6), borderColor: colors.gray.base, padding: RFValue(5)}}>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>400 KG</TextBody>
            </View>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>-</TextBody>
              <TextBody>05/10/2024</TextBody>
              <TextBody>400 KG</TextBody>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.09 }}>
        <TextBody>Historico da Condição Corporal:</TextBody>
        <View style={{ flexDirection: "column", width: "100%", height: "100%", backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), borderWidth: RFValue(0.6), borderColor: colors.gray.base, padding: RFValue(5)}}>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>Legal</TextBody>
            </View>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>OK</TextBody>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.09 }}>
        <TextBody>Historico de Observações:</TextBody>
        <View style={{ flexDirection: "column", width: "100%", height: "100%", backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), borderWidth: RFValue(0.6), borderColor: colors.gray.base, padding: RFValue(5)}}>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>Legal</TextBody>
            </View>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>OK</TextBody>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
        <Button text={"Atualizar dados"} onPress={() => router.push("/zootecnico")}></Button>
      </View>
    </View>
    
  </ModalCustom>  

  <ModalCustom visible={modalVisibleSanitario} onClose={() => setModalVisibleSanitario(false)} title={"Prontuário dados Sanitários"}>
    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.5 }}>
        <ScrollView>
          <TextBody>Historicos:</TextBody>
          <View style={{ flexDirection: "column", width: "100%", height: "100%", backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), borderWidth: RFValue(0.6), borderColor: colors.gray.base, padding: RFValue(5)}}>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Doença Combatida:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Tipo de tratamento aplicado:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Medicamento aplicado:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Dosagem:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Data aplicada:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
              <View style={{ flexDirection: "row", gap: RFValue(10)}}>
                <TextBody>Data retorno:</TextBody>
                <TextBody>400 KG</TextBody>
              </View>
          </View>
        </ScrollView>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
        <Button text={"Atualizar dados"} onPress={() => router.push("/zootecnico")}></Button>
      </View>
    </View>
    
  </ModalCustom>     

  <ModalCustom visible={modalVisibleAtividade} onClose={() => setModalVisibleAtividade(false)} title={"Prontuário Atividade"}>
    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.40 }}>
        <TextBody>Sexo:</TextBody>
        <DropDownPicker
          open={openSex}
          value={valueSex}
          items={itemsSex}
          setOpen={setOpenSex}
          setValue={setValueSex}
          setItems={setItemsSex}
          placeholder="Selecione"
          containerStyle={{
            width: '100%',
            height: RFValue(40),
            marginBottom: RFValue(0)
          }}
          style={{
            borderColor: colors.gray.base,
            backgroundColor: colors.gray.fundoInput,
            borderRadius: RFValue(10)
          }}
          dropDownContainerStyle={{
            backgroundColor: colors.gray.fundoInput,
            borderColor: colors.gray.base,
            borderRadius: RFValue(10)
          }}
        />
      </View>
      <View style={{ flexDirection: "column", width: width * 0.40, height: height * 0.06 }}>
        <TextBody>Data atualização:</TextBody>
        <TextInput
          style={{
            backgroundColor: colors.gray.fundoInput,
            borderRadius: RFValue(10),
            borderWidth: RFValue(0.6),
            borderColor: colors.gray.base,
            width: '100%',
            height: '100%'
          }}
          placeholder="Ex: Bella"
          placeholderTextColor="#999"
        />
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.09 }}>
        <TextBody>Descrição:</TextBody>
        <View style={{ flexDirection: "column", width: "100%", height: "100%", backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), borderWidth: RFValue(0.6), borderColor: colors.gray.base, padding: RFValue(5)}}>
          <ScrollView>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>05/10/2024</TextBody>
              <TextBody>-</TextBody>
              <TextBody>400 KG</TextBody>
            </View>
            <View style={{ flexDirection: "row", gap: RFValue(10)}}>
              <TextBody>-</TextBody>
              <TextBody>05/10/2024</TextBody>
              <TextBody>400 KG</TextBody>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
      <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
        <Button text={"Atualizar dados"}></Button>
      </View>
    </View>
    
  </ModalCustom>       
    </>
  );
}
