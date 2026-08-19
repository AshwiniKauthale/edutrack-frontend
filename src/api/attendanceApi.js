
import api from "./axios";

// =====================================================
// ATTENDANCE BASE URL
// =====================================================

const ATTENDANCE_URL = "/api/attendance";


// =====================================================
// GET ALL ATTENDANCE
// =====================================================

export const getAttendance = async () => {
    return await api.get(ATTENDANCE_URL);
};


// =====================================================
// GET ATTENDANCE BY ID
// =====================================================

export const getAttendanceById = async (id) => {
    return await api.get(`${ATTENDANCE_URL}/${id}`);
};


// =====================================================
// CREATE ATTENDANCE
// =====================================================

export const createAttendance = async (attendanceData) => {
    return await api.post(
        ATTENDANCE_URL,
        attendanceData
    );
};


// =====================================================
// UPDATE ATTENDANCE
// =====================================================

export const updateAttendance = async (
    id,
    attendanceData
) => {
    return await api.put(
        `${ATTENDANCE_URL}/${id}`,
        attendanceData
    );
};


// =====================================================
// DELETE ATTENDANCE
// =====================================================

export const deleteAttendance = async (id) => {
    return await api.delete(
        `${ATTENDANCE_URL}/${id}`
    );
};


// =====================================================
// MARK ATTENDANCE
// =====================================================

export const markAttendance = async (attendanceData) => {
    return await api.post(
        `${ATTENDANCE_URL}/mark`,
        attendanceData
    );
};


// =====================================================
// UPDATE MARKED ATTENDANCE
// =====================================================

export const updateMarkedAttendance = async (
    id,
    attendanceData
) => {
    return await api.put(
        `${ATTENDANCE_URL}/${id}/mark`,
        attendanceData
    );
};


// =====================================================
// GET ATTENDANCE BY DATE
// =====================================================

export const getAttendanceByDate = async (date) => {
    return await api.get(
        `${ATTENDANCE_URL}/date/${date}`
    );
};


// =====================================================
// GET ATTENDANCE BY BATCH
// =====================================================

export const getAttendanceByBatch = async (batchId) => {
    return await api.get(
        `${ATTENDANCE_URL}/batch/${batchId}`
    );
};


// =====================================================
// GET ATTENDANCE BY STUDENT
// =====================================================

export const getAttendanceByStudent = async (studentId) => {
    return await api.get(
        `${ATTENDANCE_URL}/student/${studentId}`
    );
};


// =====================================================
// GET ATTENDANCE PERCENTAGE
// =====================================================

export const getAttendancePercentage = async (studentId) => {
    return await api.get(
        `${ATTENDANCE_URL}/percentage/${studentId}`
    );
};


// =====================================================
// EXTRACT ATTENDANCE ID
// =====================================================

export const extractAttendanceId = (attendance) => {
    if (!attendance) {
        return null;
    }

    return (
        attendance.id ||
        attendance._id ||
        attendance.attendanceId ||
        attendance.attendanceID ||
        null
    );
};
