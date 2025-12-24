import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import AddAsset from "./components/AddAsset";
import AddCugSim from "./components/AddCugSim";
import AdminTicketingPortal from "./components/AdminTicketingPortal";
import AssetFormModal from "./components/AssetFormModal";
import AssetList from "./components/AssetList";
import AssetPhotos from "./components/AssetPhoto";
import AssetStatusPage from "./components/AssetStatusPage";
import AssignAssetModal from "./components/AssignAssetModel";
import CheckInModal from "./components/CheckInModal";
import ContactUsSection from "./components/ContactUsSection";
import ContractPage from "./components/ContractPage";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import EditAsset from "./components/EditAsset";
import EditUser from "./components/EditUser";
import Header from "./components/Header";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import MyAssetsPage from "./components/MyAssetsPage";
import NormalUserAsset from "./components/NormalUserAsset";
import NotFound from "./components/NotFound";
import PrintAssetTags from "./components/PrintAssetTags";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/Profile";
import Register from "./components/Register";
import SearchResults from "./components/SearchResult";
import Sidebar from "./components/Sidebar";
import SingleAsset from "./components/SingleAsset";
import SiteLocationManager from "./components/SiteLocationManager";
import TicketingPortal from "./components/TicketingPortal";
import Unauthorized from "./components/Unauthorized";
import Updates from "./components/Updates";
import UsersList from "./components/UsersList";
import VendorListPage from "./components/VendorListPage";
import Reports from "./components/reports";
import Settings from "./components/settings";
import BulkImportPage from "./pages/BulkImportPage";
import CugSimDetails from "./pages/CugSimDetails";
import CugSimList from "./pages/CugSimList";
import EmployeeOnboardingPage from "./pages/EmployeeOnboardingPage";
import PrintPage from "./pages/PrintPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // return (
  //   <Router>
  //     <div className="h-screen overflow-auto bg-gray-100 flex flex-col">
  //       <MobileMenu
  //         isOpen={isMobileMenuOpen}
  //         toggleSidebar={toggleMobileMenu}
  //       />
  //       <Header onMenuClick={toggleMobileMenu} />

  //       <div className="flex lg:flex-1">
  //         <Sidebar />
  //         <div className="lg:flex-1 p-4 bg-white rounded-lg shadow-lg">
  //           <Routes>
  //             <Route path="/login" element={<Login />} />
  //             <Route path="/register" element={<Register />} />

  //             <Route path="/print-tags" element={<PrintPage />} />

  //             <Route
  //               path="/"
  //               element={
  //                 <PrivateRoute>
  //                   <Dashboard />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/profile"
  //               element={
  //                 <PrivateRoute>
  //                   <Profile />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/contact-admin"
  //               element={
  //                 <PrivateRoute>
  //                   <ContactUsSection />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route path="/unauthorized" element={<Unauthorized />} />

  //             <Route
  //               path="/assets"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
  //                   <AssetList />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/cug-sim"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
  //                   <CugSimList />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/myassets"
  //               element={
  //                 <PrivateRoute
  //                   allowedRoles={["ADMIN", "MANAGER", "IT", "USER"]}
  //                 >
  //                   <MyAssetsPage />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/cug-sim/add"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
  //                   <AddCugSim />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/cug-sim/:id"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
  //                   <CugSimDetails />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/add-asset"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
  //                   <AddAsset />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/bulk-imports"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
  //                   <BulkImportPage />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/assets/:status"
  //               element={
  //                 <PrivateRoute>
  //                   <AssetStatusPage />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/assets/edit/:id"
  //               element={
  //                 <PrivateRoute>
  //                   <EditAsset />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/asset/:id"
  //               element={
  //                 <PrivateRoute>
  //                   <SingleAsset />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/photo/:assetTag"
  //               element={
  //                 <PrivateRoute>
  //                   <AssetPhotos />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/search-results/:query"
  //               element={
  //                 <PrivateRoute>
  //                   <SearchResults />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/asset/assign"
  //               element={
  //                 <PrivateRoute>
  //                   <AssignAssetModal />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/asset/checkin"
  //               element={
  //                 <PrivateRoute>
  //                   <CheckInModal />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/contracts"
  //               element={
  //                 <PrivateRoute>
  //                   <ContractPage />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/updates"
  //               element={
  //                 <PrivateRoute>
  //                   <Updates />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/vendors"
  //               element={
  //                 <PrivateRoute>
  //                   <VendorListPage />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/settings"
  //               element={
  //                 <PrivateRoute>
  //                   <Settings />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/sites"
  //               element={
  //                 <PrivateRoute>
  //                   <SiteLocationManager />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/reports"
  //               element={
  //                 <PrivateRoute>
  //                   <Reports />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/ticket"
  //               element={
  //                 <PrivateRoute
  //                   allowedRoles={["ADMIN", "MANAGER", "USER", "HR_ADMIN"]}
  //                 >
  //                   <TicketingPortal />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/ticket/admin"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}>
  //                   <AdminTicketingPortal />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/user-assets"
  //               element={
  //                 <PrivateRoute
  //                   allowedRoles={["USER", "ADMIN", "MANAGER", "HR_ADMIN"]}
  //                 >
  //                   <NormalUserAsset />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/onboarding"
  //               element={
  //                 <PrivateRoute allowedRoles={["HR_ADMIN"]}>
  //                   <EmployeeOnboardingPage />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/create-user"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
  //                   <CreateUser />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route
  //               path="/edit-user/:userId"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}>
  //                   <EditUser />
  //                 </PrivateRoute>
  //               }
  //             />

  //             <Route
  //               path="/users"
  //               element={
  //                 <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}>
  //                   <UsersPage />
  //                 </PrivateRoute>
  //               }
  //             />
  //             <Route path="*" element={<NotFound />} />
  //           </Routes>
  //         </div>
  //       </div>
  //     </div>

  //     <ToastContainer position="top-right" autoClose={3000} />

  //     {isModalOpen && <AssetFormModal onClose={toggleModal} />}
  //   </Router>
  // );

  return (
    <Router>
      {/* App wrapper: full height, column */}
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Mobile Header */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          toggleSidebar={toggleMobileMenu}
        />
        <Header onMenuClick={toggleMobileMenu} />

        {/* Main layout */}
        <div className="flex flex-1 min-h-0">
          <Sidebar />

          {/* Main content: white card that fills remaining height */}
          <div className="flex-1 p-4">
            <div className="h-full bg-white rounded-lg shadow-lg flex flex-col min-h-0">
              {/* Routes must be INSIDE this div */}
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/print-tags" element={<PrintPage />} />

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
                    <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                      <AssetList />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/cug-sim"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
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
                  path="/cug-sim/:id"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN", "MANAGER", "IT"]}>
                      <CugSimDetails />
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
                  path="/bulk-imports"
                  element={
                    <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                      <BulkImportPage />
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
                  path="/updates"
                  element={
                    <PrivateRoute>
                      <Updates />
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
                    <PrivateRoute>
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
                  path="/reports"
                  element={
                    <PrivateRoute>
                      <Reports />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/ticket"
                  element={
                    <PrivateRoute
                      allowedRoles={["ADMIN", "MANAGER", "USER", "HR_ADMIN"]}
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
                      allowedRoles={["USER", "ADMIN", "MANAGER", "HR_ADMIN"]}
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
                    <PrivateRoute allowedRoles={["ADMIN", "MANAGER"]}>
                      <CreateUser />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/edit-user/:userId"
                  element={
                    <PrivateRoute
                      allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}
                    >
                      <EditUser />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/users"
                  element={
                    <PrivateRoute
                      allowedRoles={["ADMIN", "MANAGER", "HR_ADMIN"]}
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
      </div>

      {/* Global Toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Optional Modal */}
      {isModalOpen && <AssetFormModal onClose={toggleModal} />}
    </Router>
  );
};

export default App;
