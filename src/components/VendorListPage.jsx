

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
// import { Eye, Edit2, Trash2, Plus, X, CheckCircle, Clock } from "lucide-react";

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
//   status: "ACTIVE",
// };

// export default function VendorListPage() {
//   const [vendors, setVendors] = useState([]);
//   const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [editVendorId, setEditVendorId] = useState(null);
//   const [selectedVendor, setSelectedVendor] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [companyFilter, setCompanyFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const [debouncedCompany, setDebouncedCompany] = useState("");
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [sortBy, setSortBy] = useState("id");
//   const [sortDirection, setSortDirection] = useState("desc"); // Changed to desc as default

//   const [vendorFormData, setVendorFormData] = useState(INITIAL_FORM_STATE);

//   // Debounce search and company filters
//   useEffect(() => {
//     const searchTimer = setTimeout(() => {
//       setDebouncedSearch(searchTerm);
//     }, 500);
//     return () => clearTimeout(searchTimer);
//   }, [searchTerm]);

//   useEffect(() => {
//     const companyTimer = setTimeout(() => {
//       setDebouncedCompany(companyFilter);
//     }, 500);
//     return () => clearTimeout(companyTimer);
//   }, [companyFilter]);

//   // Fetch vendors when dependencies change
//   useEffect(() => {
//     fetchVendors();
//   }, [currentPage, pageSize, sortBy, sortDirection, debouncedSearch, debouncedCompany, statusFilter]);

//   const fetchVendors = async () => {
//     try {
//       const response = await getVendors(
//         currentPage, 
//         pageSize, 
//         sortBy, 
//         sortDirection,
//         debouncedCompany,
//         debouncedSearch,
//         statusFilter
//       );
//       console.log("data received: ", response);
      
//       // Handle paginated response
//       if (response && response.content) {
//         setVendors(response.content);
//         setTotalPages(response.page?.totalPages || 0);
//         setTotalElements(response.page?.totalElements || 0);
//       } else if (Array.isArray(response)) {
//         // Fallback for non-paginated response
//         setVendors(response);
//         setTotalPages(1);
//         setTotalElements(response.length);
//       } else {
//         setVendors([]);
//         setTotalPages(0);
//         setTotalElements(0);
//       }
//     } catch (error) {
//       console.error("Error fetching vendors", error);
//       setVendors([]);
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

//   const handleViewDetails = (vendor) => {
//     setSelectedVendor(vendor);
//     setIsDetailModalOpen(true);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handlePageSizeChange = (e) => {
//     setPageSize(Number(e.target.value));
//     setCurrentPage(0); // Reset to first page when changing page size
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(field);
//       setSortDirection("desc"); // Default to desc when changing sort field
//     }
//     setCurrentPage(0); // Reset to first page when sorting
//   };

//   const clearFilters = () => {
//     setSearchTerm("");
//     setCompanyFilter("");
//     setStatusFilter("ALL");
//     setDebouncedSearch("");
//     setDebouncedCompany("");
//     setCurrentPage(0);
//   };

//   const getStatusBadge = (status) => {
//     switch(status) {
//       case 'ACTIVE':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-fit"><CheckCircle size={12} /> Active</span>;
//       case 'INACTIVE':
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 flex items-center gap-1 w-fit"><X size={12} /> Inactive</span>;
//       default:
//         return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit"><Clock size={12} /> Pending</span>;
//     }
//   };

//   return (
//     <div className="lg:ml-48 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-6">
//       {/* Header Section */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Vendor Management
//             </h1>
//           </div>

//           <Button
//             onClick={() => {
//               setEditVendorId(null);
//               setVendorFormData(INITIAL_FORM_STATE);
//               setIsVendorModalOpen(true);
//             }}
//             className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
//           >
//             <Plus size={20} />
//             Add New Vendor
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="md:col-span-2">
//             <input
//               type="text"
//               placeholder="Search by name, email, or contact person..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Filter by company name..."
//               value={companyFilter}
//               onChange={(e) => setCompanyFilter(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//             />
//           </div>
//           <div className="flex gap-2">
//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(0);
//               }}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value="ALL">All Status</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
            
//             <select
//               value={pageSize}
//               onChange={handlePageSizeChange}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={20}>20 per page</option>
//               <option value={50}>50 per page</option>
//             </select>
            
//             {(searchTerm || companyFilter || statusFilter !== "ALL") && (
//               <button
//                 onClick={clearFilters}
//                 className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
//           <p className="text-gray-500 text-sm">Total Vendors</p>
//           <p className="text-2xl font-bold text-gray-800">{totalElements}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
//           <p className="text-gray-500 text-sm">Active Vendors</p>
//           <p className="text-2xl font-bold text-green-600">{vendors.filter(v => v.status === 'ACTIVE').length}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
//           <p className="text-gray-500 text-sm">With GST Number</p>
//           <p className="text-2xl font-bold text-purple-600">{vendors.filter(v => v.gstNumber).length}</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
//           <p className="text-gray-500 text-sm">With Bank Details</p>
//           <p className="text-2xl font-bold text-orange-600">{vendors.filter(v => v.bankName).length}</p>
//         </div>
//       </div>

//       {/* Vendor Table Card */}
//       <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHead className="bg-gray-50 border-b border-gray-200">
//               <TableRow>
//                 <TableCell 
//                   className="font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleSort('name')}
//                 >
//                   Vendor Details {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
//                 </TableCell>
//                 <TableCell 
//                   className="font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleSort('email')}
//                 >
//                   Contact Information {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
//                 </TableCell>
//                 <TableCell className="font-semibold text-gray-700">Tax Information</TableCell>
//                 <TableCell className="font-semibold text-gray-700">Banking Details</TableCell>
//                 <TableCell 
//                   className="font-semibold text-gray-700 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleSort('status')}
//                 >
//                   Status {sortBy === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
//                 </TableCell>
//                 <TableCell className="font-semibold text-gray-700 text-center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {vendors.length > 0 ? (
//                 vendors.map((vendor) => (
//                   <TableRow key={vendor.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
//                     {/* Vendor Details */}
//                     <TableCell className="py-4">
//                       <div className="space-y-1">
//                         <div className="font-semibold text-gray-800">{vendor.name}</div>
//                         <div className="text-sm text-gray-600">{vendor.company}</div>
//                         {vendor.contactPerson && (
//                           <div className="text-xs text-gray-500">Contact: {vendor.contactPerson}</div>
//                         )}
//                         {vendor.website && (
//                           <div className="text-xs text-blue-600">{vendor.website}</div>
//                         )}
//                         {vendor.department && (
//                           <div className="text-xs text-purple-600 font-medium">Dept: {vendor.department}</div>
//                         )}
//                       </div>
//                     </TableCell>

//                     {/* Contact Information */}
//                     <TableCell className="py-4">
//                       <div className="space-y-1">
//                         <div className="text-sm text-gray-700">{vendor.email}</div>
//                         <div className="text-sm text-gray-600">{vendor.phone || 'N/A'}</div>
//                         {vendor.address && (
//                           <div className="text-xs text-gray-400 truncate max-w-[200px]">{vendor.address}</div>
//                         )}
//                       </div>
//                     </TableCell>

//                     {/* Tax Information */}
//                     <TableCell className="py-4">
//                       <div className="space-y-1">
//                         <div className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
//                           <span className="font-semibold">GST:</span> {vendor.gstNumber || 'N/A'}
//                         </div>
//                         <div className="text-xs font-mono bg-gray-50 px-2 py-1 rounded">
//                           <span className="font-semibold">PAN:</span> {vendor.panNumber || 'N/A'}
//                         </div>
//                       </div>
//                     </TableCell>

//                     {/* Banking Details */}
//                     <TableCell className="py-4">
//                       {vendor.bankName ? (
//                         <div className="space-y-1">
//                           <div className="text-sm font-medium text-gray-700">{vendor.bankName}</div>
//                           <div className="text-xs text-gray-500">A/C: {vendor.bankNumber}</div>
//                           <div className="text-xs text-gray-400 font-mono">IFSC: {vendor.bankIFSC}</div>
//                         </div>
//                       ) : (
//                         <span className="text-xs text-gray-400">No banking details</span>
//                       )}
//                     </TableCell>

//                     {/* Status Badge */}
//                     <TableCell className="py-4">
//                       {getStatusBadge(vendor.status)}
//                     </TableCell>

//                     {/* Actions */}
//                     <TableCell className="py-4 text-center">
//                       <div className="flex justify-center gap-2">
//                         <button
//                           onClick={() => handleViewDetails(vendor)}
//                           className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
//                           title="View Details"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleVendorEdit(vendor)}
//                           className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
//                           title="Edit Vendor"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
//                           title="Delete Vendor"
//                           onClick={() => {
//                             if (window.confirm('Are you sure you want to delete this vendor?')) {
//                               console.log("Delete ID:", vendor.id);
//                               // Add delete API call here
//                             }
//                           }}
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-12">
//                     <div className="text-gray-400">
//                       <X size={48} className="mx-auto mb-2" />
//                       <p>No vendors found</p>
//                       <p className="text-sm">Click "Add New Vendor" to get started</p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
        
//         {/* Pagination Controls */}
//         {totalPages > 0 && (
//           <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50 flex-wrap gap-4">
//             <div className="text-sm text-gray-600">
//               Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} vendors
//             </div>
//             <div className="flex gap-2 flex-wrap">
//               <button
//                 onClick={() => handlePageChange(0)}
//                 disabled={currentPage === 0}
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//               >
//                 First
//               </button>
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 0}
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//               >
//                 Previous
//               </button>
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i;
//                 } else if (currentPage < 3) {
//                   pageNum = i;
//                 } else if (currentPage > totalPages - 3) {
//                   pageNum = totalPages - 5 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }
                
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`px-3 py-1 border rounded-md text-sm transition-colors ${
//                       currentPage === pageNum
//                         ? 'bg-blue-600 text-white border-blue-600'
//                         : 'border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     {pageNum + 1}
//                   </button>
//                 );
//               })}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage >= totalPages - 1}
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//               >
//                 Next
//               </button>
//               <button
//                 onClick={() => handlePageChange(totalPages - 1)}
//                 disabled={currentPage >= totalPages - 1}
//                 className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
//               >
//                 Last
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Vendor Modal (Add/Edit) */}
//       {isVendorModalOpen && (
//         <Modal onClose={handleVendorCancel}>
//           <div className="max-w-4xl mx-auto max-h-[90vh] overflow-y-auto">
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

//       {/* Detail View Modal */}
//       {isDetailModalOpen && selectedVendor && (
//         <Modal onClose={() => setIsDetailModalOpen(false)}>
//           <div className="max-w-2xl mx-auto flex flex-col max-h-[85vh]">
            
//             {/* STICKY HEADER */}
//             <div className="flex justify-between items-center mb-4 border-b pb-3 shrink-0">
//               <h2 className="text-2xl font-bold text-gray-800">Vendor Details</h2>
//               <button
//                 onClick={() => setIsDetailModalOpen(false)}
//                 className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {/* SCROLLABLE BODY */}
//             <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              
//               {/* Basic Information */}
//               <section>
//                 <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-3">Basic Information</h3>
//                 <div className="grid grid-cols-2 gap-x-6 gap-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Vendor Name</p>
//                     <p className="font-semibold text-gray-800">{selectedVendor.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Company</p>
//                     <p className="text-gray-800">{selectedVendor.company || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Contact Person</p>
//                     <p className="text-gray-800">{selectedVendor.contactPerson || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Department</p>
//                     <p className="text-gray-800">{selectedVendor.department || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Status</p>
//                     <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-[10px] uppercase font-bold text-gray-400">Address</p>
//                     <p className="text-gray-800 text-sm">{selectedVendor.address || 'N/A'}</p>
//                   </div>
//                 </div>
//               </section>

//               {/* Contact & Web */}
//               <section className="grid grid-cols-2 gap-4">
//                 <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
//                   <p className="text-[10px] uppercase font-bold text-blue-400">Email Address</p>
//                   <p className="text-gray-800 font-medium break-all">{selectedVendor.email}</p>
//                 </div>
//                 <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
//                   <p className="text-[10px] uppercase font-bold text-blue-400">Phone Number</p>
//                   <p className="text-gray-800 font-medium">{selectedVendor.phone || 'N/A'}</p>
//                 </div>
//               </section>

//               {/* Tax & Compliance */}
//               <section>
//                 <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 mb-3">Tax & Compliance</h3>
//                 <div className="grid grid-cols-2 gap-4 bg-purple-50/30 p-4 rounded-xl border border-purple-100">
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-purple-400">GST Number</p>
//                     <p className="font-mono font-bold text-gray-800">{selectedVendor.gstNumber || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] uppercase font-bold text-purple-400">PAN Number</p>
//                     <p className="font-mono font-bold text-gray-800">{selectedVendor.panNumber || 'N/A'}</p>
//                   </div>
//                 </div>
//               </section>

//               {/* Banking Information */}
//               <section>
//                 <h3 className="text-sm font-bold uppercase tracking-wider text-orange-600 mb-3">Banking Information</h3>
//                 <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100 space-y-3">
//                   {selectedVendor.bankName ? (
//                     <>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-[10px] uppercase font-bold text-orange-400">Bank Name</p>
//                           <p className="text-gray-800 font-semibold">{selectedVendor.bankName}</p>
//                         </div>
//                         <div>
//                           <p className="text-[10px] uppercase font-bold text-orange-400">IFSC Code</p>
//                           <p className="font-mono text-gray-800">{selectedVendor.bankIFSC}</p>
//                         </div>
//                       </div>
//                       <div>
//                         <p className="text-[10px] uppercase font-bold text-orange-400">Account Number</p>
//                         <p className="font-mono text-lg font-bold text-gray-800 tracking-wider">
//                           {selectedVendor.bankNumber}
//                         </p>
//                       </div>
//                     </>
//                   ) : (
//                     <p className="text-gray-400 italic text-sm text-center py-2">No banking details provided</p>
//                   )}
//                 </div>
//               </section>

//               {/* Description / Notes */}
//               {selectedVendor.description && (
//                 <section>
//                   <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3">Company Description</h3>
//                   <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
//                     <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
//                       {selectedVendor.description}
//                     </p>
//                   </div>
//                 </section>
//               )}

//               {/* Metadata Footer */}
//               <div className="pt-4 flex justify-between text-[10px] text-gray-400 uppercase font-medium border-t">
//                 <span>Created: {new Date(selectedVendor.createdAt).toLocaleDateString()}</span>
//                 {selectedVendor.updatedAt && (
//                   <span>Updated: {new Date(selectedVendor.updatedAt).toLocaleDateString()}</span>
//                 )}
//               </div>
//             </div>

//             {/* STICKY FOOTER */}
//             <div className="flex justify-end gap-3 mt-6 pt-4 border-t shrink-0">
//               <button
//                 onClick={() => setIsDetailModalOpen(false)}
//                 className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-lg font-semibold transition-all"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={() => {
//                   setIsDetailModalOpen(false);
//                   handleVendorEdit(selectedVendor);
//                 }}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }


import { getVendors, createVendor, updateVendor } from "../services/api";
import VendorForm from "./VendorForm";
import { useEffect, useState, useRef } from "react";
import {
  Eye, Edit2, Trash2, X, CheckCircle, Clock,
  SlidersHorizontal, ChevronLeft, ChevronRight,
  Building2, Users, FileText, Landmark,
} from "lucide-react";

const PAGE_SIZES = [5, 10, 20, 50];

const INITIAL_FORM_STATE = {
  name: "", email: "", phone: "", company: "", address: "",
  website: "", contactPerson: "", gstNumber: "", industryType: "",
  description: "", bankName: "", bankNumber: "", bankIFSC: "",
  panNumber: "", status: "ACTIVE",
};

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    ACTIVE:   { cls: "bg-emerald-100 text-emerald-700 border border-emerald-200", icon: <CheckCircle className="w-2.5 h-2.5" />, label: "Active" },
    INACTIVE: { cls: "bg-gray-100 text-gray-600 border border-gray-200",          icon: <X            className="w-2.5 h-2.5" />, label: "Inactive" },
    BLOCKED:  { cls: "bg-red-100 text-red-700 border border-red-200",             icon: <X            className="w-2.5 h-2.5" />, label: "Blocked" },
  }[status] ?? { cls: "bg-amber-100 text-amber-700 border border-amber-200", icon: <Clock className="w-2.5 h-2.5" />, label: "Pending" };
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${cfg.cls}`}>
      {cfg.icon}{cfg.label}
    </span>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm px-3 py-2.5 flex items-center gap-3 ${accent}`}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-50">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide leading-none">{title}</p>
        <p className="text-lg font-bold text-gray-800 leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Modal shell ──────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, subtitle, children, footer, size = "md" }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  const widths = { sm: "max-w-lg", md: "max-w-2xl", lg: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${widths[size]} flex flex-col max-h-[90vh] modal-appear`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
            {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-4 py-3 vnd-scrollbar">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-gray-50 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function VendorListPage() {
  const advancedRef = useRef(null);

  const [vendors, setVendors]               = useState([]);
  const [loading, setLoading]               = useState(false);
  const [searchTerm, setSearchTerm]         = useState("");
  const [companyFilter, setCompanyFilter]   = useState("");
  const [statusFilter, setStatusFilter]     = useState("ALL");
  const [debouncedSearch, setDebouncedSearch]   = useState("");
  const [debouncedCompany, setDebouncedCompany] = useState("");
  const [showAdvanced, setShowAdvanced]     = useState(false);

  const [currentPage, setCurrentPage]       = useState(0);
  const [pageSize, setPageSize]             = useState(10);
  const [totalPages, setTotalPages]         = useState(0);
  const [totalElements, setTotalElements]   = useState(0);
  const [sortBy, setSortBy]                 = useState("id");
  const [sortDirection, setSortDirection]   = useState("desc");

  const [isVendorModalOpen, setIsVendorModalOpen]   = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen]   = useState(false);
  const [editVendorId, setEditVendorId]             = useState(null);
  const [selectedVendor, setSelectedVendor]         = useState(null);
  const [vendorFormData, setVendorFormData]         = useState(INITIAL_FORM_STATE);

  const advancedFilterCount = [
    companyFilter, statusFilter !== "ALL" ? statusFilter : null,
  ].filter(Boolean).length;

  const sel = "text-xs px-1.5 py-1 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer shadow-sm";
  const btnPrimary  = "flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition";
  const btnSecondary = "flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium transition";

  // ── Debounce ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 450);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedCompany(companyFilter), 450);
    return () => clearTimeout(t);
  }, [companyFilter]);

  // ── Close advanced on outside click ─────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (advancedRef.current && !advancedRef.current.contains(e.target))
        setShowAdvanced(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Fetch ────────────────────────────────────────────────────────────────────
  const fetchVendors = async (page = currentPage, size = pageSize) => {
    setLoading(true);
    try {
      const response = await getVendors(page, size, sortBy, sortDirection, debouncedCompany, debouncedSearch, statusFilter);
      if (response?.content) {
        setVendors(response.content);
        setTotalPages(response.page?.totalPages || 0);
        setTotalElements(response.page?.totalElements || 0);
      } else if (Array.isArray(response)) {
        setVendors(response);
        setTotalPages(1);
        setTotalElements(response.length);
      } else {
        setVendors([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    } catch (err) {
      console.error("Error fetching vendors", err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVendors(); }, [currentPage, pageSize, sortBy, sortDirection, debouncedSearch, debouncedCompany, statusFilter]); // eslint-disable-line

  const goToPage = (p) => setCurrentPage(p);
  const changeSize = (s) => { setPageSize(s); setCurrentPage(0); };

  const handleSort = (field) => {
    setSortDirection(sortBy === field && sortDirection === "asc" ? "desc" : "asc");
    setSortBy(field);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchTerm(""); setCompanyFilter(""); setStatusFilter("ALL");
    setDebouncedSearch(""); setDebouncedCompany(""); setCurrentPage(0);
  };

  // ── Vendor CRUD ──────────────────────────────────────────────────────────────
  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVendorId) await updateVendor(editVendorId, vendorFormData);
      else              await createVendor(vendorFormData);
      fetchVendors();
      handleVendorCancel();
    } catch (err) { console.error("Error saving vendor", err); }
  };

  const handleVendorEdit = (vendor) => {
    const sanitized = Object.keys(INITIAL_FORM_STATE).reduce((acc, k) => {
      acc[k] = vendor[k] || ""; return acc;
    }, { id: vendor.id });
    setVendorFormData(sanitized);
    setEditVendorId(vendor.id);
    setIsVendorModalOpen(true);
  };

  const handleVendorCancel = () => {
    setIsVendorModalOpen(false);
    setEditVendorId(null);
    setVendorFormData(INITIAL_FORM_STATE);
  };

  // Sort arrow helper
  const sortArrow = (field) => sortBy === field ? (sortDirection === "asc" ? " ↑" : " ↓") : "";

  return (
    <div className="lg:ml-48 bg-slate-50 min-h-screen flex flex-col font-sans">
      <style>{`
        .vnd-table td, .vnd-table th { white-space: nowrap; }
        .vnd-table td { font-size: 11px; }
        .vnd-row:hover { background: #f0f7ff !important; }
        .vnd-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .vnd-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .vnd-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .vnd-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .shimmer { background: linear-gradient(90deg,#f1f5f9 25%,#e8eeff 50%,#f1f5f9 75%); background-size:200% 100%; animation:sh 1.4s infinite; }
        @keyframes sh { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .adv-panel { animation: fadeSlide 0.15s ease; }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
        .modal-appear { animation: modalIn 0.18s ease; }
        @keyframes modalIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        .sort-col { cursor: pointer; user-select: none; }
        .sort-col:hover { color: #4f46e5; }
      `}</style>

      {/* ═══ STICKY TOOLBAR ═══ */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-3 pt-2 pb-1.5">
          <StatCard title="Total Vendors"    value={totalElements}                                      icon={Building2}  accent="border-l-4 border-blue-500" />
          <StatCard title="Active"           value={vendors.filter(v => v.status === "ACTIVE").length}  icon={Users}      accent="border-l-4 border-emerald-500" />
          <StatCard title="With GST"         value={vendors.filter(v => v.gstNumber).length}            icon={FileText}   accent="border-l-4 border-violet-500" />
          <StatCard title="With Bank Details"value={vendors.filter(v => v.bankName).length}             icon={Landmark}   accent="border-l-4 border-amber-500" />
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-1.5 px-3 py-1.5 border-t border-gray-100">

          {/* Search */}
          <div className="relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-36 sm:w-48 transition"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Status quick filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
            className={sel + " min-w-[90px] font-medium"}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
          </select>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Add Vendor */}
          <button
            onClick={() => { setEditVendorId(null); setVendorFormData(INITIAL_FORM_STATE); setIsVendorModalOpen(true); }}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition shadow-sm"
          >
            <span className="text-sm leading-none">+</span>
            <span>Add Vendor</span>
          </button>

          {/* Advanced filters */}
          <div className="relative" ref={advancedRef}>
            <button
              onClick={() => setShowAdvanced((p) => !p)}
              className={`flex items-center gap-1 px-2 py-1 text-xs rounded-md font-medium border transition shadow-sm ${
                showAdvanced || advancedFilterCount > 0
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced</span>
              {advancedFilterCount > 0 && (
                <span className={`text-[10px] font-bold px-1 rounded-full ${showAdvanced ? "bg-white text-blue-600" : "bg-blue-600 text-white"}`}>
                  {advancedFilterCount}
                </span>
              )}
            </button>

            {showAdvanced && (
              <div className="adv-panel absolute left-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-3 w-[280px] sm:w-[400px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Advanced Filters</span>
                  <div className="flex items-center gap-2">
                    {advancedFilterCount > 0 && (
                      <button onClick={clearFilters} className="text-[10px] text-red-500 hover:text-red-700 font-medium">Clear all</button>
                    )}
                    <button onClick={() => setShowAdvanced(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {/* Company filter */}
                  <div className="relative flex items-center flex-1 min-w-[140px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      className="w-3 h-3 text-gray-400 absolute left-2 pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Filter by company..."
                      value={companyFilter}
                      onChange={(e) => setCompanyFilter(e.target.value)}
                      className="text-xs px-2 py-1 pl-6 border border-gray-200 rounded-md bg-white focus:ring-1 focus:ring-blue-500 outline-none shadow-sm w-full transition"
                    />
                    {companyFilter && (
                      <button onClick={() => setCompanyFilter("")} className="absolute right-1.5 text-gray-400 hover:text-gray-600">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Sort by */}
                  <div className="h-px w-full bg-gray-100 my-0.5" />
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-400 font-medium">Sort:</span>
                    {[
                      { f: "name",   l: "Name" },
                      { f: "email",  l: "Email" },
                      { f: "status", l: "Status" },
                      { f: "id",     l: "Default" },
                    ].map(({ f, l }) => (
                      <button
                        key={f}
                        onClick={() => handleSort(f)}
                        className={`px-2 py-0.5 text-[10px] rounded-full font-semibold border transition ${
                          sortBy === f
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-blue-50"
                        }`}
                      >
                        {l} {sortBy === f ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0 || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1 whitespace-nowrap">
              <span className="text-blue-700">{currentPage + 1}</span>
              <span className="text-gray-400"> / </span>
              {totalPages || 1}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1 < totalPages ? currentPage + 1 : currentPage)}
              disabled={currentPage + 1 >= totalPages || loading}
              className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:border-blue-400 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Total */}
          <span className="text-xs text-gray-500 whitespace-nowrap">
            <span className="font-semibold text-gray-700">{totalElements}</span>
            <span className="hidden sm:inline"> vendors</span>
          </span>

          {/* Page size — right */}
          <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-200 rounded-md px-1 py-0.5 ml-auto">
            <span className="text-[10px] text-gray-400 pr-0.5 hidden sm:block">Show:</span>
            {PAGE_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => changeSize(n)}
                className={`px-1.5 py-0.5 text-[10px] rounded font-medium transition ${
                  pageSize === n ? "bg-blue-600 text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="flex-1 overflow-hidden">
        {/* Shimmer */}
        {loading && (
          <div className="overflow-x-auto">
            <table className="w-full vnd-table" style={{ minWidth: 800 }}>
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Vendor Details","Contact","Tax Info","Banking","Status","Actions"].map((h, i) => (
                    <th key={i} className="px-2.5 py-2 text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    {Array.from({ length: 6 }).map((__, j) => (
                      <td key={j} className="px-2.5 py-3">
                        <div className="shimmer h-2.5 rounded mb-1.5" style={{ width: `${50 + Math.random() * 40}%` }} />
                        <div className="shimmer h-2 rounded" style={{ width: `${30 + Math.random() * 30}%` }} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty */}
        {!loading && vendors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <Building2 className="w-10 h-10 mb-2 opacity-40" />
            <p className="text-sm text-gray-400">No vendors found.</p>
            <p className="text-xs text-gray-300 mt-0.5">Click "Add Vendor" to get started.</p>
          </div>
        )}

        {/* Table */}
        {!loading && vendors.length > 0 && (
          <div className="overflow-x-auto vnd-scrollbar">
            <table className="w-full vnd-table" style={{ minWidth: 800, borderCollapse: "collapse" }}>
              <thead className="sticky top-0 bg-gray-50 z-10 border-b border-gray-200">
                <tr>
                  <th onClick={() => handleSort("name")}
                    className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 sort-col min-w-[160px]">
                    Vendor Details{sortArrow("name")}
                  </th>
                  <th onClick={() => handleSort("email")}
                    className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 sort-col min-w-[160px]">
                    Contact{sortArrow("email")}
                  </th>
                  <th className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 min-w-[130px]">Tax Info</th>
                  <th className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 min-w-[140px]">Banking</th>
                  <th onClick={() => handleSort("status")}
                    className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap border-r border-gray-100 sort-col w-24">
                    Status{sortArrow("status")}
                  </th>
                  <th className="px-2.5 py-2 text-left text-[10px] font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, ri) => (
                  <tr
                    key={vendor.id}
                    className="vnd-row border-b border-gray-50 transition-colors align-top"
                    style={{ background: ri % 2 === 0 ? "#fff" : "#f9fbff" }}
                  >
                    {/* Vendor Details */}
                    <td className="px-2.5 py-2">
                      <div className="font-semibold text-gray-800 text-[11px]">{vendor.name}</div>
                      {vendor.company && <div className="text-[10px] text-gray-500 mt-0.5">{vendor.company}</div>}
                      {vendor.contactPerson && <div className="text-[10px] text-gray-400">👤 {vendor.contactPerson}</div>}
                      {vendor.website && (
                        <div className="text-[10px] text-blue-500 truncate max-w-[150px]" title={vendor.website}>{vendor.website}</div>
                      )}
                      {vendor.industryType && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-violet-50 text-violet-600 border border-violet-200 rounded text-[9px] font-semibold">
                          {vendor.industryType}
                        </span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-2.5 py-2">
                      <div className="text-[11px] text-gray-700">{vendor.email || <span className="text-gray-300">—</span>}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{vendor.phone || <span className="text-gray-300">—</span>}</div>
                      {vendor.address && (
                        <div className="text-[10px] text-gray-400 mt-0.5 max-w-[160px] truncate" title={vendor.address}>{vendor.address}</div>
                      )}
                    </td>

                    {/* Tax */}
                    <td className="px-2.5 py-2">
                      <div className="text-[10px] font-mono bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded mb-1">
                        <span className="font-semibold text-gray-500">GST:</span> {vendor.gstNumber || <span className="text-gray-300">—</span>}
                      </div>
                      <div className="text-[10px] font-mono bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                        <span className="font-semibold text-gray-500">PAN:</span> {vendor.panNumber || <span className="text-gray-300">—</span>}
                      </div>
                    </td>

                    {/* Banking */}
                    <td className="px-2.5 py-2">
                      {vendor.bankName ? (
                        <>
                          <div className="text-[11px] font-semibold text-gray-700">{vendor.bankName}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">A/C: {vendor.bankNumber}</div>
                          <div className="text-[10px] text-gray-400 font-mono">IFSC: {vendor.bankIFSC}</div>
                        </>
                      ) : (
                        <span className="text-[10px] text-gray-300 italic">No details</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-2.5 py-2">
                      <StatusBadge status={vendor.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-2.5 py-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setSelectedVendor(vendor); setIsDetailModalOpen(true); }}
                          title="View Details"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleVendorEdit(vendor)}
                          title="Edit Vendor"
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Delete Vendor"
                          onClick={() => { if (window.confirm("Are you sure you want to delete this vendor?")) console.log("Delete:", vendor.id); }}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═══ ADD / EDIT MODAL ═══ */}
      <Modal
        open={isVendorModalOpen}
        onClose={handleVendorCancel}
        title={editVendorId ? "Update Vendor Profile" : "Register New Vendor"}
        size="lg"
      >
        <VendorForm
          formData={vendorFormData}
          setFormData={setVendorFormData}
          onSubmit={handleVendorSubmit}
          onCancel={handleVendorCancel}
        />
      </Modal>

      {/* ═══ DETAIL MODAL ═══ */}
      <Modal
        open={isDetailModalOpen && !!selectedVendor}
        onClose={() => setIsDetailModalOpen(false)}
        title="Vendor Details"
        subtitle={selectedVendor?.name}
        size="md"
        footer={
          <>
            <button onClick={() => setIsDetailModalOpen(false)} className={btnSecondary}>Close</button>
            <button
              onClick={() => { setIsDetailModalOpen(false); handleVendorEdit(selectedVendor); }}
              className={btnPrimary}
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit Vendor
            </button>
          </>
        }
      >
        {selectedVendor && (
          <div className="space-y-3">
            {/* Basic info */}
            <section>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1.5">Basic Information</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 bg-gray-50 border border-gray-100 rounded-lg p-3">
                {[
                  { l: "Vendor Name",    v: selectedVendor.name,          bold: true },
                  { l: "Company",        v: selectedVendor.company },
                  { l: "Contact Person", v: selectedVendor.contactPerson },
                  { l: "Industry",       v: selectedVendor.industryType },
                  { l: "Website",        v: selectedVendor.website },
                  { l: "Department",     v: selectedVendor.department },
                ].map(({ l, v, bold }) => (
                  <div key={l}>
                    <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{l}</p>
                    <p className={`text-xs mt-0.5 ${bold ? "font-bold text-gray-800" : "text-gray-700"}`}>{v || <span className="text-gray-300 italic">—</span>}</p>
                  </div>
                ))}
                {selectedVendor.address && (
                  <div className="col-span-2">
                    <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">Address</p>
                    <p className="text-xs text-gray-700 mt-0.5">{selectedVendor.address}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Contact */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "Email",        v: selectedVendor.email, cls: "bg-blue-50 border-blue-100" },
                { l: "Phone",        v: selectedVendor.phone, cls: "bg-blue-50 border-blue-100" },
              ].map(({ l, v, cls }) => (
                <div key={l} className={`rounded-lg p-2.5 border ${cls}`}>
                  <p className="text-[9px] font-semibold text-blue-400 uppercase tracking-wide">{l}</p>
                  <p className="text-xs font-medium text-gray-800 mt-0.5 break-all">{v || "—"}</p>
                </div>
              ))}
            </div>

            {/* Tax */}
            <section>
              <p className="text-[9px] font-bold text-violet-600 uppercase tracking-wider mb-1.5">Tax & Compliance</p>
              <div className="grid grid-cols-2 gap-2 bg-violet-50/30 border border-violet-100 rounded-lg p-3">
                {[
                  { l: "GST Number", v: selectedVendor.gstNumber },
                  { l: "PAN Number", v: selectedVendor.panNumber },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <p className="text-[9px] font-semibold text-violet-400 uppercase tracking-wide">{l}</p>
                    <p className="text-xs font-mono font-bold text-gray-800 mt-0.5">{v || "—"}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Banking */}
            <section>
              <p className="text-[9px] font-bold text-amber-600 uppercase tracking-wider mb-1.5">Banking Information</p>
              <div className="bg-amber-50/30 border border-amber-100 rounded-lg p-3">
                {selectedVendor.bankName ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wide">Bank Name</p>
                      <p className="text-xs font-semibold text-gray-800 mt-0.5">{selectedVendor.bankName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wide">IFSC Code</p>
                      <p className="text-xs font-mono text-gray-800 mt-0.5">{selectedVendor.bankIFSC}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[9px] font-semibold text-amber-400 uppercase tracking-wide">Account Number</p>
                      <p className="text-sm font-mono font-bold text-gray-800 tracking-wider mt-0.5">{selectedVendor.bankNumber}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic text-center py-2">No banking details provided</p>
                )}
              </div>
            </section>

            {/* Description */}
            {selectedVendor.description && (
              <section>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Description</p>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedVendor.description}</p>
                </div>
              </section>
            )}

            {/* Status + Metadata */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <StatusBadge status={selectedVendor.status} />
              <div className="text-[10px] text-gray-400 text-right">
                {selectedVendor.createdAt && <div>Created: {new Date(selectedVendor.createdAt).toLocaleDateString()}</div>}
                {selectedVendor.updatedAt && <div>Updated: {new Date(selectedVendor.updatedAt).toLocaleDateString()}</div>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}