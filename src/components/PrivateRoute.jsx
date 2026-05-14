// // import { useAuth } from "../components/AuthContext";
// // import React from "react";
// // import { Navigate, useLocation } from "react-router-dom";

// // const PrivateRoute = ({ children, allowedRoles }) => {
// //   const { user, loading } = useAuth();
// //   const location = useLocation();

// //   if (loading) {
// //     return <div className="text-center mt-10">Loading...</div>;
// //   }

// //   // Not authenticated: redirect to login
// //   if (!user) {
// //     return <Navigate to="/login" replace state={{ from: location }} />;
// //   }

// //   // Authenticated but not authorized
// //   if (allowedRoles && !allowedRoles.includes(user.role)) {
// //     return <Navigate to="/unauthorized" replace />;
// //   }

// //   // Authorized
// //   return children;
// // };

// // export default PrivateRoute;


// // components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children, allowedRoles = [] }) => {
//   const userStr = localStorage.getItem('user');
  
//   if (!userStr) {
//     return <Navigate to="/login" />;
//   }
  
//   const user = JSON.parse(userStr);
//   const userRoles = user.roles || [];
  
//   // CRITICAL: SUPER_ADMIN check - if user has SUPER_ADMIN role, allow access to everything
//   if (userRoles.includes('SUPER_ADMIN')) {
//     return children;
//   }
  
//   // If no specific roles required, just check authentication
//   if (allowedRoles.length === 0) {
//     return children;
//   }
  
//   // Check if user has any of the allowed roles
//   const hasAccess = userRoles.some(role => 
//     allowedRoles.includes(role)
//   );
  
//   if (!hasAccess) {
//     return <Navigate to="/unauthorized" />;
//   }
  
//   return children;
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isSuperAdmin } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // If no specific roles required, allow access
  if (allowedRoles.length === 0) {
    return children;
  }
  
  // SUPER_ADMIN can access everything
  if (isSuperAdmin()) {
    return children;
  }
  
  // ✅ Fix: Check if user's role is in the allowedRoles array
  const userRole = user.role;
  const hasRequiredRole = allowedRoles.includes(userRole);
  
  if (!hasRequiredRole) {
    console.log(`Access denied: User role ${userRole} not in ${allowedRoles}`);
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default PrivateRoute;