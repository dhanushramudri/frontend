import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(
        "https://backend-5599.vercel.app/api/auth/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Invalid response format: Expected JSON but received something else."
        );
      }

      const data = await response.json();
      console.log("Fetched user data:", data);

      if (data) {
        setUser(data);
      } else {
        console.error("Failed to fetch user:", data.message);
        logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error.message);
      logout();
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(
        "https://backend-5599.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        localStorage.setItem("name", data.name);
        setUser(data.user);
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await fetch(
        "https://backend-5599.vercel.app/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      console.log("Register response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Exkjsidhdfuhfuikasuifeaufhuesfhruybrgfusbfu");
        localStorage.setItem("userId", data._id);
        localStorage.setItem("useeEmail", data.email);
        setUser(data);
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
