import api from "./axios";

// =====================================================
// TEACHER API
// =====================================================


// =====================================================
// GET ALL TEACHERS
// GET /api/superadmin/teachers
// =====================================================

export const getTeachers = async () => {
    return await api.get("/api/superadmin/teachers");
};


// =====================================================
// GET TEACHER BY ID
// GET /api/superadmin/teachers/{id}
// =====================================================

export const getTeacherById = async (id) => {
    return await api.get(
        `/api/superadmin/teachers/${id}`
    );
};


// =====================================================
// CREATE TEACHER
// POST /api/superadmin/teachers
// =====================================================

export const createTeacher = async (teacherData) => {
    return await api.post(
        "/api/superadmin/teachers",
        teacherData
    );
};


// =====================================================
// UPDATE TEACHER
// PUT /api/superadmin/teachers/{id}
// =====================================================

export const updateTeacher = async (id, teacherData) => {
    return await api.put(
        `/api/superadmin/teachers/${id}`,
        teacherData
    );
};


// =====================================================
// ACTIVATE TEACHER
// PATCH /api/superadmin/teachers/{id}/activate
// =====================================================

export const activateTeacher = async (id) => {
    return await api.patch(
        `/api/superadmin/teachers/${id}/activate`
    );
};


// =====================================================
// DEACTIVATE TEACHER
// PATCH /api/superadmin/teachers/{id}/deactivate
// =====================================================

export const deactivateTeacher = async (id) => {
    return await api.patch(
        `/api/superadmin/teachers/${id}/deactivate`
    );
};


// =====================================================
// DELETE TEACHER
// DELETE /api/superadmin/teachers/{id}
// =====================================================

export const deleteTeacher = async (id) => {
    return await api.delete(
        `/api/superadmin/teachers/${id}`
    );
};