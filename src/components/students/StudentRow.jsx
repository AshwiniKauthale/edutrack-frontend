export default function StudentRow({
  student,
  onEdit,
  onDelete,
}) {

  // Convert Mongo ObjectId safely to string
  const studentId =
    typeof student.id === "object"
      ? student.id.$oid ||
        student.id.toString?.() ||
        String(student.id)
      : student.id;

  return (
    <tr>
      <td style={{ padding: "10px" }}>
        {student.name}
      </td>

      <td>{student.email}</td>

      <td>{student.mobile}</td>

      <td>{student.course}</td>

      <td>{student.batch}</td>

      <td>{student.address}</td>

      <td>
        <button
          onClick={() =>
            onEdit({
              ...student,
              id: studentId,
            })
          }
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
          onClick={() => onDelete(studentId)}
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