// // src/components/AssetTiger/AssetTigerList.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Chip,
//   Tooltip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert,
//   Grid,
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Delete as DeleteIcon,
//   Visibility as ViewIcon,
//   Close as CloseIcon,
//   Warning as WarningIcon,
// } from '@mui/icons-material';
// import { assetTigerService } from '../services/api';

// const AssetTigerList = ({ batchId: propBatchId }) => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(20);
//   const [totalElements, setTotalElements] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [batchToDelete, setBatchToDelete] = useState(null);
//   const [batches, setBatches] = useState([]);
//   const [selectedBatchId, setSelectedBatchId] = useState(propBatchId || '');
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (selectedBatchId) {
//       fetchAssets();
//     } else {
//       fetchAllAssets();
//     }
//     fetchBatches();
//   }, [page, rowsPerPage, selectedBatchId, searchQuery]);

//   const fetchAssets = async () => {
//     setLoading(true);
//     setError(null);
    
//     let result;
//     if (searchQuery) {
//       result = await assetTigerService.searchAssets(searchQuery, page, rowsPerPage);
//     } else if (selectedBatchId) {
//       result = await assetTigerService.getAssetsByBatch(selectedBatchId, page, rowsPerPage);
//     } else {
//       result = await assetTigerService.getAllAssets(page, rowsPerPage);
//     }
    
//     if (result.success) {
//       setAssets(result.data.content || []);
//       setTotalElements(result.data.totalElements || 0);
//       setTotalPages(result.data.totalPages || 0);
//     } else {
//       setError(result.message);
//     }
    
//     setLoading(false);
//   };

//   const fetchBatches = async () => {
//     const result = await assetTigerService.getImportBatches();
//     if (result.success) {
//       setBatches(result.data);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearch = () => {
//     setPage(0);
//     fetchAssets();
//   };

//   const handleViewDetails = (asset) => {
//     setSelectedAsset(asset);
//     setDialogOpen(true);
//   };

//   const handleDeleteBatch = async () => {
//     if (!batchToDelete) return;
    
//     const result = await assetTigerService.deleteBatch(batchToDelete);
//     if (result.success) {
//       fetchBatches();
//       if (selectedBatchId === batchToDelete) {
//         setSelectedBatchId('');
//         fetchAssets();
//       }
//       setDeleteDialogOpen(false);
//       setBatchToDelete(null);
//     } else {
//       setError(result.message);
//     }
//   };

//   const getMatchStatusChip = (status) => {
//     const colors = {
//       MATCHED: 'success',
//       PARTIAL_MATCH: 'warning',
//       NO_MATCH: 'error',
//       PENDING_REVIEW: 'info',
//     };
//     return <Chip label={status} color={colors[status] || 'default'} size="small" />;
//   };

//   return (
//     <Box>
//       <Card>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6">
//               {selectedBatchId ? `Batch Assets: ${selectedBatchId.slice(0, 8)}...` : 'All Imported Assets'}
//             </Typography>
//             <Box display="flex" gap={2}>
//               {batches.length > 0 && !propBatchId && (
//                 <select
//                   value={selectedBatchId}
//                   onChange={(e) => setSelectedBatchId(e.target.value)}
//                   style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
//                 >
//                   <option value="">All Batches</option>
//                   {batches.map((batch, idx) => (
//                     <option key={idx} value={batch.importBatchId}>
//                       {batch.importBatchId?.slice(0, 8)}...
//                     </option>
//                   ))}
//                 </select>
//               )}
//               {selectedBatchId && (
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => {
//                     setBatchToDelete(selectedBatchId);
//                     setDeleteDialogOpen(true);
//                   }}
//                 >
//                   Delete Batch
//                 </Button>
//               )}
//               <Button
//                 variant="outlined"
//                 size="small"
//                 startIcon={<RefreshIcon />}
//                 onClick={fetchAssets}
//               >
//                 Refresh
//               </Button>
//             </Box>
//           </Box>

//           <Box display="flex" gap={2} mb={2}>
//             <TextField
//               size="small"
//               placeholder="Search by Asset Tag, Serial No, or Description..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//               sx={{ flexGrow: 1 }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button variant="contained" onClick={handleSearch}>
//               Search
//             </Button>
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
//               {error}
//             </Alert>
//           )}

//           {loading ? (
//             <Box display="flex" justifyContent="center" p={4}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <>
//               <TableContainer component={Paper}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Asset Tag ID</TableCell>
//                       <TableCell>Serial No</TableCell>
//                       <TableCell>Description</TableCell>
//                       <TableCell>Brand</TableCell>
//                       <TableCell>Model</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Cost</TableCell>
//                       <TableCell>Match Status</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {assets.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={9} align="center">
//                           No assets found
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       assets.map((asset) => (
//                         <TableRow key={asset.assetTagId} hover>
//                           <TableCell>
//                             <Typography variant="body2" fontWeight="bold">
//                               {asset.assetTagId}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>{asset.serialNo}</TableCell>
//                           <TableCell>
//                             <Tooltip title={asset.description || ''}>
//                               <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
//                                 {asset.description}
//                               </Typography>
//                             </Tooltip>
//                           </TableCell>
//                           <TableCell>{asset.brand}</TableCell>
//                           <TableCell>{asset.model}</TableCell>
//                           <TableCell>
//                             <Chip label={asset.status || 'N/A'} size="small" />
//                           </TableCell>
//                           <TableCell>
//                             {asset.cost ? `$${asset.cost.toLocaleString()}` : 'N/A'}
//                           </TableCell>
//                           <TableCell>
//                             {getMatchStatusChip(asset.matchStatus)}
//                           </TableCell>
//                           <TableCell>
//                             <Tooltip title="View Details">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleViewDetails(asset)}
//                               >
//                                 <ViewIcon />
//                               </IconButton>
//                             </Tooltip>
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               <TablePagination
//                 rowsPerPageOptions={[10, 20, 50, 100]}
//                 component="div"
//                 count={totalElements}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Asset Details Dialog */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Asset Details
//           <IconButton
//             onClick={() => setDialogOpen(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedAsset && (
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Asset Tag ID</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.assetTagId}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Serial No</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.serialNo}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="text.secondary">Description</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.description || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Brand</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.brand || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Model</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.model || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Status</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.status || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Cost</Typography>
//                 <Typography variant="body1" gutterBottom>
//                   {selectedAsset.cost ? `$${selectedAsset.cost.toLocaleString()}` : 'N/A'}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Purchase Date</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.purchaseDate || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Department</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.department || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Location</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.location || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Site</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.site || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle2" color="text.secondary">Asset Type</Typography>
//                 <Typography variant="body1" gutterBottom>{selectedAsset.assetType || 'N/A'}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="subtitle2" color="text.secondary">Match Status</Typography>
//                 {getMatchStatusChip(selectedAsset.matchStatus)}
//               </Grid>
//               {selectedAsset.matchedProductionAssetId && (
//                 <Grid item xs={12}>
//                   <Alert severity="info" icon={<InfoIcon />}>
//                     Matched with Production Asset ID: {selectedAsset.matchedProductionAssetId}
//                   </Alert>
//                 </Grid>
//               )}
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Alert severity="warning" icon={<WarningIcon />}>
//             Are you sure you want to delete this batch? This action cannot be undone.
//           </Alert>
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Batch ID: {batchToDelete}
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDeleteBatch} color="error" variant="contained">
//             Delete Batch
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AssetTigerList;


// src/components/AssetTiger/AssetTigerList.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  Info as InfoIcon,  // Added missing import
} from '@mui/icons-material';
import { assetTigerService } from '../services/api';

const AssetTigerList = ({ batchId: propBatchId }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(propBatchId || '');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssets();
    fetchBatches();
  }, [page, rowsPerPage, selectedBatchId, searchQuery]);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);
    
    let result;
    if (searchQuery) {
      result = await assetTigerService.searchAssets(searchQuery, page, rowsPerPage);
    } else if (selectedBatchId) {
      result = await assetTigerService.getAssetsByBatch(selectedBatchId, page, rowsPerPage);
    } else {
      result = await assetTigerService.getAllAssets(page, rowsPerPage);
    }
    
    if (result.success) {
      setAssets(result.data.content || []);
      setTotalElements(result.data.totalElements || 0);
      setTotalPages(result.data.totalPages || 0);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const fetchBatches = async () => {
    const result = await assetTigerService.getImportBatches();
    if (result.success) {
      setBatches(result.data);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    fetchAssets();
  };

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setDialogOpen(true);
  };

  const handleDeleteBatch = async () => {
    if (!batchToDelete) return;
    
    const result = await assetTigerService.deleteBatch(batchToDelete);
    if (result.success) {
      fetchBatches();
      if (selectedBatchId === batchToDelete) {
        setSelectedBatchId('');
        fetchAssets();
      }
      setDeleteDialogOpen(false);
      setBatchToDelete(null);
    } else {
      setError(result.message);
    }
  };

  const getMatchStatusChip = (status) => {
    const colors = {
      MATCHED: 'success',
      PARTIAL_MATCH: 'warning',
      NO_MATCH: 'error',
      PENDING_REVIEW: 'info',
    };
    return <Chip label={status} color={colors[status] || 'default'} size="small" />;
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              {selectedBatchId ? `Batch Assets: ${selectedBatchId.slice(0, 8)}...` : 'All Imported Assets'}
            </Typography>
            <Box display="flex" gap={2}>
              {batches.length > 0 && !propBatchId && (
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                  <option value="">All Batches</option>
                  {batches.map((batch, idx) => (
                    <option key={idx} value={batch.importBatchId}>
                      {batch.importBatchId?.slice(0, 8)}...
                    </option>
                  ))}
                </select>
              )}
              {selectedBatchId && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setBatchToDelete(selectedBatchId);
                    setDeleteDialogOpen(true);
                  }}
                >
                  Delete Batch
                </Button>
              )}
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={fetchAssets}
              >
                Refresh
              </Button>
            </Box>
          </Box>

          <Box display="flex" gap={2} mb={2}>
            <TextField
              size="small"
              placeholder="Search by Asset Tag, Serial No, or Description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Asset Tag ID</TableCell>
                      <TableCell>Serial No</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Model</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Match Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assets.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          No assets found
                        </TableCell>
                      </TableRow>
                    ) : (
                      assets.map((asset) => (
                        <TableRow key={asset.assetTagId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {asset.assetTagId}
                            </Typography>
                          </TableCell>
                          <TableCell>{asset.serialNo}</TableCell>
                          <TableCell>
                            <Tooltip title={asset.description || ''}>
                              <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                                {asset.description}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                          <TableCell>{asset.brand}</TableCell>
                          <TableCell>{asset.model}</TableCell>
                          <TableCell>
                            <Chip label={asset.status || 'N/A'} size="small" />
                          </TableCell>
                          <TableCell>
                            {asset.cost ? `$${asset.cost.toLocaleString()}` : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {getMatchStatusChip(asset.matchStatus)}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewDetails(asset)}
                              >
                                <ViewIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 20, 50, 100]}
                component="div"
                count={totalElements}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Asset Details Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Asset Details
          <IconButton
            onClick={() => setDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedAsset && (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Tag ID</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.assetTagId}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Serial No</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.serialNo}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.description || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Brand</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.brand || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Model</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.model || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.status || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Cost</Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedAsset.cost ? `$${selectedAsset.cost.toLocaleString()}` : 'N/A'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Purchase Date</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.purchaseDate || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.department || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.location || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Site</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.site || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Asset Type</Typography>
                <Typography variant="body1" gutterBottom>{selectedAsset.assetType || 'N/A'}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">Match Status</Typography>
                {getMatchStatusChip(selectedAsset.matchStatus)}
              </Grid>
              {selectedAsset.matchedProductionAssetId && (
                <Grid item xs={12}>
                  <Alert severity="info" icon={<InfoIcon />}>
                    Matched with Production Asset ID: {selectedAsset.matchedProductionAssetId}
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Alert severity="warning" icon={<WarningIcon />}>
            Are you sure you want to delete this batch? This action cannot be undone.
          </Alert>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Batch ID: {batchToDelete}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteBatch} color="error" variant="contained">
            Delete Batch
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssetTigerList;