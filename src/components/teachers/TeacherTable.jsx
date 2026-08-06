import TeacherRow from "./TeacherRow";

export default function TeacherTable({
  teachers,
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
          <th>Subject</th>
          <th>Qualification</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {teachers.map((teacher) => (
          <TeacherRow
            key={teacher.id}
            teacher={teacher}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}