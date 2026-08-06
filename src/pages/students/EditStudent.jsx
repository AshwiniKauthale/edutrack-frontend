import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getStudentById,
  updateStudent,
} from "../../api/studentApi";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    batch: "",
    address: "",
  });

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const response = await getStudentById(id);

      setStudent(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load student.");
    }
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStudent(id, student);

      alert("Student Updated Successfully");

      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Unable to update student.");
    }
  };

  return (
    <MainLayout>
      <h2>Edit Student</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={student.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="batch"
          placeholder="Batch"
          value={student.batch}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          rows="4"
          value={student.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update Student
        </button>
      </form>
    </MainLayout>
  );
}