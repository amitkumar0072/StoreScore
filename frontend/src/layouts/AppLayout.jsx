import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AppLayout({ title, children }) {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ minHeight: "100vh", padding: "24px" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2>{title}</h2>
        <button
          onClick={logout}
          style={{
            background: "transparent",
            color: "var(--muted)",
            border: "1px solid var(--border)",
            padding: "8px 14px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}
