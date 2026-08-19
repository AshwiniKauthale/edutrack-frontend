import { Navigate, useLocation } from "react-router-dom";
import { getRole, isAuthenticated } from "../utils/Auth";


export default function RoleProtectedRoute({
    children,
    allowedRoles = []
}) {

    const location = useLocation();

    const authenticated =
        isAuthenticated();

    const currentRole =
        getRole();


    console.log("=================================");
    console.log("RoleProtectedRoute");
    console.log("Current role:", currentRole);
    console.log("Allowed roles:", allowedRoles);
    console.log("Current path:", location.pathname);
    console.log("=================================");


    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!authenticated) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location
                }}
            />
        );
    }


    // =====================================================
    // NORMALIZE ROLE
    // =====================================================

    const normalizedRole =
        currentRole
            ? String(currentRole)
                .trim()
                .toUpperCase()
            : "";


    const normalizedAllowedRoles =
        allowedRoles.map(
            role =>
                String(role)
                    .trim()
                    .toUpperCase()
        );


    console.log(
        "Normalized current role:",
        normalizedRole
    );

    console.log(
        "Normalized allowed roles:",
        normalizedAllowedRoles
    );


    // =====================================================
    // ROLE CHECK
    // =====================================================

    const hasPermission =
        normalizedAllowedRoles.length === 0 ||
        normalizedAllowedRoles.includes(
            normalizedRole
        );


    if (!hasPermission) {

        console.warn(
            "RoleProtectedRoute: Access denied",
            {
                currentRole: normalizedRole,
                allowedRoles:
                    normalizedAllowedRoles,
                path: location.pathname
            }
        );


        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }


    // =====================================================
    // ALLOWED
    // =====================================================

    return children;
}