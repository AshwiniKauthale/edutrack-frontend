import AssignmentRow from "./AssignmentRow";

export default function AssignmentTable({
  assignments,
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
          <th style={{ padding: "12px" }}>
            Title
          </th>

          <th>Batch</th>

          <th>Due Date</th>

          <th>Status</th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {assignments.map((assignment) => (
          <AssignmentRow
            key={assignment.id}
            assignment={assignment}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}