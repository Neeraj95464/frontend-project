import {
  getContracts,
  createContract,
  updateContract,
  deleteContract,
} from "../services/api";
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
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

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
      setIsModalOpen(false);
      setFormData({ contractName: "", customerName: "", customerEmail: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error saving contract", error);
    }
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
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-md mb-4"
      >
        Add Contract
      </Button>

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
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Edit Contract" : "Add Contract"}
          </h2>
          <ContractForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditMode={editId ? true : false}
          />
        </Modal>
      )}
    </div>
  );
}
