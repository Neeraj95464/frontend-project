// import {
//   fetchUserById,
//   getSites,
//   getLocationsBySite,
//   updateEmployee,
// } from "../services/api";
// import {
//   Card,
//   CardContent,
//   Button,
//   Input,
//   Label,
//   Select,
// } from "@/components/ui";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// // Import API functions

// const EditUser = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   // const [departments] = useState(["IT", "HR", "Finance", "Operations"]); // Static departments
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

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
//     const fetchData = async () => {
//       try {
//         const [userData, siteData] = await Promise.all([
//           fetchUserById(userId),
//           getSites(),
//         ]);

//         setUser(userData);
//         setSites(siteData);

//         if (userData.site?.id) {
//           fetchLocations(userData.site.id); // Fetch locations if site exists
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   const fetchLocations = async (siteId) => {
//     try {
//       const locationData = await getLocationsBySite(siteId);
//       setLocations(locationData);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "location") {
//       setUser({ ...user, location: { id: parseInt(value, 10) } }); // Store an object with an ID
//     } else {
//       setUser({ ...user, [name]: value });
//     }
//   };

//   const handleSiteChange = (e) => {
//     const siteId = e.target.value;
//     setUser({ ...user, site: { id: siteId } });
//     fetchLocations(siteId); // Fetch locations dynamically based on selected site
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateEmployee(userId, user);
//       alert("User updated successfully!");
//       navigate("/users");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="ml-40 lg:ml-40 pt-16 mr-8">
//       <Card>
//         <CardContent>
//           <h2 className="text-2xl font-bold mb-4">Edit User</h2>
//           <form
//             onSubmit={handleSubmit}
//             className="grid grid-cols-1 gap-4 md:grid-cols-2"
//           >
//             <div>
//               <Label>Username</Label>
//               <Input
//                 type="text"
//                 name="username"
//                 value={user.username}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Role</Label>
//               <Input
//                 type="text"
//                 name="role"
//                 value={user.role}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Department</Label>
//               <select
//                 name="department"
//                 value={user.department} // ✅ Use user instead of form
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
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
//               <Label>Phone Number</Label>
//               <Input
//                 type="text"
//                 name="phoneNumber"
//                 value={user.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label>Site</Label>
//               <Select
//                 name="site"
//                 value={user.site?.id}
//                 onChange={handleSiteChange}
//                 required
//               >
//                 <option value="">Select Site</option>
//                 {sites.map((site) => (
//                   <option key={site.id} value={site.id}>
//                     {site.name}
//                   </option>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Select
//                 name="location"
//                 value={user.location?.id}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Location</option>
//                 {locations.map((location) => (
//                   <option key={location.id} value={location.id}>
//                     {location.name}
//                   </option>
//                 ))}
//               </Select>
//             </div>
//             <div>
//               <Label>Note</Label>
//               <Input
//                 type="text"
//                 name="note"
//                 value={user.note || ""}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="md:col-span-2 flex justify-end space-x-4">
//               <Button
//                 type="button"
//                 className="bg-gray-500"
//                 onClick={() => navigate("/users")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" className="bg-blue-600">
//                 Update User
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EditUser;

import {
  fetchUserById,
  getSites,
  getLocationsBySite,
  updateEmployee,
} from "../services/api";
import {
  Card,
  CardContent,
  Button,
  Input,
  Label,
  Select,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchData = async () => {
      try {
        const [userData, siteData] = await Promise.all([
          fetchUserById(userId),
          getSites(),
        ]);

        setUser(userData);
        setSites(siteData);

        if (userData.site?.id) {
          fetchLocations(userData.site.id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const fetchLocations = async (siteId) => {
    try {
      const locationData = await getLocationsBySite(siteId);
      setLocations(locationData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "location") {
      setUser({ ...user, location: { id: parseInt(value, 10) } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSiteChange = (e) => {
    const siteId = e.target.value;
    setUser({ ...user, site: { id: siteId } });
    fetchLocations(siteId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(userId, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-20">Error: {error}</p>;

  return (
    <div className="ml-40 lg:ml-40 pt-16 mr-8">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="border-b pb-3 mb-5">
            <h2 className="text-xl font-bold text-gray-800">Edit User</h2>
            <p className="text-sm text-gray-500 mt-1">
              Update user information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-xs">
                  1
                </span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Username *
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                    required
                  />
                </div>
                {/* <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Employee ID
                  </Label>
                  <Input
                    type="text"
                    name="employeeId"
                    value={user.employeeId || ""}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                  />
                </div> */}
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Designation
                  </Label>
                  <Input
                    type="text"
                    name="designation"
                    value={user.designation || ""}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2 text-xs">
                  2
                </span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Official Email *
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Personal Email
                  </Label>
                  <Input
                    type="email"
                    name="personalEmail"
                    value={user.personalEmail || ""}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Phone Number *
                  </Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Organization Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 text-xs">
                  3
                </span>
                Organization Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Role *
                  </Label>
                  <Input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                    required
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Department *
                  </Label>
                  <select
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full h-9 px-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Site *
                  </Label>
                  <Select
                    name="site"
                    value={user.site?.id}
                    onChange={handleSiteChange}
                    className="mt-1 text-sm h-9"
                    required
                  >
                    <option value="">Select</option>
                    {sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Location *
                  </Label>
                  <Select
                    name="location"
                    value={user.location?.id}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                    required
                  >
                    <option value="">Select</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Identity & Additional */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-xs">
                  4
                </span>
                Identity & Additional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    Aadhar Number
                  </Label>
                  <Input
                    type="text"
                    name="aadharNumber"
                    value={user.aadharNumber || ""}
                    onChange={handleChange}
                    maxLength="12"
                    className="mt-1 text-sm h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-600">
                    PAN Number
                  </Label>
                  <Input
                    type="text"
                    name="panNumber"
                    value={user.panNumber || ""}
                    onChange={handleChange}
                    maxLength="10"
                    className="mt-1 text-sm h-9 uppercase"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-xs font-medium text-gray-600">
                    Note
                  </Label>
                  <Input
                    type="text"
                    name="note"
                    value={user.note || ""}
                    onChange={handleChange}
                    className="mt-1 text-sm h-9"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 text-sm h-9"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm h-9"
              >
                Update User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;
