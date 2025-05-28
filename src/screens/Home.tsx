import { useEffect, useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CardAlert from "../../src/components/ui/CardAlert";
import CardDuble from "../../src/components/ui/CardDuble";
import CardQuad from "../../src/components/ui/CardQuad";
import LayoutMatur from "../../src/components/ui/Layout/layoutMatur";
import LayoutSex from "../../src/components/ui/Layout/layoutSex";
import TextoTitle from "../../src/components/ui/TextoTitle";
import ModalCustom from "../components/ui/ModalCustom";
import TextBody from "../components/ui/TextBody";
import { useAuth } from "../hooks/useAuth";
import { getBuffalos } from "../services/buffaloService";

export default function ScreenHome() {
  const { width, height } = useWindowDimensions(); // Pega a dimensão do dispositivo
  
  const [alertBuffalos, setAlertBuffalos] = useState<any[]>([]);
  const [modalAlertVisible, setModalAlertVisible] = useState(false);

  const { token } = useAuth(); 
  const [buffalos, setBuffalos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBuffalos = async () => {
      if (!token) { 
        return;
      }
      try {
        setLoading(true);
        const data = await getBuffalos(token);
        setBuffalos(data);
      } catch (error) {
        console.log('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBuffalos();
  }, [token]);

  useEffect(() => {
    if (!buffalos || buffalos.length === 0) {
      setAlertBuffalos([]);
      return;
    }

    const hoje = new Date();
    const emAlerta = buffalos.filter((b) => {
      if (!Array.isArray(b.sanitario) || b.sanitario.length === 0) return false;

      return b.sanitario.some((s: any) => {
        if (s.proximoRetorno !== "Sim") return false;
        if (!s.dataRetorno) return false;
        const dtRetorno = new Date(s.dataRetorno);
        return dtRetorno > hoje;
      });
    });
      setAlertBuffalos(emAlerta);
  }, [buffalos]);

  const femCount = buffalos?.filter(b => b.sexo === 'Fêmea' && b.atividade[0]?.status === 'Ativa').length || 0;
  const machoCount = buffalos?.filter(b => b.sexo === 'Macho' && b.atividade[0]?.status === 'Ativa').length || 0;
  const bezerrosCount = buffalos?.filter(b => b.maturidade === 'Bezerro' && b.atividade[0]?.status === 'Ativa').length || 0;
  const novilhasCount = buffalos?.filter(b => b.maturidade === 'Novilha' && b.atividade[0]?.status === 'Ativa').length || 0;
  const vacasCount = buffalos?.filter(b => b.maturidade === 'Vaca' && b.atividade[0]?.status === 'Ativa').length || 0;
  const tourosCount = buffalos?.filter(b => b.maturidade === 'Touro' && b.atividade[0]?.status === 'Ativa').length || 0;


  return (
    <View style={{ flex: 1}}>
      <ScrollView>
        <View style={{ width: width, paddingHorizontal: 10, marginTop: 20 }}>
          <TextoTitle>Visão geral da propriedade:</TextoTitle>
          <LayoutSex>
            <CardDuble title="Fêmeas" styleIcon="femea" contador={femCount.toString()}></CardDuble>
            <CardDuble title="Machos" styleIcon="macho" contador={machoCount.toString()}></CardDuble>
          </LayoutSex>
        </View>

        <View style={{ width: width, paddingHorizontal: 10 }}>
          <LayoutMatur>
            <CardQuad title="Bezerros" contador={bezerrosCount.toString()}></CardQuad>
            <CardQuad title="Novilhas" contador={novilhasCount.toString()}></CardQuad>
            <CardQuad title="Vacas" contador={vacasCount.toString()}></CardQuad>
            <CardQuad title="Touros" contador={tourosCount.toString()}></CardQuad>
          </LayoutMatur>
        </View>

        <View
          style={{
            width: width,
            height: height * 0.3,
            paddingHorizontal: 10,
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <View style={{ marginBottom: RFValue(10) }}>
            <TextoTitle>Alertas da propriedade:</TextoTitle>
          </View>

          <CardAlert
            title="Lembrete"
            contador={alertBuffalos.length.toString()}
            footerText="Possui alertas"
            onPress={() => {
              if (alertBuffalos.length > 0) {
                setModalAlertVisible(true);
              }
            }}

          />
        </View>
      </ScrollView>

      <ModalCustom
        visible={modalAlertVisible}
        onClose={() => setModalAlertVisible(false)}
        title="Búfalos com Retorno Sanitários"
      >
        <View style={{ padding: 10 }}>
          {alertBuffalos.length === 0 ? (
            <TextoTitle>Nenhum búfalo com retorno pendente.</TextoTitle>
          ) : (
            alertBuffalos.map((b) => (
              <View
                key={b._id}
                style={{
                  paddingVertical: RFValue(8),
                  borderBottomWidth: 0.5,
                  borderColor: "#ccc",
                }}
              >
                <TextBody>
                  {b.tag} – {b.nome}
                </TextBody>

                {/* Listar todos os registros sanitários que geraram esse alerta */}
                {b.sanitario
                  .filter((s: any) => {
                    if (s.proximoRetorno !== "Sim" || !s.dataRetorno) return false;
                    return new Date(s.dataRetorno) > new Date();
                  })
                  .map((s: any) => (
                    <Text
                      key={s._id}
                      style={{ fontSize: RFValue(14), marginLeft: RFValue(8) }}
                    >
                      • Próximo Retorno:{" "}
                      {new Date(s.dataRetorno!).toLocaleDateString("pt-BR")}
                    </Text>
                  ))}
              </View>
            ))
          )}
        </View>
      </ModalCustom>
    </View>
  );
}
