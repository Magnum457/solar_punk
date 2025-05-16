import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SplashScreen from "../screens/SplashScreen";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return <SplashScreen />;
}
