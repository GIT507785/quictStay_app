import React, { createContext, useState } from "react";

export interface AppContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// ✅ Context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ Custom Props (instead of PropsWithChildren)
type Props = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  const value: AppContextType = {
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
  
};