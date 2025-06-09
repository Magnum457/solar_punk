import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2E3B2F",
            borderTopColor: "#1E2A22",
          },
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require("../../assets/images/home.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="catalogo"
          options={{
            title: "Catálogo",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require("../../assets/images/leaf.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="jornal"
          options={{
            title: "Jornal",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <Image
                source={require("../../assets/images/journal.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#2E3B2F",
  },
});
