import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [qualidade, setQualidade] = useState("...");
  const [temperatura, setTemperatura] = useState("...");
  const [umidade, setUmidade] = useState("...");

  useEffect(() => {
    const db = getDatabase();

    const qualidadeRef = ref(db, 'FloraShield/FloraShield/Ar/Ar');
    const temperaturaRef = ref(db, 'FloraShield/FloraShield/Temp/Temp');
    const umidadeRef = ref(db, 'FloraShield/FloraShield/Humi/Humi');

    onValue(qualidadeRef, snapshot => {
      const val = snapshot.val();
      setQualidade(val !== null ? val : "Indisponível");
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FLORASHIELD</Text>

      <Image 
        source={require("../assets/images/solar.jpeg")} 
        style={styles.image} 
        resizeMode="cover" 
      />

      <Text style={styles.subtitle}>SolarPunk</Text>
      <Text style={styles.description}>na luta por um futuro justo</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Recomendar</Text>
      </TouchableOpacity>

      <View style={styles.dataContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{qualidade}</Text>
          <Text style={styles.label}>QUALIDADE</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{temperatura}°</Text>
          <Text style={styles.label}>TEMPERATURA</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{umidade}%</Text>
          <Text style={styles.label}>UMIDADE</Text>
        </View>
      </View>

      <View style={styles.navbar}>
        <Ionicons name="home-outline" size={24} color="white" />
        <Ionicons name="document-text-outline" size={24} color="white" />
        <MaterialCommunityIcons name="leaf" size={24} color="white" />
        <Ionicons name="people-outline" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#384737", alignItems: "center" },
  header: { fontSize: 32, color: "#DDE0C4", marginTop: 40, fontWeight: "bold" },
  image: { width: "100%", height: 200, marginVertical: 10 },
  subtitle: { fontSize: 18, color: "#DDE0C4", marginTop: 10 },
  description: { fontSize: 14, color: "#DDE0C4", marginBottom: 20 },
  button: { backgroundColor: "#28352B", padding: 10, borderRadius: 5, marginBottom: 20 },
  buttonText: { color: "#DDE0C4", fontSize: 16 },
  dataContainer: { flexDirection: "row", justifyContent: "space-around", width: "90%", marginVertical: 20 },
  circle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#DDE0C4", justifyContent: "center", alignItems: "center" },
  circleText: { fontSize: 14, fontWeight: "bold" },
  label: { fontSize: 10, marginTop: 4 },
  navbar: { flexDirection: "row", justifyContent: "space-around", width: "100%", paddingVertical: 15, backgroundColor: "#28352B", position: "absolute", bottom: 0 }
});
