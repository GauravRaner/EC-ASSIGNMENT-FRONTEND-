import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  return (
    <AuthContext.Provider
      value={{ user, setUser, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
