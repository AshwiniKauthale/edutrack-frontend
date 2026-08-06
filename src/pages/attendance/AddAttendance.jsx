import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { addAttendance } from "../../api/attendanceApi";

export default function AddAttendance() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    studentName: "",
    batchName: "",
    date: "",
    status: "Present",
  });

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addAttendance(attendance);

      alert("Attendance Added Successfully");

      navigate("/attendance");
    } catch (error) {
      console.log(error);
      alert("Unable to add attendance.");
    }
  };

  return (
    <MainLayout>
      <h2>Add Attendance</h2>

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
          name="studentName"
          placeholder="Student Name"
          value={attendance.studentName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="batchName"
          placeholder="Batch Name"
          value={attendance.batchName}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={attendance.date}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={attendance.status}
          onChange={handleChange}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Save Attendance
        </button>
      </form>
    </MainLayout>
  );
}