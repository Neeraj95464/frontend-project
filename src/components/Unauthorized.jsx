import { Button } from "@/components/ui";
import React from "react";
import { useNavigate } from "react-router-dom";

// or use your custom button if needed

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h2>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Button
          className="px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition"
          onClick={() => navigate("/ticket")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
