export default function DashboardCard({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h2>{value}</h2>

      <h3>{title}</h3>
    </div>
  );
}