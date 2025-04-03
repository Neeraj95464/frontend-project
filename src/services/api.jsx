import axios from "axios";
import { toast } from "react-toastify";

// Using toast for better alerts

// Base API URL
const API_URL = "http://localhost:8080/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser) || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// ================== AUTHENTICATION ==================

export const getUserRoles = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return [];

  try {
    const { roles } = JSON.parse(storedUser);
    return roles.map((role) => role.authority); // Extract role names
  } catch (error) {
    console.error("Error parsing user roles:", error);
    return [];
  }
};

export const hasRole = (role) => {
  return getUserRoles().includes(role);
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

// ================== ASSET MANAGEMENT ==================
export const getAllAssets = async () => {
  try {
    const response = await api.get("/assets");
    return response.data;
  } catch (error) {
    return [];
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

export const getAllTickets = async (page = 0, size = 50, status = "OPEN") => {
  try {
    const response = await api.get(`/user-assets/admin/tickets`, {
      params: status ? { page, size, status } : { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const searchLocations = async (name) => {
  if (!name || name.trim() === "") {
    console.warn("Search name is empty. Skipping API call.");
    return []; // Prevents sending an empty request
  }

  console.log("your request is ", name);
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

export const addMessageToTicket = async (ticketId, message) => {
  try {
    const response = await api.post(
      `/user-assets/tickets/${ticketId}/messages`,
      {
        message, // No need for JSON.stringify()
      }
    );

    return response.data; // Axios returns response data directly
  } catch (error) {
    console.error("Failed to add message:", error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  return await api.post(`${API_URL}/user-assets/tickets`, ticketData);
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

// export const getTickets = async () => {
//   try {
//     const response = await api.get("/user-assets/tickets");

//     return response.data; // Axios response stores data inside response.data
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     return [];
//   }
// };

export const getTickets = async (status = "OPEN") => {
  try {
    const response = await api.get(
      `${API_URL}/user-assets/tickets?status=${status}`
    );

    // Axios doesn't have `.ok`, just use response.data
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
};

export const deleteAsset = async (assetId) => {
  try {
    await api.delete(`/assets/${assetId}`);
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

export const getEmployees = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error;
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

export const searchEmployees = async (query) => {
  try {
    const params = new URLSearchParams();

    if (/^\d+$/.test(query)) {
      console.log("Detected numeric input, assuming phoneNumber:", query);
      params.append("phoneNumber", query);
    } else if (query.includes("@")) {
      console.log("Detected email input:", query);
      params.append("email", query);
    } else if (
      query.startsWith("mv") ||
      query.startsWith("aw") ||
      query.startsWith("jb")
    ) {
      console.log("Detected employeeId format:", query);
      params.append("employeeId", query);
    } else {
      console.log("Detected username format:", query);
      params.append("username", query);
    }

    const apiUrl = `/users/search?${params.toString()}`;
    console.log("Generated API URL:", apiUrl); // ✅ Log API call

    const response = await api.get(apiUrl);

    console.log("API Response Data:", response.data); // ✅ Log API response

    // ✅ Fix: Extract 'content' from paginated response
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
    const response = await api.get(`${API_URL}/user-assets/search`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const getTicketById = async (ticketId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${ticketId}:`, error);
    throw error;
  }
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
    const response = await api.put(`/users/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
    return true;
  } catch (error) {
    throw error.response?.data?.message || "Error deleting user";
  }
};

// ================== VENDOR MANAGEMENT ==================
export const getVendors = async () => {
  try {
    const response = await api.get("/vendors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await api.post("/vendors", vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVendor = async (vendorId, vendorData) => {
  try {
    const response = await api.put(`/vendors/${vendorId}`, vendorData);
    return response.data;
  } catch (error) {
    throw error;
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

export const getLocationsBySite = async (siteId) => {
  try {
    const response = await api.get(`/locations/site/${siteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDepartments = async () => {
  try {
    const response = await api.get("/enum/departments");
    return response.data;
  } catch (error) {
    throw error;
  }
};
