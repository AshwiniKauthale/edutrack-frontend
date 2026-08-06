import StudentRow from "./StudentRow";

export default function StudentTable({
  students,
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
          <th style={{ padding: "12px" }}>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Course</th>
          <th>Batch</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student) => {
          const studentId =
            typeof student.id === "object"
              ? student.id.$oid ||
                student.id.toString?.() ||
                String(student.id)
              : student.id;

          return (
            <StudentRow
              key={studentId}
              student={{
                ...student,
                id: studentId,
              }}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </tbody>
    </table>
  );
}