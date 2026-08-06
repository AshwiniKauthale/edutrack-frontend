import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import TeacherTable from "../../components/teachers/TeacherTable";

import {
  getTeachers,
  deleteTeacher,
} from "../../api/teacherApi";

export default function TeacherList() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
  try {
    setLoading(true);

    const response = await getTeachers();

    console.log("Teachers =", response.data);
    console.log("First Teacher =", response.data[0]);
    console.log("Teacher ID =", response.data[0].id);
    console.log("Type =", typeof response.data[0].id);

    setTeachers(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (teacher) => {
    console.log("Teacher:", teacher);

    navigate(`/teachers/edit/${teacher.id}`);
  };

  const handleDelete = async (id) => {
    console.log("Deleting:", id);

    if (!window.confirm("Delete this teacher?"))
      return;

    try {
      await deleteTeacher(id);

      alert("Teacher Deleted Successfully");

      loadTeachers();
    } catch (error) {
      console.log(error);
      alert("Unable to delete teacher.");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Teacher Management</h2>

        <button
          onClick={() => navigate("/teachers/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Teacher
        </button>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : teachers.length === 0 ? (
        <h3>No Teachers Found</h3>
      ) : (
        <TeacherTable
          teachers={teachers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}