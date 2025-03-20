import React from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Search Results
      </h1>
      {results.length === 0 ? (
        <p className="text-gray-500 text-center">No assets found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {results.map((asset) => (
            <Link
              to={`/asset/${asset.id}`}
              key={asset.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-gray-800">{asset.name}</h2>
              <p className="text-sm text-gray-600">{asset.serialNumber}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
