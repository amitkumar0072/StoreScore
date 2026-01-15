import { useEffect, useState } from "react";
import api from "../api/axios";
import AppLayout from "../layouts/AppLayout";
import StatCard from "../components/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    api.get("/admin/dashboard").then((res) => setStats(res.data));
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Stores" value={stats.totalStores} />
        <StatCard label="Ratings" value={stats.totalRatings} />
      </div>
    </AppLayout>
  );
}
