import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getClassroomById,
  updateClassroom,
} from "../../api/classroomApi";

export default function EditClassroom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classroom, setClassroom] = useState({
    roomNumber: "",
    building: "",
    capacity: "",
    batchName: "",
    teacherName: "",
  });

  useEffect(() => {
    loadClassroom();
  }, []);

  const loadClassroom = async () => {
    try {
      const res = await getClassroomById(id);
      setClassroom(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setClassroom({
      ...classroom,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateClassroom(id, classroom);

      alert("Classroom Updated Successfully");

      navigate("/classrooms");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <MainLayout>
      <h2>Edit Classroom</h2>

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
          value={classroom.roomNumber}
          onChange={handleChange}
        />

        <input
          name="building"
          value={classroom.building}
          onChange={handleChange}
        />

        <input
          type="number"
          name="capacity"
          value={classroom.capacity}
          onChange={handleChange}
        />

        <input
          name="batchName"
          value={classroom.batchName}
          onChange={handleChange}
        />

        <input
          name="teacherName"
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
          Update Classroom
        </button>
      </form>
    </MainLayout>
  );
}