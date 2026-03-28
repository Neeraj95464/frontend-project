// // import { getVendors, createVendor, updateVendor } from "../services/api";
// // import VendorForm from "./VendorForm";
// // import {
// //   Button,
// //   Table,
// //   TableHead,
// //   TableBody,
// //   TableCell,
// //   TableRow,
// //   Modal,
// // } from "@/components/ui";
// // import { useEffect, useState } from "react";

// // export default function VendorListPage() {
// //   const [vendors, setVendors] = useState([]);
// //   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
// //   const [editVendorId, setEditVendorId] = useState(null);

// //   const [vendorFormData, setVendorFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     company: "",
// //     address: "",
// //     website: "",
// //     contactPerson: "",
// //     gstNumber: "",
// //     industryType: "",
// //     description: "",
// //   });

// //   useEffect(() => {
// //     fetchVendors();
// //   }, []);

// //   const fetchVendors = async () => {
// //     try {
// //       const data = await getVendors();
// //       console.log("data was ",data);
// //       setVendors(data);
// //     } catch (error) {
// //       console.error("Error fetching vendors", error);
// //     }
// //   };

// //   const handleVendorSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editVendorId) {
// //         await updateVendor(editVendorId, vendorFormData);
// //       } else {
// //         await createVendor(vendorFormData);
// //       }
// //       fetchVendors();
// //       handleVendorCancel();
// //     } catch (error) {
// //       console.error("Error saving vendor", error);
// //     }
// //   };

// //   const handleVendorEdit = (vendor) => {
// //     setVendorFormData(vendor);
// //     setEditVendorId(vendor.id);
// //     setIsVendorModalOpen(true);
// //   };

// //   const handleVendorCancel = () => {
// //     setIsVendorModalOpen(false);
// //     setEditVendorId(null);
// //     setVendorFormData({
// //       name: "",
// //       email: "",
// //       phone: "",
// //       company: "",
// //       address: "",
// //       website: "",
// //       contactPerson: "",
// //       gstNumber: "",
// //       industryType: "",
// //       description: "",
// //     });
// //   };

// //   return (
// //     // <div className="lg:ml-40 pt-16 px-8">
// //     <div className="lg:ml-48 bg-gray-50 min-h-screen">
// //       {/* Header Section */}
// //       <div className="flex justify-between items-center mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-800">
// //             Vendor Management
// //           </h1>
// //           <p className="text-gray-500 mt-1 text-sm">
// //             Manage and maintain all your vendor details in one place.
// //           </p>
// //         </div>

// //         <Button
// //           onClick={() => {
// //             setEditVendorId(null);
// //             setIsVendorModalOpen(true);
// //           }}
// //           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
// //         >
// //           + Add Vendor
// //         </Button>
// //       </div>

// //       {/* Vendor Table Card */}
// //       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
// //         <Table>
// //           <TableHead className="bg-gray-50">
// //             <TableRow>
// //               <TableCell className="font-semibold">ID</TableCell>
// //               <TableCell className="font-semibold">Name</TableCell>
// //               <TableCell className="font-semibold">Company</TableCell>
// //               <TableCell className="font-semibold">Email</TableCell>
// //               <TableCell className="font-semibold">Phone</TableCell>
// //               <TableCell className="font-semibold text-center">
// //                 Actions
// //               </TableCell>
// //             </TableRow>
// //           </TableHead>

// //           <TableBody>
// //             {vendors.length > 0 ? (
// //               vendors.map((vendor) => (
// //                 <TableRow key={vendor.id} className="hover:bg-gray-50">
// //                   <TableCell>{vendor.id}</TableCell>
// //                   <TableCell>{vendor.name}</TableCell>
// //                   <TableCell>{vendor.company}</TableCell>
// //                   <TableCell>{vendor.email}</TableCell>
// //                   <TableCell>{vendor.phone}</TableCell>
// //                   <TableCell className="text-center">
// //                     <Button
// //                       onClick={() => handleVendorEdit(vendor)}
// //                       className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
// //                     >
// //                       Edit
// //                     </Button>

// //                     <Button
// //                       variant="destructive"
// //                       className="px-4 py-2 rounded-md"
// //                     >
// //                       Delete
// //                     </Button>
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell colSpan={6} className="text-center py-6">
// //                   <span className="text-gray-500">
// //                     No vendors available. Click "Add Vendor" to create one.
// //                   </span>
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </div>

// //       {/* Vendor Modal */}
// //       {isVendorModalOpen && (
// //         <Modal onClose={handleVendorCancel}>
// //           <h2 className="text-xl font-bold mb-4 text-gray-800">
// //             {editVendorId ? "Edit Vendor" : "Add Vendor"}
// //           </h2>

// //           <VendorForm
// //             formData={vendorFormData}
// //             setFormData={setVendorFormData}
// //             onSubmit={handleVendorSubmit}
// //             onCancel={handleVendorCancel}
// //           />
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // }



// import { getVendors, createVendor, updateVendor } from "../services/api";
// import VendorForm from "./VendorForm";
// import {
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableRow,
//   Modal,
// } from "@/components/ui";
// import { useEffect, useState } from "react";

// // Helper to reset the form state to default values
// const INITIAL_FORM_STATE = {
//   name: "",
//   email: "",
//   phone: "",
//   company: "",
//   address: "",
//   website: "",
//   contactPerson: "",
//   gstNumber: "",
//   industryType: "",
//   description: "",
//   bankName: "",
//   bankNumber: "",
//   bankIFSC: "",
//   panNumber: "",
//   status: "ACTIVE", // Default value
// };

// export default function VendorListPage() {
//   const [vendors, setVendors] = useState([]);
//   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//   const [editVendorId, setEditVendorId] = useState(null);

//   // Expanded state to include all backend fields
//   const [vendorFormData, setVendorFormData] = useState(INITIAL_FORM_STATE);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const data = await getVendors();
//       console.log("data received: ", data);
//       setVendors(data);
//     } catch (error) {
//       console.error("Error fetching vendors", error);
//     }
//   };

//   const handleVendorSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editVendorId) {
//         await updateVendor(editVendorId, vendorFormData);
//       } else {
//         await createVendor(vendorFormData);
//       }
//       fetchVendors();
//       handleVendorCancel();
//     } catch (error) {
//       console.error("Error saving vendor", error);
//     }
//   };

//   const handleVendorEdit = (vendor) => {
//     // Ensure null values from backend don't break the form inputs
//     const sanitizedVendor = Object.keys(INITIAL_FORM_STATE).reduce((acc, key) => {
//       acc[key] = vendor[key] || "";
//       return acc;
//     }, { id: vendor.id });

//     setVendorFormData(sanitizedVendor);
//     setEditVendorId(vendor.id);
//     setIsVendorModalOpen(true);
//   };

//   const handleVendorCancel = () => {
//     setIsVendorModalOpen(false);
//     setEditVendorId(null);
//     setVendorFormData(INITIAL_FORM_STATE);
//   };

//   return (
//     <div className="lg:ml-48 bg-gray-50 min-h-screen p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
//           <p className="text-gray-500 mt-1 text-sm">
//             Maintain vendor profiles, banking details, and tax compliance info.
//           </p>
//         </div>

//         <Button
//           onClick={() => {
//             setEditVendorId(null);
//             setVendorFormData(INITIAL_FORM_STATE);
//             setIsVendorModalOpen(true);
//           }}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
//         >
//           + Add Vendor
//         </Button>
//       </div>

//       {/* Vendor Table Card */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
//         <Table>
//           <TableHead className="bg-gray-100">
//             <TableRow>
//               <TableCell className="font-bold">Name / Company</TableCell>
//               <TableCell className="font-bold">Contact Info</TableCell>
//               <TableCell className="font-bold">Tax Details (GST/PAN)</TableCell>
//               <TableCell className="font-bold">Banking</TableCell>
//               <TableCell className="font-bold">Status</TableCell>
//               <TableCell className="font-bold text-center">Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {vendors.length > 0 ? (
//               vendors.map((vendor) => (
//                 <TableRow key={vendor.id} className="hover:bg-gray-50">
//                   {/* Name & Company */}
//                   <TableCell>
//                     <div className="font-medium text-blue-700">{vendor.name}</div>
//                     <div className="text-xs text-gray-500">{vendor.company || "No Company"}</div>
//                   </TableCell>

//                   {/* Contact Info */}
//                   <TableCell>
//                     <div className="text-sm">{vendor.email}</div>
//                     <div className="text-xs text-gray-500">{vendor.phone}</div>
//                   </TableCell>

//                   {/* Tax Details */}
//                   <TableCell>
//                     <div className="text-xs font-mono">GST: {vendor.gstNumber || "N/A"}</div>
//                     <div className="text-xs font-mono text-gray-500">PAN: {vendor.panNumber || "N/A"}</div>
//                   </TableCell>

//                   {/* Banking Info */}
//                   <TableCell>
//                     <div className="text-xs truncate max-w-[150px]">
//                       {vendor.bankName ? `${vendor.bankName} (${vendor.bankNumber})` : "No Bank Added"}
//                     </div>
//                     <div className="text-[10px] text-gray-400 font-mono">{vendor.bankIFSC}</div>
//                   </TableCell>

//                   {/* Status Badge */}
//                   <TableCell>
//                     <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
//                       vendor.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
//                     }`}>
//                       {vendor.status || 'PENDING'}
//                     </span>
//                   </TableCell>

//                   {/* Actions */}
//                   <TableCell className="text-center">
//                     <div className="flex justify-center space-x-2">
//                       <Button
//                         onClick={() => handleVendorEdit(vendor)}
//                         className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1"
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         className="text-xs px-3 py-1"
//                         onClick={() => console.log("Delete ID:", vendor.id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-10 text-gray-500">
//                   No vendors found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Vendor Modal */}
//       {isVendorModalOpen && (
//         <Modal onClose={handleVendorCancel}>
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
//               {editVendorId ? "Update Vendor Profile" : "Register New Vendor"}
//             </h2>
//             <VendorForm
//               formData={vendorFormData}
//               setFormData={setVendorFormData}
//               onSubmit={handleVendorSubmit}
//               onCancel={handleVendorCancel}
//             />
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }


import { getVendors, createVendor, updateVendor } from "../services/api";
import VendorForm from "./VendorForm";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Modal,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { Eye, Edit2, Trash2, Plus, X, CheckCircle, Clock } from "lucide-react";

// Helper to reset the form state to default values
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  website: "",
  contactPerson: "",
  gstNumber: "",
  industryType: "",
  description: "",
  bankName: "",
  bankNumber: "",
  bankIFSC: "",
  panNumber: "",
  status: "ACTIVE",
};

export default function VendorListPage() {
  const [vendors, setVendors] = useState([]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editVendorId, setEditVendorId] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [vendorFormData, setVendorFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      console.log("data received: ", data);
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors", error);
    }
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVendorId) {
        await updateVendor(editVendorId, vendorFormData);
      } else {
        await createVendor(vendorFormData);
      }
      fetchVendors();
      handleVendorCancel();
    } catch (error) {
      console.error("Error saving vendor", error);
    }
  };

  const handleVendorEdit = (vendor) => {
    const sanitizedVendor = Object.keys(INITIAL_FORM_STATE).reduce((acc, key) => {
      acc[key] = vendor[key] || "";
      return acc;
    }, { id: vendor.id });

    setVendorFormData(sanitizedVendor);
    setEditVendorId(vendor.id);
    setIsVendorModalOpen(true);
  };

  const handleVendorCancel = () => {
    setIsVendorModalOpen(false);
    setEditVendorId(null);
    setVendorFormData(INITIAL_FORM_STATE);
  };

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsDetailModalOpen(true);
  };

  // Filter vendors based on search and status
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ACTIVE':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit"><CheckCircle size={12} /> Active</span>;
      case 'INACTIVE':
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 flex items-center gap-1 w-fit"><X size={12} /> Inactive</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit"><Clock size={12} /> Pending</span>;
    }
  };

  return (
    <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vendor Management
            </h1>
            {/* <p className="text-gray-500 mt-2 text-sm">
              Manage and monitor all vendor profiles, banking details, and compliance information
            </p> */}
          </div>

          <Button
            onClick={() => {
              setEditVendorId(null);
              setVendorFormData(INITIAL_FORM_STATE);
              setIsVendorModalOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Vendor
          </Button>
        </div>

        {/* Filters */}
        <div className="mt-6 flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Total Vendors</p>
          <p className="text-2xl font-bold text-gray-800">{vendors.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Active Vendors</p>
          <p className="text-2xl font-bold text-green-600">{vendors.filter(v => v.status === 'ACTIVE').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm">With GST Number</p>
          <p className="text-2xl font-bold text-purple-600">{vendors.filter(v => v.gstNumber).length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm">With Bank Details</p>
          <p className="text-2xl font-bold text-orange-600">{vendors.filter(v => v.bankName).length}</p>
        </div>
      </div>

      {/* Vendor Table Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHead className="bg-gray-50 border-b border-gray-200">
              <TableRow>
                <TableCell className="font-semibold text-gray-700">Vendor Details</TableCell>
                <TableCell className="font-semibold text-gray-700">Contact Information</TableCell>
                <TableCell className="font-semibold text-gray-700">Tax Information</TableCell>
                <TableCell className="font-semibold text-gray-700">Banking Details</TableCell>
                <TableCell className="font-semibold text-gray-700">Status</TableCell>
                <TableCell className="font-semibold text-gray-700 text-center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    {/* Vendor Details */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-gray-800">{vendor.name}</div>
                        {vendor.contactPerson && (
                          <div className="text-xs text-gray-500">Contact: {vendor.contactPerson}</div>
                        )}
                        {vendor.website && (
                          <div className="text-xs text-blue-600">{vendor.website}</div>
                        )}
                      </div>
                    </TableCell>

                    {/* Contact Information */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-700">{vendor.email}</div>
                        <div className="text-sm text-gray-600">{vendor.phone || 'N/A'}</div>
                        {vendor.address && (
                          <div className="text-xs text-gray-400 truncate max-w-[200px]">{vendor.address}</div>
                        )}
                      </div>
                    </TableCell>

                    {/* Tax Information */}
                    <TableCell className="py-4">
                      <div className="space-y-1">
                        <div className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
                          <span className="font-semibold">GST:</span> {vendor.gstNumber || 'N/A'}
                        </div>
                        <div className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
                          <span className="font-semibold">PAN:</span> {vendor.panNumber || 'N/A'}
                        </div>
                      </div>
                    </TableCell>

                    {/* Banking Details */}
                    <TableCell className="py-4">
                      {vendor.bankName ? (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-700">{vendor.bankName}</div>
                          <div className="text-xs text-gray-500">A/C: {vendor.bankNumber}</div>
                          <div className="text-xs text-gray-400 font-mono">IFSC: {vendor.bankIFSC}</div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No banking details</span>
                      )}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="py-4">
                      {getStatusBadge(vendor.status)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          onClick={() => handleViewDetails(vendor)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          onClick={() => handleVendorEdit(vendor)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
                          title="Edit Vendor"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
                          title="Delete Vendor"
                          onClick={() => console.log("Delete ID:", vendor.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="text-gray-400">
                      <X size={48} className="mx-auto mb-2" />
                      <p>No vendors found</p>
                      <p className="text-sm">Click "Add New Vendor" to get started</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Vendor Modal (Add/Edit) */}
      {isVendorModalOpen && (
        <Modal onClose={handleVendorCancel}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              {editVendorId ? "Update Vendor Profile" : "Register New Vendor"}
            </h2>
            <VendorForm
              formData={vendorFormData}
              setFormData={setVendorFormData}
              onSubmit={handleVendorSubmit}
              onCancel={handleVendorCancel}
            />
          </div>
        </Modal>
      )}

      {/* Detail View Modal */}
    {/* Detail View Modal */}
      {isDetailModalOpen && selectedVendor && (
        <Modal onClose={() => setIsDetailModalOpen(false)}>
          <div className="max-w-2xl mx-auto flex flex-col max-h-[85vh]">
            
            {/* 1. STICKY HEADER */}
            <div className="flex justify-between items-center mb-4 border-b pb-3 shrink-0">
              <h2 className="text-2xl font-bold text-gray-800">Vendor Details</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* 2. SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              
              {/* Basic Information */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Vendor Name</p>
                    <p className="font-semibold text-gray-800">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Company</p>
                    <p className="text-gray-800">{selectedVendor.company || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Contact Person</p>
                    <p className="text-gray-800">{selectedVendor.contactPerson || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] uppercase font-bold text-gray-400">Address</p>
                    <p className="text-gray-800 text-sm">{selectedVendor.address || 'N/A'}</p>
                  </div>
                </div>
              </section>

              {/* Contact & Web */}
              <section className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-[10px] uppercase font-bold text-blue-400">Email Address</p>
                  <p className="text-gray-800 font-medium break-all">{selectedVendor.email}</p>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <p className="text-[10px] uppercase font-bold text-blue-400">Phone Number</p>
                  <p className="text-gray-800 font-medium">{selectedVendor.phone || 'N/A'}</p>
                </div>
              </section>

              {/* Tax & Compliance */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 mb-3">Tax & Compliance</h3>
                <div className="grid grid-cols-2 gap-4 bg-purple-50/30 p-4 rounded-xl border border-purple-100">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-purple-400">GST Number</p>
                    <p className="font-mono font-bold text-gray-800">{selectedVendor.gstNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-purple-400">PAN Number</p>
                    <p className="font-mono font-bold text-gray-800">{selectedVendor.panNumber || 'N/A'}</p>
                  </div>
                </div>
              </section>

              {/* Banking Information */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-orange-600 mb-3">Banking Information</h3>
                <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100 space-y-3">
                  {selectedVendor.bankName ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-orange-400">Bank Name</p>
                          <p className="text-gray-800 font-semibold">{selectedVendor.bankName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-orange-400">IFSC Code</p>
                          <p className="font-mono text-gray-800">{selectedVendor.bankIFSC}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-orange-400">Account Number</p>
                        <p className="font-mono text-lg font-bold text-gray-800 tracking-wider">
                          {selectedVendor.bankNumber}
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-400 italic text-sm text-center py-2">No banking details provided</p>
                  )}
                </div>
              </section>

              {/* Description / Notes */}
              {selectedVendor.description && (
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3">Company Description</h3>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedVendor.description}
                    </p>
                  </div>
                </section>
              )}

              {/* Metadata Footer */}
              <div className="pt-4 flex justify-between text-[10px] text-gray-400 uppercase font-medium border-t">
                <span>Created: {new Date(selectedVendor.createdAt).toLocaleDateString()}</span>
                {selectedVendor.updatedAt && (
                  <span>Updated: {new Date(selectedVendor.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </div>

            {/* 3. STICKY FOOTER */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t shrink-0">
              <Button
                onClick={() => setIsDetailModalOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-lg font-semibold transition-all"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleVendorEdit(selectedVendor);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}