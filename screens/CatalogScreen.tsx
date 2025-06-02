import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const plants = [
  {
    id: "1",
    name: "Espada-de-São-Jorge",
    benefit: "Purifica o ar, resistente.",
    cultivation: "Sol indireto, rega semanal.",
    image: require("../assets/images/Espada.jpg"), // imagem local 
  },
  {
    id: "2",
    name: "Lírio-da-paz",
    benefit: "Filtra toxinas do ambiente.",
    cultivation: "Ambiente úmido e luz difusa.",
    image: require("../assets/images/Lírio-da-paz.png"), // imagem local 
  },
  {
    id: "3",
    name: "Jiboia",
    benefit: "Absorve poluentes, fácil de cuidar.",
    cultivation: "Luz moderada, rega quando o solo estiver seco.",
    image: require("../assets/images/jiboia.png"),
  },
  {
    id: "4",
    name: "Samambaia",
    benefit: "Aumenta a umidade do ar.",
    cultivation: "Ambientes úmidos, sombra parcial.",
    image:  require("../assets/images/Samambaia.png"),
  },
  {
    id: "5",
    name: "Babosa (Aloe Vera)",
    benefit: "Melhora o ar, uso medicinal.",
    cultivation: "Sol direto, rega espaçada.",
    image:  require("../assets/images/Babosa.png"),
  },
];

export default function CatalogScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell, { textAlign: "center" }]}>
            Imagem
          </Text>
          <Text style={[styles.cell, styles.headerCell]}>Nome</Text>
          <Text style={[styles.cell, styles.headerCell]}>Benefícios</Text>
          <Text style={[styles.cell, styles.headerCell]}>Recomendações</Text>
        </View>

        {plants.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={[styles.cell, styles.imageCell]}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.benefit}</Text>
            <Text style={styles.cell}>{item.cultivation}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6f2e6",
    padding: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  headerRow: {
    backgroundColor: "#b2d8b2",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlignVertical: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#2f4f4f",
  },
  imageCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
});
