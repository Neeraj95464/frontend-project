// import { registerUser, getSites, getLocationsBySite } from "../services/api";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//     employeeId: "",
//     role: "USER",
//     email: "",
//     phoneNumber: "",
//     department: "",
//     note: "",
//     site: null,
//     location: null,
//     personalEmail: "",
//     aadharNumber: "",
//     panNumber: "",
//     designation: "",
//   });

//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const departments = [
//     { value: "ACCESSORIES", label: "Accessories" },
//     { value: "ACCOUNTS", label: "Accounts" },
//     { value: "ACCOUNTS_AND_FINANCE", label: "Accounts & Finance" },
//     { value: "AFTER_SALES", label: "After Sales" },
//     { value: "AUDIT", label: "Audit" },
//     { value: "BODY_AND_PAINT", label: "Body & Paint" },
//     { value: "CDE", label: "CDE" },
//     { value: "CRE", label: "CRE" },
//     { value: "CRE_PRE", label: "CRE/PRE" },
//     { value: "CSC", label: "CSC" },
//     { value: "CUSTOMER_RELATION", label: "Customer Relation" },
//     {
//       value: "CUSTOMER_RELATIONSHIP_EXECUTIVE",
//       label: "Customer Relationship Executive",
//     },
//     { value: "DATA_ANALYST", label: "Data Analyst" },
//     { value: "DEALER_DEVELOPMENT", label: "Dealer Development" },
//     { value: "DEPARTMENT", label: "Department" },
//     { value: "DIGITAL_MARKETING", label: "Digital Marketing" },
//     { value: "DISPATCH", label: "Dispatch" },
//     { value: "EDP", label: "EDP" },
//     { value: "ENGINE_LINE", label: "Engine Line" },
//     { value: "EXE_CRM", label: "Exe-CRM" },
//     { value: "FINANCE_AND_ACCOUNTS", label: "Finance & Accounts" },
//     { value: "HOMOLOGATION", label: "Homologation" },
//     { value: "HR", label: "HR" },
//     { value: "HUMAN_RESOURCE", label: "Human Resource" },
//     { value: "IT", label: "Information Technology" },
//     { value: "INSURANCE", label: "Insurance" },
//     { value: "JC", label: "JC" },
//     { value: "LOGISTIC_AND_EXCISE", label: "Logistic & Excise" },
//     { value: "M_ALIED_SERVICES", label: "M Alied Services" },
//     { value: "MAINTANANCE", label: "Maintanance" },
//     { value: "MANAGEMENT", label: "Management" },
//     { value: "MANUFACTURING", label: "Manufacturing" },
//     { value: "MARKETING", label: "Marketing" },
//     { value: "MIS", label: "MIS" },
//     { value: "NA", label: "NA" },
//     { value: "OPERATIONS_VD_AND_PROJECTS", label: "Operations(VD) & Projects" },
//     { value: "PDE", label: "PDE" },
//     { value: "PDE_MANAGER", label: "PDE Manager" },
//     { value: "PDI_VPC", label: "PDI/VPC" },
//     { value: "POC", label: "POC" },
//     { value: "PPC_STORE_AND_DISPATCH", label: "PPC /Store & Dispatch" },
//     { value: "PRE", label: "PRE" },
//     { value: "PRE_CRE_SALES", label: "PRE/CRE Sales" },
//     { value: "PRM", label: "PRM" },
//     { value: "PROCESS_ASSOCIATE", label: "Process Associate" },
//     { value: "PRODUCTION", label: "Production" },
//     { value: "QUALITY", label: "Quality" },
//     { value: "SALES", label: "Sales" },
//     { value: "SERVICE", label: "Service" },
//     { value: "SPARE_PARTS", label: "Spare Parts" },
//     { value: "SPARES_PARTS", label: "Spares Parts" },
//     { value: "SPECIAL_TOOLS", label: "Special Tools" },
//     { value: "STORE_AND_DISPATCH", label: "Store & Dispatch" },
//     { value: "SUPPY_CHAIN_MANAGEMENT", label: "Suppy Chain Management" },
//     { value: "TRAINING", label: "Training" },
//     { value: "WARRANTY", label: "Warranty" },
//     { value: "WORKSHOP_MANAGER", label: "Workshop Manager" },
//   ];

//   useEffect(() => {
//     getSites().then(setSites).catch(console.error);
//   }, []);

//   useEffect(() => {
//     if (form.site) {
//       getLocationsBySite(form.site.id).then(setLocations).catch(console.error);
//     }
//   }, [form.site]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await registerUser(form);
//   //     navigate("/login");
//   //   } catch (err) {
//   //     console.error(err);
//   //     setError("Registration failed. Check your data.");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 1️⃣ Show loading
//       setLoading(true);
//       setError("");

//       // 2️⃣ Register user
//       const newUser = await registerUser(form);
//       console.log("✅ User registered:", newUser);

//       // 3️⃣ SUCCESS: Show message + redirect to /user
//       toast.success("User registered successfully! Welcome!");
//       navigate("/user"); // 🔥 Changed from /login
//     } catch (err) {
//       // 4️⃣ ERROR: Show specific message
//       console.error("Registration error:", err);

//       if (err.response?.status === 409) {
//         setError("User already exists. Please login.");
//       } else if (err.response?.status === 400) {
//         setError(
//           err.response.data?.message || "Invalid data. Please check your input."
//         );
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } finally {
//       // 5️⃣ Always hide loading
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center py-8 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-100"
//       >
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
//             User Registration
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Fill in the details to create a new user account
//           </p>
//         </div>

//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
//             <p className="font-medium">{error}</p>
//           </div>
//         )}

//         {/* Basic Information Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">
//               1
//             </span>
//             Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Username <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="username"
//                 placeholder="Enter username"
//                 value={form.username}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Employee ID <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="employeeId"
//                 placeholder="Enter employee ID"
//                 value={form.employeeId}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Designation
//               </label>
//               <input
//                 name="designation"
//                 placeholder="Enter designation"
//                 value={form.designation}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Contact Information Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 text-sm">
//               2
//             </span>
//             Contact Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Official Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 name="email"
//                 placeholder="official@company.com"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Personal Email
//               </label>
//               <input
//                 name="personalEmail"
//                 placeholder="personal@email.com"
//                 type="email"
//                 value={form.personalEmail}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 name="phoneNumber"
//                 placeholder="+91 XXXXX XXXXX"
//                 value={form.phoneNumber}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Organization Details Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm">
//               3
//             </span>
//             Organization Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Department <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="department"
//                 value={form.department}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
//               >
//                 <option value="" disabled>
//                   Select Department
//                 </option>
//                 {departments.map((dept) => (
//                   <option key={dept.value} value={dept.value}>
//                     {dept.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Site <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="site"
//                 onChange={(e) => {
//                   const selected = sites.find(
//                     (s) => s.id === parseInt(e.target.value)
//                   );
//                   setForm((prev) => ({
//                     ...prev,
//                     site: selected,
//                     location: null,
//                   }));
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
//                 required
//               >
//                 <option value="">Select Site</option>
//                 {sites.map((site) => (
//                   <option key={site.id} value={site.id}>
//                     {site.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Location <span className="text-red-500">*</span>
//               </label>
//               <select
//                 name="location"
//                 onChange={(e) => {
//                   const selected = locations.find(
//                     (l) => l.id === parseInt(e.target.value)
//                   );
//                   setForm((prev) => ({ ...prev, location: selected }));
//                 }}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
//                 required
//               >
//                 <option value="">Select Location</option>
//                 {locations.map((loc) => (
//                   <option key={loc.id} value={loc.id}>
//                     {loc.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Identity & Additional Information Section */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
//             <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">
//               4
//             </span>
//             Identity & Additional Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Aadhar Number
//               </label>
//               <input
//                 name="aadharNumber"
//                 placeholder="XXXX XXXX XXXX"
//                 value={form.aadharNumber}
//                 onChange={handleChange}
//                 maxLength="12"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 PAN Number
//               </label>
//               <input
//                 name="panNumber"
//                 placeholder="ABCDE1234F"
//                 value={form.panNumber}
//                 onChange={handleChange}
//                 maxLength="10"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
//               />
//             </div>
//             <div className="md:col-span-2 lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Note
//               </label>
//               <input
//                 name="note"
//                 placeholder="Additional notes"
//                 value={form.note}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 flex justify-center">
//           <button
//             type="submit"
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//           >
//             Register User
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;

import { registerUser, getSites, getLocationsBySite } from "../services/api";
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ✅ Added toast import

const Register = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "", // ✅ Added back password field
    employeeId: "",
    role: "USER",
    email: "",
    phoneNumber: "",
    department: "",
    note: "",
    site: null,
    location: null,
    personalEmail: "",
    aadharNumber: "",
    panNumber: "",
    designation: "",
  });

  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const departments = [
    { value: "ACCESSORIES", label: "Accessories" },
    { value: "ACCOUNTS", label: "Accounts" },
    { value: "ACCOUNTS_AND_FINANCE", label: "Accounts & Finance" },
    { value: "AFTER_SALES", label: "After Sales" },
    { value: "AUDIT", label: "Audit" },
    { value: "BODY_AND_PAINT", label: "Body & Paint" },
    { value: "CDE", label: "CDE" },
    { value: "CRE", label: "CRE" },
    { value: "CRE_PRE", label: "CRE/PRE" },
    { value: "CSC", label: "CSC" },
    { value: "CUSTOMER_RELATION", label: "Customer Relation" },
    {
      value: "CUSTOMER_RELATIONSHIP_EXECUTIVE",
      label: "Customer Relationship Executive",
    },
    { value: "DATA_ANALYST", label: "Data Analyst" },
    { value: "DEALER_DEVELOPMENT", label: "Dealer Development" },
    { value: "DEPARTMENT", label: "Department" },
    { value: "DIGITAL_MARKETING", label: "Digital Marketing" },
    { value: "DISPATCH", label: "Dispatch" },
    { value: "EDP", label: "EDP" },
    { value: "ENGINE_LINE", label: "Engine Line" },
    { value: "EXE_CRM", label: "Exe-CRM" },
    { value: "FINANCE_AND_ACCOUNTS", label: "Finance & Accounts" },
    { value: "HOMOLOGATION", label: "Homologation" },
    { value: "HR", label: "HR" },
    { value: "HUMAN_RESOURCE", label: "Human Resource" },
    { value: "IT", label: "Information Technology" },
    { value: "INSURANCE", label: "Insurance" },
    { value: "JC", label: "JC" },
    { value: "LOGISTIC_AND_EXCISE", label: "Logistic & Excise" },
    { value: "M_ALIED_SERVICES", label: "M Alied Services" },
    { value: "MAINTANANCE", label: "Maintanance" },
    { value: "MANAGEMENT", label: "Management" },
    { value: "MANUFACTURING", label: "Manufacturing" },
    { value: "MARKETING", label: "Marketing" },
    { value: "MIS", label: "MIS" },
    { value: "NA", label: "NA" },
    { value: "OPERATIONS_VD_AND_PROJECTS", label: "Operations(VD) & Projects" },
    { value: "PDE", label: "PDE" },
    { value: "PDE_MANAGER", label: "PDE Manager" },
    { value: "PDI_VPC", label: "PDI/VPC" },
    { value: "POC", label: "POC" },
    { value: "PPC_STORE_AND_DISPATCH", label: "PPC /Store & Dispatch" },
    { value: "PRE", label: "PRE" },
    { value: "PRE_CRE_SALES", label: "PRE/CRE Sales" },
    { value: "PRM", label: "PRM" },
    { value: "PROCESS_ASSOCIATE", label: "Process Associate" },
    { value: "PRODUCTION", label: "Production" },
    { value: "QUALITY", label: "Quality" },
    { value: "SALES", label: "Sales" },
    { value: "SERVICE", label: "Service" },
    { value: "SPARE_PARTS", label: "Spare Parts" },
    { value: "SPARES_PARTS", label: "Spares Parts" },
    { value: "SPECIAL_TOOLS", label: "Special Tools" },
    { value: "STORE_AND_DISPATCH", label: "Store & Dispatch" },
    { value: "SUPPY_CHAIN_MANAGEMENT", label: "Suppy Chain Management" },
    { value: "TRAINING", label: "Training" },
    { value: "WARRANTY", label: "Warranty" },
    { value: "WORKSHOP_MANAGER", label: "Workshop Manager" },
  ];

  useEffect(() => {
    getSites().then(setSites).catch(console.error);
  }, []);

  useEffect(() => {
    if (form.site) {
      getLocationsBySite(form.site.id).then(setLocations).catch(console.error);
    }
  }, [form.site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Show loading
      setLoading(true);
      setError("");

      // 2️⃣ Register user
      const newUser = await registerUser(form);
      console.log("✅ User registered:", newUser);

      // 3️⃣ SUCCESS: Show toast + redirect to /user
      toast.success("User registered successfully!🎉", {
        duration: 8000,
        position: "top-right",
      });

      // Reset form after successful registration
      setForm({
        username: "",
        password: "",
        employeeId: "",
        role: "USER",
        email: "",
        phoneNumber: "",
        department: "",
        note: "",
        site: null,
        location: null,
        personalEmail: "",
        aadharNumber: "",
        panNumber: "",
        designation: "",
      });

      // Navigate after a brief delay to show toast
      setTimeout(() => {
        navigate("/users");
      }, 1500);
    } catch (err) {
      // 4️⃣ ERROR: Show specific toast messages
      console.error("Registration error:", err);

      if (err.response?.status === 409) {
        toast.error("User already exists! Please login instead.", {
          duration: 5000,
          position: "top-right",
        });
        setError("User already exists. Please login.");
      } else if (err.response?.status === 400) {
        const errorMsg =
          err.response.data?.message ||
          "Invalid data. Please check your input.";
        toast.error(errorMsg, {
          duration: 5000,
          position: "top-right",
        });
        setError(errorMsg);
      } else {
        toast.error("Registration failed. Please try again later.", {
          duration: 5000,
          position: "top-right",
        });
        setError("Registration failed. Please try again.");
      }
    } finally {
      // 5️⃣ Always hide loading
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center py-8 px-4">
      {/* ✅ Added Toaster component for toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 4000,
            theme: {
              primary: "#10b981",
            },
          },
          error: {
            duration: 5000,
            theme: {
              primary: "#ef4444",
            },
          },
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
            User Registration
          </h2>
          <p className="text-gray-500 text-sm">
            Fill in the details to create a new user account
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* ✅ Added Password Field */}
        {form.password === "" && (
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-md">
            <p className="font-medium text-sm">
              <strong>Note:</strong> Password field is empty in backend
              response. Password might be auto-generated or set separately.
            </p>
          </div>
        )}

        {/* Basic Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm">
              1
            </span>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                name="employeeId"
                placeholder="Enter employee ID"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                name="designation"
                placeholder="Enter designation"
                value={form.designation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 text-sm">
              2
            </span>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Official Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                placeholder="official@company.com"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Email
              </label>
              <input
                name="personalEmail"
                placeholder="personal@email.com"
                type="email"
                value={form.personalEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                placeholder="+91 XXXXX XXXXX"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Organization Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm">
              3
            </span>
            Organization Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site <span className="text-red-500">*</span>
              </label>
              <select
                name="site"
                onChange={(e) => {
                  const selected = sites.find(
                    (s) => s.id === parseInt(e.target.value)
                  );
                  setForm((prev) => ({
                    ...prev,
                    site: selected,
                    location: null,
                  }));
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="">Select Site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                onChange={(e) => {
                  const selected = locations.find(
                    (l) => l.id === parseInt(e.target.value)
                  );
                  setForm((prev) => ({ ...prev, location: selected }));
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                required
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Identity & Additional Information Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">
              4
            </span>
            Identity & Additional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number
              </label>
              <input
                name="aadharNumber"
                placeholder="XXXX XXXX XXXX"
                value={form.aadharNumber}
                onChange={handleChange}
                maxLength="12"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number
              </label>
              <input
                name="panNumber"
                placeholder="ABCDE1234F"
                value={form.panNumber}
                onChange={handleChange}
                maxLength="10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note
              </label>
              <input
                name="note"
                placeholder="Additional notes"
                value={form.note}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Registering...</span>
              </>
            ) : (
              <span>Register User</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
