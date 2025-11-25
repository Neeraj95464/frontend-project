// src/pages/BulkImportPage.jsx

import { importAssets, importTickets } from "../services/api";
import React, { useState } from "react";
import * as XLSX from "xlsx";

// install with: npm i xlsx

const BulkImportPage = () => {
  const [assetFile, setAssetFile] = useState(null);
  const [ticketFile, setTicketFile] = useState(null);

  const [assetResult, setAssetResult] = useState(null);
  const [ticketResult, setTicketResult] = useState(null);

  const [loadingType, setLoadingType] = useState(null); // "assets" | "tickets" | null
  const [error, setError] = useState("");

  // ---- Template generators ----

  const downloadExcel = (rows, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, fileName);
  };

  //   const handleDownloadAssetsTemplate = () => {
  //     const sampleRows = [
  //       {
  //         name: "Laptop A",
  //         description: "Dell Latitude",
  //         serialNumber: "SN-001",
  //         assetTag: "TAG-001",
  //         brand: "Dell",
  //         model: "Latitude 5420",
  //         assetType: "LAPTOP", // must match enum
  //         department: "IT", // must match enum
  //         cost: 65000,
  //       },
  //       {
  //         name: "Firewall 1",
  //         description: "Perimeter Firewall",
  //         serialNumber: "SN-002",
  //         assetTag: "TAG-002",
  //         brand: "Fortinet",
  //         model: "FG-100F",
  //         assetType: "FIREWALL",
  //         department: "IT",
  //         cost: 120000,
  //       },
  //     ];

  //     downloadExcel(sampleRows, "assets_import_template.xlsx");
  //   };

  //   const handleDownloadAssetsTemplate = () => {
  //     const sampleRows = [
  //       {
  //         name: "Dell Latitude 5420",
  //         description: "Laptop for developer",
  //         serialNumber: "DL-LT-001",
  //         assetTag: "", // leave empty, backend auto-generates with AssetIdGenerator
  //         purchaseDate: "2024-01-15",
  //         purchaseFrom: "Dell India",
  //         brand: "Dell",
  //         model: "Latitude 5420",
  //         assetType: "LAPTOP", // must match AssetType enum
  //         department: "IT", // must match Department enum
  //         cost: 75000,
  //         status: "AVAILABLE", // must match AssetStatus enum
  //         statusNote: "New device",
  //       },
  //       {
  //         name: "Fortinet FortiGate 100F",
  //         description: "Perimeter firewall",
  //         serialNumber: "FG-FW-002",
  //         assetTag: "", // auto-generated
  //         purchaseDate: "2023-06-20",
  //         purchaseFrom: "Fortinet Partner",
  //         brand: "Fortinet",
  //         model: "FG-100F",
  //         assetType: "FIREWALL",
  //         department: "IT",
  //         cost: 150000,
  //         status: "ASSIGNED_TO_LOCATION",
  //         statusNote: "Installed at Head Office",
  //       },
  //       {
  //         name: "HP LaserJet Pro M404n",
  //         description: "Office printer",
  //         serialNumber: "HP-PR-003",
  //         assetTag: "",
  //         purchaseDate: "2023-09-10",
  //         purchaseFrom: "HP Authorized Dealer",
  //         brand: "HP",
  //         model: "M404n",
  //         assetType: "PRINTER",
  //         department: "FINANCE_AND_ACCOUNTS",
  //         cost: 35000,
  //         status: "AVAILABLE",
  //         statusNote: "Located at floor 2",
  //       },
  //       {
  //         name: "Apple iPad Pro 12.9",
  //         description: "Tablet for presentations",
  //         serialNumber: "AP-IPD-004",
  //         assetTag: "",
  //         purchaseDate: "2024-02-01",
  //         purchaseFrom: "Apple Store",
  //         brand: "Apple",
  //         model: "iPad Pro 12.9",
  //         assetType: "IPAD",
  //         department: "MANAGEMENT",
  //         cost: 120000,
  //         status: "CHECKED_OUT",
  //         statusNote: "Assigned to manager",
  //       },
  //       {
  //         name: "Cisco Catalyst 2960X",
  //         description: "Network switch",
  //         serialNumber: "CS-SW-005",
  //         assetTag: "",
  //         purchaseDate: "2023-04-12",
  //         purchaseFrom: "Cisco",
  //         brand: "Cisco",
  //         model: "Catalyst 2960X",
  //         assetType: "NETWORK_DEVICE",
  //         department: "IT",
  //         cost: 250000,
  //         status: "AVAILABLE",
  //         statusNote: "In storage",
  //       },
  //     ];

  //     downloadExcel(sampleRows, "assets_import_template.xlsx");
  //   };

  const handleDownloadAssetsTemplate = () => {
    const sampleRows = [
      {
        name: "Dell Latitude 5420",
        description: "Laptop for developer",
        serialNumber: "DL-LT-001",
        purchaseDate: "2024-01-15",
        purchaseFrom: "Dell India",
        brand: "Dell",
        model: "Latitude 5420",
        assetType: "LAPTOP",
        department: "IT",
        cost: 75000,
        status: "AVAILABLE",
        statusNote: "New device",
        siteName: "MADPL",
        locationName: "Jubilee Hills-Skoda",
      },
      {
        name: "Fortinet FortiGate 100F",
        description: "Perimeter firewall",
        serialNumber: "FG-FW-002",
        purchaseDate: "2023-06-20",
        purchaseFrom: "Fortinet Partner",
        brand: "Fortinet",
        model: "FG-100F",
        assetType: "FIREWALL",
        department: "IT",
        cost: 150000,
        status: "ASSIGNED_TO_LOCATION",
        statusNote: "Installed at Head Office",
        siteName: "MADPL",
        locationName: "Vizag-Skoda",
      },
      {
        name: "HP LaserJet Pro M404n",
        description: "Office printer",
        serialNumber: "HP-PR-003",
        purchaseDate: "2023-09-10",
        purchaseFrom: "HP Authorized Dealer",
        brand: "HP",
        model: "M404n",
        assetType: "PRINTER",
        department: "FINANCE_AND_ACCOUNTS",
        cost: 35000,
        status: "AVAILABLE",
        statusNote: "Located at floor 2",
        siteName: "AADPL",
        locationName: "Madhapur-MB",
      },
      {
        name: "Apple iPad Pro 12.9",
        description: "Tablet for presentations",
        serialNumber: "AP-IPD-004",
        purchaseDate: "2024-02-01",
        purchaseFrom: "Apple Store",
        brand: "Apple",
        model: "iPad Pro 12.9",
        assetType: "IPAD",
        department: "MANAGEMENT",
        cost: 120000,
        status: "CHECKED_OUT",
        statusNote: "Assigned to manager",
        siteName: "AADPL",
        locationName: "Kondapur-MB",
      },
      {
        name: "Cisco Catalyst 2960X",
        description: "Network switch",
        serialNumber: "CS-SW-005",
        purchaseDate: "2023-04-12",
        purchaseFrom: "Cisco",
        brand: "Cisco",
        model: "Catalyst 2960X",
        assetType: "NETWORK_DEVICE",
        department: "IT",
        cost: 250000,
        status: "AVAILABLE",
        statusNote: "In storage",
        siteName: "JAPL",
        locationName: "Main Office",
      },
      {
        name: "Samsung UPS System",
        description: "Uninterruptible Power Supply",
        serialNumber: "SA-UPS-006",
        purchaseDate: "2023-08-05",
        purchaseFrom: "Samsung India",
        brand: "Samsung",
        model: "OfficeServ UPS",
        assetType: "UPS",
        department: "IT",
        cost: 185000,
        status: "AVAILABLE",
        statusNote: "Backup power system",
        siteName: "MADPL",
        locationName: "Jubilee Hills-Skoda",
      },
    ];

    downloadExcel(sampleRows, "assets_import_template.xlsx");
  };

  const handleDownloadTicketsTemplate = () => {
    const sampleRows = [
      {
        title: "Email not working",
        description: "User unable to send emails",
        category: "EMAIL", // enum from ticket table
        status: "OPEN", // enum
        ticket_department: "IT", // or your enums
        due_date: "2025-12-31T10:00:00",
        assetTag: "TAG-001",
        employeeId: "EMP001",
      },
      {
        title: "Projector issue",
        description: "Projector not turning on",
        category: "PROJECTOR",
        status: "UNASSIGNED",
        ticket_department: "ADMIN",
        due_date: "2025-12-31T12:00:00",
        assetTag: "TAG-002",
        employeeId: "EMP002",
      },
    ];

    downloadExcel(sampleRows, "tickets_import_template.xlsx");
  };

  // ---- Upload handlers ----

  const handleImportAssets = async () => {
    if (!assetFile) {
      setError("Please select an Excel file for assets.");
      return;
    }
    setError("");
    setLoadingType("assets");
    setAssetResult(null);
    try {
      const res = await importAssets(assetFile);
      setAssetResult(res); // { successCount, failureCount, errors: [{rowNumber,message}] }
    } catch (e) {
      setError("Failed to import assets. " + (e.response?.data || e.message));
    } finally {
      setLoadingType(null);
    }
  };

  const handleImportTickets = async () => {
    if (!ticketFile) {
      setError("Please select an Excel file for tickets.");
      return;
    }
    setError("");
    setLoadingType("tickets");
    setTicketResult(null);
    try {
      const res = await importTickets(ticketFile);
      setTicketResult(res);
    } catch (e) {
      setError("Failed to import tickets. " + (e.response?.data || e.message));
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-10">
      <div className="max-w-5xl w-full mx-4 bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Bulk Import Center
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Import assets and tickets using Excel templates. Download the sample
          file, fill in your data, and upload it back here.
        </p>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assets card */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Import Assets
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Use the template to add new assets. Ensure enum values like
              assetType and department match exactly.
            </p>

            <button
              type="button"
              onClick={handleDownloadAssetsTemplate}
              className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 mb-4"
            >
              Download Assets Template
            </button>

            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Upload filled Excel (.xlsx)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setAssetFile(e.target.files[0] || null)}
                className="block w-full text-xs text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-800 border border-dashed border-slate-300 rounded-md cursor-pointer bg-white"
              />
            </div>

            <button
              type="button"
              onClick={handleImportAssets}
              disabled={loadingType === "assets"}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-60"
            >
              {loadingType === "assets" ? "Importing..." : "Import Assets"}
            </button>

            {assetResult && (
              <div className="mt-4 text-xs">
                <p className="font-semibold text-slate-800">
                  Import summary (Assets)
                </p>
                <p className="text-slate-700">
                  Success:{" "}
                  <span className="font-mono">{assetResult.successCount}</span>,
                  Failed:{" "}
                  <span className="font-mono">{assetResult.failureCount}</span>
                </p>
                {assetResult.errors && assetResult.errors.length > 0 && (
                  <div className="mt-2 max-h-40 overflow-y-auto border border-slate-200 rounded-md p-2 bg-white">
                    {assetResult.errors.map((err, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-red-700 border-b last:border-b-0 border-slate-100 py-1"
                      >
                        Row {err.rowNumber}: {err.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tickets card */}
          <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Import Tickets
            </h2>
            <p className="text-xs text-slate-600 mb-4">
              Use the template to import tickets. Enum columns like category,
              status and ticket_department must match allowed values.
            </p>

            <button
              type="button"
              onClick={handleDownloadTicketsTemplate}
              className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 mb-4"
            >
              Download Tickets Template
            </button>

            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Upload filled Excel (.xlsx)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setTicketFile(e.target.files[0] || null)}
                className="block w-full text-xs text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-800 border border-dashed border-slate-300 rounded-md cursor-pointer bg-white"
              />
            </div>

            <button
              type="button"
              onClick={handleImportTickets}
              disabled={loadingType === "tickets"}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-500 disabled:opacity-60"
            >
              {loadingType === "tickets" ? "Importing..." : "Import Tickets"}
            </button>

            {ticketResult && (
              <div className="mt-4 text-xs">
                <p className="font-semibold text-slate-800">
                  Import summary (Tickets)
                </p>
                <p className="text-slate-700">
                  Success:{" "}
                  <span className="font-mono">{ticketResult.successCount}</span>
                  , Failed:{" "}
                  <span className="font-mono">{ticketResult.failureCount}</span>
                </p>
                {ticketResult.errors && ticketResult.errors.length > 0 && (
                  <div className="mt-2 max-h-40 overflow-y-auto border border-slate-200 rounded-md p-2 bg-white">
                    {ticketResult.errors.map((err, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-red-700 border-b last:border-b-0 border-slate-100 py-1"
                      >
                        Row {err.rowNumber}: {err.message}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkImportPage;
