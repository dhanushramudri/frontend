import { useState } from "react";
import { register, login } from "../services/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleRegister = async (credentials) => {
    const response = await register(credentials);
    setUser(response.user);
  };

  const handleLogin = async (credentials) => {
    const response = await login(credentials);
    setUser(response.user);
  };

  return { user, handleRegister, handleLogin };
};