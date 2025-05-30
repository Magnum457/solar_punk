import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        { img: "CAMINHO/para/planta1.jpeg", nome: "Nome da Planta 1" },
        { img: "CAMINHO/para/planta2.jpeg", nome: "Nome da Planta 2" },
        // ... até planta12
      ];
    } else if (razao < 1.5) {
      relatorioTexto = "Possivelmente Amônia ou CO2";
      listaPlantas = [
        { img: "CAMINHO/para/planta13.jpeg", nome: "Nome da Planta 13" },
        // ... continue aqui
      ];
    } else if (razao < 2.5) {
      relatorioTexto = "Possivelmente Tolueno";
      listaPlantas = [
        { img: "CAMINHO/para/planta15.jpeg", nome: "Nome da Planta 15" },
        // ...
      ];
    } else if (razao < 3) {
      relatorioTexto = "Possivelmente acetona ou álcool";
      listaPlantas = [
        { img: "CAMINHO/para/planta17.jpeg", nome: "Nome da Planta 17" },
        // ...
      ];
    } else if (razao >= 3) {
      relatorioTexto = "Possivelmente gás de combustão";
      listaPlantas = [
        { img: "../assets/images/Ficuselastica.jpeg", nome: "Ficus Elastica" },
        { img: "../assets/images/Nephrolepisexaltata.jpeg", nome: "Nephrolepis Exaltata" }
      ];
    } else {
      relatorioTexto = "Gás insuficiente para uma leitura.";
      listaPlantas = [];
    }

    setRelatorio(relatorioTexto);
    setPlantas(listaPlantas);
    setMostrarPlantas(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FLORASHIELD</Text>

      <Image 
        source={require("../assets/images/solar.jpeg")} 
        style={styles.image} 
        resizeMode="cover" 
      />

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
              <View key={index} style={styles.plantaItem}>
                <Image source={{ uri: planta.img }} style={styles.plantaImagem} />
                <Text style={styles.plantaNome}>{planta.nome}</Text>
              </View>
            ))}
          </View>
        </View>
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
  button: { backgroundColor: "#28352B", padding: 10, borderRadius: 5, marginHorizontal: 20, marginBottom: 20 },
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
  plantaNome: { color: "#DDE0C4", marginTop: 5, textAlign: "center" }
});
