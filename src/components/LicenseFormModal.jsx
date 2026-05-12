// import {
//   createLicense,
//   updateLicense,
//   getVendors,
//   getSites,
//   getLocationsBySite,
// } from "../services/api";
// import React, { useEffect, useState } from "react";

// const LicenseFormModal = ({ isOpen, onClose, onSuccess, editData }) => {
//   const [vendors, setVendors] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [locations, setLocations] = useState([]);

//   const initialState = {
//     id: null,
//     active: true,
//     siteId: "",
//     locationId: "",
//     vendorId: "",
//     title: "",
//     description: "",
//     contractNo: "",
//     cost: "",
//     renewalFrequency: "",
//     startDate: "",
//     endDate: "",
//     hyperlink: "",
//     contactPerson: "",
//     phone: "",
//     totalLicenses: "",
//     softwareCategory: "",
//     status: "",
//     notes: "",
//   };

//   const [formData, setFormData] = useState(initialState);

//   const renewalFrequencies = ["MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"];
//   const softwareCategories = ["ERP", "CRM", "FIREWALL", "ACCOUNTING", "OTHER"];
//   const licenseStatuses = ["ACTIVE", "EXPIRED", "CANCELLED"];

//   // ================= LOAD DROPDOWNS =================
//   useEffect(() => {
//     if (isOpen) {
//       loadDropdowns();
//     }
//   }, [isOpen]);

//   useEffect(() => {
//     if (editData) {
//       setFormData(editData);
//     } else {
//       setFormData(initialState);
//     }
//   }, [editData]);

//   useEffect(() => {
//     if (formData.siteId) {
//       getLocationsBySite(formData.siteId).then(setLocations);
//     }
//   }, [formData.siteId]);

//   const loadDropdowns = async () => {
//     const vendorData = await getVendors();
//     const siteData = await getSites();
//     // setVendors(vendorData);
//     setVendors(Array.isArray(vendorData.content) ? vendorData.content : []);
//     setSites(siteData);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       ...formData,
//       siteId: Number(formData.siteId),
//       locationId: Number(formData.locationId),
//       vendorId: Number(formData.vendorId),
//       cost: Number(formData.cost),
//       totalLicenses: Number(formData.totalLicenses),
//     };

//     try {
//       if (formData.id) {
//         await updateLicense(formData.id, payload);
//         alert("License Updated Successfully");
//       } else {
//         await createLicense(payload);
//         alert("License Created Successfully");
//       }

//       onSuccess();
//       onClose();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white w-[95%] max-w-6xl p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">
//             {formData.id ? "Edit Software License" : "Create Software License"}
//           </h2>
//           <button onClick={onClose} className="text-red-500 text-xl">
//             ✕
//           </button>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
//           {/* Vendor */}
//           <select
//             name="vendorId"
//             value={formData.vendorId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Vendor</option>
//             {vendors.map((v) => (
//               <option key={v.id} value={v.id}>
//                 {v.name}
//               </option>
//             ))}
//           </select>

//           {/* Site */}
//           <select
//             name="siteId"
//             value={formData.siteId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Site</option>
//             {sites.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           {/* Location */}
//           <select
//             name="locationId"
//             value={formData.locationId}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Location</option>
//             {locations.map((l) => (
//               <option key={l.id} value={l.id}>
//                 {l.name}
//               </option>
//             ))}
//           </select>

//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Title"
//             required
//           />
//           <input
//             name="contractNo"
//             value={formData.contractNo}
//             onChange={handleChange}
//             placeholder="Contract No"
//             required
//           />
//           <input
//             name="cost"
//             type="number"
//             value={formData.cost}
//             onChange={handleChange}
//             placeholder="Cost"
//             required
//           />

//           <select
//             name="renewalFrequency"
//             value={formData.renewalFrequency}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Renewal Frequency</option>
//             {renewalFrequencies.map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>

//           {/* <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             placeholder="Start"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="endDate"
//             value={formData.endDate}
//             onChange={handleChange}
//             required
//           /> */}

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               className="border rounded p-2"
//               required
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               className="border rounded p-2"
//               required
//             />
//           </div>

//           <input
//             name="hyperlink"
//             value={formData.hyperlink}
//             onChange={handleChange}
//             placeholder="Hyperlink"
//             required
//           />
//           <input
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             placeholder="Contact Person"
//             required
//           />
//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Phone"
//             required
//           />

//           <input
//             name="totalLicenses"
//             type="number"
//             value={formData.totalLicenses}
//             onChange={handleChange}
//             placeholder="Total Licenses"
//             required
//           />

//           <select
//             name="softwareCategory"
//             value={formData.softwareCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Software Category</option>
//             {softwareCategories.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>

//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             required
//           >
//             <option value="">License Status</option>
//             {licenseStatuses.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>

//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Description (It should not change frequently first time while create only)"
//             className="col-span-3"
//           />

//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//             placeholder="Notes (All types of changes reasons should be mentioned here) "
//             className="col-span-3"
//           />

//           <div className="col-span-3 mt-4">
//             <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
//               {formData.id ? "Update License" : "Create License"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LicenseFormModal;


import {
  createLicense,
  updateLicense,
  getVendors,
  getSites,
  getLocationsBySite,
} from "../services/api";
import React, { useEffect, useState, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";

const LicenseFormModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const [vendors, setVendors] = useState([]);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  
  // Vendor search states
  const [vendorSearchTerm, setVendorSearchTerm] = useState("");
  const [vendorDropdownOpen, setVendorDropdownOpen] = useState(false);
  const [vendorLoading, setVendorLoading] = useState(false);
  const vendorDropdownRef = useRef(null);

  const initialState = {
    id: null,
    active: true,
    siteId: "",
    locationId: "",
    vendorId: "",
    title: "",
    description: "",
    contractNo: "",
    cost: "",
    renewalFrequency: "",
    startDate: "",
    endDate: "",
    hyperlink: "",
    contactPerson: "",
    phone: "",
    totalLicenses: "",
    // softwareCategory: "",
    status: "ACTIVE",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);

  const renewalFrequencies = ["MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"];
  const softwareCategories = ["ERP", "CRM", "FIREWALL", "ACCOUNTING", "OTHER"];
  const licenseStatuses = ["ACTIVE", "EXPIRED", "CANCELLED"];

  // ================= LOAD DROPDOWNS =================
  useEffect(() => {
    if (isOpen) {
      loadInitialVendors(); // Load initial vendors without search
      loadSites();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
      // Set vendor search term to selected vendor name
      if (editData.vendorName) {
        setVendorSearchTerm(editData.vendorName);
      }
    } else {
      setFormData(initialState);
      setVendorSearchTerm("");
    }
  }, [editData]);

  useEffect(() => {
    if (formData.siteId) {
      getLocationsBySite(formData.siteId).then(setLocations);
    } else {
      setLocations([]);
    }
  }, [formData.siteId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(event.target)) {
        setVendorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadInitialVendors = async () => {
    setVendorLoading(true);
    try {
      const vendorData = await getVendors(0, 50, 'id', 'desc', '', '');
      setVendors(Array.isArray(vendorData.content) ? vendorData.content : []);
    } catch (error) {
      console.error("Error loading vendors:", error);
      setVendors([]);
    } finally {
      setVendorLoading(false);
    }
  };

  const loadSites = async () => {
    try {
      const siteData = await getSites();
      setSites(Array.isArray(siteData) ? siteData : []);
    } catch (error) {
      console.error("Error loading sites:", error);
      setSites([]);
    }
  };

  const searchVendors = async (searchTerm) => {
    setVendorLoading(true);
    try {
      const vendorData = await getVendors(0, 50, 'id', 'desc', searchTerm, searchTerm);
      setVendors(Array.isArray(vendorData.content) ? vendorData.content : []);
      setVendorDropdownOpen(true);
    } catch (error) {
      console.error("Error searching vendors:", error);
    } finally {
      setVendorLoading(false);
    }
  };

  // Debounced vendor search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (vendorSearchTerm !== undefined && isOpen) {
        searchVendors(vendorSearchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [vendorSearchTerm, isOpen]);

  const handleVendorSelect = (vendor) => {
    setFormData({
      ...formData,
      vendorId: vendor.id,
    });
    setVendorSearchTerm(vendor.name);
    setVendorDropdownOpen(false);
  };

  const clearVendorSelection = () => {
    setFormData({
      ...formData,
      vendorId: "",
    });
    setVendorSearchTerm("");
    setVendorDropdownOpen(false);
    // Reload initial vendors
    loadInitialVendors();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.vendorId) {
      alert("Please select a vendor");
      return;
    }

    const payload = {
      ...formData,
      siteId: Number(formData.siteId),
      locationId: Number(formData.locationId),
      vendorId: Number(formData.vendorId),
      cost: formData.cost ? Number(formData.cost) : 0,
      totalLicenses: formData.totalLicenses ? Number(formData.totalLicenses) : 0,
    };

    try {
      if (formData.id) {
        await updateLicense(formData.id, payload);
        alert("License Updated Successfully");
      } else {
        await createLicense(payload);
        alert("License Created Successfully");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  // Get selected vendor name for display
  const getSelectedVendorName = () => {
    if (!formData.vendorId) return "";
    const vendor = vendors.find(v => v.id === formData.vendorId);
    return vendor ? vendor.name : vendorSearchTerm;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-6xl p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {formData.id ? "Edit Software License" : "Create Software License"}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Vendor with Search - Replaces the simple select */}
          <div className="relative" ref={vendorDropdownRef}>
            <label className="text-sm font-medium mb-1 block">Vendor *</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={vendorSearchTerm}
                onChange={(e) => {
                  setVendorSearchTerm(e.target.value);
                  if (!vendorDropdownOpen) setVendorDropdownOpen(true);
                }}
                onFocus={() => setVendorDropdownOpen(true)}
                placeholder="Search vendor by name or company..."
                className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                required
              />
              {vendorSearchTerm && (
                <button
                  type="button"
                  onClick={clearVendorSelection}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              )}
              {vendorLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            
            {/* Vendor Dropdown */}
            {vendorDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {vendors.length === 0 && !vendorLoading && (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    {vendorSearchTerm ? "No vendors found" : "Type to search vendors"}
                  </div>
                )}
                {vendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-0 transition-colors"
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    <div className={`font-medium ${formData.vendorId === vendor.id ? "text-blue-600" : "text-gray-800"}`}>
                      {vendor.name}
                    </div>
                    {vendor.company && (
                      <div className="text-xs text-gray-500 mt-0.5">
                        Company: {vendor.company}
                      </div>
                    )}
                    {vendor.email && (
                      <div className="text-xs text-gray-400">
                        {vendor.email}
                      </div>
                    )}
                  </div>
                ))}
                {vendorLoading && (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    Loading vendors...
                  </div>
                )}
              </div>
            )}
            
            {/* Hidden input to store vendor ID for form submission */}
            <input
              type="hidden"
              name="vendorId"
              value={formData.vendorId}
            />
          </div>

          {/* Site */}
          <div>
            <label className="text-sm font-medium mb-1 block">Site *</label>
            <select
              name="siteId"
              value={formData.siteId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Site</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium mb-1 block">Location *</label>
            <select
              name="locationId"
              value={formData.locationId}
              onChange={handleChange}
              required
              disabled={!formData.siteId}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white ${
                !formData.siteId ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">Select Location</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-1 block">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter license title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Contract No */}
          <div>
            <label className="text-sm font-medium mb-1 block">Contract No *</label>
            <input
              name="contractNo"
              value={formData.contractNo}
              onChange={handleChange}
              placeholder="Enter contract number"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="text-sm font-medium mb-1 block">Cost *</label>
            <input
              name="cost"
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Enter cost"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Renewal Frequency */}
          <div>
            <label className="text-sm font-medium mb-1 block">Renewal Frequency *</label>
            <select
              name="renewalFrequency"
              value={formData.renewalFrequency}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Frequency</option>
              {renewalFrequencies.map((r) => (
                <option key={r} value={r}>
                  {r.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium mb-1 block">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm font-medium mb-1 block">End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Hyperlink */}
          <div>
            <label className="text-sm font-medium mb-1 block">Hyperlink</label>
            <input
              name="hyperlink"
              value={formData.hyperlink}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="text-sm font-medium mb-1 block">Contact Person</label>
            <input
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact person name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium mb-1 block">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Total Licenses */}
          <div>
            <label className="text-sm font-medium mb-1 block">Total Licenses *</label>
            <input
              name="totalLicenses"
              type="number"
              value={formData.totalLicenses}
              onChange={handleChange}
              placeholder="Number of licenses"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Software Category */}
          {/* <div>
            <label className="text-sm font-medium mb-1 block">Software Category *</label>
            <select
              name="softwareCategory"
              value={formData.softwareCategory}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Category</option>
              {softwareCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div> */}

          {/* Status */}
          {/* <div>
            <label className="text-sm font-medium mb-1 block">License Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              <option value="">Select Status</option>
              {licenseStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div> */}

          {/* Description */}
          <div className="col-span-3">
            <label className="text-sm font-medium mb-1 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description (It should not change frequently - set during creation only)"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              ⓘ Description should not be changed frequently. Set it during initial creation.
            </p>
          </div>

          {/* Notes */}
          <div className="col-span-3">
            <label className="text-sm font-medium mb-1 block">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes (All types of changes reasons should be mentioned here)"
              rows="2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
            />
            <p className="text-xs text-gray-400 mt-1">
              ⓘ Document all changes and their reasons in notes for audit trail.
            </p>
          </div>

          {/* Submit Button */}
          <div className="col-span-3 mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl shadow-lg transition-all transform hover:scale-[1.01] font-semibold"
            >
              {formData.id ? "Update License" : "Create License"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseFormModal;


