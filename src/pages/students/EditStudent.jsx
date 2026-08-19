import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getStudentById,
  updateStudent,
} from "../../api/studentApi";

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

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    batch: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadStudent();
  }, [id]);

  const loadStudent = async () => {
    try {
      setLoading(true);

      const response = await getStudentById(id);

      const data = response.data;

      setStudent({
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        course: data.course || "",
        batch: data.batch || "",
        address: data.address || "",
      });

    } catch (error) {
      console.error("Load student error:", error);

      alert("Unable to load student.");

      navigate("/students");
    } finally {
      setLoading(false);
    }
  };

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

      await updateStudent(id, student);

      alert("Student updated successfully!");

      navigate("/students");

    } catch (error) {
      console.error("Update student error:", error);

      alert("Unable to update student.");

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="student-form-page">
        <div className="student-form-card">
          <div className="form-loading">
            Loading student...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-form-page">

      <div className="student-form-card">

        <div className="student-form-heading">
          <div>
            <h1>Edit Student</h1>
            <p>
              Update student information
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
                ? "Updating Student..."
                : "Update Student"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}