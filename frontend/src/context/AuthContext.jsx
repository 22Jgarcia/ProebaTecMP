import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  
  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  });

  const login = (nombre, rol) => {
  const user = { nombre, rol };
  setUsuario(user);
  localStorage.setItem("usuario", JSON.stringify(user));
};

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
