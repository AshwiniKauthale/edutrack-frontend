import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { addTeacher } from "../../api/teacherApi";

export default function AddTeacher() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTeacher(teacher);

      alert("Teacher Added Successfully");

      navigate("/teachers");
    } catch (error) {
      console.log(error);
      alert("Unable to add teacher.");
    }
  };

  return (
    <MainLayout>
      <h2>Add Teacher</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile" onChange={handleChange} />
        <input name="subject" placeholder="Subject" onChange={handleChange} />
        <input
          name="qualification"
          placeholder="Qualification"
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
          Save Teacher
        </button>
      </form>
    </MainLayout>
  );
}