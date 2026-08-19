import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable({
  attendance,
  onEdit,
  onDelete,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#2563eb",
            color: "#fff",
          }}
        >
          <th style={{ padding: "12px" }}>Student</th>
          <th>Batch</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {attendance.map((record) => (
          <AttendanceRow
            key={record.id}
            attendance={record}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}