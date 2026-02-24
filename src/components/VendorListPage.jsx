import { getVendors, createVendor, updateVendor } from "../services/api";
import VendorForm from "./VendorForm";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Modal,
} from "@/components/ui";
import { useEffect, useState } from "react";

export default function VendorListPage() {
  const [vendors, setVendors] = useState([]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editVendorId, setEditVendorId] = useState(null);

  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    website: "",
    contactPerson: "",
    gstNumber: "",
    industryType: "",
    description: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors", error);
    }
  };

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editVendorId) {
        await updateVendor(editVendorId, vendorFormData);
      } else {
        await createVendor(vendorFormData);
      }
      fetchVendors();
      handleVendorCancel();
    } catch (error) {
      console.error("Error saving vendor", error);
    }
  };

  const handleVendorEdit = (vendor) => {
    setVendorFormData(vendor);
    setEditVendorId(vendor.id);
    setIsVendorModalOpen(true);
  };

  const handleVendorCancel = () => {
    setIsVendorModalOpen(false);
    setEditVendorId(null);
    setVendorFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      website: "",
      contactPerson: "",
      gstNumber: "",
      industryType: "",
      description: "",
    });
  };

  return (
    <div className="lg:ml-40 pt-16 px-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Vendor Management
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage and maintain all your vendor details in one place.
          </p>
        </div>

        <Button
          onClick={() => {
            setEditVendorId(null);
            setIsVendorModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          + Add Vendor
        </Button>
      </div>

      {/* Vendor Table Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHead className="bg-gray-50">
            <TableRow>
              <TableCell className="font-semibold">ID</TableCell>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="font-semibold">Company</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell className="font-semibold text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <TableRow key={vendor.id} className="hover:bg-gray-50">
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.company}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleVendorEdit(vendor)}
                      className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      className="px-4 py-2 rounded-md"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <span className="text-gray-500">
                    No vendors available. Click "Add Vendor" to create one.
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Vendor Modal */}
      {isVendorModalOpen && (
        <Modal onClose={handleVendorCancel}>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {editVendorId ? "Edit Vendor" : "Add Vendor"}
          </h2>

          <VendorForm
            formData={vendorFormData}
            setFormData={setVendorFormData}
            onSubmit={handleVendorSubmit}
            onCancel={handleVendorCancel}
          />
        </Modal>
      )}
    </div>
  );
}
