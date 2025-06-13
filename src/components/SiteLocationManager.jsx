// // src/pages/SiteLocationManager.jsx

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

//   const loadSites = async () => {
//     try {
//       const res = await fetchSites();
//       setSites(res.data);
//     } catch (err) {
//       console.error("Failed to load sites", err);
//     }
//   };

//   useEffect(() => {
//     loadSites();
//   }, []);

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
//       await addLocation(locationForm);
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

//       {/* Add Site */}
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

//       {/* Add Location */}
//       <form onSubmit={handleLocationSubmit} className="mb-6 space-y-2">
//         <h3 className="text-lg font-semibold">Add Location</h3>
//         <select
//           className="w-full border p-2"
//           value={locationForm.siteId}
//           onChange={(e) =>
//             setLocationForm({ ...locationForm, siteId: e.target.value })
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

//       {/* Display Sites */}
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

import { fetchSites, addSite, addLocation } from "../services/api";
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

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const res = await fetchSites();
      setSites(res.data);
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

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Site and Location Management</h2>

      {/* Add Site Form */}
      <form onSubmit={handleSiteSubmit} className="mb-6 space-y-2">
        <h3 className="text-lg font-semibold">Add Site</h3>
        <input
          className="w-full border p-2"
          placeholder="Name"
          value={siteForm.name}
          onChange={(e) => setSiteForm({ ...siteForm, name: e.target.value })}
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Region"
          value={siteForm.region}
          onChange={(e) => setSiteForm({ ...siteForm, region: e.target.value })}
        />
        <input
          className="w-full border p-2"
          placeholder="Country"
          value={siteForm.country}
          onChange={(e) =>
            setSiteForm({ ...siteForm, country: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Site
        </button>
      </form>

      {/* Add Location Form */}
      <form onSubmit={handleLocationSubmit} className="mb-6 space-y-2">
        <h3 className="text-lg font-semibold">Add Location</h3>
        <select
          className="w-full border p-2"
          value={locationForm.siteId}
          onChange={(e) =>
            setLocationForm({ ...locationForm, siteId: Number(e.target.value) })
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
          className="w-full border p-2"
          placeholder="Location Name"
          value={locationForm.name}
          onChange={(e) =>
            setLocationForm({ ...locationForm, name: e.target.value })
          }
          required
        />
        <input
          className="w-full border p-2"
          placeholder="Address"
          value={locationForm.address}
          onChange={(e) =>
            setLocationForm({ ...locationForm, address: e.target.value })
          }
        />
        <input
          className="w-full border p-2"
          placeholder="Postal Code"
          value={locationForm.postalCode}
          onChange={(e) =>
            setLocationForm({ ...locationForm, postalCode: e.target.value })
          }
        />
        <input
          className="w-full border p-2"
          placeholder="State"
          value={locationForm.state}
          onChange={(e) =>
            setLocationForm({ ...locationForm, state: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Location
        </button>
      </form>

      {/* Site & Location Display */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Sites and their Locations
        </h3>
        {sites.map((site) => (
          <div key={site.id} className="border p-4 rounded mb-4">
            <h4 className="font-bold text-blue-700">{site.name}</h4>
            <p className="text-sm">
              {site.region}, {site.country}
            </p>
            <ul className="list-disc list-inside mt-2 text-sm">
              {(site.locations || []).map((loc) => (
                <li key={loc.id}>
                  {loc.name} – {loc.address}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
