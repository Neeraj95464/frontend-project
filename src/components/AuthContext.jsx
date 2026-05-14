// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (data) => {
//     const roles = data.roles?.map((r) => r.authority.replace("ROLE_", ""));
//     const userData = {
//       username: data.empId,
//       role: roles?.[0],
//       roles,
//       token: data.token,
//     };
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // Correctly removes stored user info
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    
    // Store only the single role
    const userData = {
      username: data.empId,
      employeeId: data.empId,
      role: data.role,  // Only one role
      token: data.token,
      name: data.name,
      email: data.email
    };
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Helper function to check role
  const hasRole = (roleToCheck) => {
    if (!user) return false;
    if (user.role === "SUPER_ADMIN") return true; // SUPER_ADMIN has all access
    return user.role === roleToCheck;
  };

  const isSuperAdmin = () => {
    return user?.role === "SUPER_ADMIN";
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      hasRole,
      isSuperAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);