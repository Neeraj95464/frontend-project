import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import AddAsset from "./components/AddAsset";
import AdminTicketingPortal from "./components/AdminTicketingPortal";
import AssetFormModal from "./components/AssetFormModal";
import AssetList from "./components/AssetList";
import AssetPhotos from "./components/AssetPhoto";
import AssetStatusPage from "./components/AssetStatusPage";
import AssignAssetModal from "./components/AssignAssetModel";
import CheckInModal from "./components/CheckInModal";
import ContractPage from "./components/ContractPage";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import EditAsset from "./components/EditAsset";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import NormalUserAsset from "./components/NormalUserAsset";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SearchResults from "./components/SearchResult";
import Sidebar from "./components/Sidebar";
import SingleAsset from "./components/SingleAsset";
import TicketingPortal from "./components/TicketingPortal";
import Unauthorized from "./components/Unauthorized";
import UsersList from "./components/UsersList";
import VendorListPage from "./components/VendorListPage";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Router>
      <div className="h-screen overflow-auto bg-gray-100 flex flex-col">
        {/* Mobile Header */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          toggleSidebar={toggleMobileMenu}
        />
        <Header onMenuClick={toggleMobileMenu} />

        {/* Main layout */}
        <div className="flex lg:flex-1">
          <Sidebar />
          <div className="lg:flex-1 p-4 bg-white rounded-lg shadow-lg">
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* // Inside <Routes> */}
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route
                path="/assets"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <AssetList />
                  </PrivateRoute>
                }
              />

              <Route
                path="/add-asset"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <AddAsset />
                  </PrivateRoute>
                }
              />
              <Route
                path="/assets/:status"
                element={
                  <PrivateRoute>
                    <AssetStatusPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/assets/edit/:id"
                element={
                  <PrivateRoute>
                    <EditAsset />
                  </PrivateRoute>
                }
              />
              <Route
                path="/asset/:id"
                element={
                  <PrivateRoute>
                    <SingleAsset />
                  </PrivateRoute>
                }
              />
              <Route
                path="/photo/:assetTag"
                element={
                  <PrivateRoute>
                    <AssetPhotos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/search-results/:query"
                element={
                  <PrivateRoute>
                    <SearchResults />
                  </PrivateRoute>
                }
              />
              <Route
                path="/asset/assign"
                element={
                  <PrivateRoute>
                    <AssignAssetModal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/asset/checkin"
                element={
                  <PrivateRoute>
                    <CheckInModal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contracts"
                element={
                  <PrivateRoute>
                    <ContractPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/vendors"
                element={
                  <PrivateRoute>
                    <VendorListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ticket"
                element={
                  <PrivateRoute>
                    <TicketingPortal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ticket/admin"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <AdminTicketingPortal />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-assets"
                element={
                  <PrivateRoute allowedRoles={["USER", "ADMIN", "MANAGER"]}>
                    <NormalUserAsset />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-user"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <CreateUser />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-user/:userId"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <EditUser />
                  </PrivateRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                    <UsersList />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Global Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Optional Modal */}
      {isModalOpen && <AssetFormModal onClose={toggleModal} />}
    </Router>
  );
};

export default App;
