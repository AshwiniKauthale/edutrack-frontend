export default function TeacherRow({
  teacher,
  onEdit,
  onDelete,
}) {
  return (
    <tr>
      <td style={{ padding: "10px" }}>{teacher.name}</td>
      <td>{teacher.email}</td>
      <td>{teacher.mobile}</td>
      <td>{teacher.subject}</td>
      <td>{teacher.qualification}</td>

      <td>
        <button
          onClick={() => onEdit(teacher)}
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
          onClick={() => onDelete(teacher.id)}
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