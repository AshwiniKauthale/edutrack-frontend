import axios from "axios";
import { getAuthHeaders } from "../utils/Auth";

const API_URL = `${import.meta.env.VITE_API_URL}/assignments`;
// =====================================================
// GET ALL ASSIGNMENTS
// =====================================================

export const getAssignments = async () => {
    const response = await axios.get(
        API_URL,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET ASSIGNMENT BY ID
// =====================================================

export const getAssignmentById = async (id) => {
    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// CREATE ASSIGNMENT
// =====================================================

export const createAssignment = async (assignmentData) => {
    const response = await axios.post(
        API_URL,
        assignmentData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// UPDATE ASSIGNMENT
// =====================================================

export const updateAssignment = async (
    id,
    assignmentData
) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        assignmentData,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// DELETE ASSIGNMENT
// =====================================================

export const deleteAssignment = async (id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET BY TEACHER
// =====================================================

export const getAssignmentsByTeacher = async (
    teacher
) => {
    const response = await axios.get(
        `${API_URL}/teacher/${encodeURIComponent(teacher)}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET BY BATCH
// =====================================================

export const getAssignmentsByBatch = async (
    batch
) => {
    const response = await axios.get(
        `${API_URL}/batch/${encodeURIComponent(batch)}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET BY CLASSROOM
// =====================================================

export const getAssignmentsByClassroom = async (
    classroom
) => {
    const response = await axios.get(
        `${API_URL}/classroom/${encodeURIComponent(classroom)}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET BY SUBJECT
// =====================================================

export const getAssignmentsBySubject = async (
    subject
) => {
    const response = await axios.get(
        `${API_URL}/subject/${encodeURIComponent(subject)}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// GET BY STATUS
// =====================================================

export const getAssignmentsByStatus = async (
    status
) => {
    const response = await axios.get(
        `${API_URL}/status/${encodeURIComponent(status)}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response.data;
};


// =====================================================
// EXTRACT ASSIGNMENT ID
// =====================================================

export const extractAssignmentId = (assignment) => {

    if (!assignment) {
        return null;
    }

    if (assignment.id) {
        return assignment.id;
    }

    if (assignment._id) {

        if (typeof assignment._id === "string") {
            return assignment._id;
        }

        if (assignment._id.$oid) {
            return assignment._id.$oid;
        }
    }

    if (assignment.assignmentId) {
        return assignment.assignmentId;
    }

    if (assignment.assignmentID) {
        return assignment.assignmentID;
    }

    return null;
};