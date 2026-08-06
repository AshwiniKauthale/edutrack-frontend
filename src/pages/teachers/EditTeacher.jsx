import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
  getTeacherById,
  updateTeacher,
} from "../../api/teacherApi";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    qualification: "",
  });

  useEffect(() => {
    if (id) {
      loadTeacher();
    }
  }, [id]);

  const loadTeacher = async () => {
    try {
      console.log("Loading Teacher ID:", id);

      const response = await getTeacherById(id);

      console.log("Teacher Data:", response.data);

      setTeacher({
        name: response.data.name || "",
        email: response.data.email || "",
        mobile: response.data.mobile || "",
        subject: response.data.subject || "",
        qualification: response.data.qualification || "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load teacher.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Updating Teacher:", id);

      await updateTeacher(id, teacher);

      alert("Teacher Updated Successfully");

      navigate("/teachers");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <MainLayout>
      <h2>Edit Teacher</h2>

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
          name="name"
          value={teacher.name}
          onChange={handleChange}
          placeholder="Teacher Name"
          required
        />

        <input
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="text"
          name="mobile"
          value={teacher.mobile}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
        />

        <input
          type="text"
          name="subject"
          value={teacher.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />

        <input
          type="text"
          name="qualification"
          value={teacher.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          required
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Update Teacher
          </button>

          <button
            type="button"
            onClick={() => navigate("/teachers")}
            style={{
              background: "#6b7280",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </MainLayout>
  );
}