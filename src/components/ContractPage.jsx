import {
  getContracts,
  createContract,
  updateContract,
  deleteContract,
  getVendors,
  createVendor,
  updateVendor,
} from "../services/api";
import VendorForm from "./VendorForm";
import ContractForm from "@/components/ContractForm";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui";
import { Modal } from "@/components/ui";
import { useEffect, useState } from "react";

export default function ContractPage() {
  const [contracts, setContracts] = useState([]);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null); // For Contracts

  // Vendor Modal State
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editVendorId, setEditVendorId] = useState(null); // Separate state for vendors
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

  // Enum options for select fields
  const statusOptions = ["Active", "Expired", "Pending"];
  const contractTypeOptions = ["Maintenance", "Service", "Support"];
  const priorityOptions = ["High", "Medium", "Low"];

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await getContracts();
      setContracts(data);
    } catch (error) {
      console.error("Error fetching contracts", error);
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

  const handleEdit = (contract) => {
    setFormData(contract);
    setEditId(contract.id);
    setIsModalOpen(true);
  };

  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <h1 className="text-2xl font-bold mb-6">Contract Management</h1>

      <div className="flex space-x-4 mb-4">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setEditId(null); // Reset edit mode
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-md"
        >
          Add Contract
        </Button>

        <Button
          onClick={() => {
            setIsVendorModalOpen(true);
            setEditVendorId(null); // Reset edit mode
          }}
          className="bg-green-600 text-white px-6 py-3 rounded-md"
        >
          Add Vendor
        </Button>
      </div>

      {/* Contract Table */}
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableCell className="font-semibold">ID</TableCell>
            <TableCell className="font-semibold">Name</TableCell>
            <TableCell className="font-semibold">Customer</TableCell>
            <TableCell className="font-semibold">Email</TableCell>
            <TableCell className="font-semibold">Actions</TableCell>
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

      {/* Modal for Adding/Editing Contracts */}
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

      {/* Modal for Adding/Editing Vendors */}
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
