import { importAssets, importTickets, importSimExcel } from "../services/api";
import React, { useState } from "react";
import * as XLSX from "xlsx";

// install with: npm i xlsx

const BulkImportPage = () => {
  const [selectedType, setSelectedType] = useState("assets");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loadingType, setLoadingType] = useState(null);
  const [error, setError] = useState("");

  // ---- Template generators ----

  const downloadExcel = (rows, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    XLSX.writeFile(workbook, fileName);
  };

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
        locationName: "Kukatpally-Isuzu",
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
        category: "EMAIL",
        status: "OPEN",
        ticket_department: "IT",
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

  const handleDownloadSimCardsTemplate = () => {
    const sampleRows = [
      {
        phoneNumber: "9876543210",
        iccid: "89860012345678901234",
        imsi: "404123456789012",
        provider: "AIRTEL",
        status: "AVAILABLE", // must match SimStatus enum
        activatedAt: "2024-01-15", // YYYY-MM-DD
        purchaseDate: "2023-12-01", // YYYY-MM-DD
        purchaseFrom: "Airtel Corporate",
        cost: 59900, // numeric (in paise or your currency unit)
        note: "Corporate Postpaid plan",
        siteName: "MADPL", // must exist in Site table
        locationName: "Jubilee Hills-Skoda", // must exist in Location for that site
        assignedUserId: "", // leave empty for AVAILABLE, put employee ID for ASSIGNED
      },
      {
        phoneNumber: "9123456789",
        iccid: "89860098765432109876",
        imsi: "405987654321098",
        provider: "JIO",
        status: "ASSIGNED",
        activatedAt: "2024-03-20",
        purchaseDate: "2024-02-15",
        purchaseFrom: "Jio Business",
        cost: 39900,
        note: "Field staff prepaid",
        siteName: "JAPL",
        locationName: "Kukatpally-Isuzu",
        assignedUserId: "EMP002", // actual employee ID from User table
      },
      {
        phoneNumber: "9988776655",
        iccid: "",
        imsi: "",
        provider: "VI",
        status: "SUSPENDED",
        activatedAt: "2023-12-01",
        purchaseDate: "2023-11-20",
        purchaseFrom: "VI Dealer",
        cost: 79900,
        note: "Spare SIM - suspended",
        siteName: "JAPL",
        locationName: "Kukatpally-Isuzu",
        assignedUserId: "",
      },
    ];

    // Column order matches your mapRequestToEntity method processing order
    const columnsOrder = [
      "phoneNumber",
      "iccid",
      "imsi",
      "provider",
      "status",
      "activatedAt",
      "purchaseDate",
      "purchaseFrom",
      "cost",
      "note",
      "siteName",
      "locationName",
      "assignedUserId",
    ];

    downloadExcel(sampleRows, "simcards_import_template.xlsx", columnsOrder);
  };

  // ---- Download template handler ----
  const handleDownloadTemplate = () => {
    switch (selectedType) {
      case "assets":
        handleDownloadAssetsTemplate();
        break;
      case "tickets":
        handleDownloadTicketsTemplate();
        break;
      case "simcards":
        handleDownloadSimCardsTemplate();
        break;
      default:
        break;
    }
  };

  // ---- Upload handler ----
  const handleImport = async () => {
    if (!file) {
      setError("Please select an Excel file to import.");
      return;
    }
    setError("");
    setLoadingType(selectedType);
    setResult(null);

    try {
      let res;
      switch (selectedType) {
        case "assets":
          res = await importAssets(file);
          break;
        case "tickets":
          res = await importTickets(file);
          break;
        case "simcards":
          res = await importSimExcel(file);
          break;
        default:
          throw new Error("Invalid import type selected");
      }
      setResult(res);
    } catch (e) {
      setError(
        `Failed to import ${selectedType}. ${e.response?.data || e.message}`,
      );
    } finally {
      setLoadingType(null);
    }
  };

  // ---- Get labels based on selected type ----
  const getTypeLabel = () => {
    switch (selectedType) {
      case "assets":
        return "Assets";
      case "tickets":
        return "Tickets";
      case "simcards":
        return "SIM Cards";
      default:
        return "";
    }
  };

  const getButtonColor = () => {
    switch (selectedType) {
      case "assets":
        return "bg-blue-600 hover:bg-blue-500";
      case "tickets":
        return "bg-green-600 hover:bg-green-500";
      case "simcards":
        return "bg-purple-600 hover:bg-purple-500";
      default:
        return "bg-blue-600 hover:bg-blue-500";
    }
  };

  const getDescription = () => {
    switch (selectedType) {
      case "assets":
        return "Use the template to add new assets. Ensure enum values like assetType and department match exactly.";
      case "tickets":
        return "Use the template to import tickets. Enum columns like category, status and ticket_department must match allowed values.";
      case "simcards":
        return "Use the template to import SIM cards. Ensure fields like provider, planType, and status match the allowed values.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-10">
      <div className="max-w-3xl w-full mx-4 bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Bulk Import Center
        </h1>
        <p className="text-sm text-slate-600 mb-8">
          Import assets, tickets, and SIM cards using Excel templates. Select
          the import type, download the sample file, fill in your data, and
          upload it back here.
        </p>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Import Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Import Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setFile(null);
              setResult(null);
              setError("");
            }}
            className="block w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="assets">Assets</option>
            <option value="tickets">Tickets</option>
            <option value="simcards">SIM Cards</option>
          </select>
        </div>

        {/* Import Card */}
        <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Import {getTypeLabel()}
          </h2>
          <p className="text-xs text-slate-600 mb-4">{getDescription()}</p>

          <button
            type="button"
            onClick={handleDownloadTemplate}
            className="inline-flex items-center px-3 py-2 text-xs font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 mb-4"
          >
            Download {getTypeLabel()} Template
          </button>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Upload filled Excel (.xlsx)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="block w-full text-xs text-slate-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-900 file:text-white hover:file:bg-slate-800 border border-dashed border-slate-300 rounded-md cursor-pointer bg-white"
            />
          </div>

          <button
            type="button"
            onClick={handleImport}
            disabled={loadingType === selectedType}
            className={`inline-flex items-center px-4 py-2 text-xs font-semibold rounded-md text-white disabled:opacity-60 ${getButtonColor()}`}
          >
            {loadingType === selectedType
              ? "Importing..."
              : `Import ${getTypeLabel()}`}
          </button>

          {result && (
            <div className="mt-4 text-xs">
              <p className="font-semibold text-slate-800">
                Import summary ({getTypeLabel()})
              </p>
              <p className="text-slate-700">
                Success: <span className="font-mono">{result.success}</span>,
                Failed: <span className="font-mono">{result.failure}</span>
              </p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2 max-h-40 overflow-y-auto border border-slate-200 rounded-md p-2 bg-white">
                  {result.errors.map((err, idx) => (
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
  );
};

export default BulkImportPage;
