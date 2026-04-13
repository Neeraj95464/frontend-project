// src/components/AssetTiger/AssetTigerImport.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  LinearProgress,
  Stack,
  Chip,
  Grid,
  Paper,
  Divider,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { assetTigerService } from '../services/api';
import AssetTigerList from './AssetTigerList';

const AssetTigerImport = () => {
  const [file, setFile] = useState(null);
  const [batchName, setBatchName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [validateOnly, setValidateOnly] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        setFile(selectedFile);
        setError(null);
        // Auto-generate batch name if not set
        if (!batchName) {
          const defaultName = `Import_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`;
          setBatchName(defaultName);
        }
      } else {
        setError('Please select a valid Excel file (.xlsx or .xls)');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    if (!batchName.trim()) {
      setError('Please enter a batch name');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadResult(null);

    const result = await assetTigerService.importExcel(
      file,
      batchName,
      validateOnly,
      skipDuplicates
    );

    if (result.success) {
      setUploadResult(result.data);
      setShowResults(true);
      setSelectedBatchId(result.data.batchId);
    } else {
      setError(result.message || 'Failed to upload file');
    }

    setUploading(false);
  };

  const handleReset = () => {
    setFile(null);
    setBatchName('');
    setUploadResult(null);
    setError(null);
    setShowResults(false);
    setSelectedBatchId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'PARTIAL':
        return 'warning';
      case 'FAILED':
        return 'error';
      default:
        return 'info';
    }
  };

  const downloadErrorReport = () => {
    if (uploadResult?.errors && uploadResult.errors.length > 0) {
      const csvContent = [
        ['Row Number', 'Asset Tag ID', 'Field Name', 'Error Message', 'Raw Value'],
        ...uploadResult.errors.map(error => [
          error.rowNumber,
          error.assetTagId || 'N/A',
          error.fieldName || 'N/A',
          error.errorMessage,
          error.rawValue || 'N/A',
        ]),
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `import_errors_${uploadResult.batchId}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Asset Tiger Data Import
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Import asset data from Asset Tiger Excel exports (.xls or .xlsx format)
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Excel File
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  fullWidth
                >
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </Button>
                {file && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Batch Name
                </Typography>
                <input
                  type="text"
                  className="form-control"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  placeholder="Enter batch name"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={skipDuplicates}
                    onChange={(e) => setSkipDuplicates(e.target.checked)}
                  />
                  <Typography variant="body2">Skip duplicate Asset Tag IDs</Typography>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <input
                    type="checkbox"
                    checked={validateOnly}
                    onChange={(e) => setValidateOnly(e.target.checked)}
                  />
                  <Typography variant="body2">Validate only (don't save to database)</Typography>
                </label>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={!file || uploading}
                  fullWidth
                >
                  {uploading ? 'Uploading...' : validateOnly ? 'Validate File' : 'Import'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={uploading}
                >
                  Reset
                </Button>
              </Stack>

              {uploading && <LinearProgress sx={{ mt: 2 }} />}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          {uploadResult && (
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    Import Results
                  </Typography>
                  <IconButton onClick={() => setShowResults(!showResults)} size="small">
                    {showResults ? <CloseIcon /> : <InfoIcon />}
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                      <Typography variant="h4">{uploadResult.totalRecords}</Typography>
                      <Typography variant="caption">Total Records</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
                      <Typography variant="h4" color="success.main">
                        {uploadResult.successCount}
                      </Typography>
                      <Typography variant="caption">Successful</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#ffebee' }}>
                      <Typography variant="h4" color="error.main">
                        {uploadResult.errorCount}
                      </Typography>
                      <Typography variant="caption">Errors</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
                      <Typography variant="h4" color="warning.main">
                        {uploadResult.duplicateCount}
                      </Typography>
                      <Typography variant="caption">Duplicates</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                  <Chip
                    label={`Status: ${uploadResult.status}`}
                    color={getStatusColor(uploadResult.status)}
                  />
                  <Chip
                    label={`Batch ID: ${uploadResult.batchId.slice(0, 8)}...`}
                    variant="outlined"
                  />
                  <Typography variant="caption">
                    Completed: {new Date(uploadResult.completedAt).toLocaleString()}
                  </Typography>
                  {uploadResult.statistics?.totalValue && (
                    <Typography variant="body2" fontWeight="bold">
                      Total Value: ${uploadResult.statistics.totalValue.toLocaleString()}
                    </Typography>
                  )}
                </Stack>

                {uploadResult.errors && uploadResult.errors.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={downloadErrorReport}
                      size="small"
                    >
                      Download Error Report ({uploadResult.errors.length} errors)
                    </Button>
                    
                    <Collapse in={showResults}>
                      <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 300 }}>
                        <Table size="small" stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>Row</TableCell>
                              <TableCell>Asset Tag</TableCell>
                              <TableCell>Field</TableCell>
                              <TableCell>Error</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {uploadResult.errors.slice(0, 50).map((error, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{error.rowNumber}</TableCell>
                                <TableCell>{error.assetTagId || 'N/A'}</TableCell>
                                <TableCell>{error.fieldName || 'N/A'}</TableCell>
                                <TableCell>{error.errorMessage}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Collapse>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Display imported data if batch is selected */}
      {selectedBatchId && (
        <Box sx={{ mt: 4 }}>
          <AssetTigerList batchId={selectedBatchId} />
        </Box>
      )}
    </Box>
  );
};

export default AssetTigerImport;