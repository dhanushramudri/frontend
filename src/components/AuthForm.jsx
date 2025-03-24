import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert } from "./ui/alert";
import { useState } from "react";

const AuthForm = ({ type, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = type === "register" ? { name, email, password } : { email, password };

    console.log("Submitting Credentials:", credentials); // ✅ Debugging Log

    try {
      await onSubmit(credentials);
      alert("Success");

      // Clear localStorage only for registration
      if (type === "register") {
        localStorage.clear();
      }
    } catch (err) {
      console.error("Error during authentication:", err); // ✅ Debugging Log
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert variant="error">{error}</Alert>}

      {/* Show name input only for registration */}
      {type === "register" && (
        <Input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">{type === "login" ? "Login" : "Register"}</Button>
    </form>
  );
};

export default AuthForm;
