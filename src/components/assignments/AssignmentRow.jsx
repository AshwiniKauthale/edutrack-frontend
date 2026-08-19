export default function AssignmentRow({
  assignment,
  onEdit,
  onDelete,
}) {
  return (
    <tr>
      <td style={{ padding: "10px" }}>
        {assignment.title}
      </td>

      <td>{assignment.batchName}</td>

      <td>{assignment.dueDate}</td>

      <td>{assignment.status}</td>

      <td>
        <button
          onClick={() => onEdit(assignment)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            marginRight: "10px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(assignment.id)}
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