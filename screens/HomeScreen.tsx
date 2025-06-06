import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [qualidadeNum, setQualidadeNum] = useState(0);
  const [qualidadeTexto, setQualidadeTexto] = useState("...");
  const [temperatura, setTemperatura] = useState("...");
  const [umidade, setUmidade] = useState("...");
  const [relatorio, setRelatorio] = useState("");
  const [plantas, setPlantas] = useState([]);
  const [mostrarPlantas, setMostrarPlantas] = useState(false);
  const [selectedPlantIndex, setSelectedPlantIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const db = getDatabase();

    const qualidadeRef = ref(db, 'FloraShield/FloraShield/Ar/Ar');
    const temperaturaRef = ref(db, 'FloraShield/FloraShield/Temp/Temp');
    const umidadeRef = ref(db, 'FloraShield/FloraShield/Humi/Humi');

    onValue(qualidadeRef, snapshot => {
      const valorAr = snapshot.val();
      if (valorAr !== null) {
        const voltagem = (valorAr * 5) / 1023;
        const rs = (5 - voltagem) / voltagem;
        const razao = 2 / rs;

        setQualidadeNum(razao.toFixed(2));

        let qualidade;
        if (razao < 1) {
          qualidade = "Ótimo";
        } else if (razao < 2) {
          qualidade = "Média";
        } else if (razao < 3) {
          qualidade = "Inferior à média";
        } else {
          qualidade = "Insalubre";
        }
        setQualidadeTexto(qualidade);
      } else {
        setQualidadeTexto("Indisponível");
      }
    });

    onValue(temperaturaRef, snapshot => {
      const val = snapshot.val();
      setTemperatura(val !== null ? val : "Indisponível");
    });

    onValue(umidadeRef, snapshot => {
      const val = snapshot.val();
      setUmidade(val !== null ? val : "Indisponível");
    });
  }, []);

  const recomendarPlantas = () => {
    const razao = parseFloat(qualidadeNum);
    let relatorioTexto = "";
    let listaPlantas = [];

    if (razao < 1) {
      relatorioTexto = "Possivelmente CO2";
      listaPlantas = [
        { img: require("../assets/images/Chlorophytumcomosum.jpeg"), nome: "Chlorophytum comosum", descricao: "Conhecida como clorofito, excelente purificadora de ar." },
        { img: require("../assets/images/Sansevieriatrifasciata.jpeg"), nome: "Sansevieria trifasciata", descricao: "Espada-de-são-jorge, resistente e purificadora." },
        { img: require("../assets/images/Epipremnumaureum.jpeg"), nome: "Epipremnum aureum", descricao: "A famosa jiboia, ideal para ambientes internos." },
        { img: require("../assets/images/Nephrolepisexaltata.jpeg"), nome: "Nephrolepis exaltata", descricao: "Samambaia muito eficiente na remoção de poluentes." },
        { img: require("../assets/images/Ficusbenjamina.jpeg"), nome: "Ficus benjamina", descricao: "Árvore elegante, ajuda a reduzir formaldeído no ar." },
        { img: require("../assets/images/Rhapisexcelsa.jpeg"), nome: "Rhapis excelsa", descricao: "Palmeira resistente, ótima para ambientes internos." }
      ];
    } else if (razao < 1.5) {
      relatorioTexto = "Possivelmente Amônia ou CO2";
      listaPlantas = [
        { img: require("../assets/images/Chamaedoreaseifrizii.jpeg"), nome: "Chamaedorea seifrizii", descricao: "Palmeira-bambu, eficaz na remoção de poluentes." },
        { img: require("../assets/images/Nephrolepisexaltata.jpeg"), nome: "Nephrolepis exaltata", descricao: "Samambaia que melhora a qualidade do ar." },
        { img: require("../assets/images/Ficusbenjamina.jpeg"), nome: "Ficus benjamina", descricao: "Ajuda a reduzir formaldeído e benzeno." },
        { img: require("../assets/images/Epipremnumaureum.jpeg"), nome: "Epipremnum aureum", descricao: "Planta trepadeira que purifica diversos gases." },
        { img: require("../assets/images/Spathiphyllumwallisii.jpeg"), nome: "Spathiphyllum wallisii", descricao: "Lírio da paz, excelente para remover toxinas do ar." }
      ];
    } else if (razao < 2.0) {
      relatorioTexto = "Possivelmente Benzeno ou Etanol";
      listaPlantas = [
        { img: require("../assets/images/Chrysanthemummorifolium.jpeg"), nome: "Chrysanthemum morifolium", descricao: "Crisântemo, famoso pela filtragem de benzeno." },
        { img: require("../assets/images/Sansevieriatrifasciata.jpeg"), nome: "Sansevieria trifasciata", descricao: "Resistente, remove diversos poluentes." },
        { img: require("../assets/images/Hederahelix.jpeg"), nome: "Hedera helix", descricao: "Hera-inglesa, eficaz contra formaldeído e benzeno." },
        { img: require("../assets/images/Dracaenamarginata.jpeg"), nome: "Dracaena marginata", descricao: "Dracena, filtra compostos tóxicos como xileno." },
        { img: require("../assets/images/Spathiphyllumwallisii.jpeg"), nome: "Spathiphyllum wallisii", descricao: "Lírio da paz, remove acetona, benzeno e mais." }
      ];
    } else if (razao < 2.5) {
      relatorioTexto = "Possivelmente Tolueno";
      listaPlantas = [
        { img: require("../assets/images/Chrysanthemummorifolium.jpeg"), nome: "Chrysanthemum morifolium", descricao: "Crisântemo, combate tolueno e benzeno." },
        { img: require("../assets/images/Nephrolepisexaltata.jpeg"), nome: "Nephrolepis exaltata", descricao: "Excelente para purificar o ar de tolueno." },
        { img: require("../assets/images/Gerberajamesonii.jpeg"), nome: "Gerbera jamesonii", descricao: "Remove benzeno e tricloroetileno do ambiente." },
        { img: require("../assets/images/Epipremnumaureum.jpeg"), nome: "Epipremnum aureum", descricao: "Eficiente contra diversos compostos tóxicos." },
        { img: require("../assets/images/Spathiphyllumwallisii.jpeg"), nome: "Spathiphyllum wallisii", descricao: "Lírio da paz, purifica muitos poluentes." }
      ];
    } else if (razao < 3) {
      relatorioTexto = "Possivelmente acetona ou álcool";
      listaPlantas = [
        { img: require("../assets/images/Epipremnumaureum.jpeg"), nome: "Epipremnum aureum", descricao: "Filtra compostos como acetona e álcool." },
        { img: require("../assets/images/Spathiphyllumwallisii.jpeg"), nome: "Spathiphyllum wallisii", descricao: "Lírio da paz, absorve acetona e álcool." },
        { img: require("../assets/images/Chamaedoreaseifrizii.jpeg"), nome: "Chamaedorea seifrizii", descricao: "Palmeira-bambu, ideal contra poluentes domésticos." },
        { img: require("../assets/images/Chrysanthemummorifolium.jpeg"), nome: "Chrysanthemum morifolium", descricao: "Crisântemo, purifica uma variedade de toxinas." }
      ];
    } else if (razao >= 3) {
      relatorioTexto = "Possivelmente gás de combustão";
      listaPlantas = [
        { img: require("../assets/images/Ficuselastica.jpeg"), nome: "Ficus elastica", descricao: "Borracha, resistente e eficiente na purificação." },
        { img: require("../assets/images/Nephrolepisexaltata.jpeg"), nome: "Nephrolepis exaltata", descricao: "Samambaia, combate poluentes de combustão." },
        { img: require("../assets/images/Rhapisexcelsa.jpeg"), nome: "Rhapis excelsa", descricao: "Palmeira, excelente para ambientes internos poluídos." }
      ];
    } else {
      relatorioTexto = "Gás insuficiente para uma leitura.";
      listaPlantas = [];
    }

    setRelatorio(relatorioTexto);
    setPlantas(listaPlantas);
    setMostrarPlantas(true);
  };

  const abrirModal = (index) => {
    setSelectedPlantIndex(index);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setSelectedPlantIndex(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FLORASHIELD</Text>

      <Image source={require("../assets/images/solar.jpeg")} style={styles.image} resizeMode="cover" />

      <Text style={styles.subtitle}>SolarPunk</Text>
      <Text style={styles.description}>na luta por um futuro justo</Text>

      <TouchableOpacity style={styles.button} onPress={recomendarPlantas}>
        <Text style={styles.buttonText}>Recomendar</Text>
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        <View style={styles.circleGroup}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{qualidadeTexto}</Text>
          </View>
          <Text style={styles.label}>QUALIDADE</Text>
        </View>

        <View style={styles.circleGroup}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{temperatura}º</Text>
          </View>
          <Text style={styles.label}>TEMPERATURA</Text>
        </View>

        <View style={styles.circleGroup}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{umidade}%</Text>
          </View>
          <Text style={styles.label}>UMIDADE</Text>
        </View>
      </View>

      {mostrarPlantas && (
        <View style={styles.recomendacaoContainer}>
          <Text style={styles.relatorio}>{relatorio}</Text>
          <View style={styles.plantasContainer}>
            {plantas.map((planta, index) => (
              <TouchableOpacity key={index} style={styles.plantaItem} onPress={() => abrirModal(index)}>
                <Image source={planta.img} style={styles.plantaImagem} resizeMode="cover" />
                <Text style={styles.plantaNome}>{planta.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => setMostrarPlantas(false)}>
            <Text style={styles.buttonText}>Esconder</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedPlantIndex !== null && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={fecharModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={plantas[selectedPlantIndex].img} style={styles.modalImage} resizeMode="cover" />
              <Text style={styles.modalTitle}>{plantas[selectedPlantIndex].nome}</Text>
              <Text style={styles.modalDescricao}>{plantas[selectedPlantIndex].descricao}</Text>
              <TouchableOpacity style={styles.button} onPress={fecharModal}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#384737" },
  header: { fontSize: 32, color: "#DDE0C4", marginTop: 40, fontWeight: "bold", textAlign: "center" },
  image: { width: "100%", height: 200, marginVertical: 10 },
  subtitle: { fontSize: 18, color: "#DDE0C4", marginTop: 10, textAlign: "center" },
  description: { fontSize: 14, color: "#DDE0C4", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#28352B", padding: 10, borderRadius: 5, marginHorizontal: 20, marginVertical: 10 },
  buttonText: { color: "#DDE0C4", fontSize: 16, textAlign: "center" },
  dataContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20 },
  circleGroup: { alignItems: "center" },
  circle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#DDE0C4", justifyContent: "center", alignItems: "center" },
  circleText: { fontSize: 14, fontWeight: "bold", textAlign: "center" },
  label: { fontSize: 10, marginTop: 4, color: "#DDE0C4" },
  recomendacaoContainer: { margin: 20 },
  relatorio: { color: "#DDE0C4", fontSize: 16, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  plantasContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  plantaItem: { width: "48%", marginBottom: 10, alignItems: "center" },
  plantaImagem: { width: 100, height: 100, borderRadius: 10 },
  plantaNome: { color: "#DDE0C4", marginTop: 5, textAlign: "center" },
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: "#28352B", padding: 20, borderRadius: 10, alignItems: "center" },
  modalImage: { width: 200, height: 200, borderRadius: 10 },
  modalTitle: { fontSize: 20, color: "#DDE0C4", marginVertical: 10 },
  modalDescricao: { fontSize: 14, color: "#DDE0C4", textAlign: "center", marginBottom: 10 }
});
