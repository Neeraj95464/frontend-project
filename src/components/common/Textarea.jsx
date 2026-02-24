import React from "react";

const Textarea = ({ label, name, value, onChange }) => (
  <div className="col-span-3">
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="3"
      className="w-full border border-gray-300 rounded-lg p-2"
    />
  </div>
);

export default Textarea;
