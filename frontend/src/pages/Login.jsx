import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e, demo = false) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token, res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      if (res.data.role === "USER") navigate("/user");
      if (res.data.role === "STORE_OWNER") navigate("/owner");
    } catch {
      alert("Invalid credentials");
    }
  };

  const demoLogin = async (role) => {
    let creds = {};

    if (role === "ADMIN")
      creds = { email: "admin@demo.com", password: "Admin@123" };
    if (role === "USER")
      creds = { email: "user@demo.com", password: "User@123" };
    if (role === "STORE_OWNER")
      creds = { email: "owner@demo.com", password: "Owner@123" };

    try {
      const res = await api.post("/auth/login", creds);
      login(res.data.token, res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      if (res.data.role === "USER") navigate("/user");
      if (res.data.role === "STORE_OWNER") navigate("/owner");
    } catch {
      alert("Demo login failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: "80px auto" }}>
      <h1>Welcome Back</h1>
      <p style={{ color: "var(--muted)" }}>
        Sign in or explore using demo accounts
      </p>

      <Input
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin}>Sign In →</Button>

      {/* DEMO BUTTONS */}
      <div style={{ marginTop: 16 }}>
        <p style={{ color: "var(--muted)", marginBottom: 8 }}>
          Try Demo Access
        </p>

        <button
          onClick={() => demoLogin("ADMIN")}
          style={demoBtnStyle}
        >
          Demo Admin
        </button>

        <button
          onClick={() => demoLogin("USER")}
          style={demoBtnStyle}
        >
          Demo User
        </button>

        <button
          onClick={() => demoLogin("STORE_OWNER")}
          style={demoBtnStyle}
        >
          Demo Store Owner
        </button>
      </div>

      <p style={{ marginTop: 16, color: "var(--muted)" }}>
        New here? <a href="/signup">Create Account</a>
      </p>
    </div>
  );
}

const demoBtnStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "8px",
  borderRadius: "12px",
  background: "transparent",
  color: "var(--primary)",
  border: "1px dashed var(--primary)",
  cursor: "pointer",
  fontWeight: 500,
};
