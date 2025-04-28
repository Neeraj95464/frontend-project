import { Input, Button, Textarea, Select } from "@/components/ui";

const ContractForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditMode,
  statusOptions,
  contractTypeOptions,
  priorityOptions,
}) => {
  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
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
        <Input
          type="date"
          label="Start Date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
        />
        <Input
          type="date"
          label="End Date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          {statusOptions.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select
          label="Contract Type"
          name="contractType"
          value={formData.contractType}
          onChange={(e) =>
            setFormData({ ...formData, contractType: e.target.value })
          }
        >
          {contractTypeOptions.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          label="Priority"
          name="priority"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
        >
          {priorityOptions.map((priority, index) => (
            <option key={index} value={priority}>
              {priority}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          label="SLA Response Time"
          placeholder="Enter SLA Response Time"
          value={formData.slaResponseTime}
          onChange={(e) =>
            setFormData({ ...formData, slaResponseTime: e.target.value })
          }
        />
        <Input
          type="text"
          label="SLA Resolution Time"
          placeholder="Enter SLA Resolution Time"
          value={formData.slaResolutionTime}
          onChange={(e) =>
            setFormData({ ...formData, slaResolutionTime: e.target.value })
          }
        />
        <Input
          type="text"
          label="Assigned To"
          placeholder="Assigned person"
          value={formData.assignedTo}
          onChange={(e) =>
            setFormData({ ...formData, assignedTo: e.target.value })
          }
        />
        <Textarea
          label="Description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700"
          >
            {isEditMode ? "Update Contract" : "Create Contract"}
          </Button>
          <Button
            type="button"
            className="w-full py-2 text-white bg-gray-500 hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
