import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    try {
      await signIn(email, password);
      router.replace("/home");
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { borderColor: "gray", borderWidth: 1, marginBottom: 20, padding: 10 },
  error: { color: "red", marginBottom: 20, textAlign: "center" },
});
