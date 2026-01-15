import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { role: userRole } = useContext(AuthContext);
  if (!userRole || userRole !== role) return <Navigate to="/" />;
  return children;
}
