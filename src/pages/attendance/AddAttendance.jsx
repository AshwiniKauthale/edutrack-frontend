import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthHeaders } from "../../utils/Auth";

// =====================================================
// API URLS
// =====================================================

const STUDENT_API = "http://localhost:8080/students";
const BATCH_API = "http://localhost:8080/batches";
const CLASSROOM_API = "http://localhost:8080/classrooms";
const ATTENDANCE_API = "http://localhost:8080/attendance";

// =====================================================
// COMPONENT
// =====================================================

const AddAttendance = () => {

    const navigate = useNavigate();

    // =================================================
    // FORM DATA
    // =================================================

    const [formData, setFormData] = useState({
        studentId: "",
        batchId: "",
        classroomId: "",
        attendanceDate: new Date().toISOString().split("T")[0],
        status: "PRESENT",
        remarks: ""
    });

    // =================================================
    // DROPDOWN DATA
    // =================================================

    const [students, setStudents] = useState([]);
    const [batches, setBatches] = useState([]);
    const [classrooms, setClassrooms] = useState([]);

    // =================================================
    // STATES
    // =================================================

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =================================================
    // LOAD DROPDOWN DATA
    // =================================================

    useEffect(() => {
        loadDropdownData();
    }, []);

    const loadDropdownData = async () => {

        try {

            setLoadingData(true);
            setError("");

            const headers = getAuthHeaders();

            const [
                studentResponse,
                batchResponse,
                classroomResponse
            ] = await Promise.all([

                axios.get(
                    STUDENT_API,
                    {
                        headers
                    }
                ),

                axios.get(
                    BATCH_API,
                    {
                        headers
                    }
                ),

                axios.get(
                    CLASSROOM_API,
                    {
                        headers
                    }
                )

            ]);

            // =========================================
            // STUDENTS
            // =========================================

            const studentData =
                Array.isArray(studentResponse.data)
                    ? studentResponse.data
                    : studentResponse.data?.content || [];

            setStudents(studentData);

            // =========================================
            // BATCHES
            // =========================================

            const batchData =
                Array.isArray(batchResponse.data)
                    ? batchResponse.data
                    : batchResponse.data?.content || [];

            setBatches(batchData);

            // =========================================
            // CLASSROOMS
            // =========================================

            const classroomData =
                Array.isArray(classroomResponse.data)
                    ? classroomResponse.data
                    : classroomResponse.data?.content || [];

            setClassrooms(classroomData);

        } catch (err) {

            console.error(
                "Error loading attendance data:",
                err
            );

            if (err.response?.status === 401 ||
                err.response?.status === 403) {

                setError(
                    "You are not authorized to load attendance data."
                );

            } else {

                setError(
                    "Unable to load students, batches or classrooms."
                );
            }

        } finally {

            setLoadingData(false);
        }
    };

    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };

    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {

        if (!formData.studentId) {
            setError("Please select a student.");
            return false;
        }

        if (!formData.batchId) {
            setError("Please select a batch.");
            return false;
        }

        if (!formData.classroomId) {
            setError("Please select a classroom.");
            return false;
        }

        if (!formData.attendanceDate) {
            setError("Please select attendance date.");
            return false;
        }

        if (!formData.status) {
            setError("Please select attendance status.");
            return false;
        }

        return true;
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        // ================================================
        // VALIDATE
        // ================================================

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const headers = getAuthHeaders();

            // ============================================
            // REQUEST BODY
            // ============================================

            const attendanceData = {
                studentId: formData.studentId,
                batchId: formData.batchId,
                classroomId: formData.classroomId,
                attendanceDate: formData.attendanceDate,
                status: formData.status,
                remarks: formData.remarks
            };

            console.log(
                "Attendance request:",
                attendanceData
            );

            // ============================================
            // API REQUEST
            // ============================================

            await axios.post(
                ATTENDANCE_API,
                attendanceData,
                {
                    headers
                }
            );

            // ============================================
            // SUCCESS
            // ============================================

            setSuccess(
                "Attendance added successfully."
            );

            // ============================================
            // REDIRECT
            // ============================================

            setTimeout(() => {

                navigate("/attendance");

            }, 1000);

        } catch (err) {

            console.error(
                "Error adding attendance:",
                err
            );

            // ============================================
            // ERROR HANDLING
            // ============================================

            if (err.response?.status === 400) {

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    "Invalid attendance data."
                );

            } else if (
                err.response?.status === 401 ||
                err.response?.status === 403
            ) {

                setError(
                    "You are not authorized to add attendance."
                );

            } else {

                setError(
                    err.response?.data?.message ||
                    err.response?.data ||
                    "Failed to add attendance."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // RESET
    // =====================================================

    const handleReset = () => {

        setFormData({
            studentId: "",
            batchId: "",
            classroomId: "",
            attendanceDate:
                new Date().toISOString().split("T")[0],
            status: "PRESENT",
            remarks: ""
        });

        setError("");
        setSuccess("");
    };

    // =====================================================
    // GET STUDENT NAME
    // =====================================================

    const getStudentName = (student) => {

        return (
            student.fullName ||
            student.name ||
            `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
            student.username ||
            "Unnamed Student"
        );
    };

    // =====================================================
    // GET BATCH NAME
    // =====================================================

    const getBatchName = (batch) => {

        return (
            batch.name ||
            batch.batchName ||
            "Unnamed Batch"
        );
    };

    // =====================================================
    // GET CLASSROOM NAME
    // =====================================================

    const getClassroomName = (classroom) => {

        return (
            classroom.name ||
            classroom.classroomName ||
            classroom.roomName ||
            "Unnamed Classroom"
        );
    };

    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loadingData) {

        return (

            <div className="container-fluid py-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="mt-3 mb-0 text-muted">
                            Loading attendance form...
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="container-fluid py-4">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="fw-bold mb-1">
                        Add Attendance
                    </h3>

                    <p className="text-muted mb-0">
                        Record student attendance
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/attendance")}
                >
                    ← Back to Attendance
                </button>

            </div>

            {/* =================================================
                ALERTS
            ================================================= */}

            {error && (

                <div
                    className="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >

                    <strong>Error:</strong>{" "}
                    {error}

                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                    />

                </div>
            )}

            {success && (

                <div
                    className="alert alert-success"
                    role="alert"
                >

                    <strong>Success:</strong>{" "}
                    {success}

                </div>
            )}

            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-header bg-white border-bottom py-3">

                    <h5 className="mb-0 fw-semibold">
                        Attendance Information
                    </h5>

                </div>

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            {/* =================================
                                STUDENT
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Student
                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <select
                                    className="form-select"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Student
                                    </option>

                                    {students.map(student => (

                                        <option
                                            key={
                                                student.id ||
                                                student._id
                                            }
                                            value={
                                                student.id ||
                                                student._id
                                            }
                                        >
                                            {getStudentName(student)}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* =================================
                                BATCH
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Batch
                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <select
                                    className="form-select"
                                    name="batchId"
                                    value={formData.batchId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Batch
                                    </option>

                                    {batches.map(batch => (

                                        <option
                                            key={
                                                batch.id ||
                                                batch._id
                                            }
                                            value={
                                                batch.id ||
                                                batch._id
                                            }
                                        >
                                            {getBatchName(batch)}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* =================================
                                CLASSROOM
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Classroom
                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <select
                                    className="form-select"
                                    name="classroomId"
                                    value={formData.classroomId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Classroom
                                    </option>

                                    {classrooms.map(classroom => (

                                        <option
                                            key={
                                                classroom.id ||
                                                classroom._id
                                            }
                                            value={
                                                classroom.id ||
                                                classroom._id
                                            }
                                        >
                                            {getClassroomName(classroom)}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* =================================
                                DATE
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Attendance Date
                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="attendanceDate"
                                    value={
                                        formData.attendanceDate
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            {/* =================================
                                STATUS
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Attendance Status
                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="PRESENT">
                                        Present
                                    </option>

                                    <option value="ABSENT">
                                        Absent
                                    </option>

                                    <option value="LATE">
                                        Late
                                    </option>

                                    <option value="LEAVE">
                                        Leave
                                    </option>

                                </select>

                            </div>

                            {/* =================================
                                REMARKS
                            ================================= */}

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">

                                    Remarks

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    placeholder="Enter remarks (optional)"
                                    maxLength="250"
                                />

                            </div>

                            {/* =================================
                                FORM INFORMATION
                            ================================= */}

                            <div className="col-12">

                                <div className="alert alert-light border mb-0">

                                    <div className="d-flex align-items-start">

                                        <span className="me-2">
                                            ℹ️
                                        </span>

                                        <div>

                                            <strong>
                                                Attendance Information
                                            </strong>

                                            <p className="mb-0 text-muted small">
                                                Select the student,
                                                batch, classroom and
                                                attendance date, then
                                                select the appropriate
                                                attendance status.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* =================================
                                BUTTONS
                            ================================= */}

                            <div className="col-12">

                                <div className="d-flex justify-content-end gap-2 pt-2">

                                    <button
                                        type="button"
                                        className="btn btn-light border"
                                        onClick={handleReset}
                                        disabled={loading}
                                    >
                                        Reset
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            navigate("/attendance")
                                        }
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={loading}
                                    >

                                        {loading ? (

                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                />

                                                Saving...
                                            </>

                                        ) : (

                                            <>
                                                ✓ Save Attendance
                                            </>
                                        )}

                                    </button>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddAttendance;