import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";

import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";

import BatchList from "./pages/batches/BatchList";
import AddBatch from "./pages/batches/AddBatch";
import EditBatch from "./pages/batches/EditBatch";

import TeacherList from "./pages/teachers/TeacherList";
import AddTeacher from "./pages/teachers/AddTeacher";
import EditTeacher from "./pages/teachers/EditTeacher";

import ClassroomList from "./pages/classrooms/ClassroomList";
import AddClassroom from "./pages/classrooms/AddClassroom";
import EditClassroom from "./pages/classrooms/EditClassroom";

import AttendanceList from "./pages/attendance/AttendanceList";
import AddAttendance from "./pages/attendance/AddAttendance";
import EditAttendance from "./pages/attendance/EditAttendance";

import AssignmentList from "./pages/assignments/AssignmentList";
import AddAssignment from "./pages/assignments/AddAssignment";
import EditAssignment from "./pages/assignments/EditAssignment";

import Profile from "./pages/profile/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* ================= LOGIN ================= */}

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      {/* ================= DASHBOARD ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= STUDENTS ================= */}

      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/add"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/edit/:id"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />

      {/* ================= BATCHES ================= */}

      <Route
        path="/batches"
        element={
          <ProtectedRoute>
            <BatchList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/batches/add"
        element={
          <ProtectedRoute>
            <AddBatch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/batches/edit/:id"
        element={
          <ProtectedRoute>
            <EditBatch />
          </ProtectedRoute>
        }
      />

      {/* ================= TEACHERS ================= */}

      <Route
        path="/teachers"
        element={
          <ProtectedRoute>
            <TeacherList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/add"
        element={
          <ProtectedRoute>
            <AddTeacher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teachers/edit/:id"
        element={
          <ProtectedRoute>
            <EditTeacher />
          </ProtectedRoute>
        }
      />

      {/* ================= CLASSROOMS ================= */}

      <Route
        path="/classrooms"
        element={
          <ProtectedRoute>
            <ClassroomList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classrooms/add"
        element={
          <ProtectedRoute>
            <AddClassroom />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classrooms/edit/:id"
        element={
          <ProtectedRoute>
            <EditClassroom />
          </ProtectedRoute>
        }
      />

      {/* ================= ATTENDANCE ================= */}

      <Route
        path="/attendance"
        element={
          <ProtectedRoute>
            <AttendanceList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance/add"
        element={
          <ProtectedRoute>
            <AddAttendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attendance/edit/:id"
        element={
          <ProtectedRoute>
            <EditAttendance />
          </ProtectedRoute>
        }
      />

      {/* ================= ASSIGNMENTS ================= */}

      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <AssignmentList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assignments/add"
        element={
          <ProtectedRoute>
            <AddAssignment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/assignments/edit/:id"
        element={
          <ProtectedRoute>
            <EditAssignment />
          </ProtectedRoute>
        }
      />

      {/* ================= PROFILE ================= */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* ================= DEFAULT ================= */}

      <Route path="*" element={<Login />} />

    </Routes>
  );
}