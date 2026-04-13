// src/components/AssetTiger/AssetTigerReports.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { assetTigerService } from '../services/api';

const AssetTigerReports = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    const result = await assetTigerService.getImportBatches();
    if (result.success) {
      setBatches(result.data);
    }
  };

  const fetchBatchStats = async () => {
    if (!selectedBatch) return;
    setLoading(true);
    const result = await assetTigerService.getBatchStats(selectedBatch);
    if (result.success) {
      setStats(result.data);
    }
    setLoading(false);
  };

  // Sample data - you'll need to implement actual statistics endpoint
  const statusData = [
    { name: 'Matched', value: 45, color: '#4caf50' },
    { name: 'No Match', value: 30, color: '#f44336' },
    { name: 'Pending', value: 25, color: '#ff9800' },
  ];

  const departmentData = [
    { name: 'IT', assets: 50 },
    { name: 'HR', assets: 20 },
    { name: 'Finance', assets: 35 },
    { name: 'Operations', assets: 45 },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" gap={2} alignItems="center">
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Select Batch</InputLabel>
                  <Select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    label="Select Batch"
                  >
                    <MenuItem value="">All Batches</MenuItem>
                    {batches.map((batch, idx) => (
                      <MenuItem key={idx} value={batch.importBatchId}>
                        {batch.importBatchId?.slice(0, 8)}...
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={fetchBatchStats}
                  disabled={!selectedBatch}
                >
                  Generate Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {loading ? (
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Match Status Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Assets by Department
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="assets" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Import Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">150</Typography>
                        <Typography variant="caption">Total Assets</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">$250K</Typography>
                        <Typography variant="caption">Total Value</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">5</Typography>
                        <Typography variant="caption">Departments</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={3}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4">3</Typography>
                        <Typography variant="caption">Locations</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default AssetTigerReports;