export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: 14,
        borderRadius: 14,
        background: "var(--primary)",
        color: "white",
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
