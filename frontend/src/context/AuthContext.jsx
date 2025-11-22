import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children}) => {
  const [rol, setRol]= useState(localStorage.getItem("rol")|| null);
  
  const login = (userRol) =>{
    setRol (userRol);
    localStorage.setItem("rol", userRol);
  };

  const logout = () =>{
    setRol(null);
    localStorage.removeItem("rol");
  };
  return(
    <div>
      <AuthContext.Provider value={{rol, login, logout}}>
        {children}
      </AuthContext.Provider>
    </div>

  );

}
