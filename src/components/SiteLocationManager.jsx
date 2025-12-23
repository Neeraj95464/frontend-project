// import { fetchSites, addSite, addLocation } from "../services/api";
// import { useEffect, useState } from "react";

// export default function SiteLocationManager() {
//   const [sites, setSites] = useState([]);
//   const [siteForm, setSiteForm] = useState({
//     name: "",
//     region: "",
//     country: "",
//   });
//   const [locationForm, setLocationForm] = useState({
//     name: "",
//     address: "",
//     postalCode: "",
//     state: "",
//     siteId: "",
//   });

//   useEffect(() => {
//     loadSites();
//   }, []);

//   const loadSites = async () => {
//     try {
//       const res = await fetchSites();
//       setSites(res.data);
//     } catch (err) {
//       console.error("Failed to load sites", err);
//     }
//   };

//   const handleSiteSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addSite(siteForm);
//       setSiteForm({ name: "", region: "", country: "" });
//       await loadSites();
//     } catch (err) {
//       console.error("Error adding site:", err);
//     }
//   };

//   const handleLocationSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...locationForm,
//         siteId: Number(locationForm.siteId),
//       };
//       await addLocation(payload);
//       setLocationForm({
//         name: "",
//         address: "",
//         postalCode: "",
//         state: "",
//         siteId: locationForm.siteId,
//       });
//       await loadSites();
//     } catch (err) {
//       console.error("Error adding location:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Site and Location Management</h2>

//       {/* Add Site Form */}
//       <form onSubmit={handleSiteSubmit} className="mb-6 space-y-2">
//         <h3 className="text-lg font-semibold">Add Site</h3>
//         <input
//           className="w-full border p-2"
//           placeholder="Name"
//           value={siteForm.name}
//           onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
//           required
//         />
//         <input
//           className="w-full border p-2"
//           placeholder="Region"
//           value={siteForm.region}
//           onChange={(e) => setSiteForm({ ...siteForm, region: e.target.value })}
//         />
//         <input
//           className="w-full border p-2"
//           placeholder="Country"
//           value={siteForm.country}
//           onChange={(e) =>
//             setSiteForm({ ...siteForm, country: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add Site
//         </button>
//       </form>

//       {/* Add Location Form */}
//       <form onSubmit={handleLocationSubmit} className="mb-6 space-y-2">
//         <h3 className="text-lg font-semibold">Add Location</h3>
//         <select
//           className="w-full border p-2"
//           value={locationForm.siteId}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, siteId: Number(e.target.value) })
//           }
//           required
//         >
//           <option value="">Select Site</option>
//           {sites.map((site) => (
//             <option key={site.id} value={site.id}>
//               {site.name}
//             </option>
//           ))}
//         </select>
//         <input
//           className="w-full border p-2"
//           placeholder="Location Name"
//           value={locationForm.name}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, name: e.target.value })
//           }
//           required
//         />
//         <input
//           className="w-full border p-2"
//           placeholder="Address"
//           value={locationForm.address}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, address: e.target.value })
//           }
//         />
//         <input
//           className="w-full border p-2"
//           placeholder="Postal Code"
//           value={locationForm.postalCode}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, postalCode: e.target.value })
//           }
//         />
//         <input
//           className="w-full border p-2"
//           placeholder="State"
//           value={locationForm.state}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, state: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Add Location
//         </button>
//       </form>

//       {/* Site & Location Display */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">
//           Sites and their Locations
//         </h3>
//         {sites.map((site) => (
//           <div key={site.id} className="border p-4 rounded mb-4">
//             <h4 className="font-bold text-blue-700">{site.name}</h4>
//             <p className="text-sm">
//               {site.region}, {site.country}
//             </p>
//             <ul className="list-disc list-inside mt-2 text-sm">
//               {(site.locations || []).map((loc) => (
//                 <li key={loc.id}>
//                   {loc.name} – {loc.address}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import {
  fetchSites,
  addSite,
  addLocation,
  updateLocation,
} from "../services/api";
import { useEffect, useState } from "react";

export default function SiteLocationManager() {
  const [sites, setSites] = useState([]);
  const [siteForm, setSiteForm] = useState({
    name: "",
    region: "",
    country: "",
  });
  const [locationForm, setLocationForm] = useState({
    name: "",
    address: "",
    postalCode: "",
    state: "",
    siteId: "",
  });

  // for editing
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editingLocationData, setEditingLocationData] = useState({
    name: "",
    address: "",
    postalCode: "",
    state: "",
  });

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const res = await fetchSites();
      setSites(res.data || []);
      console.log("sites and locations are ", res.data);
    } catch (err) {
      console.error("Failed to load sites", err);
    }
  };

  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSite(siteForm);
      setSiteForm({ name: "", region: "", country: "" });
      await loadSites();
    } catch (err) {
      console.error("Error adding site:", err);
    }
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...locationForm,
        siteId: Number(locationForm.siteId),
      };
      await addLocation(payload);
      setLocationForm({
        name: "",
        address: "",
        postalCode: "",
        state: "",
        siteId: locationForm.siteId,
      });
      await loadSites();
    } catch (err) {
      console.error("Error adding location:", err);
    }
  };

  const startEditLocation = (loc) => {
    setEditingLocationId(loc.id);
    setEditingLocationData({
      name: loc.name || "",
      address: loc.address || "",
      postalCode: loc.postalCode || "",
      state: loc.state || "",
    });
  };

  const cancelEditLocation = () => {
    setEditingLocationId(null);
    setEditingLocationData({
      name: "",
      address: "",
      postalCode: "",
      state: "",
    });
  };

  // const saveEditLocation = async (locId) => {
  //   try {
  //     await updateLocation(locId, editingLocationData);
  //     await loadSites();
  //     cancelEditLocation();
  //   } catch (err) {
  //     console.error("Error updating location:", err);
  //   }
  // };

  const saveEditLocation = async (locId) => {
    console.log("saveEditLocation locId =", locId, typeof locId); // should be a number
    try {
      await updateLocation(locId, editingLocationData);
      await loadSites();
      cancelEditLocation();
    } catch (err) {
      console.error("Error updating location:", err);
    }
  };

  return (
    <div className="pt-16 lg:ml-48">
      <h2 className="text-3xl font-semibold mb-2 text-slate-800 text-center">
        Site & Location Management
      </h2>
      <p className="text-slate-500 text-center mb-6">
        Manage sites and update all location names and addresses in one place.
      </p>

      {/* Forms grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add Site Form */}
        <form
          onSubmit={handleSiteSubmit}
          className="bg-white shadow-sm rounded-xl border border-slate-200 p-4 space-y-3"
        >
          <h3 className="text-lg font-semibold text-slate-700">Add Site</h3>
          <div className="space-y-2">
            <input
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Site Name"
              value={siteForm.name}
              onChange={(e) =>
                setSiteForm({ ...siteForm, name: e.target.value })
              }
              required
            />
            <input
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Region"
              value={siteForm.region}
              onChange={(e) =>
                setSiteForm({ ...siteForm, region: e.target.value })
              }
            />
            <input
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Country"
              value={siteForm.country}
              onChange={(e) =>
                setSiteForm({ ...siteForm, country: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
          >
            Add Site
          </button>
        </form>

        {/* Add Location Form */}
        <form
          onSubmit={handleLocationSubmit}
          className="bg-white shadow-sm rounded-xl border border-slate-200 p-4 space-y-3"
        >
          <h3 className="text-lg font-semibold text-slate-700">Add Location</h3>
          <select
            className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={locationForm.siteId}
            onChange={(e) =>
              setLocationForm({
                ...locationForm,
                siteId: Number(e.target.value),
              })
            }
            required
          >
            <option value="">Select Site</option>
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <input
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Location Name"
            value={locationForm.name}
            onChange={(e) =>
              setLocationForm({ ...locationForm, name: e.target.value })
            }
            required
          />
          <input
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Address"
            value={locationForm.address}
            onChange={(e) =>
              setLocationForm({ ...locationForm, address: e.target.value })
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Postal Code"
              value={locationForm.postalCode}
              onChange={(e) =>
                setLocationForm({ ...locationForm, postalCode: e.target.value })
              }
            />
            <input
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="State"
              value={locationForm.state}
              onChange={(e) =>
                setLocationForm({ ...locationForm, state: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
          >
            Add Location
          </button>
        </form>
      </div>

      {/* Site & Location Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700">
          Sites and their Locations
        </h3>

        {sites.length === 0 && (
          <p className="text-sm text-slate-500">
            No sites found. Add a site to get started.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-700">{site.name}</h4>
                  <p className="text-xs text-slate-500">
                    {site.region || "No region"}, {site.country || "No country"}
                  </p>
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {(site.locations || []).length} locations
                </span>
              </div>

              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="text-left text-slate-500 border-b">
                      <th className="py-1 pr-2">Name</th>
                      <th className="py-1 pr-2">Address</th>
                      <th className="py-1 pr-2 hidden sm:table-cell">Postal</th>
                      <th className="py-1 pr-2 hidden sm:table-cell">State</th>
                      <th className="py-1 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(site.locations || []).map((loc) => {
                      const isEditing = editingLocationId === loc.id;
                      return (
                        <tr key={loc.id} className="border-b last:border-0">
                          <td className="py-1 pr-2">
                            {isEditing ? (
                              <input
                                className="w-full border border-slate-300 rounded px-1 py-0.5"
                                value={editingLocationData.name}
                                onChange={(e) =>
                                  setEditingLocationData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              <span className="text-slate-800">
                                {loc.name || "-"}
                              </span>
                            )}
                          </td>
                          <td className="py-1 pr-2">
                            {isEditing ? (
                              <input
                                className="w-full border border-slate-300 rounded px-1 py-0.5"
                                value={editingLocationData.address}
                                onChange={(e) =>
                                  setEditingLocationData((prev) => ({
                                    ...prev,
                                    address: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              <span className="text-slate-800">
                                {loc.address || "-"}
                              </span>
                            )}
                          </td>
                          <td className="py-1 pr-2 hidden sm:table-cell">
                            {isEditing ? (
                              <input
                                className="w-full border border-slate-300 rounded px-1 py-0.5"
                                value={editingLocationData.postalCode}
                                onChange={(e) =>
                                  setEditingLocationData((prev) => ({
                                    ...prev,
                                    postalCode: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              <span className="text-slate-800">
                                {loc.postalCode || "-"}
                              </span>
                            )}
                          </td>
                          <td className="py-1 pr-2 hidden sm:table-cell">
                            {isEditing ? (
                              <input
                                className="w-full border border-slate-300 rounded px-1 py-0.5"
                                value={editingLocationData.state}
                                onChange={(e) =>
                                  setEditingLocationData((prev) => ({
                                    ...prev,
                                    state: e.target.value,
                                  }))
                                }
                              />
                            ) : (
                              <span className="text-slate-800">
                                {loc.state || "-"}
                              </span>
                            )}
                          </td>
                          <td className="py-1 text-right">
                            {isEditing ? (
                              <div className="flex gap-1 justify-end">
                                <button
                                  type="button"
                                  onClick={() => saveEditLocation(loc.id)}
                                  className="px-2 py-0.5 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEditLocation}
                                  className="px-2 py-0.5 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => startEditLocation(loc)}
                                className="px-2 py-0.5 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {(site.locations || []).length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-slate-400 py-2"
                        >
                          No locations for this site.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
