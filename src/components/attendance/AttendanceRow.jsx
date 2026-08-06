export default function AttendanceRow({
  attendance,
  onEdit,
  onDelete,
}) {

  // Supports both:
  // id: "698b11647b0812b28efc0aee"
  // OR
  // id: { "$oid": "698b11647b0812b28efc0aee" }

  const attendanceId =
    typeof attendance.id === "object"
      ? attendance.id?.$oid || attendance.id?.toString()
      : attendance.id;

  console.log("Attendance:", attendance);
  console.log("Attendance ID:", attendanceId);

  return (
    <tr>
      <td style={{ padding: "10px" }}>
        {attendance.studentName}
      </td>

      <td>{attendance.batchName}</td>

      <td>{attendance.date}</td>

      <td>{attendance.status}</td>

      <td>
        <button
          onClick={() => onEdit(attendance)}
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
          onClick={() => onDelete(attendanceId)}
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