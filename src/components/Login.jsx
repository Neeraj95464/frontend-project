// import { useAuth } from "../components/AuthContext";
// import { loginUser } from "../services/api";
// import React, { useState } from "react";
// import { FiUser, FiLock } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { login,user } = useAuth();
//   // const { user } = useAuth();

// useEffect(() => {
//   if (user) {
//     navigate("/"); // already logged in
//   }
// }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const response = await loginUser(username, password);
//       if (response.token) {
//         login(response); // Set user in context and localStorage
//         navigate("/"); // Redirect to dashboard/home
//       } else {
//         setError("Invalid credentials. Try again.");
//       }
//     } catch (err) {
//       setError("Login failed. Check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
//       <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
//         <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
//           Welcome to Mahavir Assets
//         </h2>

//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//         <form onSubmit={handleLogin} className="space-y-5">
//           <div className="relative">
//             <FiUser className="absolute left-3 top-3 text-blue-400" size={20} />
//             <input
//               type="text"
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div className="relative">
//             <FiLock className="absolute left-3 top-3 text-blue-400" size={20} />
//             <input
//               type="password"
//               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500 mt-4">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useAuth } from "../components/AuthContext";
import { loginUser } from "../services/api";
import React, { useState, useEffect } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔁 Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(username, password);
      if (response.token) {
        login(response);
        navigate("/ticket");
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          Welcome to Mahavir Assets
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-blue-400" size={20} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-blue-400" size={20} />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
