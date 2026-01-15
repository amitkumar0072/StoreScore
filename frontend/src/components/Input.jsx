export default function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <input
        {...props}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 12,
          background: "#0d1117",
          color: "white",
          border: "1px solid #30363d",
        }}
      />
    </div>
  );
}
