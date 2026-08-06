import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import StudentTable from "../../components/students/StudentTable";

import {
  getStudents,
  deleteStudent,
} from "../../api/studentApi";

export default function StudentList() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const response = await getStudents();

      const formattedStudents = response.data.map((student) => ({
        ...student,
        id:
          typeof student.id === "object"
            ? student.id.$oid ||
              student.id.toString?.() ||
              String(student.id)
            : student.id,
      }));

      setStudents(formattedStudents);
    } catch (error) {
      console.log(error);
      alert("Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await deleteStudent(id);

      alert("Student Deleted Successfully");

      loadStudents();
    } catch (error) {
      console.log(error);
      alert("Unable to delete student.");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Student Management</h2>

        <button
          onClick={() => navigate("/students/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Student
        </button>
      </div>

      {loading ? (
        <h3>Loading Students...</h3>
      ) : students.length === 0 ? (
        <h3>No Students Found</h3>
      ) : (
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}