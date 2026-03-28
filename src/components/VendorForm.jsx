// import { Input, Button, Textarea } from "@/components/ui";

// const VendorForm = ({ formData, setFormData, onSubmit, onCancel }) => {
//   return (
//     <form
//       onSubmit={onSubmit}
//       className="space-y-4 overflow-y-auto max-h-[400px] p-4"
//     >
//       <Input
//         type="text"
//         label="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         required
//       />
//       <Input
//         type="email"
//         label="Email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         required
//       />
//       <Input
//         type="text"
//         label="Phone"
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//       />
//       <Input
//         type="text"
//         label="Company"
//         value={formData.company}
//         onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//       />
//       <Input
//         type="text"
//         label="Address"
//         value={formData.address}
//         onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//       />
//       <Input
//         type="text"
//         label="Website"
//         value={formData.website}
//         onChange={(e) => setFormData({ ...formData, website: e.target.value })}
//       />
//       <Input
//         type="text"
//         label="Contact Person"
//         value={formData.contactPerson}
//         onChange={(e) =>
//           setFormData({ ...formData, contactPerson: e.target.value })
//         }
//       />
//       <Input
//         type="text"
//         label="GST Number"
//         value={formData.gstNumber}
//         onChange={(e) =>
//           setFormData({ ...formData, gstNumber: e.target.value })
//         }
//       />
//       <Input
//         type="text"
//         label="Industry Type"
//         value={formData.industryType}
//         onChange={(e) =>
//           setFormData({ ...formData, industryType: e.target.value })
//         }
//       />
//       <Textarea
//         label="Description"
//         value={formData.description}
//         onChange={(e) =>
//           setFormData({ ...formData, description: e.target.value })
//         }
//       />

//       <div className="flex space-x-4">
//         <Button type="submit" className="w-full bg-blue-600 text-white">
//           Save Vendor
//         </Button>
//         <Button
//           type="button"
//           className="w-full bg-gray-500 text-white"
//           onClick={onCancel}
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default VendorForm;



import { Input, Button, Textarea } from "@/components/ui";

const VendorForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  // Helper to update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 overflow-y-auto max-h-[500px] p-4 border rounded-lg bg-white"
    >
      {/* SECTION: Basic Information */}
      <div className="space-y-4">
        <h3 className="font-bold border-b pb-1 text-gray-700">General Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <Input type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required />
          <Input type="text" label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <Input type="text" label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
        </div>
      </div>

      {/* SECTION: Business Details */}
      <div className="space-y-4">
        <h3 className="font-bold border-b pb-1 text-gray-700">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <Input type="text" label="Company" name="company" value={formData.company} onChange={handleChange} /> */}
          <Input type="text" label="Website" name="website" value={formData.website} onChange={handleChange} />
          {/* <Input type="text" label="Industry Type" name="industryType" value={formData.industryType} onChange={handleChange} /> */}
          <Input type="text" label="GST Number" name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
          <Input type="text" label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} />
          
          {/* Status Dropdown - Matches VendorStatus Enum */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select 
              name="status"
              className="border p-2 rounded-md bg-transparent"
              value={formData.status} 
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>
        <Input type="text" label="Address" name="address" value={formData.address} onChange={handleChange} />
      </div>

      {/* SECTION: Banking Details (The Missing Fields) */}
      <div className="space-y-4 bg-gray-50 p-3 rounded-md">
        <h3 className="font-bold border-b pb-1 text-gray-700">Banking Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="text" label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <Input type="text" label="Account Number" name="bankNumber" value={formData.bankNumber} onChange={handleChange} />
          <Input type="text" label="IFSC Code" name="bankIFSC" value={formData.bankIFSC} onChange={handleChange} />
        </div>
      </div>

      <Textarea
        label="Company Info"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="flex space-x-4 pt-4">
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Save Vendor
        </Button>
        <Button type="button" className="w-full bg-gray-500 text-white hover:bg-gray-600" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;