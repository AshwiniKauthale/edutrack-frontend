import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ClassroomTable from "../../components/classrooms/ClassroomTable";

import {
  getClassrooms,
  deleteClassroom,
} from "../../api/classroomApi";

export default function ClassroomList() {
  const navigate = useNavigate();

  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      setLoading(true);

      const response = await getClassrooms();

      setClassrooms(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load classrooms.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (classroom) => {
    navigate(`/classrooms/edit/${classroom.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this classroom?")) return;

    try {
      await deleteClassroom(id);

      alert("Classroom Deleted Successfully");

      loadClassrooms();
    } catch (error) {
      console.log(error);
      alert("Unable to delete classroom.");
    }
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>Classroom Management</h2>

        <button
          onClick={() => navigate("/classrooms/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Classroom
        </button>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : classrooms.length === 0 ? (
        <h3>No Classrooms Found</h3>
      ) : (
        <ClassroomTable
          classrooms={classrooms}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}