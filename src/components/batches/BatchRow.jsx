export default function BatchRow({
  batch,
  onEdit,
  onDelete,
}) {
  return (
    <tr>
      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {batch.name}
      </td>

      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #ddd",
        }}
      >
        ₹ {batch.fees}
      </td>

      <td
        style={{
          padding: "12px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => onEdit(batch)}
          style={{
            marginRight: "10px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(batch.id)}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}