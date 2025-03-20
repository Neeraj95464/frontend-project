import * as LabelPrimitive from "@radix-ui/react-label";
import React from "react";

export const Button = ({
  children,
  className = "",
  "aria-label": ariaLabel,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg transition-all shadow-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 ${className}`}
      aria-label={
        ariaLabel || (typeof children === "string" ? children : "Button")
      }
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, name, className = "", ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export const Textarea = ({ label, name, className = "", ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      ></textarea>
    </div>
  );
};

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg border p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// ✅ Scrollable Table with Sticky Header
export const TableContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`overflow-x-auto max-h-[500px] border rounded-lg shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export const Table = ({ children, className = "" }) => {
  return (
    <table className={`w-full border-collapse ${className}`}>{children}</table>
  );
};

// ✅ Sticky Table Header
export const TableHead = ({ children, className = "" }) => {
  return (
    <thead className={`bg-gray-200 sticky top-0 z-10 shadow-md ${className}`}>
      {children}
    </thead>
  );
};

export const TableRowHeader = ({ children, className = "" }) => {
  return <tr className={`border-b ${className}`}>{children}</tr>;
};

export const TableBody = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

export const TableRow = ({ children, className = "" }) => {
  return (
    <tr className={`border-b hover:bg-gray-100 ${className}`}>{children}</tr>
  );
};

// ✅ Sticky Column Headers with Padding
export const TableCell = ({ children, className = "" }) => {
  return (
    <td className={`p-3 border-r last:border-r-0 ${className}`}>{children}</td>
  );
};

// ✅ Table Header Cells with Scope (Improved Accessibility)
export const TableHeaderCell = ({ children, className = "" }) => {
  return (
    <th
      scope="col"
      className={`p-3 text-left font-semibold border-r last:border-r-0 ${className}`}
    >
      {children}
    </th>
  );
};

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`text-sm font-medium ${className}`}
    {...props}
  />
));

export const Select = ({ name, value, onChange, children, className = "" }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`border rounded-md px-3 py-2 w-full ${className}`}
    >
      {children}
    </select>
  );
};
