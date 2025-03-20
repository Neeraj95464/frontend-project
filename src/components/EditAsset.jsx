import { Button, Input, Textarea, Card, CardContent } from "../components/ui";
import { getAssetByAssetTag, updateAsset } from "../services/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import API functions

const EditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("Invalid asset ID");
      setLoading(false);
      return;
    }

    getAssetByAssetTag(id)
      .then((data) => {
        if (data) {
          setAsset(data);
        } else {
          setError("Asset not found");
        }
      })
      .catch(() => setError("Failed to load asset"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateAsset(id, asset);
      navigate(`/asset/${id}`);
    } catch {
      setError("Update failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 font-semibold">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-6">
      <Card className="max-w-3xl w-full shadow-lg rounded-lg border border-gray-200 bg-white">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Edit Asset
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <Input
                name="name"
                value={asset.name || ""}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <Textarea
                name="description"
                value={asset.description || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Serial Number
              </label>
              <Input
                name="serialNumber"
                value={asset.serialNumber || ""}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Purchase Date
              </label>
              <Input
                name="purchaseDate"
                type="date"
                value={asset.purchaseDate || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Brand</label>
              <Input
                name="brand"
                value={asset.brand || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Model</label>
              <Input
                name="model"
                value={asset.model || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-semibold mb-2">Cost</label>
              <Input
                name="cost"
                type="number"
                step="0.01"
                value={asset.cost || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div> */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Status Note
              </label>
              <Textarea
                name="statusNote"
                value={asset.statusNote || ""}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg"
              >
                {submitting ? "Updating..." : "Update"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(`/asset/${id}`)}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAsset;
