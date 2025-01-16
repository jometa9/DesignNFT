"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";

interface AuthContextData {
  wagmiConnected: boolean;
  solanaConnected: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuthContext = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { connected: solanaConnected } = useWallet();
  const { status } = useAccount();
  const wagmiConnected = status === "connected";

  return (
    <AuthContext.Provider value={{ wagmiConnected, solanaConnected }}>
      {children}
    </AuthContext.Provider>
  );
};
