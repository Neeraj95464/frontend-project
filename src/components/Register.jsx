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
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="input"
            required
          />
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
            className="input"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="ADMIN">ADMIN</option>
            {/* Add other enum values */}
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
