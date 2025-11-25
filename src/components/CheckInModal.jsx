// import {
//   getAssetByAssetTag,
//   getSites,
//   getDepartments,
//   getLocationsBySite,
//   checkInAsset,
// } from "../services/api";
// import { useState, useEffect } from "react";

// const CheckInModal = ({ assetTag, isOpen, onClose, onCheckIn }) => {
//   const [note, setNote] = useState("");
//   const [selectedSite, setSelectedSite] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [assignedUser, setAssignedUser] = useState("");
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isOpen && assetTag) {
//         try {
//           const asset = await getAssetByAssetTag(assetTag);
//           setAssignedUser(asset.assignedUserName);
//           setSelectedSite(asset.siteId || "");
//           setSelectedLocation(asset.locationId || "");
//           setSelectedDepartment(asset.department || "");

//           setSites(await getSites());
//           setDepartments(await getDepartments());
//         } catch (error) {
//           console.error("Error fetching initial data:", error);
//         }
//       }
//     };

//     fetchData();
//   }, [isOpen, assetTag]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       if (selectedSite) {
//         try {
//           setLocations(await getLocationsBySite(selectedSite));
//         } catch (error) {
//           console.error("Error fetching locations:", error);
//         }
//       } else {
//         setLocations([]); // Reset locations if no site is selected
//       }
//     };

//     fetchLocations();
//   }, [selectedSite]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const checkInData = {
//       checkInNote: note,
//       site: sites.find((s) => s.id === selectedSite) || null,
//       location: locations.find((l) => l.id === selectedLocation) || null,
//       department: departments.find((d) => d.id === selectedDepartment) || null,
//       checkInDate: new Date().toISOString(),
//     };

//     try {
//       const response = await checkInAsset(assetTag, checkInData);
//       console.log("Check-in successful:", response);
//       onCheckIn(response); // Update parent component
//       onClose(); // Close modal
//     } catch (error) {
//       console.error("Error during check-in:", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
//         <h2 className="text-xl font-semibold mb-4">Check In Asset</h2>

//         <p className="mb-2">
//           <strong>Asset ID:</strong> {assetTag}
//         </p>
//         <p className="mb-4">
//           <strong>Assigned User:</strong> {assignedUser || "Not Assigned"}
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
//           {/* Check-in Note */}
//           <label className="text-sm font-medium">Note (Optional)</label>
//           <textarea
//             placeholder="Enter any notes here..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             className="border p-2 rounded"
//           />

//           {/* Site Selection */}
//           <label className="text-sm font-medium">Site</label>
//           <select
//             value={selectedSite}
//             onChange={(e) => {
//               setSelectedSite(e.target.value);
//               setSelectedLocation(""); // Reset location when site changes
//             }}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Site</option>
//             {sites.map((site) => (
//               <option key={site.id} value={site.id}>
//                 {site.name}
//               </option>
//             ))}
//           </select>

//           {/* Location Selection */}
//           <label className="text-sm font-medium">Location</label>
//           <select
//             value={selectedLocation}
//             onChange={(e) => setSelectedLocation(e.target.value)}
//             className="border p-2 rounded"
//             disabled={!selectedSite} // Disable if no site is selected
//           >
//             <option value="">Select Location</option>
//             {locations.map((location) => (
//               <option key={location.id} value={location.id}>
//                 {location.name}
//               </option>
//             ))}
//           </select>

//           {/* Department Selection */}
//           <label className="text-sm font-medium">Department</label>
//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">Select Department</option>
//             {departments.map((department, index) => (
//               <option key={index} value={department}>
//                 {department}
//               </option>
//             ))}
//           </select>

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-2 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Check In
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckInModal;

import {
  getAssetByAssetTag,
  getSites,
  getLocationsBySite,
  checkInAsset,
  getEnums,
} from "../services/api";
import { useState, useEffect } from "react";

const CheckInModal = ({ assetTag, isOpen, onClose, onCheckIn }) => {
  const [note, setNote] = useState("");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && assetTag) {
        try {
          const asset = await getAssetByAssetTag(assetTag);
          setAssignedUser(asset.assignedUserName);
          setSelectedSite(asset.siteId || "");
          setSelectedLocation(asset.locationId || "");
          setSelectedDepartment(asset.department || "");

          const [sitesData, enumsData] = await Promise.all([
            getSites(),
            getEnums(),
          ]);

          setSites(sitesData);
          setDepartments(enumsData.departments || []);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        }
      }
    };

    fetchData();
  }, [isOpen, assetTag]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (selectedSite) {
        try {
          setLocations(await getLocationsBySite(selectedSite));
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      } else {
        setLocations([]);
      }
    };

    fetchLocations();
  }, [selectedSite]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkInData = {
      checkInNote: note,
      site: selectedSite ? { id: selectedSite } : null,
      location: selectedLocation ? { id: selectedLocation } : null,
      // department is enum string, backend binds it to Department
      department: selectedDepartment || null,
      checkInDate: new Date().toISOString(),
    };

    try {
      const response = await checkInAsset(assetTag, checkInData);
      console.log("Check-in successful:", response);
      onCheckIn(response);
      onClose();
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Check In Asset</h2>

        <p className="mb-2">
          <strong>Asset ID:</strong> {assetTag}
        </p>
        <p className="mb-4">
          <strong>Assigned User:</strong> {assignedUser || "Not Assigned"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {/* Check-in Note */}
          <label className="text-sm font-medium">Note (Optional)</label>
          <textarea
            placeholder="Enter any notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border p-2 rounded"
          />

          {/* Site Selection */}
          <label className="text-sm font-medium">Site</label>
          <select
            value={selectedSite}
            onChange={(e) => {
              setSelectedSite(e.target.value);
              setSelectedLocation("");
            }}
            className="border p-2 rounded"
          >
            <option value="">Select Site</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>

          {/* Location Selection */}
          <label className="text-sm font-medium">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border p-2 rounded"
            disabled={!selectedSite}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>

          {/* Department Selection */}
          <label className="text-sm font-medium">Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Check In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckInModal;
