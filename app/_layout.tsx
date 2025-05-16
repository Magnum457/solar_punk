import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
