import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setloading(false);
      if (user) {
        localStorage.setItem("userInfo", JSON.stringify(user));
        history.push("/");
      } else {
        history.push("/");
      }
    });
  }, [user, history]);
  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
