import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { addClassroom } from "../../api/classroomApi";

export default function AddClassroom() {
  const navigate = useNavigate();

  const [classroom, setClassroom] = useState({
    roomNumber: "",
    building: "",
    capacity: "",
    batchName: "",
    teacherName: "",
  });

  const handleChange = (e) => {
    setClassroom({
      ...classroom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addClassroom(classroom);

      alert("Classroom Added Successfully");

      navigate("/classrooms");
    } catch (err) {
      console.log(err);
      alert("Unable to add classroom.");
    }
  };

  return (
    <MainLayout>
      <h2>Add Classroom</h2>

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
          name="roomNumber"
          placeholder="Room Number"
          value={classroom.roomNumber}
          onChange={handleChange}
        />

        <input
          name="building"
          placeholder="Building"
          value={classroom.building}
          onChange={handleChange}
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={classroom.capacity}
          onChange={handleChange}
        />

        <input
          name="batchName"
          placeholder="Batch Name"
          value={classroom.batchName}
          onChange={handleChange}
        />

        <input
          name="teacherName"
          placeholder="Teacher Name"
          value={classroom.teacherName}
          onChange={handleChange}
        />

        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Add Classroom
        </button>
      </form>
    </MainLayout>
  );
}