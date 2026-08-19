import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getClassrooms,
    deleteClassroom
} from "../../api/classroomApi";

const ClassroomList = () => {

    const navigate = useNavigate();

    const [classrooms, setClassrooms] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD CLASSROOMS
    // =====================================================

    const loadClassrooms = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getClassrooms();

            console.log(
                "CLASSROOM API RESPONSE:",
                response
            );

            const data = response.data;

            setClassrooms(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Error loading classrooms:",
                err
            );

            setClassrooms([]);

            setError(
                err.response?.data ||
                "Unable to load classrooms."
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        loadClassrooms();

    }, []);


    // =====================================================
    // FILTER
    // =====================================================

    const filteredClassrooms = useMemo(() => {

        return classrooms.filter((classroom) => {

            const searchText =
                search.toLowerCase().trim();

            const matchesSearch =
                !searchText ||
                classroom.name
                    ?.toLowerCase()
                    .includes(searchText) ||
                classroom.roomNumber
                    ?.toLowerCase()
                    .includes(searchText) ||
                classroom.building
                    ?.toLowerCase()
                    .includes(searchText) ||
                classroom.roomType
                    ?.toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "ALL" ||
                classroom.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    }, [
        classrooms,
        search,
        statusFilter
    ]);


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this classroom?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteClassroom(id);

            alert(
                "Classroom deleted successfully!"
            );

            setClassrooms((prev) =>
                prev.filter(
                    (classroom) =>
                        classroom.id !== id
                )
            );

        } catch (err) {

            console.error(
                "Error deleting classroom:",
                err
            );

            alert(
                err.response?.data ||
                "Failed to delete classroom."
            );
        }
    };


    // =====================================================
    // STATISTICS
    // =====================================================

    const totalClassrooms =
        classrooms.length;

    const availableClassrooms =
        classrooms.filter(
            (c) => c.status === "AVAILABLE"
        ).length;

    const occupiedClassrooms =
        classrooms.filter(
            (c) => c.status === "OCCUPIED"
        ).length;

    const maintenanceClassrooms =
        classrooms.filter(
            (c) => c.status === "MAINTENANCE"
        ).length;


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="container-fluid px-4 py-4">

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <div
                            className="spinner-border text-primary mb-3"
                            role="status"
                        />

                        <h6>
                            Loading classrooms...
                        </h6>

                    </div>

                </div>

            </div>
        );
    }


    return (

        <div className="container-fluid px-4 py-4">

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-1">
                        Classroom Management
                    </h2>

                    <p className="text-muted mb-0">
                        Manage classrooms and learning spaces
                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        navigate("/classrooms/add")
                    }
                >
                    + Add Classroom
                </button>

            </div>


            {/* ================================================= */}
            {/* STATISTICS */}
            {/* ================================================= */}

            <div className="row g-3 mb-4">

                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Total Classrooms
                            </div>

                            <h3 className="fw-bold mb-0">
                                {totalClassrooms}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Available
                            </div>

                            <h3 className="fw-bold text-success mb-0">
                                {availableClassrooms}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Occupied
                            </div>

                            <h3 className="fw-bold text-primary mb-0">
                                {occupiedClassrooms}
                            </h3>

                        </div>

                    </div>

                </div>


                <div className="col-md-3">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="text-muted small">
                                Maintenance
                            </div>

                            <h3 className="fw-bold text-warning mb-0">
                                {maintenanceClassrooms}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (

                <div className="alert alert-danger">
                    {typeof error === "string"
                        ? error
                        : "Unable to load classrooms."}
                </div>

            )}


            {/* ================================================= */}
            {/* SEARCH */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <div className="row g-3">

                        <div className="col-md-8">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by classroom, room number, building or type..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-md-4">

                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="AVAILABLE">
                                    Available
                                </option>

                                <option value="OCCUPIED">
                                    Occupied
                                </option>

                                <option value="MAINTENANCE">
                                    Maintenance
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* TABLE */}
            {/* ================================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="px-4">
                                        #
                                    </th>

                                    <th>
                                        Classroom
                                    </th>

                                    <th>
                                        Room
                                    </th>

                                    <th>
                                        Building
                                    </th>

                                    <th>
                                        Capacity
                                    </th>

                                    <th>
                                        Type
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th className="text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredClassrooms.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center py-5 text-muted"
                                        >
                                            No classrooms found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredClassrooms.map(
                                        (classroom, index) => (

                                            <tr key={classroom.id}>

                                                <td className="px-4">
                                                    {index + 1}
                                                </td>

                                                <td>

                                                    <div className="fw-semibold">
                                                        {classroom.name}
                                                    </div>

                                                </td>

                                                <td>
                                                    {classroom.roomNumber}
                                                </td>

                                                <td>
                                                    {classroom.building || "-"}
                                                </td>

                                                <td>
                                                    {classroom.capacity}
                                                </td>

                                                <td>
                                                    {classroom.roomType
                                                        ?.replaceAll(
                                                            "_",
                                                            " "
                                                        )}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            classroom.status ===
                                                            "AVAILABLE"
                                                                ? "bg-success"
                                                                : classroom.status ===
                                                                  "OCCUPIED"
                                                                ? "bg-primary"
                                                                : classroom.status ===
                                                                  "MAINTENANCE"
                                                                ? "bg-warning text-dark"
                                                                : "bg-secondary"
                                                        }`}
                                                    >
                                                        {classroom.status}
                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-sm btn-outline-info"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/classrooms/${classroom.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/classrooms/edit/${classroom.id}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    classroom.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ClassroomList;