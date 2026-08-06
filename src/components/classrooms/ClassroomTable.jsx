import ClassroomRow from "./ClassroomRow";

export default function ClassroomTable({
  classrooms,
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
            color: "white",
          }}
        >
          <th style={{ padding: "12px" }}>Room</th>
          <th>Building</th>
          <th>Capacity</th>
          <th>Batch</th>
          <th>Teacher</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {classrooms.map((classroom) => (
          <ClassroomRow
            key={classroom.id}
            classroom={classroom}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}