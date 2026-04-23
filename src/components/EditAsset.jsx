// import { Button, Input, Textarea, Card, CardContent } from "../components/ui";
// import { getAssetByAssetTag, updateAsset } from "../services/api";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// // Import API functions

// const EditAsset = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [asset, setAsset] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid asset ID");
//       setLoading(false);
//       return;
//     }

//     getAssetByAssetTag(id)
//       .then((data) => {
//         if (data) {
//           setAsset(data);
//         } else {
//           setError("Asset not found");
//         }
//       })
//       .catch(() => setError("Failed to load asset"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   const handleChange = (e) => {
//     setAsset({ ...asset, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       await updateAsset(id, asset);
//       navigate(`/asset/${id}`);
//     } catch {
//       setError("Update failed. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;
//   if (error)
//     return <p className="text-center text-red-500 font-semibold">{error}</p>;

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
//       <Card className="max-w-3xl w-full shadow-lg rounded-lg border border-gray-200 bg-white">
//         <CardContent className="p-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//             Edit Asset
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold mb-2">Name</label>
//               <Input
//                 name="name"
//                 value={asset.name || ""}
//                 onChange={handleChange}
//                 required
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Description
//               </label>
//               <Textarea
//                 name="description"
//                 value={asset.description || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Serial Number
//               </label>
//               <Input
//                 name="serialNumber"
//                 value={asset.serialNumber || ""}
//                 onChange={handleChange}
//                 required
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Purchase Date
//               </label>
//               <Input
//                 name="purchaseDate"
//                 type="date"
//                 value={asset.purchaseDate || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">Brand</label>
//               <Input
//                 name="brand"
//                 value={asset.brand || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">Model</label>
//               <Input
//                 name="model"
//                 value={asset.model || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>

//             {/* <div>
//               <label className="block text-sm font-semibold mb-2">Cost</label>
//               <Input
//                 name="cost"
//                 type="number"
//                 step="0.01"
//                 value={asset.cost || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div> */}

//             <div>
//               <label className="block text-sm font-semibold mb-2">
//                 Status Note
//               </label>
//               <Textarea
//                 name="statusNote"
//                 value={asset.statusNote || ""}
//                 onChange={handleChange}
//                 className="w-full"
//               />
//             </div>

//             <div className="flex justify-between mt-6">
//               <Button
//                 type="submit"
//                 disabled={submitting}
//                 className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg"
//               >
//                 {submitting ? "Updating..." : "Update"}
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => navigate(`/asset/${id}`)}
//                 className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default EditAsset;



import { Button, Input, Textarea, Card, CardContent } from "../components/ui";
import { getAssetByAssetTag, updateAsset } from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, Save, X, Loader } from "lucide-react";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    name: "",
    description: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseFrom: "",
    brand: "",
    model: "",
    assetType: "",
    department: "",
    status: "",
    cost: "",
    statusNote: "",
    reservationStartDate: "",
    reservationEndDate: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch asset data
  useEffect(() => {
    if (!id) {
      setError("Invalid asset ID");
      setLoading(false);
      return;
    }

    getAssetByAssetTag(id)
      .then((data) => {
        if (data) {
          setAsset({
            name: data.name || "",
            description: data.description || "",
            serialNumber: data.serialNumber || "",
            purchaseDate: data.purchaseDate || "",
            purchaseFrom: data.purchaseFrom || "",
            brand: data.brand || "",
            model: data.model || "",
            assetType: data.assetType || "",
            department: data.department || "",
            status: data.status || "",
            cost: data.cost || "",
            statusNote: data.statusNote || "",
            reservationStartDate: data.reservationStartDate || "",
            reservationEndDate: data.reservationEndDate || ""
          });
        } else {
          setError("Asset not found");
        }
      })
      .catch(() => setError("Failed to load asset"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Prepare asset data for update - only editable fields
      const updateData = {
        name: asset.name,
        description: asset.description,
        serialNumber: asset.serialNumber,
        purchaseDate: asset.purchaseDate || null,
        purchaseFrom: asset.purchaseFrom,
        brand: asset.brand,
        model: asset.model,
        assetType: asset.assetType,
        department: asset.department,
        status: asset.status,
        cost: asset.cost ? parseFloat(asset.cost) : null,
        statusNote: asset.statusNote,
        reservationStartDate: asset.reservationStartDate || null,
        reservationEndDate: asset.reservationEndDate || null
      };
      
      await updateAsset(id, updateData);
      navigate(`/asset/${id}`);
    } catch (err) {
      setError("Update failed. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Asset Type options
  const assetTypes = [
    "LAPTOP", "DESKTOP", "SERVER", "MONITOR", "PRINTER", "SCANNER", 
    "PROJECTOR", "PHONE", "TABLET", "NETWORK_DEVICE", "SOFTWARE", 
    "VEHICLE", "FURNITURE", "OTHER"
  ];

  // Department options
  const departments = [
    "IT", "HR", "FINANCE", "SALES", "MARKETING", "OPERATIONS", 
    "ADMIN", "LEGAL", "RND", "CUSTOMER_SUPPORT", "MANAGEMENT", "OTHER"
  ];

  // Status options
  const statuses = [
    "AVAILABLE", "ASSIGNED", "MAINTENANCE", "DAMAGED", "LOST", 
    "RETIRED", "RESERVED", "UNDER_REPAIR", "PENDING_APPROVAL"
  ];

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
        <p className="mt-4 text-gray-600">Loading asset details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-red-600 w-6 h-6" />
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-lg border border-gray-200 bg-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Edit Asset
            </h2>
            <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
              Asset Tag: {id}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={asset.name || ""}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Serial Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="serialNumber"
                    value={asset.serialNumber || ""}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>
                  <Textarea
                    name="description"
                    value={asset.description || ""}
                    onChange={handleChange}
                    className="w-full"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Brand
                  </label>
                  <Input
                    name="brand"
                    value={asset.brand || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Model
                  </label>
                  <Input
                    name="model"
                    value={asset.model || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Asset Type
                  </label>
                  <select
                    name="assetType"
                    value={asset.assetType || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Asset Type</option>
                    {assetTypes.map(type => (
                      <option key={type} value={type}>{type.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={asset.department || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Purchase Information Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Purchase Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Purchase Date
                  </label>
                  <Input
                    name="purchaseDate"
                    type="date"
                    value={asset.purchaseDate || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Purchase From
                  </label>
                  <Input
                    name="purchaseFrom"
                    value={asset.purchaseFrom || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Vendor name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Cost (₹)
                  </label>
                  <Input
                    name="cost"
                    type="number"
                    step="0.01"
                    value={asset.cost || ""}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="Enter cost"
                  />
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Information</h3>
              <div className="grid grid-cols-1 gap-4">
                {/* <div>
                  <label className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={asset.status || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status.replace("_", " ")}</option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Status Note
                  </label>
                  <Textarea
                    name="statusNote"
                    value={asset.statusNote || ""}
                    onChange={handleChange}
                    className="w-full"
                    rows="2"
                    placeholder="Additional notes about status"
                  />
                </div>
              </div>
            </div>

            {/* Reservation Section */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Reservation Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Reservation Start Date
                  </label>
                  <Input
                    name="reservationStartDate"
                    type="date"
                    value={asset.reservationStartDate || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Reservation End Date
                  </label>
                  <Input
                    name="reservationEndDate"
                    type="date"
                    value={asset.reservationEndDate || ""}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Read-only Fields Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Read-only Information</h3>
              <div className="text-xs text-gray-500 space-y-1">
                <p>• Asset Tag: {id}</p>
                <p>• Location & Site: Cannot be edited here</p>
                <p>• Assigned User: Cannot be edited here</p>
                <p>• Parent Asset: Cannot be edited here</p>
                <p>• Photos: Cannot be edited here</p>
                <p>• Child Assets: Cannot be edited here</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => navigate(`/asset/${id}`)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {submitting ? "Updating..." : "Update Asset"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAsset;