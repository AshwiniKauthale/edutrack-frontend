import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getAttendanceById,
  updateAttendance,
} from "../../api/attendanceApi";

export default function EditAttendance() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState({
    studentName: "",
    batchName: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const response = await getAttendanceById(id);

      setAttendance(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load attendance.");
    }
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAttendance(id, attendance);

      alert("Attendance Updated Successfully");

      navigate("/attendance");
    } catch (error) {
      console.log(error);
      alert("Unable to update attendance.");
    }
  };

  return (
    <MainLayout>
      <h2>Edit Attendance</h2>

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
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update Attendance
        </button>
      </form>
    </MainLayout>
  );
}