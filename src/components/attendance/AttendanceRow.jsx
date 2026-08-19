import { useNavigate } from "react-router-dom";

import {
    deleteAttendance,
    extractAttendanceId,
} from "../../api/attendanceApi";

export default function AttendanceRow({
    attendance,
    onDelete,
}) {

    const navigate = useNavigate();

    const id =
        extractAttendanceId(attendance);

    console.log(
        "Attendance:",
        attendance
    );

    console.log(
        "Clean Attendance ID:",
        id
    );

    const getStatusClass = (status) => {

        const value =
            String(status || "")
                .toLowerCase();

        if (value === "present") {
            return "bg-success-subtle text-success";
        }

        if (value === "absent") {
            return "bg-danger-subtle text-danger";
        }

        if (value === "late") {
            return "bg-warning-subtle text-warning";
        }

        return "bg-secondary-subtle text-secondary";
    };

    const handleDelete = async () => {

        if (!id) {

            alert(
                "Attendance ID is missing."
            );

            return;
        }

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this attendance record?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteAttendance(id);

            if (onDelete) {
                onDelete(id);
            }

        } catch (error) {

            console.error(
                "Delete attendance error:",
                error
            );

            alert(
                "Unable to delete attendance."
            );
        }
    };

    return (
        <tr>

            {/* =================================================
                STUDENT
            ================================================= */}

            <td>
                <div className="fw-semibold">
                    {attendance?.studentName ||
                        attendance?.student?.name ||
                        "-"}
                </div>
            </td>

            {/* =================================================
                BATCH
            ================================================= */}

            <td>
                {attendance?.batchName ||
                    attendance?.batch?.name ||
                    "-"}
            </td>

            {/* =================================================
                DATE
            ================================================= */}

            <td>
                {attendance?.date || "-"}
            </td>

            {/* =================================================
                STATUS
            ================================================= */}

            <td>

                <span
                    className={`badge rounded-pill px-3 py-2 ${getStatusClass(
                        attendance?.status
                    )}`}
                >
                    {attendance?.status ||
                        "-"}
                </span>

            </td>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <td>

                <div className="d-flex gap-2">

                    {/* VIEW */}

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="View attendance"
                        disabled={!id}
                        onClick={() =>
                            navigate(
                                `/attendance/view/${id}`
                            )
                        }
                    >
                        👁 View
                    </button>

                    {/* EDIT */}

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-warning"
                        title="Edit attendance"
                        disabled={!id}
                        onClick={() =>
                            navigate(
                                `/attendance/edit/${id}`
                            )
                        }
                    >
                        ✏️ Edit
                    </button>

                    {/* DELETE */}

                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete attendance"
                        disabled={!id}
                        onClick={handleDelete}
                    >
                        🗑 Delete
                    </button>

                </div>

            </td>

        </tr>
    );
}