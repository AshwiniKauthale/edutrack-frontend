import { useState } from "react";

export default function StudentForm({ onSubmit, initialData = {} }) {
  const [student, setStudent] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    course: initialData.course || "",
    semester: initialData.semester || "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "18px" }}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={student.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "18px" }}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "18px" }}>
        <label>Course</label>
        <input
          type="text"
          name="course"
          value={student.course}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "18px" }}>
        <label>Semester</label>
        <input
          type="number"
          name="semester"
          value={student.semester}
          onChange={handleChange}
          required
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Student
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box",
};