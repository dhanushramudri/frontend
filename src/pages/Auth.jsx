import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const { user, login, register } = useAuth(); // ✅ Import `user`
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log("User from AuthContext:", user); // 🔍 Debugging user

  const handleSubmit = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(credentials);
      } else {
        await register(credentials);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg border-2 transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <AuthForm type={isLogin ? "login" : "register"} onSubmit={handleSubmit} loading={loading} />

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 text-blue-600 hover:text-blue-700 transition-colors duration-300 block text-center w-full"
          disabled={loading}
        >
          {isLogin ? (
            <span>
              Don't have an account?{" "}
              <span className="font-semibold underline">Register</span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span className="font-semibold underline">Login</span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Auth;
