import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const plants = [
  {
    id: "1",
    name: "Espada-de-São-Jorge",
    benefit: "Purifica o ar. Resistente e fácil de manter.",
    cultivation: "Sol indireto, rega semanal.",
    image: require("../assets/images/Espada.jpg"),
  },
  {
    id: "2",
    name: "Lírio-da-paz",
    benefit: "Filtra toxinas e melhora a qualidade do ar.",
    cultivation: "Ambiente úmido, luz difusa.",
    image: require("../assets/images/Lírio-da-paz.png"),
  },
  {
    id: "3",
    name: "Jiboia",
    benefit: "Absorve poluentes, ideal para ambientes internos.",
    cultivation: "Luz moderada, rega quando o solo secar.",
    image: require("../assets/images/jiboia.png"),
  },
  {
    id: "4",
    name: "Samambaia",
    benefit: "Aumenta a umidade do ar e refresca o ambiente.",
    cultivation: "Ambientes úmidos, sombra parcial.",
    image: require("../assets/images/Samambaia.png"),
  },
  {
    id: "5",
    name: "Babosa (Aloe Vera)",
    benefit: "Melhora o ar e possui propriedades medicinais.",
    cultivation: "Sol direto, rega espaçada.",
    image: require("../assets/images/Babosa.png"),
  },
  {
    id: "6",
    name: "Hera-inglesa",
    benefit: "Remove mofo e toxinas do ar.",
    cultivation: "Meia sombra e regas frequentes.",
    image: require("../assets/images/Hederahelix.jpeg"),
  },
  {
    id: "7",
    name: "Areca-bambu",
    benefit: "Umidifica o ar e filtra compostos químicos.",
    cultivation: "Luz indireta e solo sempre úmido.",
    image: require("../assets/images/Dypsislutescens.jpeg"),
  },
  {
    id: "8",
    name: "Clorofito",
    benefit: "Elimina poluentes como monóxido de carbono.",
    cultivation: "Sol indireto e solo levemente úmido.",
    image: require("../assets/images/Chlorophytumcomosum.jpeg"),
  },
  {
    id: "9",
    name: "Ficus-lira",
    benefit: "Filtra toxinas e melhora a umidade do ar.",
    cultivation: "Ambientes claros e regas moderadas.",
    image: require("../assets/images/Ficuselastica.jpeg"),
  },
  {
    id: "10",
    name: "Maranta (Planta reza)",
    benefit: "Ajuda a purificar o ar e decora ambientes internos.",
    cultivation: "Ambiente úmido, luz filtrada.",
    image: require("../assets/images/Marantaleuconeura.jpeg"),
  },
  {
    id: "12",
    name: "Dracena-de-Madagascar",
    benefit: "Filtra benzeno e xileno, ideal para escritórios.",
    cultivation: "Luz indireta e pouca água.",
    image: require("../assets/images/Dracaenamarginata.jpeg"),
  },
  {
    id: "13",
    name: "Dracena-limão",
    benefit: "Ajuda a remover poluentes como formaldeído.",
    cultivation: "Sol indireto e rega moderada.",
    image: require("../assets/images/Dracaenafragrans.jpeg"),
  },
  {
    id: "14",
    name: "Crisântemo",
    benefit: "Purifica o ar e combate toxinas.",
    cultivation: "Luz direta e solo bem drenado.",
    image: require("../assets/images/Chrysanthemummorifolium.jpeg"),
  },
  {
    id: "15",
    name: "Ficus-benjamina",
    benefit: "Ajuda a eliminar formaldeído, tolueno e xilenos.",
    cultivation: "Ambiente iluminado, mas sem sol direto.",
    image: require("../assets/images/Ficusbenjamina.jpeg"),
  },
  {
    id: "16",
    name: "Gerbera",
    benefit: "Remove benzeno e tricloroetileno do ar.",
    cultivation: "Ambiente claro e arejado.",
    image: require("../assets/images/Gerberajamesonii.jpeg"),
  },
  {
    id: "17",
    name: "Filodendro",
    benefit: "Absorve formaldeído, ideal para áreas internas.",
    cultivation: "Meia sombra e solo úmido.",
    image: require("../assets/images/Philodendronhederaceum.jpeg"),
  },
  {
    id: "18",
    name: "Palmeira-bambu",
    benefit: "Purifica o ar e decora ambientes internos.",
    cultivation: "Pouca luz e solo úmido.",
    image: require("../assets/images/Chamaedoreaseifrizii.jpeg"),
  },
  {
    id: "19",
    name: "Livistona",
    benefit: "Ajuda na umidificação do ar.",
    cultivation: "Ambiente com boa luminosidade e rega regular.",
    image: require("../assets/images/Livistonarotundifolia.jpeg"),
  },
  {
    id: "20",
    name: "Samambaia americana",
    benefit: "Remove poluentes e melhora a umidade do ambiente.",
    cultivation: "Ambiente úmido, sombra parcial.",
    image: require("../assets/images/Nephrolepisexaltata.jpeg"),
  },
];

export default function CatalogoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.headerCell, styles.imageCol]}>Imagem</Text>
          <Text style={[styles.headerCell, styles.nameCol]}>Nome</Text>
          <Text style={[styles.headerCell, styles.benefitCol]}>Benefícios</Text>
          <Text style={[styles.headerCell, styles.cultivationCol]}>Cultivo</Text>
        </View>

        {plants.map((item) => (
          <View key={item.id} style={styles.row}>
            <View style={styles.imageCol}>
              <Image source={item.image} style={styles.image} />
            </View>
            <Text style={styles.nameCol}>{item.name}</Text>
            <Text style={styles.benefitCol}>{item.benefit}</Text>
            <Text style={styles.cultivationCol}>{item.cultivation}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#2A2A2A",
  },
  headerRow: {
    backgroundColor: "#3A3A3A",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#B0D9B1",
    paddingHorizontal: 6,
    fontSize: 13,
  },
  imageCol: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  nameCol: {
    flex: 1.2,
    color: "#DDE0C4",
    paddingHorizontal: 6,
    fontSize: 13,
  },
  benefitCol: {
    flex: 2,
    color: "#DDE0C4",
    paddingHorizontal: 6,
    fontSize: 13,
  },
  cultivationCol: {
    flex: 1.5,
    color: "#DDE0C4",
    paddingHorizontal: 6,
    fontSize: 13,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
});
