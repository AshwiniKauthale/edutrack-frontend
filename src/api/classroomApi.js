import axios from "axios";
import { getAuthHeaders } from "../utils/Auth";

const API_URL = import.meta.env.VITE_API_URL;

// =====================================================
// GET ALL CLASSROOMS
// =====================================================

export const getClassrooms = async () => {

    const response = await axios.get(
        `${API_URL}/classrooms`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// GET SINGLE CLASSROOM
// =====================================================

export const getClassroomById = async (id) => {

    const response = await axios.get(
        `${API_URL}/classrooms/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// CREATE CLASSROOM
// =====================================================

export const createClassroom = async (classroomData) => {

    const response = await axios.post(
        `${API_URL}/classrooms`,
        classroomData,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// UPDATE CLASSROOM
// =====================================================

export const updateClassroom = async (
    id,
    classroomData
) => {

    const response = await axios.put(
        `${API_URL}/classrooms/${id}`,
        classroomData,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};


// =====================================================
// DELETE CLASSROOM
// =====================================================

export const deleteClassroom = async (id) => {

    const response = await axios.delete(
        `${API_URL}/classrooms/${id}`,
        {
            headers: getAuthHeaders()
        }
    );

    return response;
};