import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getAssignmentById,
  updateAssignment,
} from "../../api/assignmentApi";

export default function EditAssignment() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({
    title: "",
    batchName: "",
    dueDate: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {
    try {
      const res = await getAssignmentById(id);

      setAssignment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAssignment(id, assignment);

      alert("Assignment Updated Successfully");

      navigate("/assignments");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <MainLayout>
      <h2>Edit Assignment</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          name="title"
          value={assignment.title}
          onChange={handleChange}
          placeholder="Assignment Title"
        />

        <input
          name="batchName"
          value={assignment.batchName}
          onChange={handleChange}
          placeholder="Batch Name"
        />

        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
        />

        <textarea
          name="description"
          rows="4"
          value={assignment.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <select
          name="status"
          value={assignment.status}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Submitted">Submitted</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Assignment
        </button>
      </form>
    </MainLayout>
  );
}