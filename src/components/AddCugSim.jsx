// import { createSimCard } from "../services/api";
// import { useState } from "react";
// import { toast } from "react-toastify";

// export default function AddCugSim() {
//   const [form, setForm] = useState({
//     simTag: "",
//     phoneNumber: "",
//     iccid: "",
//     imsi: "",
//     provider: "",
//     status: "AVAILABLE",
//     purchaseDate: "",
//     purchaseFrom: "",
//     cost: "",
//     siteId: "",
//     locationId: "",
//     note: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       await createSimCard(form);
//       toast.success("CUG SIM added successfully");
//       setForm({
//         simTag: "",
//         phoneNumber: "",
//         iccid: "",
//         imsi: "",
//         provider: "",
//         status: "AVAILABLE",
//         purchaseDate: "",
//         purchaseFrom: "",
//         cost: "",
//         siteId: "",
//         locationId: "",
//         note: "",
//       });
//     } catch (err) {
//       toast.error("Failed to add SIM");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded-lg mt-8">
//       <h1 className="text-2xl font-semibold mb-6">Add CUG SIM Card</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         <div>
//           <label className="text-sm font-medium">SIM Tag</label>
//           <input
//             type="text"
//             name="simTag"
//             value={form.simTag}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="SIM-001"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Phone Number</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={form.phoneNumber}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="9999999999"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">ICCID</label>
//           <input
//             type="text"
//             name="iccid"
//             value={form.iccid}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="ICCID Number"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">IMSI</label>
//           <input
//             type="text"
//             name="imsi"
//             value={form.imsi}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="IMSI Number"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Provider</label>
//           <select
//             name="provider"
//             value={form.provider}
//             onChange={handleChange}
//             className="input-field"
//             required
//           >
//             <option value="">Select Provider</option>
//             <option value="AIRTEL">Airtel</option>
//             <option value="JIO">Jio</option>
//             <option value="VODAFONE">Vodafone</option>
//             <option value="BSNL">BSNL</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Status</label>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//             className="input-field"
//           >
//             <option value="AVAILABLE">AVAILABLE</option>
//             <option value="DEACTIVATED">DEACTIVATED</option>
//             <option value="LOST">LOST</option>
//             <option value="SUSPENDED">SUSPENDED</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">Purchase Date</label>
//           <input
//             type="date"
//             name="purchaseDate"
//             value={form.purchaseDate}
//             onChange={handleChange}
//             className="input-field"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Purchase From</label>
//           <input
//             type="text"
//             name="purchaseFrom"
//             value={form.purchaseFrom}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="Vendor Name"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Cost</label>
//           <input
//             type="number"
//             name="cost"
//             value={form.cost}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="Enter cost"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Site</label>
//           <input
//             type="number"
//             name="siteId"
//             value={form.siteId}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="Site ID"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Location</label>
//           <input
//             type="number"
//             name="locationId"
//             value={form.locationId}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="Location ID"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <label className="text-sm font-medium">Note</label>
//           <textarea
//             name="note"
//             value={form.note}
//             onChange={handleChange}
//             className="input-field"
//             placeholder="Any notes for this SIM..."
//           />
//         </div>

//         <div className="md:col-span-2 flex justify-end mt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Add SIM"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { createSimCard } from "../services/api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCugSim() {
  const [form, setForm] = useState({
    simTag: "",
    phoneNumber: "",
    iccid: "",
    imsi: "",
    provider: "",
    status: "AVAILABLE",
    purchaseDate: "",
    purchaseFrom: "",
    cost: "",
    siteId: "",
    locationId: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createSimCard(form);
      toast.success("CUG SIM added successfully");

      setForm({
        simTag: "",
        phoneNumber: "",
        iccid: "",
        imsi: "",
        provider: "",
        status: "AVAILABLE",
        purchaseDate: "",
        purchaseFrom: "",
        cost: "",
        siteId: "",
        locationId: "",
        note: "",
      });
    } catch (err) {
      toast.error("Failed to add SIM");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add CUG SIM Card
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Register a new SIM card in the system. You can assign it later to an
          employee.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* --- Input Component --- */}
          {[
            // {
            //   label: "SIM Tag",
            //   name: "simTag",
            //   type: "text",
            //   placeholder: "SIM-001",
            //   required: true,
            // },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "text",
              placeholder: "9999999999",
              required: true,
            },
            {
              label: "ICCID",
              name: "iccid",
              type: "text",
              placeholder: "ICCID Number",
            },
            {
              label: "IMSI",
              name: "imsi",
              type: "text",
              placeholder: "IMSI Number",
            },
          ].map((item) => (
            <div key={item.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {item.label}
              </label>
              <input
                type={item.type}
                name={item.name}
                value={form[item.name]}
                onChange={handleChange}
                placeholder={item.placeholder}
                required={item.required}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          ))}

          {/* Provider */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Provider
            </label>
            <select
              name="provider"
              value={form.provider}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="">Select Provider</option>
              <option value="AIRTEL">Airtel</option>
              <option value="JIO">Jio</option>
              <option value="VODAFONE">Vodafone</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="DEACTIVATED">DEACTIVATED</option>
              <option value="LOST">LOST</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>

          {/* Purchase Info */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Purchase Date
            </label>
            <input
              type="date"
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Purchase From
            </label>
            <input
              type="text"
              name="purchaseFrom"
              value={form.purchaseFrom}
              onChange={handleChange}
              placeholder="Vendor Name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Cost */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Cost
            </label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              placeholder="Enter cost"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Site */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Site ID
            </label>
            <input
              type="number"
              name="siteId"
              value={form.siteId}
              onChange={handleChange}
              placeholder="Site ID"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Location ID
            </label>
            <input
              type="number"
              name="locationId"
              value={form.locationId}
              onChange={handleChange}
              placeholder="Location ID"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Note
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Any notes for this SIM..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add SIM"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
