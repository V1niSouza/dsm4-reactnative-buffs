import React, { useState } from "react";
import { ScrollView, TextInput, View, useWindowDimensions, StyleSheet, TouchableOpacity } from "react-native";
import TextoTitle from "../../src/components/ui/TextoTitle";
import Button from "../../src/components/ui/Button";
import ModalCustom from "../../src/components/ui/ModalCustom";
import TextBody from "../../src/components/ui/TextBody";
import { colors } from "../../src/styles/colors";
import DropDownPicker from "react-native-dropdown-picker";

import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import BarAlter from "../components/ui/BarAlter";
import RadioButtonGroup from "../components/ui/RadioButton";
import DateInput from "../components/ui/InputDate";

export default function ScreenPerfil() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo 
  const styles = s(width, height);
  
  const [openSex, setOpenSex] = React.useState(false);
  const [valueSex, setValueSex] = React.useState(null);
  const [itemsSex, setItemsSex] = useState([
      { label: "Ativo", value: "ativo" },
      { label: "Abatido", value: "abatido" },
      { label: "Vendido", value: "vendido" },
    ]);
  const [descricao, setDescricao] = useState("");
  const [active, setActive] = useState("zootecnico");

  const [retorno, setRetorno] = useState<string | null>(null);
  const [retornoDate, setRetornoDate] = useState<Date>(new Date());

  const [modalVisible, setModalVisible] = useState(false);
  const [modalZootecVisible, setModalZootecVisible] = useState(false);
  const [modalSanitVisible, setModalSanitVisible] = useState(false);

  return ( 
        <View style={{backgroundColor: colors.gray.fundoInput}}>
            <ScrollView>
            <View style={{ width: width, marginTop: RFValue(10)}}>
                <TouchableOpacity onPress={() => router.navigate("/bufalos")} style={{ paddingRight: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="arrow-back" size={24} color={colors.black.base} />
                    <TextBody variant="secondary">Voltar para Búfalos</TextBody>
                </TouchableOpacity>
            </View> 
            <View style={{ alignItems: 'center', marginTop: RFValue(10)}}>
                    <View  style={styles.container}>
                        <View style={[styles.row, { marginBottom: RFValue(10) }]}>
                            <View style={{flexDirection: "column" }}>
                                <TextoTitle>BUF001</TextoTitle>
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Raça:</TextBody>
                                <TextBody>Murrah</TextBody>
                            </View>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Peso:</TextBody>
                                <TextBody>501 Kg</TextBody>                               
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Maturidade:</TextBody>
                                <TextBody>Bezerro</TextBody>
                            </View>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Data Nascimento:</TextBody>
                                <TextBody>01/03/2023</TextBody>                               
                            </View>
                        </View>

                        <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(15) }}>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Grupo:</TextBody>
                                <TextBody>Bezerros</TextBody>
                            </View>
                            <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                <TextBody variant="secondary">Localização:</TextBody>
                                <TextBody>Ordenha</TextBody>                               
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row-reverse' ,marginBottom: RFValue(5) }}>
                            <View style={[styles.column, { width: width * 0.4, height: height * 0.05 }]}>
                                <Button text={"Atualizar dados"} onPress={() => setModalVisible(true)}></Button>
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems: 'center', padding: RFValue(10)}}>
                        <BarAlter active={active} setActive={setActive} />
                    </View>

                    {active === "zootecnico" && (
                        <View  style={[styles.container, { marginBottom: RFValue(30) }]}>
                            <View style={[styles.row, { marginBottom: RFValue(10) }]}>
                                <View>
                                    <TextoTitle>Histórico Zootécnico</TextoTitle>
                                </View>                               
                                <View style={{ marginLeft: 'auto' ,width: width * 0.3, height: height * 0.05 }}>
                                    <Button text={"Atualizar"} onPress={() => setModalZootecVisible(true)}></Button>
                                </View>               
                            </View>
                            <View style={{ backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), padding: RFValue(10) }}>
                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Funcionário responsável:</TextBody>
                                        <TextBody>Chico</TextBody>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Data Atualização:</TextBody>
                                        <TextBody>31/02/2025</TextBody>                               
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Peso:</TextBody>
                                        <TextBody>510 Kg</TextBody>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Condição Corporal:</TextBody>
                                        <TextBody>Boa</TextBody>                               
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", marginBottom: RFValue(15) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.8 }}>
                                        <TextBody variant="secondary">Descrição:</TextBody>
                                        <TextBody>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </TextBody>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {active === "sanitario" && (
                        <View  style={[styles.container, { marginBottom: RFValue(30) }]}>
                            <View style={[styles.row, { marginBottom: RFValue(10) }]}>
                                <View>
                                    <TextoTitle>Histórico Sanitário</TextoTitle>
                                </View>                               
                                <View style={{ marginLeft: 'auto' ,width: width * 0.3, height: height * 0.05 }}>
                                    <Button text={"Atualizar"} onPress={() => setModalSanitVisible(true)}></Button>
                                </View>               
                            </View>
                            <View style={{ backgroundColor: colors.gray.fundoInput, borderRadius: RFValue(10), padding: RFValue(10) }}>
                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Tipo Sanitário:</TextBody>
                                        <TextBody>Vacina</TextBody>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Data Atualização:</TextBody>
                                        <TextBody>31/02/2025</TextBody>                               
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Medicação Aplicada:</TextBody>
                                        <TextBody>Novalgina</TextBody>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Dosagem:</TextBody>
                                        <TextBody>5 ml</TextBody>                               
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Doença Combatida:</TextBody>
                                        <TextBody>Verme</TextBody>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(10) }}>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Necessidade de retorno?</TextBody>
                                        <TextBody>Sim</TextBody>
                                    </View>
                                    <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                                        <TextBody variant="secondary">Data Retorno:</TextBody>
                                        <TextBody>15/01/2024</TextBody>                               
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
            </View> 
            </ScrollView>
                <ModalCustom visible={modalVisible} onClose={() => setModalVisible(false)} title={"Atualizando Bubalino"}>
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(15), zIndex: 1000 }}>
                    {/* Select de Sexo */}
                        <View style={{ width: width * 0.88 }}>
                            <TextBody>Bufalo ativo na propriedade?</TextBody>
                            <DropDownPicker
                            open={openSex}
                            value={valueSex}
                            items={itemsSex}
                            setOpen={setOpenSex}
                            setValue={setValueSex}
                            setItems={setItemsSex}
                            placeholder="Selecione"
                            containerStyle={{
                                width: "100%",
                                height: RFValue(40),
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
                    
                <View style={{ marginBottom: RFValue(30) }}>
                    {valueSex && valueSex !== 'ativo' && (
                        <View style={{ width: width * 0.88 }}>
                        <TextBody>Descreva o motivo:</TextBody>
                        <TextInput
                            style={{
                            backgroundColor: colors.gray.fundoInput,
                            borderRadius: RFValue(10),
                            borderWidth: RFValue(0.6),
                            borderColor: colors.gray.base,
                            width: "100%",
                            height: RFValue(50),
                            paddingHorizontal: RFValue(10),
                            }}
                            placeholder="Ex: Descartado por..."
                            placeholderTextColor="#999"
                            value={descricao}
                            onChangeText={setDescricao}
                        />
                        </View>
                    )}
                </View>

                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                    <TextBody>Localização:</TextBody>
                    <TextInput
                    style={{
                        backgroundColor: colors.gray.fundoInput,
                        borderRadius: RFValue(10),
                        borderWidth: RFValue(0.6),
                        borderColor: colors.gray.base,
                        width: "100%",
                        height: "100%",
                    }}
                    placeholder="Ex: Ordenha"
                    placeholderTextColor="#999"
                    />
                </View>

                <View style={{ flexDirection: "column", width: width * 0.45, height: height * 0.05 }}>
                    <TextBody>Grupo:</TextBody>
                    <TextInput
                    style={{
                        backgroundColor: colors.gray.fundoInput,
                        borderRadius: RFValue(10),
                        borderWidth: RFValue(0.6),
                        borderColor: colors.gray.base,
                        width: "100%",
                        height: "100%",
                    }}
                    placeholder="Ex: Secagem"
                    placeholderTextColor="#999"
                    />
                </View>
                </View>
                <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
                <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                    <Button text={"Atualizar Bubalino"}></Button>
                </View>
                </View>
                </ModalCustom>

                <ModalCustom visible={modalZootecVisible} onClose={() => setModalZootecVisible(false)} title={"Atualizando Zootecnico do Bubalino"}>                    
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                            <TextBody>Peso:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: 450"
                            placeholderTextColor="#999"
                            />
                        </View>

                        <View style={{ flexDirection: "column", width: width * 0.45, height: height * 0.05 }}>
                            <TextBody>Condição Corporal:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: Secagem"
                            placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                            <TextBody>Observação:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: 450"
                            placeholderTextColor="#999"
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
                        <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                            <Button text={"Atualizar Bubalino"}></Button>
                        </View>
                    </View>
                </ModalCustom>

                <ModalCustom visible={modalSanitVisible} onClose={() => setModalSanitVisible(false)} title={"Atualizando Sanitário do Bubalino"}>                    
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                            <TextBody>Tipo Sanitário:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: Vacinação"
                            placeholderTextColor="#999"
                            />
                        </View>

                        <View style={{ flexDirection: "column", width: width * 0.45, height: height * 0.05 }}>
                            <TextBody>Medicação Aplicada:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: BuF Aplication"
                            placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.4, height: height * 0.05 }}>
                            <TextBody>Dosagem:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: 5"
                            placeholderTextColor="#999"
                            />
                        </View>

                        <View style={{ flexDirection: "column", width: width * 0.45, height: height * 0.05 }}>
                            <TextBody>Unidade Medida:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: ml"
                            placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                            <TextBody>Doença Combatida:</TextBody>
                            <TextInput
                            style={{
                                backgroundColor: colors.gray.fundoInput,
                                borderRadius: RFValue(10),
                                borderWidth: RFValue(0.6),
                                borderColor: colors.gray.base,
                                width: "100%",
                                height: "100%",
                            }}
                            placeholder="Ex: Verme"
                            placeholderTextColor="#999"
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", gap: RFValue(1), marginBottom: RFValue(10) }}>
                        <TextBody>Necessidade de retorno?</TextBody>
                        <RadioButtonGroup
                        options={[
                            { label: "Sim", value: "sim" },
                            { label: "Não", value: "nao" },
                        ]}
                        selectedValue={retorno}
                        onValueChange={setRetorno}
                        />
                    </View>

                    {retorno === "sim" && (
                     <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(30) }}>
                        <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                        <TextBody>Selecione uma data:</TextBody>
                        <DateInput
                            label="Data do Retorno"
                            value={retornoDate}
                            onChange={(date) => setRetornoDate(date)}
                        />
                        </View>
                    </View>
                    )}
                    <View style={{ flexDirection: "row", gap: RFValue(10), marginBottom: RFValue(20) }}>
                        <View style={{ flexDirection: "column", width: width * 0.88, height: height * 0.05 }}>
                            <Button text={"Atualizar Bubalino"}></Button>
                        </View>
                    </View>
                </ModalCustom>
        </View>
  );
}

export const s = (width: number, height: number) => StyleSheet.create({
  container:{
    width: width * 0.96,
    maxHeight: height, // Limita sem travar
    backgroundColor: colors.white.base,
    padding: RFValue(10),
    borderRadius: RFValue(10),

    // Sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5 // Sombra
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: RFValue(10),
  },
  column: {
    flexDirection: "column",
  },
  input: {
    backgroundColor: colors.gray.fundoInput,
    borderRadius: RFValue(10),
    borderWidth: RFValue(0.6),
    borderColor: colors.gray.base,
    width: "100%",
    height: "100%",
  },
  textArea: {
    backgroundColor: colors.gray.fundoInput,
    borderRadius: RFValue(10),
    borderWidth: RFValue(0.6),
    borderColor: colors.gray.base,
    width: "100%",
    height: RFValue(50),
    textAlignVertical: "top",
  },
});
