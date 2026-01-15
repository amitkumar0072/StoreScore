import { useEffect, useState } from "react";
import api from "../api/axios";
import AppLayout from "../layouts/AppLayout";

export default function StoreOwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/store-owner/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <AppLayout title="Analytics">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div className="card">
          <p>Average Rating</p>
          <h2>⭐ {data.averageRating}</h2>
        </div>

        <div className="card">
          <p>Total Reviews</p>
          <h2>{data.totalRatings}</h2>
        </div>
      </div>

      <div className="card">
        <h3>Recent Reviews</h3>
        {data.users.map((u, i) => (
          <p key={i}>
            <b>{u.name}</b> — ⭐ {u.rating}
          </p>
        ))}
      </div>
    </AppLayout>
  );
}
