import { useAuth } from "../components/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Not authenticated: redirect to login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Authenticated but not authorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized
  return children;
};

export default PrivateRoute;
