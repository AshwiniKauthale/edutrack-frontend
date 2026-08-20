import { Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// LAYOUT & AUTHENTICATION
// =====================================================

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

// =====================================================
// AUTH
// =====================================================

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// =====================================================
// DASHBOARD
// =====================================================

import Dashboard from "./pages/dashboard/Dashboard";

// =====================================================
// STUDENTS
// =====================================================

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

// =====================================================
// TEACHERS
// =====================================================

import TeacherList from "./pages/teachers/TeacherList";
import CreateTeacher from "./pages/superadmin/CreateTeacher";
import EditTeacher from "./pages/teachers/EditTeacher";
import ViewTeacher from "./pages/teachers/ViewTeacher";

// =====================================================
// BATCHES
// =====================================================

import BatchList from "./pages/batches/BatchList";
import AddBatch from "./pages/batches/AddBatch";
import ViewBatch from "./pages/batches/ViewBatch";
import EditBatch from "./pages/batches/EditBatch";

// =====================================================
// CLASSROOMS
// =====================================================

import ClassroomList from "./pages/classrooms/ClassroomList";
import CreateClassroom from "./pages/classrooms/CreateClassroom";
import ViewClassroom from "./pages/classrooms/ViewClassroom";
import EditClassroom from "./pages/classrooms/EditClassroom";

// =====================================================
// ATTENDANCE
// =====================================================

import AttendanceList from "./pages/attendance/AttendanceList";
import AddAttendance from "./pages/attendance/AddAttendance";
import EditAttendance from "./pages/attendance/EditAttendance";
import ViewAttendance from "./pages/attendance/ViewAttendance";
import MarkAttendance from "./pages/attendance/MarkAttendance";

// =====================================================
// ASSIGNMENTS
// =====================================================

import AssignmentList from "./pages/assignments/AssignmentList";
import CreateAssignment from "./pages/assignments/CreateAssignment";
import ViewAssignment from "./pages/assignments/ViewAssignment";
import EditAssignment from "./pages/assignments/EditAssignment";

// =====================================================
// PROFILE
// =====================================================

import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import ChangePassword from "./pages/profile/ChangePassword";

// =====================================================
// SETTINGS
// =====================================================

import Settings from "./pages/Settings/Settings";
import NotificationSettings from "./pages/Settings/NotificationSettings";
import AppearanceSettings from "./pages/Settings/AppearanceSettings";
import SecuritySettings from "./pages/Settings/SecuritySettings";
import ActivityHistory from "./pages/Settings/ActivityHistory";
import OrganizationSettings from "./pages/Settings/OrganizationSettings";
import AcademicSettings from "./pages/Settings/AcademicSettings";

// =====================================================
// NOTIFICATIONS
// =====================================================

import Notifications from "./pages/notifications/Notifications";
import NotificationPage from "./pages/notifications/NotificationPage";

// =====================================================
// MANAGEMENT ROLES
// =====================================================

const managementRoles = [
    "SUPER_ADMIN",
    "TEACHER",
];

// =====================================================
// APP
// =====================================================

function App() {
    return (
        <Routes>

            {/* =================================================
                PUBLIC ROUTES
            ================================================= */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/signup"
                element={<Signup />}
            />

            {/* =================================================
                ROOT URL
                IMPORTANT:
                Opening the Vercel URL will go to LOGIN
            ================================================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            {/* =================================================
                PROTECTED APPLICATION
            ================================================= */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                {/* =================================================
                    DASHBOARD
                ================================================= */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* =================================================
                    STUDENT MANAGEMENT
                ================================================= */}

                <Route
                    path="/students"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <StudentList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/students/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <AddStudent />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/students/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <EditStudent />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    TEACHER MANAGEMENT
                ================================================= */}

                <Route
                    path="/teachers"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "TEACHER",
                            ]}
                        >
                            <TeacherList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/teachers/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                            ]}
                        >
                            <CreateTeacher />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/teachers/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "TEACHER",
                            ]}
                        >
                            <ViewTeacher />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/teachers/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                            ]}
                        >
                            <EditTeacher />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    BATCH MANAGEMENT
                ================================================= */}

                <Route
                    path="/batches"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <BatchList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/batches/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                            ]}
                        >
                            <AddBatch />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/batches/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <ViewBatch />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/batches/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <EditBatch />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    CLASSROOM MANAGEMENT
                ================================================= */}

                <Route
                    path="/classrooms"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "TEACHER",
                            ]}
                        >
                            <ClassroomList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/classrooms/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                            ]}
                        >
                            <CreateClassroom />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/classrooms/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                                "TEACHER",
                            ]}
                        >
                            <ViewClassroom />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/classrooms/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={[
                                "SUPER_ADMIN",
                            ]}
                        >
                            <EditClassroom />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    ATTENDANCE MANAGEMENT
                ================================================= */}

                <Route
                    path="/attendance"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <AttendanceList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/attendance/mark"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <MarkAttendance />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/attendance/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <AddAttendance />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/attendance/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <ViewAttendance />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/attendance/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <EditAttendance />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/attendance/view/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <ViewAttendance />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    ASSIGNMENT MANAGEMENT
                ================================================= */}

                <Route
                    path="/assignments"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <AssignmentList />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/assignments/add"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <CreateAssignment />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/assignments/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <ViewAssignment />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/assignments/edit/:id"
                    element={
                        <RoleProtectedRoute
                            allowedRoles={managementRoles}
                        >
                            <EditAssignment />
                        </RoleProtectedRoute>
                    }
                />

                {/* =================================================
                    PROFILE
                ================================================= */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/profile/edit"
                    element={<EditProfile />}
                />

                <Route
                    path="/profile/change-password"
                    element={<ChangePassword />}
                />

                {/* =================================================
                    SETTINGS
                ================================================= */}

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/settings/notifications"
                    element={<NotificationSettings />}
                />

                <Route
                    path="/settings/appearance"
                    element={<AppearanceSettings />}
                />

                <Route
                    path="/settings/security"
                    element={<SecuritySettings />}
                />

                <Route
                    path="/settings/activity"
                    element={<ActivityHistory />}
                />

                <Route
                    path="/settings/organization"
                    element={<OrganizationSettings />}
                />

                <Route
                    path="/settings/academic"
                    element={<AcademicSettings />}
                />

                {/* =================================================
                    NOTIFICATIONS
                ================================================= */}

                <Route
                    path="/notifications"
                    element={<Notifications />}
                />

                <Route
                    path="/notifications/details"
                    element={<NotificationPage />}
                />

                {/* =================================================
                    UNKNOWN ROUTES
                    Keep protected application fallback
                ================================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />

            </Route>

        </Routes>
    );
}

export default App;