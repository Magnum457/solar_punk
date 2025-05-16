import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebase } from "../services/firebase";

interface User {
  email: string | null | undefined;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const mockSignIn = async (email: string, password: string) => {
    if (email === "teste@gmail.com" && password === "1") {
      setUser({ email });
    } else {
      setUser(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await mockSignIn(email, password);
    } catch (error) {
      try {
        const result = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        setUser({ email: result.user?.email });
      } catch (err: any) {
        throw new Error(err.message || "Error signing in");
      }
    }
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    router.replace("/login");
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user ? { email: user.email } : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
