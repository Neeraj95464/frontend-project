


// import {
//   getAllAssignments,
//   assignLocation,
//   searchEmployees,
// } from "../services/api";
// import { useEffect, useState } from "react";

// export default function LocationAssignmentTable() {
//   const [assignments, setAssignments] = useState([]);
//   const [searchResults, setSearchResults] = useState({});
//   const [searchInputs, setSearchInputs] = useState({});
//   const [changedFields, setChangedFields] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllAssignments();

//         // console.log(res.data);
//         const filteredData = (res.data || []).filter(
//           (item) => item.ticketDepartment !== "FINANCE" && item.ticketDepartment !== "ADMIN"
//         );

//         setAssignments(filteredData);
//       } catch (error) {
//         console.error("Failed to load assignments:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchChange = async (index, type, value) => {
//     setSearchInputs((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: value,
//     }));

//     if (value.trim().length < 2) {
//       setSearchResults((prev) => ({
//         ...prev,
//         [`${index}-${type}`]: [],
//       }));
//       return;
//     }

//     try {
//       const results = await searchEmployees(value);

//       setSearchResults((prev) => ({
//         ...prev,
//         [`${index}-${type}`]: results || [],
//       }));
//     } catch (error) {
//       console.error("Employee search failed", error);
//     }
//   };

//   const handleEmployeeSelect = (index, type, employeeId) => {
//     const updated = [...assignments];

//     if (type === "executive") {
//       updated[index].executiveEmployeeId = employeeId;
//     } else {
//       updated[index].managerEmployeeId = employeeId;
//     }

//     setAssignments(updated);

//     // Track which field was changed
//     setChangedFields((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: true,
//     }));

//     // Clear search UI
//     setSearchResults((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: [],
//     }));

//     setSearchInputs((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: "",
//     }));
//   };

//   const handleSave = async (assignment, index) => {
//     try {
//       const payload = {
//         locationId: assignment.locationId,
//         ticketDepartment: assignment.ticketDepartment,
//       };

//       if (changedFields[`${index}-executive`]) {
//         payload.executiveEmployeeId = assignment.executiveEmployeeId;
//       }

//       if (changedFields[`${index}-manager`]) {
//         payload.managerEmployeeId = assignment.managerEmployeeId;
//       }

//       await assignLocation(payload);

//       alert("Assignment saved!");
//     } catch (err) {
//       console.error("Save failed", err);
//       alert("Failed to save assignment.");
//     }
//   };

//   return (
//     <div className="p-4 overflow-x-auto">
//       <h2 className="text-xl font-semibold mb-4">Location Assignments</h2>

//       <table className="min-w-full border border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Location</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2"> Executive</th>
//             <th className="border p-2">Manager</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {assignments.map((a, index) => (
//             <tr key={index} className="border-b">
//               <td className="border p-2">{a.locationName}</td>

//               <td className="border p-2">
//                 {a.ticketDepartment || "Not Assigned"}
//               </td>

//               {/* Executive */}
//               <td className="border p-2 relative">
//                 <input
//                   type="text"
//                   placeholder={a.executiveEmployeeId || "Search Executive"}
//                   className="border w-full p-1"
//                   value={searchInputs[`${index}-executive`] || ""}
//                   onChange={(e) =>
//                     handleSearchChange(index, "executive", e.target.value)
//                   }
//                 />

//                 {searchResults[`${index}-executive`]?.length > 0 && (
//                   <ul className="bg-white border max-h-40 overflow-auto absolute z-10 w-full">
//                     {searchResults[`${index}-executive`].map((emp) => (
//                       <li
//                         key={emp.employeeId}
//                         className="p-1 hover:bg-gray-200 cursor-pointer"
//                         onClick={() =>
//                           handleEmployeeSelect(
//                             index,
//                             "executive",
//                             emp.employeeId
//                           )
//                         }
//                       >
//                         {emp.username} ({emp.employeeId})
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </td>

//               {/* Manager */}
//               <td className="border p-2 relative">
//                 <input
//                   type="text"
//                   placeholder={a.managerEmployeeId || "Search Manager"}
//                   className="border w-full p-1"
//                   value={searchInputs[`${index}-manager`] || ""}
//                   onChange={(e) =>
//                     handleSearchChange(index, "manager", e.target.value)
//                   }
//                 />

//                 {searchResults[`${index}-manager`]?.length > 0 && (
//                   <ul className="bg-white border max-h-40 overflow-auto absolute z-10 w-full">
//                     {searchResults[`${index}-manager`].map((emp) => (
//                       <li
//                         key={emp.employeeId}
//                         className="p-1 hover:bg-gray-200 cursor-pointer"
//                         onClick={() =>
//                           handleEmployeeSelect(
//                             index,
//                             "manager",
//                             emp.employeeId
//                           )
//                         }
//                       >
//                         {emp.username} ({emp.employeeId})
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </td>

//               <td className="border p-2">
//                 <button
//                   className="bg-blue-600 text-white px-3 py-1 rounded"
//                   onClick={() => handleSave(a, index)}
//                 >
//                   Save
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// import {
//   getAllAssignments,
//   assignLocation,
//   bulkAssignLocations,
//   searchEmployees,
// } from "../services/api";
// import { useEffect, useState } from "react";

// export default function LocationAssignmentTable() {
//   const [assignments, setAssignments] = useState([]);
//   const [originalAssignments, setOriginalAssignments] = useState([]); // Track original state
//   const [searchResults, setSearchResults] = useState({});
//   const [searchInputs, setSearchInputs] = useState({});
//   const [changedFields, setChangedFields] = useState({});
//   const [isBulkSaving, setIsBulkSaving] = useState(false);
//   const [saveStatus, setSaveStatus] = useState({ show: false, message: "", isError: false });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllAssignments();
//         const filteredData = (res.data || []).filter(
//           (item) => item.ticketDepartment !== "FINANCE" && item.ticketDepartment !== "ADMIN"
//         );
//         setAssignments(filteredData);
//         setOriginalAssignments(JSON.parse(JSON.stringify(filteredData))); // Deep copy for tracking changes
//       } catch (error) {
//         console.error("Failed to load assignments:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchChange = async (index, type, value) => {
//     setSearchInputs((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: value,
//     }));

//     if (value.trim().length < 2) {
//       setSearchResults((prev) => ({
//         ...prev,
//         [`${index}-${type}`]: [],
//       }));
//       return;
//     }

//     try {
//       const results = await searchEmployees(value);
//       setSearchResults((prev) => ({
//         ...prev,
//         [`${index}-${type}`]: results || [],
//       }));
//     } catch (error) {
//       console.error("Employee search failed", error);
//     }
//   };

//   const handleEmployeeSelect = (index, type, employeeId, employeeName) => {
//     const updated = [...assignments];

//     if (type === "executive") {
//       updated[index].executiveEmployeeId = employeeId;
//       updated[index].executiveName = employeeName; // Store name for display
//     } else {
//       updated[index].managerEmployeeId = employeeId;
//       updated[index].managerName = employeeName; // Store name for display
//     }

//     setAssignments(updated);

//     // Track which field was changed
//     setChangedFields((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: true,
//     }));

//     // Clear search UI
//     setSearchResults((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: [],
//     }));

//     setSearchInputs((prev) => ({
//       ...prev,
//       [`${index}-${type}`]: "",
//     }));
//   };

//   const handleSingleSave = async (assignment, index) => {
//     try {
//       const payload = {
//         locationId: assignment.locationId,
//         ticketDepartment: assignment.ticketDepartment,
//       };

//       if (changedFields[`${index}-executive`]) {
//         payload.executiveEmployeeId = assignment.executiveEmployeeId;
//       }

//       if (changedFields[`${index}-manager`]) {
//         payload.managerEmployeeId = assignment.managerEmployeeId;
//       }

//       await assignLocation(payload);
      
//       // Clear changed fields for this row
//       setChangedFields((prev) => ({
//         ...prev,
//         [`${index}-executive`]: false,
//         [`${index}-manager`]: false,
//       }));
      
//       setSaveStatus({ show: true, message: "Assignment saved successfully!", isError: false });
//       setTimeout(() => setSaveStatus({ show: false, message: "", isError: false }), 3000);
//     } catch (err) {
//       console.error("Save failed", err);
//       setSaveStatus({ show: true, message: "Failed to save assignment.", isError: true });
//       setTimeout(() => setSaveStatus({ show: false, message: "", isError: false }), 3000);
//     }
//   };

//   const handleBulkSave = async () => {
//     // Prepare only changed assignments
//     const changedAssignments = [];
    
//     assignments.forEach((assignment, index) => {
//       const hasExecutiveChange = changedFields[`${index}-executive`];
//       const hasManagerChange = changedFields[`${index}-manager`];
      
//       if (hasExecutiveChange || hasManagerChange) {
//         const payload = {
//           locationId: assignment.locationId,
//           ticketDepartment: assignment.ticketDepartment,
//         };
        
//         if (hasExecutiveChange && assignment.executiveEmployeeId) {
//           payload.executiveEmployeeId = assignment.executiveEmployeeId;
//         }
        
//         if (hasManagerChange && assignment.managerEmployeeId) {
//           payload.managerEmployeeId = assignment.managerEmployeeId;
//         }
        
//         changedAssignments.push(payload);
//       }
//     });
    
//     if (changedAssignments.length === 0) {
//       setSaveStatus({ show: true, message: "No changes to save!", isError: false });
//       setTimeout(() => setSaveStatus({ show: false, message: "", isError: false }), 3000);
//       return;
//     }
    
//     setIsBulkSaving(true);
    
//     try {
//       const response = await bulkAssignLocations(changedAssignments);
      
//       // Clear all changed fields
//       setChangedFields({});
      
//       // Update original assignments to match current state
//       setOriginalAssignments(JSON.parse(JSON.stringify(assignments)));
      
//       setSaveStatus({ 
//         show: true, 
//         message: `Successfully saved ${changedAssignments.length} assignment(s)!`, 
//         isError: false 
//       });
//       setTimeout(() => setSaveStatus({ show: false, message: "", isError: false }), 3000);
//     } catch (err) {
//       console.error("Bulk save failed", err);
//       setSaveStatus({ 
//         show: true, 
//         message: "Failed to save assignments. Please try again.", 
//         isError: true 
//       });
//       setTimeout(() => setSaveStatus({ show: false, message: "", isError: false }), 3000);
//     } finally {
//       setIsBulkSaving(false);
//     }
//   };

//   const hasUnsavedChanges = () => {
//     return Object.keys(changedFields).length > 0;
//   };

//   return (
//     <div className="p-4 overflow-x-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Location Assignments</h2>
        
//         <div className="space-x-2">
//           {hasUnsavedChanges() && (
//             <span className="text-yellow-600 text-sm mr-3">
//               ⚠️ You have unsaved changes
//             </span>
//           )}
//           <button
//             className={`px-4 py-2 rounded ${
//               isBulkSaving || !hasUnsavedChanges()
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             } text-white`}
//             onClick={handleBulkSave}
//             disabled={isBulkSaving || !hasUnsavedChanges()}
//           >
//             {isBulkSaving ? "Saving..." : "Bulk Save All"}
//           </button>
//         </div>
//       </div>
      
//       {saveStatus.show && (
//         <div
//           className={`mb-4 p-3 rounded ${
//             saveStatus.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
//           }`}
//         >
//           {saveStatus.message}
//         </div>
//       )}

//       <table className="min-w-full border border-collapse">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Location</th>
//             <th className="border p-2">Department</th>
//             <th className="border p-2">Executive</th>
//             <th className="border p-2">Manager</th>
//             <th className="border p-2">Action</th>
//            </tr>
//         </thead>

//         <tbody>
//           {assignments.map((a, index) => (
//             <tr key={index} className="border-b">
//               <td className="border p-2">{a.locationName}</td>
//               <td className="border p-2">
//                 {a.ticketDepartment || "Not Assigned"}
//               </td>

//               {/* Executive */}
//               <td className="border p-2 relative">
//                 <input
//                   type="text"
//                   placeholder={a.executiveEmployeeId ? `${a.executiveName || a.executiveEmployeeId}` : "Search Executive"}
//                   className="border w-full p-1"
//                   value={searchInputs[`${index}-executive`] || ""}
//                   onChange={(e) =>
//                     handleSearchChange(index, "executive", e.target.value)
//                   }
//                 />
                
//                 {changedFields[`${index}-executive`] && (
//                   <span className="absolute right-2 top-2 text-xs text-yellow-600">*</span>
//                 )}

//                 {searchResults[`${index}-executive`]?.length > 0 && (
//                   <ul className="bg-white border max-h-40 overflow-auto absolute z-10 w-full left-0 top-full">
//                     {searchResults[`${index}-executive`].map((emp) => (
//                       <li
//                         key={emp.employeeId}
//                         className="p-1 hover:bg-gray-200 cursor-pointer"
//                         onClick={() =>
//                           handleEmployeeSelect(
//                             index,
//                             "executive",
//                             emp.employeeId,
//                             emp.username
//                           )
//                         }
//                       >
//                         {emp.username} ({emp.employeeId})
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </td>

//               {/* Manager */}
//               <td className="border p-2 relative">
//                 <input
//                   type="text"
//                   placeholder={a.managerEmployeeId ? `${a.managerName || a.managerEmployeeId}` : "Search Manager"}
//                   className="border w-full p-1"
//                   value={searchInputs[`${index}-manager`] || ""}
//                   onChange={(e) =>
//                     handleSearchChange(index, "manager", e.target.value)
//                   }
//                 />
                
//                 {changedFields[`${index}-manager`] && (
//                   <span className="absolute right-2 top-2 text-xs text-yellow-600">*</span>
//                 )}

//                 {searchResults[`${index}-manager`]?.length > 0 && (
//                   <ul className="bg-white border max-h-40 overflow-auto absolute z-10 w-full left-0 top-full">
//                     {searchResults[`${index}-manager`].map((emp) => (
//                       <li
//                         key={emp.employeeId}
//                         className="p-1 hover:bg-gray-200 cursor-pointer"
//                         onClick={() =>
//                           handleEmployeeSelect(
//                             index,
//                             "manager",
//                             emp.employeeId,
//                             emp.username
//                           )
//                         }
//                       >
//                         {emp.username} ({emp.employeeId})
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </td>

//               <td className="border p-2">
//                 <button
//                   className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   onClick={() => handleSingleSave(a, index)}
//                 >
//                   Save Row
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       {assignments.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No assignments found
//         </div>
//       )}
//     </div>
//   );
// }



import {
  getAllAssignments,
  assignLocation,
  bulkAssignLocations,
  searchEmployees,
} from "../services/api";
import { useEffect, useState, useRef } from "react";
import { toast } from 'react-toastify';

export default function LocationAssignmentTable() {
  const [assignments, setAssignments] = useState([]);
  const [originalAssignments, setOriginalAssignments] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchInputs, setSearchInputs] = useState({});
  const [changedFields, setChangedFields] = useState({});
  const [isBulkSaving, setIsBulkSaving] = useState(false);
  const tableRef = useRef(null);
  const bulkBarRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAssignments();
        const filteredData = (res.data || []).filter(
          (item) => item.ticketDepartment !== "FINANCE" && item.ticketDepartment !== "ADMIN"
        );
        setAssignments(filteredData);
        setOriginalAssignments(JSON.parse(JSON.stringify(filteredData)));
      } catch (error) {
        console.error("Failed to load assignments:", error);
        toast.error("Failed to load assignments");
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = async (index, type, value) => {
    setSearchInputs((prev) => ({
      ...prev,
      [`${index}-${type}`]: value,
    }));

    if (value.trim().length < 2) {
      setSearchResults((prev) => ({
        ...prev,
        [`${index}-${type}`]: [],
      }));
      return;
    }

    try {
      const results = await searchEmployees(value);
      setSearchResults((prev) => ({
        ...prev,
        [`${index}-${type}`]: results || [],
      }));
    } catch (error) {
      console.error("Employee search failed", error);
      toast.error("Failed to search employees");
    }
  };

  const handleEmployeeSelect = (index, type, employeeId, employeeName) => {
    const updated = [...assignments];

    if (type === "executive") {
      updated[index].executiveEmployeeId = employeeId;
      updated[index].executiveName = employeeName;
    } else {
      updated[index].managerEmployeeId = employeeId;
      updated[index].managerName = employeeName;
    }

    setAssignments(updated);

    setChangedFields((prev) => ({
      ...prev,
      [`${index}-${type}`]: true,
    }));

    setSearchResults((prev) => ({
      ...prev,
      [`${index}-${type}`]: [],
    }));

    setSearchInputs((prev) => ({
      ...prev,
      [`${index}-${type}`]: "",
    }));
  };

  const handleSingleSave = async (assignment, index) => {
    const toastId = toast.loading("Saving assignment...");
    
    try {
      const payload = {
        locationId: assignment.locationId,
        ticketDepartment: assignment.ticketDepartment,
      };

      if (changedFields[`${index}-executive`]) {
        payload.executiveEmployeeId = assignment.executiveEmployeeId;
      }

      if (changedFields[`${index}-manager`]) {
        payload.managerEmployeeId = assignment.managerEmployeeId;
      }

      await assignLocation(payload);
      
      setChangedFields((prev) => ({
        ...prev,
        [`${index}-executive`]: false,
        [`${index}-manager`]: false,
      }));
      
      toast.update(toastId, {
        render: "Assignment saved successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    } catch (err) {
      console.error("Save failed", err);
      toast.update(toastId, {
        render: "Failed to save assignment.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  const handleBulkSave = async () => {
    const changedAssignments = [];
    
    assignments.forEach((assignment, index) => {
      const hasExecutiveChange = changedFields[`${index}-executive`];
      const hasManagerChange = changedFields[`${index}-manager`];
      
      if (hasExecutiveChange || hasManagerChange) {
        const payload = {
          locationId: assignment.locationId,
          ticketDepartment: assignment.ticketDepartment,
        };
        
        if (hasExecutiveChange && assignment.executiveEmployeeId) {
          payload.executiveEmployeeId = assignment.executiveEmployeeId;
        }
        
        if (hasManagerChange && assignment.managerEmployeeId) {
          payload.managerEmployeeId = assignment.managerEmployeeId;
        }
        
        changedAssignments.push(payload);
      }
    });
    
    if (changedAssignments.length === 0) {
      toast.info("No changes to save!");
      return;
    }
    
    setIsBulkSaving(true);
    const toastId = toast.loading(`Saving ${changedAssignments.length} assignment(s)...`);
    
    try {
      await bulkAssignLocations(changedAssignments);
      
      setChangedFields({});
      setOriginalAssignments(JSON.parse(JSON.stringify(assignments)));
      
      toast.update(toastId, {
        render: `Successfully saved ${changedAssignments.length} assignment(s)!`,
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    } catch (err) {
      console.error("Bulk save failed", err);
      toast.update(toastId, {
        render: "Failed to save assignments. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsBulkSaving(false);
    }
  };

  const hasUnsavedChanges = () => {
    return Object.keys(changedFields).length > 0;
  };

  // Scroll to bulk bar function
  const scrollToBulkBar = () => {
    if (bulkBarRef.current) {
      const offset = 80; // Adjust based on your header height
      const elementPosition = bulkBarRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      {/* Sticky Bulk Save Bar - Now within the content area */}
      <div 
        ref={bulkBarRef}
        className="sticky top-0 z-40 bg-white shadow-md border-b"
        style={{ top: '0px' }} // Adjust this value based on your header height (e.g., '64px' if header is 64px)
      >
        <div className="px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Location Assignments</h2>
          
          <div className="flex items-center space-x-4">
            {hasUnsavedChanges() && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600 text-sm">
                  ⚠️ You have unsaved changes
                </span>
                <button
                  onClick={scrollToBulkBar}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Scroll to top
                </button>
              </div>
            )}
            <button
              className={`px-4 py-2 rounded ${
                isBulkSaving || !hasUnsavedChanges()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } text-white transition-colors`}
              onClick={handleBulkSave}
              disabled={isBulkSaving || !hasUnsavedChanges()}
            >
              {isBulkSaving ? "Saving..." : "💾 Bulk Save All"}
            </button>
          </div>
        </div>
      </div>



      {/* Table Container */}
<div
  ref={tableRef}
  className="p-4 overflow-auto h-[calc(100vh-140px)]"
>
  <table className="min-w-full border-collapse">
    
    {/* STICKY HEADER */}
    <thead className="sticky top-0 z-30 bg-gray-200 shadow-sm">
      <tr>
        <th className="border p-3 text-left whitespace-nowrap">
          Location
        </th>

        <th className="border p-3 text-left whitespace-nowrap">
          Department
        </th>

        <th className="border p-3 text-left whitespace-nowrap">
          Executive
        </th>

        <th className="border p-3 text-left whitespace-nowrap">
          Manager
        </th>

        <th className="border p-3 text-left whitespace-nowrap">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {assignments.map((a, index) => (
        <tr
          key={index}
          className="border-b hover:bg-slate-50 transition-colors"
        >
          {/* Location */}
          <td className="border p-2 whitespace-nowrap">
            {a.locationName}
          </td>

          {/* Department */}
          <td className="border p-2 whitespace-nowrap">
            {a.ticketDepartment || "Not Assigned"}
          </td>

          {/* Executive */}
          <td className="border p-2 relative min-w-[250px]">
            <input
              type="text"
              placeholder={
                a.executiveEmployeeId
                  ? `${a.executiveName || a.executiveEmployeeId}`
                  : "Search Executive"
              }
              className={`
                border rounded-md
                w-full p-2 pr-6
                focus:ring-2 focus:ring-blue-400
                outline-none
                ${
                  changedFields[`${index}-executive`]
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-300"
                }
              `}
              value={searchInputs[`${index}-executive`] || ""}
              onChange={(e) =>
                handleSearchChange(
                  index,
                  "executive",
                  e.target.value
                )
              }
            />

            {changedFields[`${index}-executive`] && (
              <span className="absolute right-3 top-3 text-xs text-yellow-600">
                *
              </span>
            )}

            {searchResults[`${index}-executive`]?.length > 0 && (
              <ul className="bg-white border rounded-md max-h-40 overflow-auto absolute z-50 w-full left-0 top-full shadow-lg">
                {searchResults[`${index}-executive`].map((emp) => (
                  <li
                    key={emp.employeeId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleEmployeeSelect(
                        index,
                        "executive",
                        emp.employeeId,
                        emp.username
                      )
                    }
                  >
                    {emp.username} ({emp.employeeId})
                  </li>
                ))}
              </ul>
            )}
          </td>

          {/* Manager */}
          <td className="border p-2 relative min-w-[250px]">
            <input
              type="text"
              placeholder={
                a.managerEmployeeId
                  ? `${a.managerName || a.managerEmployeeId}`
                  : "Search Manager"
              }
              className={`
                border rounded-md
                w-full p-2 pr-6
                focus:ring-2 focus:ring-green-400
                outline-none
                ${
                  changedFields[`${index}-manager`]
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-300"
                }
              `}
              value={searchInputs[`${index}-manager`] || ""}
              onChange={(e) =>
                handleSearchChange(
                  index,
                  "manager",
                  e.target.value
                )
              }
            />

            {changedFields[`${index}-manager`] && (
              <span className="absolute right-3 top-3 text-xs text-yellow-600">
                *
              </span>
            )}

            {searchResults[`${index}-manager`]?.length > 0 && (
              <ul className="bg-white border rounded-md max-h-40 overflow-auto absolute z-50 w-full left-0 top-full shadow-lg">
                {searchResults[`${index}-manager`].map((emp) => (
                  <li
                    key={emp.employeeId}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleEmployeeSelect(
                        index,
                        "manager",
                        emp.employeeId,
                        emp.username
                      )
                    }
                  >
                    {emp.username} ({emp.employeeId})
                  </li>
                ))}
              </ul>
            )}
          </td>

          {/* Action */}
          <td className="border p-2 whitespace-nowrap">
            <button
              className="
                bg-blue-600 hover:bg-blue-700
                text-white px-4 py-2
                rounded-md shadow-sm
                transition-all
              "
              onClick={() => handleSingleSave(a, index)}
            >
              Save Row
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {assignments.length === 0 && (
    <div className="text-center py-8 text-gray-500">
      No assignments found
    </div>
  )}
</div>

      {/* Floating indicator for unsaved changes when scrolled */}
      {hasUnsavedChanges() && (
        <button
          onClick={scrollToBulkBar}
          className="fixed bottom-8 right-8 bg-yellow-500 text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition-colors z-50"
          title="Go to top to save changes"
        >
          ⚠️ Unsaved Changes
        </button>
      )}
    </div>
  );
}

