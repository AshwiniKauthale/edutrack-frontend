import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../api/studentApi";
import "./StudentForm.css";

const COURSES = [
  "Java Full Stack",
  "Python Full Stack",
  "AIML",
  "Data Science",
  "DevOps",
  "Angular",
  "React",
  ".NET Full Stack",
  "Cloud Computing",
  "Cyber Security",
];

const BATCHES = [
  "Batch A",
  "Batch B",
  "Batch C",
  "Batch D",
  "Batch E",
];

export default function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    batch: "",
    address: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await addStudent(student);

      alert("Student added successfully!");

      navigate("/students");
    } catch (error) {
      console.error("Add student error:", error);

      alert("Unable to add student.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="student-form-page">

      <div className="student-form-card">

        <div className="student-form-heading">
          <div>
            <h1>Add Student</h1>
            <p>
              Enter student information below
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="student-form"
        >

          {/* NAME */}

          <div className="student-form-group">
            <label htmlFor="name">
              Student Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>

          {/* EMAIL */}

          <div className="student-form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* MOBILE */}

          <div className="student-form-group">
            <label htmlFor="mobile">
              Mobile Number
            </label>

            <input
              id="mobile"
              type="tel"
              name="mobile"
              value={student.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* COURSE */}

          <div className="student-form-group">
            <label htmlFor="course">
              Course
            </label>

            <select
              id="course"
              name="course"
              value={student.course}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Course
              </option>

              {COURSES.map((course) => (
                <option
                  key={course}
                  value={course}
                >
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* BATCH */}

          <div className="student-form-group">
            <label htmlFor="batch">
              Batch
            </label>

            <select
              id="batch"
              name="batch"
              value={student.batch}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Batch
              </option>

              {BATCHES.map((batch) => (
                <option
                  key={batch}
                  value={batch}
                >
                  {batch}
                </option>
              ))}
            </select>
          </div>

          {/* ADDRESS */}

          <div className="student-form-group">
            <label htmlFor="address">
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              rows={5}
              required
            />
          </div>

          {/* BUTTONS */}

          <div className="student-form-actions">

            <button
              type="button"
              className="student-cancel-btn"
              onClick={() => navigate("/students")}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="student-submit-btn"
              disabled={saving}
            >
              {saving
                ? "Adding Student..."
                : "Add Student"}
            </button>

          </div>

        </form>
      </div>

    </div>
  );
}