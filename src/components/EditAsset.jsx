


import { Button, Input, Textarea } from "../components/ui";
import { getAssetByAssetTag, updateAsset, getSites, getLocationsBySite } from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, Save, X, Loader, MapPin, Package, ShoppingBag, Hash, FileText, Tag } from "lucide-react";

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseFrom: "",
    brand: "",
    model: "",
    assetType: "",
    department: "",
    cost: "",
    statusNote: "",
    siteId: "",
    locationId: ""
  });
  
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch sites on mount
  useEffect(() => {
    getSites()
      .then(setSites)
      .catch(err => console.error("Failed to load sites", err));
  }, []);

  // Fetch locations when site changes
  useEffect(() => {
    if (formData.siteId) {
      getLocationsBySite(formData.siteId)
        .then(setLocations)
        .catch(err => {
          console.error("Failed to load locations", err);
          setLocations([]);
        });
    } else {
      setLocations([]);
    }
  }, [formData.siteId]);

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
          setFormData({
            description: data.description || "",
            serialNumber: data.serialNumber || "",
            purchaseDate: data.purchaseDate || "",
            purchaseFrom: data.purchaseFrom || "",
            brand: data.brand || "",
            model: data.model || "",
            assetType: data.assetType || "",
            department: data.department || "",
            cost: data.cost || "",
            statusNote: data.statusNote || "",
            siteId: data.site?.id || "",
            locationId: data.location?.id || ""
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const updateData = {
        description: formData.description,
        serialNumber: formData.serialNumber,
        purchaseDate: formData.purchaseDate || null,
        purchaseFrom: formData.purchaseFrom,
        brand: formData.brand,
        model: formData.model,
        assetType: formData.assetType,
        department: formData.department,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        statusNote: formData.statusNote,
        site: formData.siteId ? { id: parseInt(formData.siteId) } : null,
        location: formData.locationId ? { id: parseInt(formData.locationId) } : null
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

  // const assetTypes = ["LAPTOP", "DESKTOP", "SERVER", "MONITOR", "PRINTER", "SCANNER", "PROJECTOR", "PHONE", "TABLET", "NETWORK_DEVICE", "SOFTWARE", "VEHICLE", "FURNITURE", "OTHER"];
  const assetTypes = ["LAPTOP", "DESKTOP", "MOBILE", "PRINTER", "SERVER", "NETWORK_DEVICE", "POE_SWITCH", "SOFTWARE", "OTHERS", "CCTV", "ACCESSORIES", "COMPUTER", "EQUIPMENT", "FIREWALL", "INTANGIBLE", "ASSETS", "IPAD", "KIOSK", "NETWORK", "DEVICES", "PROJECTOR", "TAB", "TOUGHBOOK_ODIS", "UPS", "UPS_BATTERIES", "VEHICLES", "XENTRY_DIAGNOSTIC_DEVICE", "NVR", "BATTERY", "DVR", "WIFI_CAMERA", "TV", "DIGITAL_ELEMENTS", "CUG_SIM"];
  
  const departments = ["IT", "HR", "FINANCE", "SALES", "MARKETING", "OPERATIONS", "ADMIN", "LEGAL", "RND", "CUSTOMER_SUPPORT", "MANAGEMENT", "OTHER"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader className="animate-spin h-10 w-10 text-indigo-600 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">Loading asset details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Asset</h1>
            <p className="text-sm text-gray-500 mt-1">Asset Tag: {id}</p>
          </div>
          <button
            onClick={() => navigate(`/asset/${id}`)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            title="Cancel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-md p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-600 w-4 h-4" />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Row 1: Serial Number & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    required
                    className="pl-9 py-2.5"
                    placeholder="Enter serial number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="2"
                  className="resize-none py-2.5"
                  placeholder="Asset description"
                />
              </div>
            </div>

            {/* Row 2: Brand, Model, Asset Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <Input
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="py-2.5"
                  placeholder="Enter brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <Input
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="py-2.5"
                  placeholder="Enter model"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                <select
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="">Select asset type</option>
                  {assetTypes.map(type => (
                    <option key={type} value={type}>{type.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Department, Purchase Date, Purchase From */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                >
                  <option value="">Select department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Date</label>
                <Input
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase From</label>
                <Input
                  name="purchaseFrom"
                  value={formData.purchaseFrom}
                  onChange={handleChange}
                  className="py-2.5"
                  placeholder="Vendor name"
                />
              </div>
            </div>

            {/* Row 4: Cost, Site, Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cost (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <Input
                    name="cost"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={handleChange}
                    className="pl-7 py-2.5"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="siteId"
                    value={formData.siteId}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white appearance-none"
                  >
                    <option value="">Select site</option>
                    {sites.map(site => (
                      <option key={site.id} value={site.id}>{site.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="locationId"
                    value={formData.locationId}
                    onChange={handleChange}
                    disabled={!formData.siteId}
                    className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-50 disabled:cursor-not-allowed appearance-none"
                  >
                    <option value="">
                      {formData.siteId ? "Select location" : "Select site first"}
                    </option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Row 5: Status Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Note</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Textarea
                  name="statusNote"
                  value={formData.statusNote}
                  onChange={handleChange}
                  rows="3"
                  className="pl-9 py-2.5 resize-none"
                  placeholder="Add any notes about the asset status..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Updating..." : "Update Asset"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;


