import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const noticias = [
  {
    id: 1,
    titulo: "Mudanças climáticas aceleram derretimento das calotas polares",
    descricao:
      "O aquecimento global está contribuindo para o aumento do nível do mar, ameaçando cidades costeiras.",
    imagem: require("../assets/images/not_nivelmar.png"),
    link: "https://www.correiobraziliense.com.br/cbradar/aumento-do-nivel-do-mar-e-a-maior-ameaca-as-cidades-costeiras/",
  },
  {
    id: 2,
    titulo: "Estudos indicam aumento da frequência de tempestades tropicais",
    descricao:
      "Pesquisadores apontam que tempestades mais intensas têm ocorrido nos últimos anos devido à mudança do clima.",
    imagem: require("../assets/images/not_tempestades.jpg"),
    link: "https://www.cnnbrasil.com.br/tecnologia/crise-climatica-esta-afetando-as-chuvas-em-furacoes-diz-estudo/",
  },
  {
    id: 3,
    titulo: "Como as plantas podem ajudar a combater a poluição do ar",
    descricao:
      "Plantas como o clorofito e a espada-de-são-jorge purificam o ar, trazendo benefícios para a saúde em ambientes internos.",
    imagem: require("../assets/images/not_espadasjorge.jpg"),
    link: "https://www.em.com.br/emfoco/2025/06/04/como-plantar-plantas-que-purificam-o-ar-e-deixam-sua-casa-mais-saudavel/",
  },
];

export default function JornalScreen() {
  const abrirLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Notícias Climáticas</Text>
      {noticias.map((noticia) => (
        <View key={noticia.id} style={styles.card}>
          <TouchableOpacity onPress={() => abrirLink(noticia.link)}>
            <Image source={noticia.imagem} style={styles.imagem} resizeMode="cover" />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.titulo}>{noticia.titulo}</Text>
            <Text style={styles.descricao}>{noticia.descricao}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#384737" },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#DDE0C4",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#28352B",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5, // para Android
  },
  imagem: { width: "100%", height: 150 },
  textContainer: { padding: 15 },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#DDE0C4",
    marginBottom: 8,
  },
  descricao: { fontSize: 14, color: "#DDE0C4", lineHeight: 20 },
});
