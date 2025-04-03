import AddAsset from "./components/AddAsset";
import AssetFormModal from "./components/AssetFormModal";
import AssetList from "./components/AssetList";
import AssetPhotos from "./components/AssetPhoto";
import AssetStatusPage from "./components/AssetStatusPage";
import AssignAssetModal from "./components/AssignAssetModel";
import CheckInModal from "./components/CheckInModal";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import EditAsset from "./components/EditAsset";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import SearchResults from "./components/SearchResult";
import Sidebar from "./components/Sidebar";
import SingleAsset from "./components/SingleAsset";
import UsersList from "./components/UsersList";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminTicketingPortal from "./components/AdminTicketingPortal";
import ContractPage from "./components/ContractPage";
import NormalUserAsset from "./components/NormalUserAsset";
import TicketingPortal from "./components/TicketingPortal";

// Add this inside your main component
<ToastContainer position="top-right" autoClose={3000} />;

const App = () => {
  // State for modal and mobile menu toggle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle functions
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Router>
      {/* Root container with full-screen height, scrollable content */}
      <div className="h-screen overflow-auto bg-gray-100 flex flex-col">
        {/* Mobile Menu component */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          toggleSidebar={toggleMobileMenu}
        />

        {/* Header with menu toggle */}
        <Header onMenuClick={toggleMobileMenu} />

        {/* Main content area with a sidebar and dynamic routes */}
        <div className="flex lg:flex-1">
          {/* Sidebar component */}
          <Sidebar />

          {/* Main content (routes render here) */}
          <div className="lg:flex-1 p-4 bg-white rounded-lg shadow-lg">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assets" element={<AssetList />} />
              <Route path="/user-assets" element={<NormalUserAsset />} />
              <Route path="/assets/:status" element={<AssetStatusPage />} />
              <Route path="/assets/edit/:id" element={<EditAsset />} />
              <Route path="/add-asset" element={<AddAsset />} />

              <Route path="/contracts" element={<ContractPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ticket" element={<TicketingPortal />} />
              <Route path="/ticket/admin" element={<AdminTicketingPortal />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/asset/:id" element={<SingleAsset />} />
              <Route path="/asset/assign" element={<AssignAssetModal />} />
              <Route path="/asset/checkin" element={<CheckInModal />} />
              <Route path="/edit-user/:userId" element={<EditUser />} />
              <Route path="/photo/:assetTag" element={<AssetPhotos />} />
              <Route
                path="/search-results/:query"
                element={<SearchResults />}
              />
              <Route path="/create-user" element={<CreateUser />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Asset Form Modal (only renders if modal is open) */}
      {isModalOpen && <AssetFormModal onClose={toggleModal} />}
    </Router>
  );
};

export default App;
