import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error verifying token:", err);
        logout();
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
