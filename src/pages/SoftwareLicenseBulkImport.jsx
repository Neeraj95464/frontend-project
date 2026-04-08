// pages/SoftwareLicenseBulkImport.jsx
import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Loader,
  TrendingUp,
  Package,
  AlertTriangle,
  FileText,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Globe,
  Phone as PhoneIcon,
  User,
  Hash
} from 'lucide-react';
import { importSoftwareLicenses } from '../services/api';

const SoftwareLicenseBulkImport = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls'))) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid Excel file (.xlsx or .xls)');
      setFile(null);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select a valid Excel file (.xlsx or .xls)');
      setFile(null);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setUploading(true);
    setError(null);
    
    const response = await importSoftwareLicenses(file);
    
    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.message || 'Failed to import software licenses');
    }
    
    setUploading(false);
  };

  // Download demo template
  const downloadExcelTemplate = () => {
    // Create sample data with headers
    const sampleData = [
      [
        'Title', 'Description', 'Contract No', 'Cost', 'Vendor Name', 
        'Site Name', 'Location Name', 'Renewal Frequency', 'Start Date', 
        'End Date', 'Hyperlink', 'Contact Person', 'Phone', 'Total Licenses', 
        'Software Category', 'Status', 'Notes'
      ],
      [
        'Microsoft 365 Business Premium', 'Complete office suite with cloud services', 'MSFT-2024-001', '5000', 
        'Microsoft Corporation', 'Head Office', 'Bowenpally-MB', 'YEARLY', '2024-01-01', 
        '2024-12-31', 'https://admin.microsoft.com', 'John Doe', '+91 9876543210', '100', 
        'SAAS', 'ACTIVE', 'Premium license with 1TB storage'
      ],
      [
        'Adobe Creative Cloud', 'Design and creative software suite', 'ADBE-2024-002', '3500', 
        'Adobe Systems', 'Branch Office', 'Madhapur-MB', 'MONTHLY', '2024-03-01', 
        '2025-02-28', 'https://admin.adobe.com', 'Jane Smith', '+91 9876543211', '25', 
        'DESIGN', 'ACTIVE', 'Includes Photoshop, Illustrator, Premiere Pro'
      ],
      [
        'Zoom Business', 'Video conferencing platform', 'ZOOM-2024-003', '1200', 
        'Zoom Video Communications', 'Remote Office', 'Gachibowli-MB', 'QUARTERLY', '2024-02-01', 
        '2024-07-31', 'https://zoom.us', 'Mike Johnson', '+91 9876543212', '50', 
        'COMMUNICATION', 'EXPIRING_SOON', '500 participants allowed'
      ],
      [
        'Salesforce Enterprise', 'CRM and sales management', 'SF-2024-004', '8000', 
        'Salesforce Inc', 'Head Office', 'Bowenpally-MB', 'YEARLY', '2024-01-15', 
        '2025-01-14', 'https://salesforce.com', 'Sarah Wilson', '+91 9876543213', '75', 
        'CRM', 'ACTIVE', 'Enterprise edition with API access'
      ],
      [
        'Google Workspace', 'Email and collaboration tools', 'GOOG-2024-005', '2400', 
        'Google LLC', 'Branch Office', 'Madhapur-MB', 'MONTHLY', '2024-03-10', 
        '2024-06-09', 'https://admin.google.com', 'Robert Brown', '+91 9876543214', '60', 
        'PRODUCTIVITY', 'ACTIVE', 'Business Standard plan'
      ]
    ];

    // Convert to CSV with proper encoding
    const csvContent = sampleData.map(row => 
      row.map(cell => {
        const cellStr = String(cell);
        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      }).join(',')
    ).join('\n');

    // Add BOM for UTF-8 to handle special characters
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'software_license_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setUploading(false);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toUpperCase()) {
      case 'ACTIVE': return 'text-green-600 bg-green-50';
      case 'EXPIRED': return 'text-red-600 bg-red-50';
      case 'EXPIRING_SOON': return 'text-yellow-600 bg-yellow-50';
      case 'SUSPENDED': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bulk Software License Import</h1>
          <p className="text-lg text-gray-600">Upload multiple software licenses at once using Excel/CSV file</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="space-y-6">
            {/* Upload Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload File
                </h2>
              </div>
              
              <div className="p-6">
                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : file 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {file ? (
                    <div className="space-y-3">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                      <p className="text-green-600 font-medium">File selected successfully!</p>
                      <p className="text-gray-700 font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                      <button
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700 text-sm underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600">Drag & drop your Excel file here</p>
                      <p className="text-gray-400 text-sm">or</p>
                      <label
                        htmlFor="fileUpload"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                      >
                        Browse Files
                      </label>
                      <p className="text-gray-400 text-xs">Supported format: .xlsx, .xls, .csv</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      !file || uploading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {uploading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Uploading & Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload & Import
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {/* Demo Download */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Download className="w-5 h-5 text-indigo-600 mt-0.5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Need a template?</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Download our demo template file with sample data and correct format
                        </p>
                        <button
                          onClick={downloadExcelTemplate}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Download Demo Template (CSV)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    File Format Instructions:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Required Fields:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Title (Software name)</li>
                        <li>Vendor Name</li>
                        <li>Site Name</li>
                        <li>Location Name</li>
                        <li>Total Licenses</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">Valid Values:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Status: ACTIVE, EXPIRED, EXPIRING_SOON, SUSPENDED</li>
                        <li>Renewal: MONTHLY, QUARTERLY, YEARLY</li>
                        <li>Category: SAAS, DESIGN, CRM, COMMUNICATION, PRODUCTIVITY, SECURITY</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Note: Vendor, Site, and Location names are matched automatically (case-insensitive)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-800">Upload Failed</h3>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-indigo-500">
                    <div className="flex items-center justify-between mb-2">
                      <Package className="w-8 h-8 text-indigo-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.totalRecords}</span>
                    </div>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.successCount}</span>
                    </div>
                    <p className="text-sm text-gray-600">Successful</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-md p-4 border-t-4 border-red-500">
                    <div className="flex items-center justify-between mb-2">
                      <XCircle className="w-8 h-8 text-red-500" />
                      <span className="text-2xl font-bold text-gray-800">{result.failureCount}</span>
                    </div>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Import Success Rate</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                          Success Rate
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-indigo-600">
                          {result.totalRecords > 0 
                            ? ((result.successCount / result.totalRecords) * 100).toFixed(1)
                            : 0}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                      <div
                        style={{ width: `${result.totalRecords > 0 ? (result.successCount / result.totalRecords) * 100 : 0}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{result.message}</p>
                </div>

                {/* Failed Records Table */}
                {result.failedRecords && result.failedRecords.length > 0 && (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Failed Records ({result.failedRecords.length})
                      </h3>
                    </div>
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Row No.
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Error Message
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {result.failedRecords.map((failed, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {failed.rowNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {failed.title}
                              </td>
                              <td className="px-6 py-4 text-sm text-red-600">
                                {failed.errorMessage}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {result.successCount > 0 && (
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-green-800">Import Successful!</h3>
                        <p className="text-green-700 mt-1">
                          Successfully imported {result.successCount} software licenses. 
                          {result.failureCount > 0 && ` ${result.failureCount} records failed.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Empty State */}
            {!result && !error && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Import Results Yet</h3>
                <p className="text-gray-500">
                  Upload an Excel file to see import results here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-indigo-500" />
            Tips for Successful Import
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Vendor Names</p>
                <p className="text-gray-500">Use exact vendor names as in system for best matching</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Site & Location</p>
                <p className="text-gray-500">Site and location names are matched automatically</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Date Format</p>
                <p className="text-gray-500">Use YYYY-MM-DD format for dates (e.g., 2024-01-01)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Cost Format</p>
                <p className="text-gray-500">Use numbers only (e.g., 5000, not $5,000)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Contract Number</p>
                <p className="text-gray-500">Must be unique across all licenses</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-indigo-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-700">Hyperlink</p>
                <p className="text-gray-500">Include full URL with https://</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareLicenseBulkImport;