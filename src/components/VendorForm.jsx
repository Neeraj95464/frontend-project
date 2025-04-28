import { Input, Button, Textarea } from "@/components/ui";

const VendorForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 overflow-y-auto max-h-[400px] p-4"
    >
      <Input
        type="text"
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="text"
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Input
        type="text"
        label="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <Input
        type="text"
        label="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
      />
      <Input
        type="text"
        label="Website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
      />
      <Input
        type="text"
        label="Contact Person"
        value={formData.contactPerson}
        onChange={(e) =>
          setFormData({ ...formData, contactPerson: e.target.value })
        }
      />
      <Input
        type="text"
        label="GST Number"
        value={formData.gstNumber}
        onChange={(e) =>
          setFormData({ ...formData, gstNumber: e.target.value })
        }
      />
      <Input
        type="text"
        label="Industry Type"
        value={formData.industryType}
        onChange={(e) =>
          setFormData({ ...formData, industryType: e.target.value })
        }
      />
      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <div className="flex space-x-4">
        <Button type="submit" className="w-full bg-blue-600 text-white">
          Save Vendor
        </Button>
        <Button
          type="button"
          className="w-full bg-gray-500 text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;
