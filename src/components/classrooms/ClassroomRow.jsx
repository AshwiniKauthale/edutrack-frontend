export default function ClassroomRow({
  classroom,
  onEdit,
  onDelete,
}) {
  return (
    <tr>
      <td style={{ padding: "10px" }}>{classroom.roomNumber}</td>
      <td>{classroom.building}</td>
      <td>{classroom.capacity}</td>
      <td>{classroom.batchName}</td>
      <td>{classroom.teacherName}</td>

      <td>
        <button
          onClick={() => onEdit(classroom)}
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
          onClick={() => onDelete(classroom.id)}
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