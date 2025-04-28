import {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor,
  // Make sure this is imported too
  getContracts,
  createContract,
  updateContract,
  deleteContract,
} from "../services/api";
import ContractForm from "./ContractForm";
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

export default function ContractPage() {
  const [contracts, setContracts] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [formData, setFormData] = useState({
    contractName: "",
    customerName: "",
    customerEmail: "",
    startDate: "",
    endDate: "",
    status: "",
    contractType: "",
    priority: "",
    slaResponseTime: "",
    slaResolutionTime: "",
    assignedTo: "",
    description: "",
  });

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

  const [editId, setEditId] = useState(null); // Contract
  const [editVendorId, setEditVendorId] = useState(null); // Vendor

  const statusOptions = ["Active", "Expired", "Pending"];
  const contractTypeOptions = ["Maintenance", "Service", "Support"];
  const priorityOptions = ["High", "Medium", "Low"];

  useEffect(() => {
    fetchContracts();
    fetchVendors();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await getContracts();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const data = await getVendors();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateContract(editId, formData);
      } else {
        await createContract(formData);
      }
      fetchContracts();
      handleCancel();
    } catch (error) {
      console.error("Error saving contract", error);
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

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditId(null);
    setFormData({
      contractName: "",
      customerName: "",
      customerEmail: "",
      startDate: "",
      endDate: "",
      status: "",
      contractType: "",
      priority: "",
      slaResponseTime: "",
      slaResolutionTime: "",
      assignedTo: "",
      description: "",
    });
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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this contract?")) {
      await deleteContract(id);
      fetchContracts();
    }
  };

  const handleVendorDelete = async (id) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
      await deleteVendor(id);
      fetchVendors();
    }
  };

  const handleEdit = (contract) => {
    setFormData(contract);
    setEditId(contract.id);
    setIsModalOpen(true);
  };

  const handleVendorEdit = (vendor) => {
    setVendorFormData(vendor);
    setEditVendorId(vendor.id);
    setIsVendorModalOpen(true);
  };

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <h1 className="text-2xl font-bold mb-6">Contract Management</h1>

      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-md"
        >
          Add Contract
        </Button>

        <Button
          onClick={() => {
            setIsVendorModalOpen(true);
            setEditVendorId(null);
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-md"
        >
          Add Vendor
        </Button>
      </div>

      {/* Contract Table */}
      <Table className="mt-4 mb-12">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.id}</TableCell>
              <TableCell>{contract.contractName}</TableCell>
              <TableCell>{contract.customerName}</TableCell>
              <TableCell>{contract.customerEmail}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(contract)} className="mr-2">
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(contract.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Vendor Table */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Vendors</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.company}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleVendorEdit(vendor)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleVendorDelete(vendor.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for Contracts */}
      {isModalOpen && (
        <Modal onClose={handleCancel}>
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Edit Contract" : "Add Contract"}
          </h2>
          <ContractForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isEditMode={!!editId}
            statusOptions={statusOptions}
            contractTypeOptions={contractTypeOptions}
            priorityOptions={priorityOptions}
          />
        </Modal>
      )}

      {/* Modal for Vendors */}
      {isVendorModalOpen && (
        <Modal onClose={handleVendorCancel}>
          <h2 className="text-xl font-bold mb-4">
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
