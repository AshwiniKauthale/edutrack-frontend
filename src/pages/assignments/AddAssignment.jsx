import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { addAssignment } from "../../api/assignmentApi";

export default function AddAssignment() {
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({
    title: "",
    batchName: "",
    dueDate: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAssignment(assignment);

      alert("Assignment Added Successfully");

      navigate("/assignments");
    } catch (error) {
      console.log(error);
      alert("Unable to add assignment.");
    }
  };

  return (
    <MainLayout>
      <h2>Add Assignment</h2>

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
          placeholder="Assignment Title"
          value={assignment.title}
          onChange={handleChange}
        />

        <input
          name="batchName"
          placeholder="Batch Name"
          value={assignment.batchName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={assignment.description}
          onChange={handleChange}
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
          Save Assignment
        </button>
      </form>
    </MainLayout>
  );
}