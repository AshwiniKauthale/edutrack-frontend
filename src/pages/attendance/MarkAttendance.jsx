import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getBatches } from "../../api/batchApi";
import { getStudentsByBatch } from "../../api/studentApi";
import { markAttendance } from "../../api/attendanceApi";

import "./MarkAttendance.css";

const MarkAttendance = () => {

    const navigate = useNavigate();

    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);

    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [attendance, setAttendance] = useState({});

    const [loadingBatches, setLoadingBatches] = useState(true);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =====================================================
    // LOAD BATCHES
    // =====================================================

    useEffect(() => {

        const loadBatches = async () => {

            try {

                setLoadingBatches(true);
                setError("");

                const response = await getBatches();

                const data = response.data;

                setBatches(
                    Array.isArray(data)
                        ? data
                        : data?.content || []
                );

            } catch (err) {

                console.error(
                    "Error loading batches:",
                    err
                );

                setError(
                    "Unable to load batches."
                );

            } finally {

                setLoadingBatches(false);
            }
        };

        loadBatches();

    }, []);


    // =====================================================
    // LOAD STUDENTS WHEN BATCH CHANGES
    // =====================================================

    useEffect(() => {

        if (!selectedBatch) {

            setStudents([]);
            setAttendance({});

            return;
        }


        const loadStudents = async () => {

            try {

                setLoadingStudents(true);
                setError("");

                const response =
                    await getStudentsByBatch(
                        selectedBatch
                    );

                const data = response.data;

                const studentList =
                    Array.isArray(data)
                        ? data
                        : data?.content || [];

                setStudents(studentList);


                // Default every student to ABSENT
                const initialAttendance = {};

                studentList.forEach(student => {

                    const id =
                        student.id ||
                        student._id ||
                        student.studentId;

                    if (id) {
                        initialAttendance[id] =
                            "ABSENT";
                    }
                });

                setAttendance(
                    initialAttendance
                );

            } catch (err) {

                console.error(
                    "Error loading students:",
                    err
                );

                setStudents([]);

                setError(
                    "Unable to load students for this batch."
                );

            } finally {

                setLoadingStudents(false);
            }
        };

        loadStudents();

    }, [selectedBatch]);


    // =====================================================
    // CHANGE ATTENDANCE STATUS
    // =====================================================

    const changeStatus = (
        studentId,
        status
    ) => {

        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    };


    // =====================================================
    // MARK ALL PRESENT
    // =====================================================

    const markAllPresent = () => {

        const updated = {};

        students.forEach(student => {

            const id =
                student.id ||
                student._id ||
                student.studentId;

            if (id) {
                updated[id] = "PRESENT";
            }
        });

        setAttendance(updated);
    };


    // =====================================================
    // MARK ALL ABSENT
    // =====================================================

    const markAllAbsent = () => {

        const updated = {};

        students.forEach(student => {

            const id =
                student.id ||
                student._id ||
                student.studentId;

            if (id) {
                updated[id] = "ABSENT";
            }
        });

        setAttendance(updated);
    };


    // =====================================================
    // GET STUDENT NAME
    // =====================================================

    const getStudentName = (student) => {

        return (
            student.fullName ||
            student.name ||
            student.studentName ||
            `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
            "Unknown Student"
        );
    };


    // =====================================================
    // SAVE ATTENDANCE
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        if (!selectedBatch) {

            setError(
                "Please select a batch."
            );

            return;
        }


        if (!selectedDate) {

            setError(
                "Please select a date."
            );

            return;
        }


        if (students.length === 0) {

            setError(
                "No students found in this batch."
            );

            return;
        }


        try {

            setSaving(true);


            const batch =
                batches.find(
                    b =>
                        String(
                            b.id ||
                            b._id ||
                            b.batchId
                        ) === String(selectedBatch)
                );


            const batchName =
                batch?.batchName ||
                batch?.name ||
                batch?.batch ||
                selectedBatch;


            // Save attendance one student at a time
            for (const student of students) {

                const studentId =
                    student.id ||
                    student._id ||
                    student.studentId;

                const studentName =
                    getStudentName(student);

                const status =
                    attendance[studentId] ||
                    "ABSENT";


                await markAttendance({

                    studentId: String(studentId),

                    studentName,

                    batchId: String(selectedBatch),

                    batchName,

                    date: selectedDate,

                    status

                });
            }


            setSuccess(
                "Attendance marked successfully!"
            );


            setTimeout(() => {

                navigate("/attendance");

            }, 1200);


        } catch (err) {

            console.error(
                "Error saving attendance:",
                err
            );

            const message =
                err?.response?.data;

            setError(
                typeof message === "string"
                    ? message
                    : "Failed to save attendance."
            );

        } finally {

            setSaving(false);
        }
    };


    return (
        <div className="mark-attendance-page">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="attendance-header">

                <div>

                    <h2>
                        Mark Attendance
                    </h2>

                    <p>
                        Mark daily attendance for students
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate("/attendance")
                    }
                >
                    ← Back
                </button>

            </div>


            {/* ================================================= */}
            {/* ALERTS */}
            {/* ================================================= */}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="attendance-form"
            >

                <div className="row">

                    {/* BATCH */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Batch
                        </label>

                        <select
                            className="form-select"
                            value={selectedBatch}
                            onChange={(e) =>
                                setSelectedBatch(
                                    e.target.value
                                )
                            }
                            disabled={loadingBatches}
                        >

                            <option value="">
                                Select Batch
                            </option>

                            {batches.map(batch => {

                                const id =
                                    batch.id ||
                                    batch._id ||
                                    batch.batchId;

                                const name =
                                    batch.batchName ||
                                    batch.name ||
                                    batch.batch ||
                                    id;

                                return (
                                    <option
                                        key={id}
                                        value={id}
                                    >
                                        {name}
                                    </option>
                                );

                            })}

                        </select>

                    </div>


                    {/* DATE */}

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Attendance Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={selectedDate}
                            onChange={(e) =>
                                setSelectedDate(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {/* ================================================= */}
                {/* STUDENT SECTION */}
                {/* ================================================= */}

                {selectedBatch && (

                    <div className="student-attendance-section">

                        <div className="attendance-section-header">

                            <h4>
                                Students
                            </h4>

                            {students.length > 0 && (

                                <div>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-success me-2"
                                        onClick={
                                            markAllPresent
                                        }
                                    >
                                        Mark All Present
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={
                                            markAllAbsent
                                        }
                                    >
                                        Mark All Absent
                                    </button>

                                </div>

                            )}

                        </div>


                        {loadingStudents ? (

                            <div className="text-center py-4">

                                <div
                                    className="spinner-border"
                                    role="status"
                                />

                                <p className="mt-2">
                                    Loading students...
                                </p>

                            </div>

                        ) : students.length === 0 ? (

                            <div className="alert alert-info">

                                No students found for this batch.

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead>

                                        <tr>

                                            <th>
                                                #
                                            </th>

                                            <th>
                                                Student
                                            </th>

                                            <th>
                                                Username
                                            </th>

                                            <th className="text-center">
                                                Attendance
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {students.map(
                                            (student, index) => {

                                                const studentId =
                                                    student.id ||
                                                    student._id ||
                                                    student.studentId;

                                                const status =
                                                    attendance[
                                                        studentId
                                                    ] ||
                                                    "ABSENT";

                                                return (

                                                    <tr
                                                        key={
                                                            studentId
                                                        }
                                                    >

                                                        <td>
                                                            {index + 1}
                                                        </td>

                                                        <td>
                                                            <strong>
                                                                {
                                                                    getStudentName(
                                                                        student
                                                                    )
                                                                }
                                                            </strong>
                                                        </td>

                                                        <td>
                                                            {
                                                                student.username ||
                                                                student.email ||
                                                                "-"
                                                            }
                                                        </td>

                                                        <td className="text-center">

                                                            <div className="attendance-buttons">

                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-sm ${
                                                                        status ===
                                                                        "PRESENT"
                                                                            ? "btn-success"
                                                                            : "btn-outline-success"
                                                                    }`}
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            studentId,
                                                                            "PRESENT"
                                                                        )
                                                                    }
                                                                >
                                                                    Present
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    className={`btn btn-sm ${
                                                                        status ===
                                                                        "ABSENT"
                                                                            ? "btn-danger"
                                                                            : "btn-outline-danger"
                                                                    }`}
                                                                    onClick={() =>
                                                                        changeStatus(
                                                                            studentId,
                                                                            "ABSENT"
                                                                        )
                                                                    }
                                                                >
                                                                    Absent
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                )}


                {/* ================================================= */}
                {/* SUBMIT */}
                {/* ================================================= */}

                {students.length > 0 && (

                    <div className="attendance-submit">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : "Save Attendance"
                            }

                        </button>

                    </div>

                )}

            </form>

        </div>
    );
};

export default MarkAttendance;