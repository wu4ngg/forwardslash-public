"use client";
import { auth } from "@/firebase/auth/authentication";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<User | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsub();
  }, []);
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export function useUser() {
  return useContext(userContext);
}
