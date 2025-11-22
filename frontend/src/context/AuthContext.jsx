import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [rol, setRol] = useState(localStorage.getItem("rol") || null);

  const login = (userRol) => {
    setRol(userRol);
    localStorage.setItem("rol", userRol);
  };

  const logout = () => {
    setRol(null);
    localStorage.removeItem("rol");
  };

  return (
    <AuthContext.Provider value={{ rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
