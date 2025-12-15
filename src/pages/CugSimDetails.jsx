import SimAcknowledgementDownload from "../components/SimAcknowledgementDownload";
import {
  getSimDetails,
  assignSim,
  unassignSim,
  fetchSimHistory,
  updateSimStatus,
  updateSimInfo,
  uploadSimAttachment,
  deleteSimAttachment,
  downloadSimAttachment,
  fetchSimAttachments,
  fetchSites,
  getLocationsBySite,
} from "../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CugSimDetails() {
  const { id } = useParams();
  const [sim, setSim] = useState(null);
  const [history, setHistory] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [assignNote, setAssignNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadNote, setUploadNote] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [attachments, setAttachments] = useState([]);
  // Add these useEffects for edit modal
  const [editLocations, setEditLocations] = useState([]);

  // Fetch sites for edit modal (reuse your existing sites)
  useEffect(() => {
    fetchSites()
      .then((res) => {
        const formatted = res.data.map((site) => ({
          siteId: site.id,
          name: site.name,
        }));
        setSites(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch sites", err);
      });
  }, []);

  // Load locations when edit site changes
  // useEffect(() => {
  //   if (editFormData.siteId) {
  //     getLocationsBySite(editFormData.siteId)
  //       .then((locations) => {
  //         setEditLocations(locations);
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching locations", err);
  //       });
  //   } else {
  //     setEditLocations([]);
  //     setEditFormData((prev) => ({ ...prev, locationId: "" }));
  //   }
  // }, [editFormData.siteId]);

  useEffect(() => {
    if (editFormData.siteName) {
      // Find siteId from siteName for API call
      const selectedSite = sites.find(
        (site) => site.name === editFormData.siteName
      );
      if (selectedSite) {
        getLocationsBySite(selectedSite.siteId)
          .then((locations) => {
            setEditLocations(locations);
          })
          .catch((err) => {
            console.error("Error fetching locations", err);
          });
      }
    } else {
      setEditLocations([]);
      setEditFormData((prev) => ({ ...prev, locationName: "" }));
    }
  }, [editFormData.siteName]);

  useEffect(() => {
    loadAttachments();
  }, [id]);

  const loadAttachments = async () => {
    try {
      const res = await fetchSimAttachments(id);
      // console.log(res.data);
      setAttachments(res);
    } catch (err) {
      console.error("Error fetching attachments:", err);
    }
  };

  const handleDownloadAttachment = async (id, fileName) => {
    try {
      await downloadSimAttachment(id, fileName);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleDeleteAttachment = (id) => {
    // optional future delete logic
    console.log("Delete:", id);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  const loadDetails = async () => {
    try {
      setLoading(true);
      const data = await getSimDetails(id);
      // console.log("data are ", data);
      setSim(data);
      setEditFormData(data);
      const historyData = await fetchSimHistory(id);
      setHistory(historyData);
    } catch (error) {
      toast.error("Failed to load SIM details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  const handleAssign = async () => {
    if (!employeeId.trim()) {
      toast.warning("Please enter a User ID");
      return;
    }
    if (!assignNote.trim()) {
      toast.warning("Please enter a note for assignment");
      return;
    }
    try {
      await assignSim(id, { employeeId, note: assignNote });
      toast.success("SIM assigned successfully!");
      setEmployeeId("");
      setAssignNote("");
      loadDetails();
    } catch (error) {
      toast.error("Failed to assign SIM");
    }
  };

  const handleUnassign = async () => {
    try {
      await unassignSim(id);
      toast.success("SIM unassigned successfully!");
      loadDetails();
    } catch (error) {
      toast.error("Failed to unassign SIM");
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateSimStatus(id, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      loadDetails();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleUpdateSimInfo = async () => {
    try {
      // console.log("update request are ", editFormData);
      await updateSimInfo(id, editFormData);
      toast.success("SIM information updated successfully!");
      setIsEditModalOpen(false);
      loadDetails();
    } catch (error) {
      toast.error("Failed to update SIM information");
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a file");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("note", uploadNote);
      await uploadSimAttachment(id, formData);
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
      setUploadNote("");
      loadDetails();
    } catch (error) {
      toast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  // const handleDeleteAttachment = async (attachmentId) => {
  //   if (!window.confirm("Are you sure you want to delete this attachment?"))
  //     return;
  //   try {
  //     await deleteSimAttachment(id, attachmentId);
  //     toast.success("Attachment deleted!");
  //     loadDetails();
  //   } catch (error) {
  //     toast.error("Failed to delete attachment");
  //   }
  // };

  // const handleDownloadAttachment = async (attachmentId, fileName) => {
  //   try {
  //     const blob = await downloadSimAttachment(id, attachmentId);
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = fileName;
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     toast.error("Failed to download file");
  //   }
  // };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "---";
  //   const date = new Date(dateString);
  //   return date.toLocaleString("en-IN", {
  //     dateStyle: "medium",
  //     timeStyle: "short",
  //   });
  // };

  const formatDateOnly = (dateString) => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { dateStyle: "medium" });
  };

  const getEventBadgeColor = (eventType) => {
    switch (eventType) {
      case "ASSIGNED":
        return "bg-green-100 text-green-800";
      case "UNASSIGNED":
        return "bg-red-100 text-red-800";
      case "CREATED":
        return "bg-blue-100 text-blue-800";
      case "STATUS_CHANGED":
        return "bg-purple-100 text-purple-800";
      case "UPDATED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500 text-white";
      case "ASSIGNED":
        return "bg-blue-500 text-white";
      case "SUSPENDED":
        return "bg-yellow-500 text-white";
      case "LOST":
        return "bg-red-600 text-white";
      case "DEACTIVATED":
        return "bg-gray-500 text-white";
      case "REPLACED":
        return "bg-orange-500 text-white";
      case "DISCARDED":
        return "bg-red-800 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const simStatuses = [
    "AVAILABLE",
    "ASSIGNED",
    "SUSPENDED",
    "LOST",
    "DEACTIVATED",
    "REPLACED",
    "DISCARDED",
  ];

  if (loading) {
    return (
      <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!sim) return null;

  // Prepare employee data for acknowledgement
  const employeeData = {
    employeeId: sim.assignedUser?.employeeId || sim.assignedUserId,
    fullName: sim.assignedUserName,
    designation: sim.assigneeDesignation,
    location: sim.locationName,
  };

  return (
    <div className="lg:ml-40 pt-20 px-4 sm:px-6 lg:px-8 pb-10 min-h-screen bg-gray-50">
      {/* SIM Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">
                {sim.phoneNumber}
              </h1>
              <p className="text-blue-100 text-xs">{sim.simTag}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                sim.status
              )}`}
            >
              {sim.status}
            </span>
            {sim.status === "ASSIGNED" && sim.assignedUserName && (
              <SimAcknowledgementDownload
                simData={sim}
                employeeData={employeeData}
                companyName="MAHAVIR GROUP"
              />
            )}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition-all"
              title="Edit SIM Info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-3">
            <DetailItem label="Provider" value={sim.provider} />
            <DetailItem label="ICCID" value={sim.iccid} />
            <DetailItem label="IMSI" value={sim.imsi} />
            <DetailItem
              label="Assigned To"
              value={sim.assignedUserName}
              placeholder="Unassigned"
            />
            <DetailItem
              label="Assigned At"
              value={formatDate(sim.assignedAt)}
            />
            <DetailItem
              label="Activated"
              value={formatDateOnly(sim.activatedAt)}
            />
            <DetailItem
              label="Purchase Date"
              value={formatDateOnly(sim.purchaseDate)}
            />
            <DetailItem label="Purchase From" value={sim.purchaseFrom} />
            <DetailItem label="Cost" value={sim.cost ? `₹${sim.cost}` : null} />
            <DetailItem label="Location" value={sim.locationName} />
            <DetailItem label="Site" value={sim.siteName} />
            <DetailItem label="Created By" value={sim.createdBy} />
            <DetailItem label="Created At" value={formatDate(sim.createdAt)} />
            <DetailItem
              label="Ack Uploaded"
              value={sim.assignmentUploaded ? "Yes" : "No"}
              valueClass={
                sim.assignmentUploaded ? "text-green-600" : "text-red-500"
              }
            />
          </div>

          {/* Note */}
          {sim.note && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-gray-700">{sim.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Rest of your existing code for Actions, Attachments, History sections... */}
      {/* Quick Actions & Status Update */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Assignment Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Assignment</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                User ID *
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                value={employeeId}
                className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Assignment Note *
              </label>
              <textarea
                placeholder="Enter assignment note (required)"
                value={assignNote}
                rows={2}
                className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                onChange={(e) => setAssignNote(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                onClick={handleAssign}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Assign
              </button>
              {sim.assignedUserName && (
                <button
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  onClick={handleUnassign}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                    />
                  </svg>
                  Unassign
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Status Update Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Update Status
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              Current Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                  sim.status
                )}`}
              >
                {sim.status}
              </span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {simStatuses
                .filter((s) => s !== sim.status)
                .map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-md ${getStatusButtonColor(
                      status
                    )}`}
                  >
                    {status}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attachments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            Attachments
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {sim.attachments?.length || 0} files
          </span>
        </div>

        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <input
                type="text"
                placeholder="Add a note for this file"
                value={uploadNote}
                onChange={(e) => setUploadNote(e.target.value)}
                className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleFileUpload}
                disabled={uploading || !selectedFile}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Attachments List */}
        {/* <div className="p-6">
          {sim.attachments && sim.attachments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sim.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {attachment.fileName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(attachment.uploadedAt)}
                        </p>
                        {attachment.note && (
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {attachment.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        handleDownloadAttachment(
                          attachment.id,
                          attachment.fileName
                        )
                      }
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteAttachment(attachment.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <p className="text-gray-500">No attachments yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Upload files using the form above
              </p>
            </div>
          )}
        </div> */}

        <div className="p-6">
          {attachments && attachments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {attachment.fileName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {formatDate(attachment.uploadedAt)}
                        </p>

                        {attachment.note && (
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {attachment.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        handleDownloadAttachment(
                          attachment.id,
                          attachment.fileName
                        )
                      }
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </button>

                    <button
                      onClick={() => handleDeleteAttachment(attachment.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-300 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <p className="text-gray-500">No attachments yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Upload files using the form above
              </p>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}

      {/* History Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Activity History
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {history.length} {history.length === 1 ? "record" : "records"}
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Event Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Performed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Date & Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
                        h.eventType
                      )}`}
                    >
                      {h.eventType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {h.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {h.performedBy || "System"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(h.performedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {history.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No history found</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {history.length > 0 ? (
            history.map((h) => (
              <div key={h.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventBadgeColor(
                      h.eventType
                    )}`}
                  >
                    {h.eventType}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(h.performedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-800">{h.details}</p>
                <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
                  Performed by:{" "}
                  <span className="font-medium text-gray-700">
                    {h.performedBy || "System"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No history found</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit SIM Info Modal */}
      {/* {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit SIM Information
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditField
                  label="Phone Number"
                  value={editFormData.phoneNumber}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, phoneNumber: v })
                  }
                />
                <EditField
                  label="ICCID"
                  value={editFormData.iccid}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, iccid: v })
                  }
                />
                <EditField
                  label="IMSI"
                  value={editFormData.imsi}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, imsi: v })
                  }
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Provider
                  </label>
                  <select
                    value={editFormData.provider || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        provider: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Provider</option>
                    <option value="AIRTEL">Airtel</option>
                    <option value="VI">Vi</option>
                    <option value="JIO">Jio</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>
                <EditField
                  label="Purchase From"
                  value={editFormData.purchaseFrom}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, purchaseFrom: v })
                  }
                />
                <EditField
                  label="Cost"
                  value={editFormData.cost}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, cost: v })
                  }
                  type="number"
                />
                <EditField
                  label="Purchase Date"
                  value={editFormData.purchaseDate?.split("T")[0]}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, purchaseDate: v })
                  }
                  type="date"
                />
                <EditField
                  label="Activated At"
                  value={editFormData.activatedAt?.split("T")[0]}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, activatedAt: v })
                  }
                  type="date"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Note
                </label>
                <textarea
                  value={editFormData.note || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, note: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Add a note..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSimInfo}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )} */}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit SIM Information
              </h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EditField
                  label="Phone Number"
                  value={editFormData.phoneNumber}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, phoneNumber: v })
                  }
                />
                <EditField
                  label="ICCID"
                  value={editFormData.iccid}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, iccid: v })
                  }
                />
                <EditField
                  label="IMSI"
                  value={editFormData.imsi}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, imsi: v })
                  }
                />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Provider
                  </label>
                  <select
                    value={editFormData.provider || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        provider: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Provider</option>
                    <option value="AIRTEL">Airtel</option>
                    <option value="VI">Vi</option>
                    <option value="JIO">Jio</option>
                    <option value="BSNL">BSNL</option>
                  </select>
                </div>

                {/* ✅ NEW: Site & Location Fields */}
                {/* <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Site
                  </label>
                  <select
                    value={editFormData.siteId || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        siteId: e.target.value || null,
                        locationId: "", // Reset location when site changes
                      })
                    }
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Site</option>
                    {sites.map(({ siteId, name }) => (
                      <option key={siteId} value={siteId}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Location
                  </label>
                  <select
                    value={editFormData.locationId || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        locationId: e.target.value || null,
                      })
                    }
                    disabled={!editFormData.siteId}
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Location</option>
                    {editLocations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Site
                  </label>
                  <select
                    value={editFormData.siteName || ""}
                    onChange={(e) => {
                      const selectedSiteName = e.target.value;
                      setEditFormData({
                        ...editFormData,
                        siteName: selectedSiteName || null,
                        locationName: "", // Reset location when site changes
                      });
                    }}
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Site</option>
                    {sites.map(({ siteId, name }) => (
                      <option key={siteId} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Location
                  </label>
                  <select
                    value={editFormData.locationName || ""}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        locationName: e.target.value || null,
                      })
                    }
                    disabled={!editFormData.siteName}
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Location</option>
                    {editLocations.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <EditField
                  label="Purchase From"
                  value={editFormData.purchaseFrom}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, purchaseFrom: v })
                  }
                />
                <EditField
                  label="Cost"
                  value={editFormData.cost}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, cost: v })
                  }
                  type="number"
                />
                <EditField
                  label="Purchase Date"
                  value={editFormData.purchaseDate?.split("T")[0]}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, purchaseDate: v })
                  }
                  type="date"
                />
                <EditField
                  label="Activated At"
                  value={editFormData.activatedAt?.split("T")[0]}
                  onChange={(v) =>
                    setEditFormData({ ...editFormData, activatedAt: v })
                  }
                  type="date"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Note
                </label>
                <textarea
                  value={editFormData.note || ""}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, note: e.target.value })
                  }
                  rows={3}
                  className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Add a note..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSimInfo}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper Components
function InfoCard({ label, value, highlight }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p
        className={`font-semibold text-lg ${
          highlight ? "text-gray-400 italic" : "text-gray-800"
        }`}
      >
        {value || "---"}
      </p>
    </div>
  );
}

function EditField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function getStatusButtonColor(status) {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-700 hover:bg-green-200";
    case "ASSIGNED":
      return "bg-blue-100 text-blue-700 hover:bg-blue-200";
    case "SUSPENDED":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    case "LOST":
      return "bg-red-100 text-red-700 hover:bg-red-200";
    case "DEACTIVATED":
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    case "REPLACED":
      return "bg-orange-100 text-orange-700 hover:bg-orange-200";
    case "DISCARDED":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
  }
}

function DetailItem({ label, value, placeholder = "---", valueClass = "" }) {
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <div className="min-w-0">
      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mb-0.5 truncate">
        {label}
      </p>
      <p
        className={`text-sm font-medium truncate ${
          isPlaceholder ? "text-gray-300 italic" : valueClass || "text-gray-800"
        }`}
        title={displayValue}
      >
        {displayValue}
      </p>
    </div>
  );
}
