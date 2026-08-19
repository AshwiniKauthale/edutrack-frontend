import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addTeacher } from "../../api/teacherApi";

import "./TeacherForm.css";

export default function AddTeacher() {

  const navigate = useNavigate();

  const [teacher, setTeacher] =
    useState({
      name: "",
      email: "",
      mobile: "",
      subject: "",
      qualification: "",
    });

  const [saving, setSaving] =
    useState(false);


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setTeacher(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await addTeacher(
        teacher
      );

      alert(
        "Teacher added successfully."
      );

      navigate("/teachers");

    } catch (error) {

      console.error(
        "Error adding teacher:",
        error
      );

      alert(
        "Unable to add teacher."
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <div className="teacher-form-page">

      <div className="teacher-form-card">

        <h1>
          Add Teacher
        </h1>

        <p>
          Enter teacher information below
        </p>


        <form
          onSubmit={handleSubmit}
          className="teacher-form"
        >

          {/* NAME */}

          <div className="teacher-form-group">

            <label>
              Teacher Name
            </label>

            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
            />

          </div>


          {/* EMAIL */}

          <div className="teacher-form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />

          </div>


          {/* MOBILE */}

          <div className="teacher-form-group">

            <label>
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={teacher.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />

          </div>


          {/* SUBJECT */}

          <div className="teacher-form-group">

            <label>
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={teacher.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
            />

          </div>


          {/* QUALIFICATION */}

          <div className="teacher-form-group">

            <label>
              Qualification
            </label>

            <input
              type="text"
              name="qualification"
              value={
                teacher.qualification
              }
              onChange={handleChange}
              placeholder="Enter qualification"
              required
            />

          </div>


          {/* BUTTONS */}

          <div className="teacher-form-actions">

            <button
              type="button"
              className="teacher-cancel-btn"
              onClick={() =>
                navigate("/teachers")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="teacher-submit-btn"
              disabled={saving}
            >

              {saving
                ? "Adding..."
                : "Add Teacher"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}