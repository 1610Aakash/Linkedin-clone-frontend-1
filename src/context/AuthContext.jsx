import { createContext, useState, useEffect } from "react";
import API from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔁 On app load or refresh: fetch current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await API.get("/auth/me"); // Backend must have this endpoint
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          localStorage.clear();
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const login = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user); // Do not store user in localStorage to avoid stale data
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
