import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}