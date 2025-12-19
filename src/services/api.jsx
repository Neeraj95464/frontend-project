import axios from "axios";
import { toast } from "react-toastify";

// const API_URL = "http://localhost:7355/api";
const API_URL = "https://mahavir-asset.duckdns.org:7355/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Helper: Check if token is expired using `exp`
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiresAt = new Date(payload.exp * 1000);
    const now = new Date();
    return now >= expiresAt;
  } catch (error) {
    console.error("Token decoding failed:", error);
    return true; // Treat as expired if decoding fails
  }
}

// Logout + redirect
function logoutAndRedirect() {
  localStorage.removeItem("user");
  toast.error("Session expired. Please login again.");
  window.location.href = "/login"; // force reload + redirect
}

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        if (isTokenExpired(token)) {
          logoutAndRedirect();
          throw new axios.Cancel("Token expired");
        }

        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!axios.isCancel(error) && error.response?.status === 401) {
      toast.error("Unauthorized access");
      // logoutAndRedirect();
    }

    return Promise.reject(error);
  }
);

export default api;

// import axios from "axios";
// import { toast } from "react-toastify";

// const API_URL = "http://localhost:7355/api";

// // Axios instance
// const api = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Manual token expiry check (based on iat + 24 hrs)
// function isTokenExpiredByIat(token) {
//   try {
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     const issuedAt = payload.iat * 1000; // in milliseconds
//     const now = Date.now();
//     const expiryByIat = issuedAt + 24 * 60 * 60 * 1000; // 24 hours in ms
//     return now > expiryByIat;
//   } catch (error) {
//     console.error("Invalid token decoding");
//     return true; // treat as expired on error
//   }
// }

// // Interceptor for attaching token and checking expiry
// api.interceptors.request.use(
//   (config) => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       const { token } = JSON.parse(storedUser);

//       if (token) {
//         if (isTokenExpiredByIat(token)) {
//           console.warn("Token expired (based on iat)");
//           // Let component handle it via a rejected promise
//           throw new axios.Cancel("Token expired based on iat");
//         }

//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response error handler (don't auto-logout here)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (!axios.isCancel(error) && error.response?.status === 401) {
//       toast.error("Unauthorized request");
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// ================== AUTHENTICATION ==================

export const getUserRoles = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return [];

  try {
    const { roles } = JSON.parse(storedUser);
    return roles.map((role) => role.toUpperCase()); // Ensuring uppercase consistency
  } catch (error) {
    console.error("Error parsing user roles:", error);
    return [];
  }
};

export const registerUser = async (userData) => {
  console.log("user data are ", userData);
  const response = await api.post("/auth/register", userData);

  console.log("response was ", response.data);
  return response.data;
};

export const hasRole = (role) => {
  const roles = getUserRoles();
  // console.log("Current user roles:", roles);
  return roles.includes(role.toUpperCase());
};

export const loginUser = async (employeeId, password) => {
  try {
    const response = await api.post("/auth/login", { employeeId, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = () => localStorage.removeItem("user");

//     ====================== Contracts ==================================

export const getContracts = async () => {
  const response = await api.get("/contracts");
  return response.data;
};

export const getEnums = async () => {
  const response = await api.get("/enum/all");
  return response.data; // { departments: [...], assetTypes: [...] }
};

export const createContract = async (contractData) => {
  const response = await api.post("/contracts", contractData);
  return response.data;
};

export const updateContract = async (id, contractData) => {
  const response = await api.put(`${API_URL}/contracts/${id}`, contractData);
  return response.data;
};

export const deleteContract = async (id) => {
  await axios.delete(`${API_URL}/contracts/${id}`);
};

//  ===================  Vendors Management ===================================

export const getVendors = async () => {
  const response = await api.get("/vendors");
  return response.data;
};

export const createVendor = async (vendor) => {
  const response = await api.post("/vendors", vendor);
  return response.data;
};

export const updateVendor = async (id, vendor) => {
  const response = await api.put(`/vendors/${id}`, vendor);
  return response.data;
};

export const deleteVendor = async (id) => {
  await api.delete(`/vendors/${id}`);
};

// ================== ASSET MANAGEMENT ==================
// export const getAllAssets = async () => {
//   try {
//     const response = await api.get("/assets");
//     return response.data;
//   } catch (error) {
//     return [];
//   }
// };

export const getAllAssets = async (
  page = 0,
  size = 10,
  sortField = "id",
  sortDirection = "asc"
) => {
  try {
    const response = await api.get("/assets", {
      params: {
        page,
        size,
        sort: `${sortField},${sortDirection}`,
      },
    });
    return response.data; // This will now be a PaginatedResponse
  } catch (error) {
    console.error("Error fetching assets:", error);
    return {
      content: [],
      page: 0,
      size,
      totalElements: 0,
      totalPages: 0,
      last: true,
    };
  }
};

// export const fetchAssets = async () => {
//   const params = new URLSearchParams({
//     status: selectedStatus || "",
//     type: selectedType || "",
//     department: selectedDept || "",
//     createdBy: createdBy || "",
//     siteId: selectedSite || "",
//     locationId: selectedLocation || "",
//     purchaseStart: purchaseStartDate || "",
//     purchaseEnd: purchaseEndDate || "",
//     createdStart: createdStartDateTime || "",
//     createdEnd: createdEndDateTime || "",
//     keyword: searchKeyword || "",
//     page: currentPage,
//     size: 10,
//   });

//   const res = await api.get(`/assets/filter?${params}`);
//   const data = await res.json();
//   setAssets(data.content);
//   setPaginationInfo({
//     totalPages: data.totalPages,
//     totalElements: data.totalElements,
//     last: data.last,
//   });
// };

export const fetchAssets = async (filters) => {
  const params = new URLSearchParams();

  // Add only non-empty filters to params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });

  const response = await api.get(`/assets/filter?${params.toString()}`);
  return response.data; // Axios response contains data here
};

// // === Export filtered assets to Excel ===
// export const exportAssetsExcel = (filters) => {
//   const params = new URLSearchParams();
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== "") {
//       params.append(key, value);
//     }
//   });
//   // Opening as file download in browser
//   api.get(`/assets/filter/export?${params.toString()}`, "_blank");
// };

// In services/api.js
export const exportAssetsExcel = async (filters) => {
  try {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value);
      }
    });

    const response = await api.get(
      `/assets/filter/export?${params.toString()}`,
      {
        responseType: "blob", // important for file download
      }
    );

    // Create blob link to download
    const url = window.URL.createObjectURL(
      response.data instanceof Blob ? response.data : new Blob([response.data])
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "filtered_assets.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Asset export failed:", error);
  }
};

// api.js
// services/api.js
export const getAssetsByCategory = async () => {
  try {
    const response = await api.get("/assets/by-category");
    return response.data;
  } catch (error) {
    console.error("API error in getAssetsByCategory:", error);
    throw new Error("Failed to fetch category data");
  }
};

export const getAssetByAssetTag = async (query) => {
  try {
    const response = await api.get(`/assets/${query}`);
    return response.data || null; // Return single object or null
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // Return null when not found
    }
    console.error("Error fetching asset:", error);
    throw error;
  }
};

// api.js
export const updateTicketDueDate = (ticketId, dueDate) => {
  return api.put(`/user-assets/${ticketId}/due-date`, { dueDate });
};

// export const getTicketsBySite = async (
//   siteId,
//   startDate,
//   endDate,
//   page = 0,
//   size = 50
// ) => {
//   const res = await api.get(`/user-assets/by-site/${siteId}`, {
//     params: {
//       startDate,
//       endDate,
//       page,
//       size,
//     },
//   });
//   return res.data;
// };

export const getTicketsBySite = async (
  siteId,
  startDate,
  endDate,
  page = 0,
  size = 50
) => {
  const params = {
    startDate,
    endDate,
    page,
    size,
  };

  // Only add siteId if it's defined and not "ALL"
  if (siteId && siteId !== "ALL") {
    params.siteId = siteId;
  }

  const res = await api.get("/user-assets/by-site", { params });
  return res.data;
};

// export const getTicketsBySite = async (siteId, startDate, endDate) => {
//   const res = await api.get(`/user-assets/by-site/${siteId}`, {
//     params: {
//       startDate,
//       endDate,
//     },
//   });
//   console.log("🎫 Tickets received by site:", res.data);
//   return res.data;
// };

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await api.put(
      `/user-assets/tickets/${ticketId}/status?status=${status}`
    );

    if (response.status !== 200) {
      // ✅ Axios uses `response.status`
      throw new Error(`Failed to update ticket status: ${response.data}`);
    }

    return response.data; // ✅ Axios uses `response.data`
  } catch (error) {
    console.error(
      "Error updating ticket status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const downloadThisMonthTickets = async () => {
  try {
    const response = await api.get("user-assets/tickets/download-this-month", {
      responseType: "blob", // 📦 Important for file download
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "tickets_this_month.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed:", error);
  }
};

export const downloadAttachment = async (ticketId) => {
  try {
    const response = await api.get(
      `/user-assets/tickets/${ticketId}/attachment`,
      {
        responseType: "blob",
      }
    );

    // ✅ Extract filename from headers
    const contentDisposition = response.headers["content-disposition"];
    let fileName = `ticket_${ticketId}_attachment`;

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        fileName = match[1];
      }
    }

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Attachment download failed:", error);
    throw error;
  }
};

export const updateTicketCcEmail = async (ticketId, email, add) => {
  try {
    const response = await api.put(
      `${API_URL}/user-assets/${ticketId}/cc-email`,
      {
        email,
        add,
      }
    );
    return response.data; // List of updated CC emails
  } catch (error) {
    console.error("Failed to update CC email:", error);
    throw error.response?.data?.message || "Failed to update CC email.";
  }
};

export const updateTicketAssignee = (ticketId, assigneeId) => {
  return api.put(`user-assets/tickets/${ticketId}/assign/${assigneeId}`);
};

// Update Ticket Location
export const updateTicketLocation = (ticketId, locationId) =>
  api.put(`user-assets/tickets/${ticketId}/location/${locationId}`);

// Update Ticket Category
export const updateTicketCategory = (ticketId, category) =>
  api.put(`user-assets/tickets/${ticketId}/category/${category}`);

export const updateTicketCCEmails = (id, ccEmails) =>
  api.put(`/tickets/${id}/cc-emails`, { ccEmails });

// export const getAllTickets = ({ page = 0, size = 10, status }) => {
//   return api.get("/user-assets/admin/tickets", {
//     params: {
//       page,
//       size,
//       ...(status ? { status } : {}),
//     },
//   });
// };

export const getAllTickets = ({ page = 0, size = 10, status }) => {
  return api.get("/user-assets/admin/tickets", {
    params: {
      page,
      size,
      ...(status && status.toUpperCase() !== "ALL" ? { status } : {}),
    },
  });
};

export const getAssetCodes = async (assetTag) => {
  try {
    const qrUrl = `/api/assets/${assetTag}/qr`;
    const barcodeUrl = `/api/assets/${assetTag}/barcode`;

    // We do not fetch binary here — only URLs for Print component
    return {
      assetTag,
      qrUrl,
      barcodeUrl,
    };
  } catch (error) {
    console.error("Error fetching QR/Barcode for:", assetTag, error);
    throw error;
  }
};

export const assignLocation = async (payload) => {
  return api.post(`user-assets/location-assignments`, payload);
};

export const getAllAssignments = () => {
  // console.log("Fetching your assignments...");
  return api.get(`/user-assets/all/locations-assignments`);
};

export const getAllLocations = () => api.get(`/locations`);

export const searchLocations = async (name) => {
  if (!name || name.trim() === "") {
    console.warn("Search name is empty. Skipping API call.");
    return []; // Prevents sending an empty request
  }

  try {
    const response = await api.get(`${API_URL}/locations/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const getAssetCounts = async () => {
  try {
    const response = await api.get("/assets/counts");
    return response.data;
  } catch (error) {
    return { total: 0, available: 0, assigned: 0, inRepair: 0 };
  }
};

export const getAssetHistory = async (id) => {
  try {
    const response = await api.get(`/assets/${id}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// services/api.js
export const getAssetsByUser = async (query) => {
  try {
    // console.log("query in api ", query);

    const res = await api.get(`/assets/user/${query}`); // Axios GET request
    // console.log("res is ", res);

    // Axios automatically parses JSON
    return res.data; // ✅ send only the data
  } catch (error) {
    console.error("Failed to fetch assets", error);
    throw new Error("Failed to fetch assets");
  }
};

// export const getAssetsByUser = async (empId) => {
//   const res = await api.get(`/assets/user/${empId}`); // or use axios.get if axios is in use
//   if (!res.ok) {
//     throw new Error(`Failed to fetch assets, status code: ${res.status}`);
//   }
//   console.log()
//   const data = await res.json();
//   // Ensure data is the array you expect (List<AssetDTO>)
//   if (!Array.isArray(data)) {
//     throw new Error("Invalid data format from API");
//   }
//   return data;
// };

export const reserveAsset = async (assetTag, formData) => {
  try {
    const response = await api.put(`/assets/reserve/${assetTag}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssetsByStatus = async (status) => {
  try {
    const response = await api.get(`/assets/status/${status}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const checkInAsset = async (assetId, checkInData) => {
  try {
    const response = await api.post(`/assets/${assetId}/checkin`, checkInData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Show success message from backend response if available
    toast.success(response.data.message || "Asset checked in successfully!");

    return response.data;
  } catch (error) {
    console.error("Error checking in asset:", error);

    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.message ||
      "Failed to check in asset. Please try again.";

    toast.error(errorMessage); // Show error notification
    throw new Error(errorMessage);
  }
};

export const assignAsset = async (assetId, payload) => {
  try {
    await api.post(`/assets/${assetId}/checkout`, payload);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Corrected Upload Asset Photo function
export const uploadAssetPhoto = async (id, files) => {
  try {
    const formData = new FormData();
    formData.append("files", files); // ✅ Must match @RequestParam("file") in backend

    const response = await api.post(
      `${API_URL}/asset-photos/${id}/upload-photos`, // ✅ Corrected API URL
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.success("Photo uploaded successfully!");
    return response.data;
  } catch (error) {
    console.error("Error uploading photo:", error);
    toast.error("Failed to upload photo.");
    throw error;
  }
};

export const createChildAsset = async (assetTag, childAsset) => {
  try {
    const response = await api.post(
      `/child-assets/create/${assetTag}`,
      childAsset
    );
    return response.data; // Return the created child asset
  } catch (error) {
    console.error("Error creating child asset:", error);
    throw new Error("Failed to create child asset");
  }
};

export const getAssetPhotos = async (assetTag) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Get auth token from storage

    const response = await api.get(`/asset-photos/${assetTag}/photos`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Include auth header
      },
    });

    // ✅ Construct full image URLs dynamically
    const baseUrl = `${API_URL}/asset-photos/uploads/`;
    const photoUrls = response.data.map((filename) => baseUrl + filename);

    return photoUrls;
  } catch (error) {
    console.error(
      "Error fetching asset photos:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const addAsset = async (assetData) => {
  try {
    const response = await api.post("/assets", assetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const importAssets = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/assets/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const importTickets = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/tickets/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Upload asset documents
export const uploadAssetDocuments = async (assetTag, formData) => {
  try {
    const response = await api.post(
      `/asset-documents/${assetTag}/upload-documents`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
      }
    );
    return response.data; // Return success message
  } catch (error) {
    console.error("Error uploading documents:", error);
    throw new Error("Failed to upload documents");
  }
};

export const getAssetDocuments = async (assetId) => {
  try {
    const response = await api.get(`/asset-documents/${assetId}/documents`);

    const baseUrl = `${API_URL}/asset-documents/uploads/`; // ✅ Ensure correct base URL
    const documentUrls = response.data.map((doc) => ({
      documentUrl: baseUrl + doc.documentUrl, // ✅ Corrected - use doc.documentUrl
      addedBy: doc.addedBy,
      addedAt: doc.addedAt,
    }));

    return documentUrls;
  } catch (error) {
    console.error("Error fetching asset documents:", error);
    return [];
  }
};

export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await api.put(`/assets/${assetId}`, assetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addMessageToTicket = async (ticketId, messageDTO) => {
  try {
    const response = await api.post(
      `/user-assets/tickets/${ticketId}/messages`,
      messageDTO
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add message:", error);
    throw error;
  }
};

// export const createTicket = async (ticketData) => {
//   return await api.post(`${API_URL}/user-assets/tickets`, ticketData);
// };

export const createTicket = async (ticketData, attachment) => {
  const formData = new FormData();

  // Add JSON ticket data as a Blob (with content-type application/json)
  formData.append(
    "ticket",
    new Blob([JSON.stringify(ticketData)], { type: "application/json" })
  );
  // console.log("sending ticket data are ", formData);

  // Add the file if it exists
  if (attachment) {
    formData.append("attachment", attachment);
  }

  return await api.post(`${API_URL}/user-assets/tickets`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCurrentUser = async () => {
  const response = await api.get(`${API_URL}/user-assets/current-user`);
  return response.data;
};

export const getUserAssets = async () => {
  try {
    const response = await api.get(`${API_URL}/user-assets/assets`);
    return response.data; // ✅ Returns list of assigned assets
  } catch (error) {
    console.error("Error fetching user assets:", error);
    return [];
  }
};

export const changeTicketEmployeeIfSame = async (ticketId, newEmployeeId) => {
  try {
    const response = await api.put(
      `/user-assets/${ticketId}/change-employee-if-same`,
      null,
      {
        params: {
          newEmployeeId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to change employee:", error);
    throw error;
  }
};

// export const getTickets = async ({ status = "OPEN", page = 0, size = 10 }) => {
//   try {
//     const response = await api.get(`${API_URL}/user-assets/tickets`, {
//       params: { status, page, size },
//     });
//     console.log("your ticket data are ", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     throw error;
//   }
// };

export const getTickets = async ({
  status = "OPEN",
  page = 0,
  size = 10,
  employeeId = "ALL", // New optional param
}) => {
  try {
    const response = await api.get(`${API_URL}/user-assets/tickets`, {
      params: { status, page, size, employeeId }, // Include employeeId
    });
    // console.log("response tickets are ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const deleteAsset = async (assetTag) => {
  try {
    await api.delete(`/assets/${assetTag}`);
  } catch (error) {
    throw error;
  }
};

// ================== ASSET STATUS MANAGEMENT ==================

export const markAssetAsInRepair = async (
  assetId,
  statusNote,
  userId,
  markAsRepaired
) => {
  try {
    const response = await api.put(
      `/assets/${assetId}/status/in-repair`,
      null, // No request body, as all data is passed via query params
      {
        params: { userId, statusNote, markAsRepaired }, // ✅ Correctly passing params as per backend
      }
    );

    // Show success toast
    toast.success(
      response.data?.message || "✅ Asset marked as in repair successfully!"
    );

    return response.data;
  } catch (error) {
    console.error("Error marking asset as in repair:", error);

    // Extract error message from backend response
    const errorMessage =
      error.response?.data?.error || "❌ Failed to mark asset as in repair.";

    // Show error toast
    toast.error(errorMessage);

    throw new Error(errorMessage);
  }
};

export const resetAssetStatus = async (
  assetId,
  statusNote,
  modifiedBy = "Developer"
) => {
  try {
    const response = await api.put(
      `/assets/${assetId}/reset-status`,
      null, // No request body
      {
        params: { statusNote, modifiedBy }, // ✅ Passing `modifiedBy` dynamically
      }
    );

    // Show success message
    toast.success(response.data || "✅ Asset status reset successfully!");

    return response.data;
  } catch (error) {
    console.error("Error resetting asset status:", error);

    const errorMessage =
      error.response?.data || "❌ Failed to reset asset status.";
    toast.error(errorMessage);

    throw new Error(errorMessage);
  }
};

export const disposeAsset = async (
  assetId,
  statusNote,
  modifiedBy = "Developer"
) => {
  try {
    const response = await api.put(`/assets/dispose/${assetId}`, {
      statusNote,
      modifiedBy, // ✅ Sending `modifiedBy` as required by backend
    });

    toast.success("✅ Asset disposed successfully!");
    return response.data; // Returns the updated asset object
  } catch (error) {
    console.error("Error disposing asset:", error);

    const errorMessage =
      error.response?.data?.message || "❌ Failed to dispose asset.";
    toast.error(errorMessage);

    return { success: false, message: errorMessage };
  }
};

export const markAssetAsLost = async (
  assetId,
  statusNote,
  modifiedBy = "Developer"
) => {
  try {
    const response = await api.put(`/assets/lost/${assetId}`, {
      statusNote,
      modifiedBy, // ✅ Sending `modifiedBy` as required by backend
    });

    toast.success(
      response.data.message || "✅ Asset marked as lost successfully!"
    );

    return response.data; // Returns full backend response
  } catch (error) {
    console.error("Error marking asset as lost:", error);

    const errorMessage =
      error.response?.data?.message || "❌ Failed to mark asset as lost.";
    toast.error(errorMessage);

    return { success: false, message: errorMessage };
  }
};

export const updateAssetStatusToRepair = async (
  assetId,
  userId,
  note,
  markAsRepaired
) => {
  try {
    const response = await axios.put(
      `${API_URL}/${assetId}/status/in-repair`,
      null,
      {
        params: {
          userId,
          statusNote: note,
          markAsRepaired,
        },
      }
    );
    toast.success(response.data || "✅ Asset status reset successfully!");
    return { success: true, message: response.data };
  } catch (error) {
    console.error("Error updating asset repair status:", error);
    return { success: false, message: error.response?.data || error.message };
  }
};

// ================== USERS & EMPLOYEES ==================

// paginated + filtered users
export const fetchUsers = async (filters, page = 0, size = 10) => {
  const params = {
    employeeId: filters.employeeId || "",
    username: filters.username || "",
    role: filters.role || "",
    department: filters.department || "",
    siteId: filters.siteId || "",
    locationId: filters.locationId || "",
    search: filters.search || "",
    page,
    size,
  };

  const res = await api.get("/users/filter", { params });
  return res.data;
};

// Excel download for current filters (no pagination)
export const downloadUsersExcel = async (filters) => {
  const params = {
    employeeId: filters.employeeId || "",
    username: filters.username || "",
    role: filters.role || "",
    department: filters.department || "",
    siteId: filters.siteId || "",
    locationId: filters.locationId || "",
    search: filters.search || "",
  };

  return api.get("/users/filter/export", {
    params,
    responseType: "blob",
  });
};

export const getEmployees = async (page = 0, size = 10) => {
  try {
    const response = await api.get(`/users`, {
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await api.put("/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data.message; // Only return the message
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password change failed.");
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const searchEmployees = async (query) => {
//   try {
//     const params = new URLSearchParams();

//     if (/^\d+$/.test(query)) {
//       console.log("Detected numeric input, assuming phoneNumber:", query);
//       params.append("phoneNumber", query);
//     } else if (query.includes("@")) {
//       console.log("Detected email input:", query);
//       params.append("email", query);
//     } else if (
//       query.startsWith("mv") ||
//       query.startsWith("aw") ||
//       query.startsWith("jb")
//     ) {
//       console.log("Detected employeeId format:", query);
//       params.append("employeeId", query);
//     } else {
//       console.log("Detected username format:", query);
//       params.append("username", query);
//     }

//     const apiUrl = `/users/search?${params.toString()}`;
//     console.log("Generated API URL:", apiUrl); // ✅ Log API call

//     const response = await api.get(apiUrl);

//     // ✅ Fix: Extract 'content' from paginated response
//     return response.data?.content ?? [];
//   } catch (error) {
//     console.error(
//       "Error searching employees:",
//       error?.response?.data || error.message
//     );
//     return [];
//   }
// };

export const searchEmployees = async (query) => {
  try {
    const params = new URLSearchParams();
    const lowerQuery = query.toLowerCase();

    if (/^\d+$/.test(query)) {
      params.append("phoneNumber", query);
    } else if (query.includes("@")) {
      params.append("email", query);
    } else if (
      lowerQuery.startsWith("mv") ||
      lowerQuery.startsWith("aw") ||
      lowerQuery.startsWith("jb") ||
      lowerQuery.startsWith("mk") ||
      lowerQuery.startsWith("temp") ||
      lowerQuery.startsWith("ar")
    ) {
      params.append("employeeId", query);
    } else {
      params.append("username", query);
    }

    const apiUrl = `/users/search?${params.toString()}`;
    const response = await api.get(apiUrl);
    return response.data?.content ?? [];
  } catch (error) {
    console.error(
      "Error searching employees:",
      error?.response?.data || error.message
    );
    return [];
  }
};

export const searchTickets = async (filters) => {
  try {
    // Ensure you're sending the correct parameters in the request
    const response = await api.get(`${API_URL}/user-assets/search`, {
      params: filters, // Filters will be sent as query parameters
    });
    return response.data; // Return the paginated response data
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error; // You can optionally handle this error elsewhere
  }
};

export const getChildAssetsByParent = async (assetTag) => {
  try {
    const res = await api.get(`/child-assets/${assetTag}`);
    if (res.status === 200 && Array.isArray(res.data)) {
      return res.data; // ✅ Return data
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (err) {
    console.error("API error:", err);
    throw new Error("Failed to fetch child assets");
  }
};

export const getAssetValueByCategory = async () => {
  try {
    const response = await api.get(`${API_URL}/assets/assets/cost-by-category`);
    return response.data;
  } catch (error) {
    console.error("Error fetching asset cost by category:", error);
    throw error;
  }
};

export const getTicketById = async (id) => {
  const response = await api.get(`${API_URL}/user-assets/tickets/${id}`);
  return response.data;
};

export const updateTicket = async (ticketId, data) => {
  try {
    const response = await axios.put(`/api/tickets/${ticketId}/update`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update ticket:", error);
    throw error;
  }
};

export const updateTicketDetails = async (id, data) => {
  return await fetch(`/api/tickets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post("/users", employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserByUsername = async (username) => {
  try {
    console.log("Request received with name:", username);
    console.log(`API URL: ${API_URL}/users/search?username=${username}`);

    const response = await api.get(`${API_URL}/users/search`, {
      params: { username },
    });

    console.log("Full API Response:", response.data);

    if (
      response.data?.content &&
      Array.isArray(response.data.content) &&
      response.data.content.length > 0
    ) {
      console.log("Returning user:", response.data.content[0]);
      return response.data.content[0];
    }

    throw new Error("User not found");
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data?.message || "Error fetching user";
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    console.log("updating user ", employeeData);
    const response = await api.put(`/users/${employeeId}`, employeeData);
    console.log("data received ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`${API_URL}/users/${userId}`);
    if (response.status === 204 || response.status === 200) {
      return true; // success (204 No Content or 200 OK)
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Error deleting user";
    throw new Error(message);
  }
};

// ================== LOCATION & DEPARTMENT MANAGEMENT ==================

export const getSites = async () => {
  try {
    const response = await api.get("/sites");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSites = () => api.get("/sites/all");
export const addSite = (siteData) => api.post("/sites", siteData);

// --- Locations ---
export const addLocation = (locationData) =>
  api.post("sites/location", locationData);

export const getLocationsBySite = async (siteId) => {
  try {
    const response = await api.get(`/locations/site/${siteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch filtered tickets with pagination and filters
export const fetchFilteredTickets = (params) => {
  // params is an object with optional keys: title, status, category, employeeId, locationId, assigneeId, createdAfter, createdBefore, page, size
  return api.get("/user-assets/updated/filter", { params });
};

// Download filtered tickets Excel file
export const downloadFilteredTickets = (params) => {
  // params is an object with optional filter keys excluding pagination
  return api.get("/user-assets/updated/download", {
    params,
    responseType: "blob", // important to handle binary file downloads
  });
};

export const getAllAssigneeFeedbacks = () =>
  api.get("user-assets/feedback/all");

export const getDepartments = async () => {
  try {
    const response = await api.get("/enum/departments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAssignees = () => {
  return api.get("user-assets/assignees"); // Update path based on your backend route
};

export const getTicketsWithFeedback = async (
  employeeId,
  page = 0,
  size = 20
) => {
  const params = new URLSearchParams({ page, size });
  if (employeeId) params.append("employeeId", employeeId);

  const response = await api.get(
    `user-assets/tickets/feedbacks?${params.toString()}`
  );
  // console.log("res ", response.data);
  return response.data; // should be PaginatedResponse<TicketWithFeedbackDTO>
};

// export const getAssigneeFeedback = async (page = 0, size = 30) => {
//   const res = await api.get("/user-assets/tickets/feedbacks", {
//     params: { page, size },
//   });
//   return res.data;
// };

// ============== Ticket Charts ==========================================

export const fetchTicketStatusCounts = () =>
  api.get(`/user-assets/tickets/stats/status`);

export const fetchTicketsPerDay = () =>
  api.get(`/user-assets/tickets/stats/created-per-day`);

export const fetchTicketCategoryCounts = () =>
  api.get(`/user-assets/tickets/stats/category`);

export const fetchAssigneeTicketCounts = () =>
  api.get(`/user-assets/tickets/stats/assignee`);

export const fetchResolutionStats = () =>
  api.get(`/user-assets/tickets/stats/resolution-time`);

export const fetchLocationStats = () =>
  api.get(`/user-assets/tickets/stats/by-location`);

export const getAssigneeResolutionStats = async (employeeId) => {
  const response = await api.get(
    `/user-assets/tickets/stats/resolution/assignee/${employeeId}`
  );

  return response.data;
};

export const fetchTopTicketReporters = () =>
  api.get(`/user-assets/tickets/stats/top-reporters`);

export const fetchStatusOverTime = () =>
  api.get(`/user-assets/tickets/stats/status-over-time`);

//<-- ======================================================-->

// import api from "./api";

export const fetchSimCards = async (filters, page = 0, size = 10) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value);
    }
  });

  params.append("page", page);
  params.append("size", size);

  // console.log("sending data are ", params.toString());

  const response = await api.get(`/sim-cards/filter?${params.toString()}`);
  return response.data;
};

export const downloadSimExcel = async (filters) => {
  const params = {
    phoneNumber: filters.phoneNumber || "",
    provider: filters.provider || "",
    status: filters.status || "",
    employeeId: filters.employeeId || "",
    siteId: filters.siteId || "",
    locationId: filters.locationId || "",
    search: filters.search || "",
    // add createdAfter / createdBefore here if you later expose them in UI
  };

  return api.get("/sim-cards/filter/export", {
    params,
    responseType: "blob", // required for file download
  });
};

export const getSimDetails = async (id) => {
  const response = await api.get(`/sim-cards/${id}`);
  return response.data;
};

export const unassignSim = async (id) => {
  const response = await api.post(`/sim-cards/${id}/unassign`);
  return response.data;
};

export const fetchSimHistory = async (id) => {
  const response = await api.get(`/sim-cards/${id}/history`);
  return response.data;
};

export const createSimCard = async (payload) => {
  const response = await api.post("/sim-cards", payload);
  return response.data;
};

// Update SIM status
export const updateSimStatus = async (simId, status) => {
  const response = await api.put(`/sim/${simId}/status`, null, {
    params: { status },
  });
  return response.data;
};

// Update SIM info
export const updateSimInfo = async (simId, data) => {
  const response = await api.put(`/sim-cards/${simId}`, data);
  return response.data;
};

// Upload attachment
export const uploadSimAttachment = async (simId, formData) => {
  const response = await api.post(`/sim-cards/attachments/${simId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Delete attachment
export const deleteSimAttachment = async (simId, attachmentId) => {
  const response = await api.delete(
    `/sim/attachments/${simId}/${attachmentId}`
  );
  return response.data;
};

// Download attachment
// export const downloadSimAttachment = async (simId, attachmentId) => {
//   const response = await api.get(
//     `/sim/attachments/${simId}/${attachmentId}/download`,
//     {
//       responseType: "blob",
//     }
//   );
//   return response.data;
// };

export const fetchSimAttachments = async (simId) => {
  const response = await api.get(`/sim-cards/attachments/${simId}`);
  // console.log("Attachments are received ", response.data);
  return response.data;
};

export const importSimExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/sim-cards/excel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // console.log("data are ", response.data);

  return response.data;
};

export const assignSim = async (id, { employeeId, performedBy, note }) => {
  const response = await api.post(`/sim-cards/${id}/assign`, {
    employeeId,
    performedBy,
    note,
  });

  return response.data;
};

export const downloadSimAttachment = async (attachmentId, fileName) => {
  const response = await api.get(
    `/sim-cards/attachments/download/${attachmentId}`,
    { responseType: "blob" }
  );

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const uploadOnboardingExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/onboarding/employees/bulk", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // console.log("response data are ", response.data);
  return response.data;
};

export const getMyAssets = async () => {
  const response = await api.get(`assets/user/my-asset`, {
    withCredentials: true, // if you use cookie-based auth
  });
  // console.log("data are ", response.data);
  return response.data; // List<AssetDTO>
};

export const resetUserPasswordByEmpId = async (employeeId) => {
  const res = await api.post(
    `/users/reset-password/${employeeId}`,
    {},
    {
      withCredentials: true, // if you use cookies/JWT interceptor
    }
  );
  return res.data;
};
