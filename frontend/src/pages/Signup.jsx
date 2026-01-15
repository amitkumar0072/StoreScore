import { useState } from "react";
import api from "../api/axios";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role:"",
  });

  const submit = async () => {
    try {
      await api.post("/auth/signup", form);
      alert("Account created successfully. Please login.");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 420, margin: "80px auto" }}>
      <h1>Create Account</h1>
      <p style={{ color: "var(--muted)" }}>
        Rate, review, and discover stores near you
      </p>

      <Input
        label="Full Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Email Address"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="Role"
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
      <Input
        label="Address"
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <Input
        label="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <Button onClick={submit}>Create Account →</Button>

      <p style={{ marginTop: 16, color: "var(--muted)" }}>
        Already have an account? <a href="/">Log in</a>
      </p>
    </div>
  );
}
