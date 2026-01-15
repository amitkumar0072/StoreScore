export default function StoreCard({ store, onRate }) {
  return (
    <div className="card">
      <h3>{store.storeName}</h3>
      <p>{store.address}</p>
      <p>⭐ {store.overallRating}</p>
      <p>Your Rating: {store.userRating ?? "—"}</p>
      <button onClick={() => onRate(store.storeId, 5)}>Rate 5</button>
    </div>
  );
}
