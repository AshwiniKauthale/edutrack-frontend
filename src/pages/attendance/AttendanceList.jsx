import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import AttendanceTable from "../../components/attendance/AttendanceTable";

import {
  getAttendance,
  deleteAttendance,
} from "../../api/attendanceApi";

export default function AttendanceList() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const response = await getAttendance();

      console.log(response.data);

      setAttendance(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    navigate(`/attendance/edit/${record.id}`);
  };

  const handleDelete = async (id) => {
  console.log("Deleting:", id);
  console.log(typeof id);

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this attendance record?"
  );

  if (!confirmDelete) return;

  try {
    await deleteAttendance(id);

    alert("Attendance Deleted Successfully");

    loadAttendance();
  } catch (error) {
    console.log(error);
    alert("Unable to delete attendance.");
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
        <h2>Attendance Management</h2>

        <button
          onClick={() => navigate("/attendance/add")}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add Attendance
        </button>
      </div>

      {loading ? (
        <h3>Loading Attendance...</h3>
      ) : attendance.length === 0 ? (
        <h3>No Attendance Records Found</h3>
      ) : (
        <AttendanceTable
          attendance={attendance}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}