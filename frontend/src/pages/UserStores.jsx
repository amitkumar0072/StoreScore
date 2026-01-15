import { useEffect, useState } from "react";
import api from "../api/axios";
import AppLayout from "../layouts/AppLayout";
import StoreCard from "../components/StoreCard";

export default function UserStores() {
  const [stores, setStores] = useState([]);

  const loadStores = () => {
    api.get("/user/stores").then((res) => setStores(res.data));
  };

  useEffect(() => {
    loadStores();
  }, []);

  const rateStore = async (storeId, rating) => {
    try {
      await api.post("/user/ratings", { storeId, rating });
      loadStores();
    } catch {
      await api.put("/user/ratings", { storeId, rating });
      loadStores();
    }
  };

  return (
    <AppLayout title="Discover Stores">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {stores.map((store) => (
          <StoreCard
            key={store.storeId}
            store={store}
            onRate={rateStore}
          />
        ))}
      </div>
    </AppLayout>
  );
}
