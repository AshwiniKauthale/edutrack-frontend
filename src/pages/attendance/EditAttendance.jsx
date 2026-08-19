import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getAttendanceById,
    updateAttendance
} from "../../api/attendanceApi";

const EditAttendance = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        studentName: "",
        batchName: "",
        date: "",
        status: "Present",
        remarks: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD
    // =====================================================

    useEffect(() => {

        const loadAttendance = async () => {

            if (!id) {

                setError(
                    "Attendance ID is missing."
                );

                setLoading(false);

                return;
            }

            try {

                setLoading(true);
                setError("");

                const response =
                    await getAttendanceById(id);

                const attendance =
                    response?.data ||
                    response;

                setFormData({
                    studentName:
                        attendance.studentName ||
                        "",

                    batchName:
                        attendance.batchName ||
                        "",

                    date:
                        attendance.date ||
                        "",

                    status:
                        attendance.status ||
                        "Present",

                    remarks:
                        attendance.remarks ||
                        ""
                });

            } catch (err) {

                console.error(
                    "Error loading attendance:",
                    err
                );

                setError(
                    err?.response?.data ||
                    "Unable to load attendance."
                );

            } finally {

                setLoading(false);
            }
        };

        loadAttendance();

    }, [id]);

    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            await updateAttendance(
                id,
                {
                    studentName:
                        formData.studentName.trim(),

                    batchName:
                        formData.batchName.trim(),

                    date:
                        formData.date,

                    status:
                        formData.status,

                    remarks:
                        formData.remarks.trim()
                }
            );

            alert(
                "Attendance updated successfully!"
            );

            navigate("/attendance");

        } catch (err) {

            console.error(
                "Update attendance error:",
                err
            );

            setError(
                err?.response?.data ||
                "Unable to update attendance."
            );

        } finally {

            setSaving(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="container-fluid px-4 py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3 text-muted">
                    Loading attendance...
                </p>

            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-4">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="fw-bold mb-1">
                        Edit Attendance
                    </h1>

                    <p className="text-muted mb-0">
                        Update attendance information
                    </p>

                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/attendance")
                    }
                >
                    ← Back
                </button>

            </div>

            {/* CARD */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4 p-lg-5">

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="row g-4">

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    name="studentName"
                                    className="form-control form-control-lg"
                                    value={
                                        formData.studentName
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Batch Name
                                </label>

                                <input
                                    type="text"
                                    name="batchName"
                                    className="form-control form-control-lg"
                                    value={
                                        formData.batchName
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Attendance Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    className="form-control form-control-lg"
                                    value={
                                        formData.date
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label fw-semibold">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select form-select-lg"
                                    value={
                                        formData.status
                                    }
                                    onChange={handleChange}
                                >

                                    <option value="Present">
                                        Present
                                    </option>

                                    <option value="Absent">
                                        Absent
                                    </option>

                                </select>

                            </div>

                            <div className="col-12">

                                <label className="form-label fw-semibold">
                                    Remarks
                                </label>

                                <textarea
                                    name="remarks"
                                    className="form-control"
                                    rows="4"
                                    value={
                                        formData.remarks
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={() =>
                                    navigate(
                                        "/attendance"
                                    )
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Attendance"}
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditAttendance;