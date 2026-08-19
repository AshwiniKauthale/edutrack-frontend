import api from "./axios";

// =====================================================
// STUDENT API
// =====================================================


// =====================================================
// GET ALL STUDENTS
// GET /students
// =====================================================

export const getStudents = async () => {
    return await api.get("/students");
};


// =====================================================
// GET STUDENT BY ID
// GET /students/{id}
// =====================================================

export const getStudentById = async (id) => {
    return await api.get(`/students/${id}`);
};


// =====================================================
// ADD STUDENT
// POST /students
// =====================================================

export const addStudent = async (student) => {
    return await api.post(
        "/students",
        student
    );
};


// =====================================================
// UPDATE STUDENT
// PUT /students/{id}
// =====================================================

export const updateStudent = async (id, student) => {
    return await api.put(
        `/students/${id}`,
        student
    );
};


// =====================================================
// DELETE STUDENT
// DELETE /students/{id}
// =====================================================

export const deleteStudent = async (id) => {
    return await api.delete(
        `/students/${id}`
    );
};


// =====================================================
// GET STUDENTS BY COURSE
// GET /students?course=...
// =====================================================

export const getStudentsByCourse = async (course) => {
    return await api.get(
        "/students",
        {
            params: {
                course,
            },
        }
    );
};


// =====================================================
// GET STUDENTS BY BATCH
// GET /students?batch=...
// =====================================================

export const getStudentsByBatch = async (batch) => {
    return await api.get(
        "/students",
        {
            params: {
                batch,
            },
        }
    );
};


// =====================================================
// GET STUDENTS BY COURSE AND BATCH
// GET /students?course=...&batch=...
// =====================================================

export const getStudentsByCourseAndBatch = async (
    course,
    batch
) => {
    return await api.get(
        "/students",
        {
            params: {
                course,
                batch,
            },
        }
    );
};