import * as XLSX from "xlsx";

export const generateDemoTemplate = () => {
  const wb = XLSX.utils.book_new();

  const headers = [
    "employeeId",
    "username",
    "profEmail",
    "personalEmail",
    "phone",
    "department",
    "site",
    "location",
    "aadhar",
    "pan",
    "note",
    "CUG/SIM",
    "Laptop/Desktop",
    "EmailSetup",
  ];

  const sampleData = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", ""], // Empty row for styling
    headers,
    [
      "EMP001",
      "john.doe",
      "john@company.com",
      "john@gmail.com",
      "9876543210",
      "IT",
      "HQ",
      "Floor1",
      "123456789012",
      "ABCDE1234F",
      "New developer joining",
      "YES",
      "YES",
      "NO",
    ],
    [
      "EMP002",
      "jane.smith",
      "jane@company.com",
      "jane@yahoo.com",
      "9876543211",
      "HR",
      "Branch1",
      "Floor2",
      "",
      "",
      "Manager role",
      "NO",
      "YES",
      "YES",
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(sampleData);

  // Auto-size columns
  const colWidths = headers.map((h) => ({ wch: Math.max(12, h.length + 2) }));
  ws["!cols"] = colWidths;

  // Header styling
  ws[XLSX.utils.encode_cell({ r: 1, c: 0 })].s = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "4472C4" } },
    alignment: { horizontal: "center", vertical: "center" },
  };

  // Sample data styling
  for (let col = 11; col <= 13; col++) {
    const cell = XLSX.utils.encode_cell({ r: 2, c: col });
    if (ws[cell]) ws[cell].s = { font: { bold: true } };
  }

  XLSX.utils.book_append_sheet(wb, ws, "Employee Onboarding");

  // Write to blob
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  return new Blob([wbout], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
};
