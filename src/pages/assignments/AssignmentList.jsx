import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import AssignmentTable from "../../components/assignments/AssignmentTable";

import {
  getAssignments,
  deleteAssignment,
} from "../../api/assignmentApi";

export default function AssignmentList() {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);

      const response = await getAssignments();

      setAssignments(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load assignments.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (assignment) => {
    navigate(`/assignments/edit/${assignment.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this assignment?")) return;

    try {
      await deleteAssignment(id);

      alert("Assignment Deleted Successfully");

      loadAssignments();
    } catch (error) {
      console.log(error);
      alert("Unable to delete assignment.");
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
        <h2>Assignment Management</h2>

        <button
          onClick={() => navigate("/assignments/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Assignment
        </button>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : assignments.length === 0 ? (
        <h3>No Assignments Found</h3>
      ) : (
        <AssignmentTable
          assignments={assignments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}