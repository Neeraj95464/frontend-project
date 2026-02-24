import {
  createLicense,
  updateLicense,
  getVendors,
  getSites,
  getLocationsBySite,
} from "../services/api";
import React, { useEffect, useState } from "react";

const LicenseFormModal = ({ isOpen, onClose, onSuccess, editData }) => {
  const [vendors, setVendors] = useState([]);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);

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
    softwareCategory: "",
    status: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);

  const renewalFrequencies = ["MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"];
  const softwareCategories = ["ERP", "CRM", "FIREWALL", "ACCOUNTING", "OTHER"];
  const licenseStatuses = ["ACTIVE", "EXPIRED", "CANCELLED", "PENDING"];

  // ================= LOAD DROPDOWNS =================
  useEffect(() => {
    if (isOpen) {
      loadDropdowns();
    }
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData(initialState);
    }
  }, [editData]);

  useEffect(() => {
    if (formData.siteId) {
      getLocationsBySite(formData.siteId).then(setLocations);
    }
  }, [formData.siteId]);

  const loadDropdowns = async () => {
    const vendorData = await getVendors();
    const siteData = await getSites();
    setVendors(vendorData);
    setSites(siteData);
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

    const payload = {
      ...formData,
      siteId: Number(formData.siteId),
      locationId: Number(formData.locationId),
      vendorId: Number(formData.vendorId),
      cost: Number(formData.cost),
      totalLicenses: Number(formData.totalLicenses),
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
      alert("Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-6xl p-8 rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {formData.id ? "Edit Software License" : "Create Software License"}
          </h2>
          <button onClick={onClose} className="text-red-500 text-xl">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Vendor */}
          <select
            name="vendorId"
            value={formData.vendorId}
            onChange={handleChange}
            required
          >
            <option value="">Select Vendor</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          {/* Site */}
          <select
            name="siteId"
            value={formData.siteId}
            onChange={handleChange}
            required
          >
            <option value="">Select Site</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            name="locationId"
            value={formData.locationId}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            name="contractNo"
            value={formData.contractNo}
            onChange={handleChange}
            placeholder="Contract No"
            required
          />
          <input
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Cost"
            required
          />

          <select
            name="renewalFrequency"
            value={formData.renewalFrequency}
            onChange={handleChange}
            required
          >
            <option value="">Renewal Frequency</option>
            {renewalFrequencies.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* <input
            type="date"
            name="startDate"
            value={formData.startDate}
            placeholder="Start"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          /> */}

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
          </div>

          <input
            name="hyperlink"
            value={formData.hyperlink}
            onChange={handleChange}
            placeholder="Hyperlink"
            required
          />
          <input
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Contact Person"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />

          <input
            name="totalLicenses"
            type="number"
            value={formData.totalLicenses}
            onChange={handleChange}
            placeholder="Total Licenses"
            required
          />

          <select
            name="softwareCategory"
            value={formData.softwareCategory}
            onChange={handleChange}
            required
          >
            <option value="">Software Category</option>
            {softwareCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">License Status</option>
            {licenseStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (It should not change frequently first time while create only)"
            className="col-span-3"
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes (All types of changes reasons should be mentioned here) "
            className="col-span-3"
          />

          <div className="col-span-3 mt-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
              {formData.id ? "Update License" : "Create License"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseFormModal;
