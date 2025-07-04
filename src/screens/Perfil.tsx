import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "../../src/components/ui/Button";
import ModalCustom from "../../src/components/ui/ModalCustom";
import TextBody from "../../src/components/ui/TextBody";
import TextoTitle from "../../src/components/ui/TextoTitle";
import { colors } from "../../src/styles/colors";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { RFValue } from "react-native-responsive-fontsize";
import BarAlter from "../components/ui/BarAlter";
import DateInput from "../components/ui/InputDate";
import RadioButtonGroup from "../components/ui/RadioButton";

import { useAuth } from "../hooks/useAuth";
import { Buffalo, getBuffaloById, updateBuffalo } from "../services/buffaloService";

type Props = {
  id: string;
};

export default function ScreenPerfil({ id }: Props) {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  const styles = s(width, height);
  const { token } = useAuth();
  const [active, setActive] = useState("zootecnico");
    
  
  const [buffalo, setBuffalo] = useState<Buffalo | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      const loadBuffalo = async () => {
          if (!token || !id) return;
          
          try {
              setLoading(true);
              const data: Buffalo = await getBuffaloById(id, token);
              setBuffalo(data);
            } catch (error) {
                console.error("Erro ao carregar búfalo:", error);
            } finally {
                setLoading(false);
            }
        };       
        loadBuffalo();
    }, [token, id]);

  useEffect(() => {
    if (buffalo) {
      setValueAtividade(Array.isArray(buffalo?.atividade) ? buffalo.atividade[0]?.status || '' : '');
      setObservacao(buffalo?.atividade[0]?.observacao || '');
      setLocalizacao(buffalo?.localizacao || '');
      setGrupo(buffalo?.grupo || '');
    }
  }, [buffalo]);
    
  const [modalVisible, setModalVisible] = useState(false);
  const [openAtividade, setOpenAtividade] = React.useState(false);
  const [status, setValueAtividade] = React.useState<string | ''>('');
  const [itemsAtividade, setItemsAtividade] = useState([
      { label: "Ativa", value: "Ativa" },
      { label: "Inativo", value: "Inativo" },
  ]);
  const [observacao, setObservacao] = useState<string | ''>('');
  const [localizacao, setLocalizacao] = useState<string | ''>('');
  const [grupo, setGrupo] = useState<string | ''>('');

  const [modalZootecVisible, setModalZootecVisible] = useState(false);
  const [peso, setPeso] = useState<number>(0);
  const [condicaoCorporal, setCondicaoCoportal] = useState<string | ''>('');
  const [observacao2, setObservacao2] = useState<string | ''>('');

  const [modalSanitVisible, setModalSanitVisible] = useState(false);
  const [tipoSanitario, setTipoSanitario] = useState<string | ''>('');
  const [medicacao, setMedicacao] = useState<string | ''>('');
  const [dosagem, setDosagem] = useState<number>(0);
  const [unidadeMedida, setUnidadeMedida] = useState<string | ''>('');
  const [doencao, setDoenca] = useState<string | ''>('');
  const [retorno, setRetorno] = useState<string | null>('');
  const [retornoDate, setRetornoDate] = useState<Date>(new Date());

  const formatarData = (dataString: string | Date | undefined): string => {
      if (!dataString) return "Data não disponível";

      const data = new Date(dataString);
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
  };


  const handleUpdateBuffalo = async () => {
    try {
      if (!token || !id) {
        console.error("Token ou ID não disponível");
        return;
      }

      const data = {
        localizacao,
        grupo,
        atividade: [{
          status: status,
          observacao: observacao,
          dataAtualizacao: new Date().toISOString(),
        }]
      };
      const response = await updateBuffalo(id, data, token);
      setBuffalo(response.buffalo);
      setModalVisible(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar búfalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  const handleUpdateZootecnico = async () => {
    try {
      if (!token || !id) {
        console.error("Token ou ID não disponível");
        return;
      }

      const data = {
        zootecnico: [{
          peso: peso,
          condicaoCorporal: condicaoCorporal,
          dataAtualizacao: new Date().toISOString(),
          funcionarioResponsavel: ["681e836c2f3e788744f0ea69"],
          observacao: observacao2
        }]
      };
      const response = await updateBuffalo(id, data, token);
      setBuffalo(response.buffalo);
      setModalVisible(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar búfalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  const handleUpdateSanitario = async () => {
    try {
      if (!token || !id) {
        console.error("Token ou ID não disponível");
        return;
      }

      const data = {
        sanitario: [{
          tpSanitario: tipoSanitario,
          medicacaoAplicada: medicacao,
          dosagem: dosagem,
          unidadeMedidaDosagem: unidadeMedida,
          doencaCombatida: doencao,
          proximoRetorno: retorno,
          dataRetorno: retornoDate.toISOString(),
          funcionarioResponsavel: ["681e836c2f3e788744f0ea69"],
          dataAplicacao: new Date().toISOString(),
        }]
      };
      console.log(data)
      const response = await updateBuffalo(id, data, token);
      setBuffalo(response.buffalo);
      setModalVisible(false);
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar búfalo:", error);
      alert("Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.");
    }
  };

  if (!buffalo) {
       return (
         <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
           <TextoTitle>Carregando búfalo...</TextoTitle>
         </SafeAreaView>
       );
    
  }
  return (
    <View style={{ backgroundColor: colors.gray.fundoInput }}>
      <ScrollView>
        <View style={{ width: width, marginTop: RFValue(10) }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              paddingRight: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.black.base} />
            <TextBody variant="secondary">Voltar para Búfalos</TextBody>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: RFValue(10) }}>
          <View style={styles.container}>
            <View style={[styles.row, { marginBottom: RFValue(10) }]}>
              <View style={{ flexDirection: "column" }}>
                <TextoTitle>{buffalo?.tag}</TextoTitle>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: RFValue(10),
                marginBottom: RFValue(10),
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Raça:</TextBody>
                <TextBody>{buffalo?.raca}</TextBody>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Peso:</TextBody>
                <TextBody>{buffalo?.zootecnico[0]?.peso} Kg</TextBody>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: RFValue(10),
                marginBottom: RFValue(10),
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Maturidade:</TextBody>
                <TextBody>{buffalo?.maturidade}</TextBody>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Data Nascimento:</TextBody>
                <TextBody>
                  {buffalo?.atividade[0]?.dataAtualizacao
                    ? formatarData(buffalo?.atividade[0]?.dataAtualizacao)
                    : "Sem data registrada"}
                </TextBody>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: RFValue(10),
                marginBottom: RFValue(15),
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Grupo:</TextBody>
                <TextBody>{buffalo?.grupo}</TextBody>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: width * 0.4,
                  height: height * 0.05,
                }}
              >
                <TextBody variant="secondary">Localização:</TextBody>
                <TextBody>{buffalo?.localizacao}</TextBody>
              </View>
            </View>
            <View
              style={{ flexDirection: "row-reverse", marginBottom: RFValue(5) }}
            >
              <View
                style={[
                  styles.column,
                  { width: width * 0.4, height: height * 0.05 },
                ]}
              >
                <Button
                  text={"Atualizar dados"}
                  onPress={() => setModalVisible(true)}
                ></Button>
              </View>
            </View>
          </View>

          <View style={{ alignItems: "center", padding: RFValue(10) }}>
            <BarAlter active={active} setActive={setActive} />
          </View>

          {active === "zootecnico" && (
            <View style={[styles.container, { marginBottom: RFValue(30) }]}>
              <View style={[styles.row, { marginBottom: RFValue(10) }]}>
                <View>
                  <TextoTitle>Histórico Zootécnico</TextoTitle>
                </View>
                <View
                  style={{
                    marginLeft: "auto",
                    width: width * 0.3,
                    height: height * 0.05,
                  }}
                >
                  <Button
                    text={"Atualizar"}
                    onPress={() => setModalZootecVisible(true)}
                  ></Button>
                </View>
              </View>
              {buffalo?.zootecnico?.map((registro, index) => (
                <View
                  key={`zoo-${registro._id}-${index}`}
                  style={{
                    backgroundColor: colors.gray.fundoInput,
                    borderRadius: RFValue(10),
                    padding: RFValue(10),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">
                        Funcionário responsável:
                      </TextBody>
                      {buffalo?.zootecnico[0]?.funcionarios?.map(
                        (funcionario) => (
                          <TextBody key={funcionario._id}>
                            {funcionario.nome}
                          </TextBody>
                        )
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Data Atualização:</TextBody>
                      <TextBody>
                        {formatarData(registro.dataAtualizacao)}
                      </TextBody>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Peso:</TextBody>
                      <TextBody>
                        {registro.peso ? `${registro.peso} Kg` : "N/A"}
                      </TextBody>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">
                        Condição Corporal:
                      </TextBody>
                      <TextBody>{registro.condicaoCorporal || "N/A"}</TextBody>
                    </View>
                  </View>

                  <View
                    style={{ flexDirection: "row", marginBottom: RFValue(15) }}
                  >
                    <View
                      style={{ flexDirection: "column", width: width * 0.8 }}
                    >
                      <TextBody variant="secondary">Descrição:</TextBody>
                      <TextBody>
                        {registro.observacao || "Nenhuma Observacao"}
                      </TextBody>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {active === "sanitario" && (
            <View style={[styles.container, { marginBottom: RFValue(30) }]}>
              <View style={[styles.row, { marginBottom: RFValue(10) }]}>
                <View>
                  <TextoTitle>Histórico Sanitário</TextoTitle>
                </View>
                <View
                  style={{
                    marginLeft: "auto",
                    width: width * 0.3,
                    height: height * 0.05,
                  }}
                >
                  <Button
                    text={"Atualizar"}
                    onPress={() => setModalSanitVisible(true)}
                  ></Button>
                </View>
              </View>

              {buffalo?.sanitario?.map((registro, index) => (
                <View
                  key={`san-${registro._id}-${index}`}
                  style={{
                    backgroundColor: colors.gray.fundoInput,
                    borderRadius: RFValue(10),
                    padding: RFValue(10),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Tipo Sanitário:</TextBody>
                      <TextBody>{registro.tpSanitario || "N/A"}</TextBody>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Data Atualização:</TextBody>
                      <TextBody>
                        {formatarData(registro.dataAplicacao)}
                      </TextBody>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">
                        Medicação Aplicada:
                      </TextBody>
                      <TextBody>{registro.medicacaoAplicada || "N/A"}</TextBody>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Dosagem:</TextBody>
                      <TextBody>
                        {registro.dosagem
                          ? `${registro.dosagem} ${registro.unidadeMedidaDosagem}`
                          : "N/A"}
                      </TextBody>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">Doença Combatida:</TextBody>
                      <TextBody>{registro.doencaCombatida || "N/A"}</TextBody>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: RFValue(10),
                      marginBottom: RFValue(10),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        width: width * 0.4,
                        height: height * 0.05,
                      }}
                    >
                      <TextBody variant="secondary">
                        Necessidade de retorno?
                      </TextBody>
                      <TextBody>
                        {registro.dataRetorno ? "Sim" : "Não"}
                      </TextBody>
                    </View>
                    {registro.dataRetorno && (
                      <View
                        style={{
                          flexDirection: "column",
                          width: width * 0.4,
                          height: height * 0.05,
                        }}
                      >
                        <TextBody variant="secondary">Data Retorno:</TextBody>
                        <TextBody>
                          {formatarData(registro.dataRetorno)}
                        </TextBody>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <ModalCustom
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={"Atualizando Bubalino"}
      >
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(15),
            zIndex: 1000,
          }}
        >
          {/* Select de Sexo */}
          <View style={{ width: width * 0.88 }}>
            <TextBody>Bufalo ativo na propriedade?</TextBody>
            <DropDownPicker
              open={openAtividade}
              value={status}
              items={itemsAtividade}
              setOpen={setOpenAtividade}
              setValue={setValueAtividade}
              setItems={setItemsAtividade}
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
          {status && status !== "Ativa" && (
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
                value={observacao}
                onChangeText={setObservacao}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
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
              value={localizacao}
              placeholder="Ex: Ordenha"
              placeholderTextColor="#999"
              onChangeText={setLocalizacao}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
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
              value={grupo}
              placeholder="Ex: Secagem"
              placeholderTextColor="#999"
              onChangeText={setGrupo}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(20),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
            <Button text={"Atualizar Bubalino"} onPress={handleUpdateBuffalo}/>
          </View>
        </View>
      </ModalCustom>

      <ModalCustom
        visible={modalZootecVisible}
        onClose={() => setModalZootecVisible(false)}
        title={"Atualizando Zootécnico do Bubalino"}
      >
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
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
              value={peso ? String(peso) : ''}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setPeso(numericValue);
                } else {
                  setPeso(0);
                }
              }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
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
              value={condicaoCorporal}
              onChangeText={setCondicaoCoportal}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
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
              value={observacao2}
              onChangeText={setObservacao2}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(20),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
            <Button text={"Atualizar Bubalino"} onPress={handleUpdateZootecnico}></Button>
          </View>
        </View>
      </ModalCustom>

      <ModalCustom
        visible={modalSanitVisible}
        onClose={() => setModalSanitVisible(false)}
        title={"Atualizando Sanitário do Bubalino"}
      >
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
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
              value={tipoSanitario}
              onChangeText={setTipoSanitario}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
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
              value={medicacao}
              onChangeText={setMedicacao}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.4,
              height: height * 0.05,
            }}
          >
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
              value={dosagem ? String(dosagem) : ''}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (!isNaN(numericValue)) {
                  setDosagem(numericValue);
                } else {
                  setDosagem(0);
                }
              }}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              width: width * 0.45,
              height: height * 0.05,
            }}
          >
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
              value={unidadeMedida}
              onChangeText={setUnidadeMedida}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(30),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
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
              value={doencao}
              onChangeText={setDoenca}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: RFValue(1),
            marginBottom: RFValue(10),
          }}
        >
          <TextBody>Necessidade de retorno?</TextBody>
          <RadioButtonGroup
            options={[
              { label: "Sim", value: "Sim" },
              { label: "Não", value: "Não" },
            ]}
            selectedValue={retorno}
            onValueChange={setRetorno}
          />
        </View>

        {retorno === "Sim" && (
          <View
            style={{
              flexDirection: "row",
              gap: RFValue(10),
              marginBottom: RFValue(30),
            }}
          >
            <View
              style={{
                flexDirection: "column",
                width: width * 0.88,
                height: height * 0.05,
              }}
            >
              <TextBody>Selecione uma data:</TextBody>
              <DateInput
                label="Data do Retorno"
                value={retornoDate}
                onChange={(date) => setRetornoDate(date)}
              />
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            gap: RFValue(10),
            marginBottom: RFValue(20),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: width * 0.88,
              height: height * 0.05,
            }}
          >
            <Button text={"Atualizar Bubalino"}  onPress={handleUpdateSanitario}></Button>
          </View>
        </View>
      </ModalCustom>
    </View>
  );
}

export const s = (width: number, height: number) =>
  StyleSheet.create({
    container: {
      width: width * 0.96,
      maxHeight: height, // Limita sem travar
      backgroundColor: colors.white.base,
      padding: RFValue(10),
      borderRadius: RFValue(10),

      // Sombra
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // Sombra
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
