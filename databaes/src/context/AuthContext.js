import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, ownerId, setOwnerId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
