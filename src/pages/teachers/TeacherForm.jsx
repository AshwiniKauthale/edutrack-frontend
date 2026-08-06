import { useState } from "react";

export default function TeacherForm({
  initialData,
  onSubmit,
}) {
  const [teacher, setTeacher] = useState(
    initialData || {
      name: "",
      email: "",
      mobile: "",
      subject: "",
      qualification: "",
    }
  );

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(teacher);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <input
        type="text"
        name="name"
        placeholder="Teacher Name"
        value={teacher.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={teacher.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="mobile"
        placeholder="Mobile"
        value={teacher.mobile}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={teacher.subject}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="qualification"
        placeholder="Qualification"
        value={teacher.qualification}
        onChange={handleChange}
      />

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Teacher
      </button>
    </form>
  );
}