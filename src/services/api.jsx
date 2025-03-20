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
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = () => localStorage.removeItem("user");

// ================== Testing Things ==================
// export const fetchDepartments = async () => {
//   try {
//     const response = await api.get("/enum/departments");
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// ================== ASSET MANAGEMENT ==================
export const getAllAssets = async () => {
  try {
    const response = await api.get("/assets");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAssetByAssetTag = async (assetTag) => {
  try {
    const response = await api.get(`/assets/asset-tag?assetTag=${assetTag}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching asset:", error);
    throw error;
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

export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await api.put(`/assets/${assetId}`, assetData);
    return response.data;
  } catch (error) {
    throw error;
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

// export const checkInAsset = async (formData) => {
//   try {
//     const response = await api.put(
//       `/assets/${formData.assetId}/status`,
//       formData
//     );

//     // Show success message from backend response if available
//     toast.success(response.data.message || "Asset checked in successfully!");

//     return response.data;
//   } catch (error) {
//     console.error("Error checking in asset:", error);

//     // Extract error message from backend response
//     const errorMessage =
//       error.response?.data?.message ||
//       "Failed to check in asset. Please try again.";

//     toast.error(errorMessage); // Show error notification
//     throw new Error(errorMessage);
//   }
// };

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
      params.append("phoneNumber", query);
    } else if (query.includes("@")) {
      params.append("email", query);
    } else {
      params.append("username", query);
    }

    const response = await api.get(`/users/search?${params.toString()}`);
    return response.data?.content || [];
  } catch (error) {
    return [];
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
