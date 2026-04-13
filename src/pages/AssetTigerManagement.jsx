// src/pages/AssetTigerManagement.jsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import {
  CloudUpload as ImportIcon,
  List as ListIcon,
  Assessment as ReportIcon,
} from '@mui/icons-material';
import AssetTigerImport from '../components/AssetTigerImport';
import AssetTigerList from '../components/AssetTigerList';
import AssetTigerReports from '../components/AssetTigerReports';
// import AssetTigerReports from '../components/AssetTigerReports';

const AssetTigerManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Asset Tiger Migration Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Import, manage, and analyze Asset Tiger data for migration to your internal portal
        </Typography>
      </Paper>

      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<ImportIcon />} label="Import Data" />
          <Tab icon={<ListIcon />} label="View Assets" />
          <Tab icon={<ReportIcon />} label="Reports & Analytics" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <AssetTigerImport />}
          {activeTab === 1 && <AssetTigerList />}
          {activeTab === 2 && <AssetTigerReports />}
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default AssetTigerManagement;