import { registerUser, getSites, getLocationsBySite } from "../services/api";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
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
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Check your data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Register User
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
            required
          />
          {/* <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          /> */}
          <input
            name="employeeId"
            placeholder="Employee ID"
            value={form.employeeId}
            onChange={handleChange}
            className="input"
            required
          />
          {/* <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="input"
          /> */}
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="input"
          />
          <input
            name="note"
            placeholder="Note"
            value={form.note}
            onChange={handleChange}
            className="input"
          />
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
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

          <select
            name="site"
            onChange={(e) => {
              const selected = sites.find(
                (s) => s.id === parseInt(e.target.value)
              );
              setForm((prev) => ({ ...prev, site: selected, location: null }));
            }}
            className="input"
            required
          >
            <option value="">Select Site</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <select
            name="location"
            onChange={(e) => {
              const selected = locations.find(
                (l) => l.id === parseInt(e.target.value)
              );
              setForm((prev) => ({ ...prev, location: selected }));
            }}
            className="input"
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

        <button
          type="submit"
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
