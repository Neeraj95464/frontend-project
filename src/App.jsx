
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import AddAsset from "./components/AddAsset";
import AddCugSim from "./components/AddCugSim";
import AdminTicketingPortal from "./pages/AdminTicketingPortal";
import AssetFormModal from "./components/AssetFormModal";
import AssetPhotos from "./components/AssetPhoto";
import AssetStatusPage from "./components/AssetStatusPage";
import AssignAssetModal from "./components/AssignAssetModel";
import CheckInModal from "./components/CheckInModal";
import ContactUsSection from "./components/ContactUsSection";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import EditAsset from "./components/EditAsset";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Login from "./components/Login";
import NormalUserAsset from "./components/NormalUserAsset";
import NotFound from "./components/NotFound";
import PrintAssetTags from "./components/PrintAssetTags";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SearchResults from "./components/SearchResult";
import Sidebar from "./components/Sidebar";
import SingleAsset from "./pages/SingleAsset";
import SiteLocationManager from "./components/SiteLocationManager";
import TicketingPortal from "./pages/TicketingPortal";
import Unauthorized from "./components/Unauthorized";
import Updates from "./pages/Updates"
import UsersList from "./components/UsersList";
import VendorListPage from "./components/VendorListPage";
import Reports from "./components/reports";
import AssetAcceptance from "./pages/AssetAcceptance";
import AssetList from "./pages/AssetList";
import BulkImportPage from "./pages/BulkImportPage";
import ChildAssetsPage from "./pages/ChildAssetsPage";
import CugSimDetails from "./pages/CugSimDetails";
import CugSimList from "./pages/CugSimList";
import EmployeeOnboardingPage from "./pages/EmployeeOnboardingPage";
import MyAssetsPage from "./pages/MyAssetsPage";
import PrintPage from "./pages/PrintPage";
import SoftwareLicensePage from "./pages/SoftwareLicensePage";
import UsersPage from "./pages/UsersPage";
import AssigneeDashboard from "./pages/AssigneeDashboard";
import Settings from "./pages/settings";
import TicketResponseReport from "./pages/TicketResponsesReport";
import KnowledgePage from "./pages/KnowledgePage";
import InactiveUsersAssetReport from "./pages/InactiveUsersAssetReport";
import MultipleAssignmentReport from "./pages/MultipleAssignmentReport";
import VendorBulkImport from "./pages/VendorBulkImport";
import SoftwareLicenseBulkImport from "./pages/SoftwareLicenseBulkImport";
import AcknowledgementDownload from "./pages/AcknowledgementDownload";
import AssetTigerManagement from "./pages/AssetTigerManagement";
import Agents from "./pages/Agents";
import UnmatchedAssetsReport from "./pages/UnmatchedAssetsReport";
import HRDashboard from "./pages/HRDashboard";
import EmployeeAcceptance from "./pages/EmployeeAcceptance";
import EmployeeDashboard from "./pages/EmployeeDashboard";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
        <Header onMenuClick={toggleMobileMenu} />

        <div className="flex flex-1 min-h-0 relative">
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu}
          />

          {/* Main content area with proper sidebar spacing */}
          <main className="flex-1 min-w-0 overflow-x-hidden">
            {/* Add padding-left on desktop to account for fixed sidebar */}
            <div className="lg:pl-52">
              <div className="p-2 sm:p-3 md:p-4">
                <div className="bg-white rounded-lg shadow-lg overflow-x-hidden">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/print-tags" element={<PrintPage />} />
                    <Route
                      path="/asset-acceptance/:token"
                      element={<AssetAcceptance />}
                    />

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

                    <Route
                      path="/contact-admin"
                      element={
                        <PrivateRoute>
                          <ContactUsSection />
                        </PrivateRoute>
                      }
                    />

                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route
                      path="/assets"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "EXECUTIVE"]}
                        >
                          <AssetList />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/child-assets"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "EXECUTIVE"]}
                        >
                          <ChildAssetsPage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/reports/assignees"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "HR_ADMIN","MANAGER"]}
                        >
                          <AssigneeDashboard />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/cug-sim"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "ADMIN",
                            "MANAGER",
                            "IT",
                            "EXECUTIVE",
                            "HR_ADMIN",
                          ]}
                        >
                          <CugSimList />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/myassets"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "ADMIN",
                            "MANAGER",
                            "HR_ADMIN",
                            "IT",
                            "USER",
                            "EXECUTIVE",
                          ]}
                        >
                          <MyAssetsPage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/cug-sim/add"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
                          <AddCugSim />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/asset-tiger/management"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                          <AssetTigerManagement />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/report/inactive-users-assets"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER","HR_ADMIN"]}>
                          <InactiveUsersAssetReport />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/report/asset-tiger/matching/reports"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                          <UnmatchedAssetsReport />
                        </PrivateRoute>
                      }
                    />

                    <Route path="/hr/employee-items" element={<HRDashboard />} />
        <Route path="/employee-items/accept/:token" element={<EmployeeAcceptance />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />

                    <Route
                      path="/report/multiple-assignments"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER","HR_ADMIN"]}>
                          <MultipleAssignmentReport />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/contractsandlicences"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN","MANAGER"]}>
                          <SoftwareLicensePage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/cug-sim/:id"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "IT", "EXECUTIVE"]}
                        >
                          <CugSimDetails />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/add-asset"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "EXECUTIVE"]}
                        >
                          <AddAsset />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/bulk-imports"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                          <BulkImportPage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/vendor/bulk-imports"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                          <VendorBulkImport />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/softwarelicense/bulk-imports"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                          <SoftwareLicenseBulkImport />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/acknowledgementdownload"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                          <AcknowledgementDownload />
                        </PrivateRoute>
                      }
                    />
                    
                    <Route
                      path="/agents"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN"]}>
                          <Agents />
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
                          <SingleAsset/>
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
                      path="/updates"
                      element={
                        <PrivateRoute>
                          <KnowledgePage />
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
                      path="/settings"
                      element={
                        <PrivateRoute allowedRoles={["ADMIN","MANAGER","HR_ADMIN"]}>
                          <Settings />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/sites"
                      element={
                        <PrivateRoute>
                          <SiteLocationManager />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/tickets/reports/feedback"
                      element={
                        <PrivateRoute>
                          <Reports />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/tickets/reports/responses"
                      element={
                        <PrivateRoute>
                          <TicketResponseReport />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/ticket"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "ADMIN",
                            "MANAGER",
                            "USER",
                            "HR_ADMIN",
                            "EXECUTIVE",
                          ]}
                        >
                          <TicketingPortal />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/ticket/admin"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}
                        >
                          <AdminTicketingPortal />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/user-assets"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "USER",
                            "ADMIN",
                            "MANAGER",
                            "HR_ADMIN",
                            "EXECUTIVE",
                          ]}
                        >
                          <NormalUserAsset />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/onboarding"
                      element={
                        <PrivateRoute allowedRoles={["HR_ADMIN"]}>
                          <EmployeeOnboardingPage />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/create-user"
                      element={
                        <PrivateRoute
                          allowedRoles={["ADMIN", "MANAGER", "EXECUTIVE"]}
                        >
                          <CreateUser />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/edit-user/:userId"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "ADMIN",
                            "MANAGER",
                            "HR_ADMIN",
                            "EXECUTIVE",
                          ]}
                        >
                          <EditUser />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/users"
                      element={
                        <PrivateRoute
                          allowedRoles={[
                            "ADMIN",
                            "MANAGER",
                            "HR_ADMIN",
                            "EXECUTIVE",
                          ]}
                        >
                          <UsersPage />
                        </PrivateRoute>
                      }
                    />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Global Toasts */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        className="responsive-toast"
      />

      {/* Optional Modal */}
      {isModalOpen && <AssetFormModal onClose={toggleModal} />}
    </Router>
  );
};

export default App;