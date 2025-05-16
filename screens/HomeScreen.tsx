import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Bem-vindo à Home!</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
