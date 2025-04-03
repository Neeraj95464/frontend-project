// ContractForm.jsx
import { Input, Button } from "@/components/ui";

const ContractForm = ({ formData, setFormData, onSubmit, isEditMode }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="text"
        label="Contract Name"
        placeholder="Enter contract name"
        value={formData.contractName}
        onChange={(e) =>
          setFormData({ ...formData, contractName: e.target.value })
        }
        required
      />
      <Input
        type="text"
        label="Customer Name"
        placeholder="Enter customer name"
        value={formData.customerName}
        onChange={(e) =>
          setFormData({ ...formData, customerName: e.target.value })
        }
        required
      />
      <Input
        type="email"
        label="Customer Email"
        placeholder="Enter customer email"
        value={formData.customerEmail}
        onChange={(e) =>
          setFormData({ ...formData, customerEmail: e.target.value })
        }
        required
      />
      <Button
        type="submit"
        className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700"
      >
        {isEditMode ? "Update Contract" : "Create Contract"}
      </Button>
    </form>
  );
};

export default ContractForm;
