import {
  fetchUserById,
  getSites,
  getLocationsBySite,
  updateEmployee,
} from "../services/api";
import {
  Card,
  CardContent,
  Button,
  Input,
  Label,
  Select,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import API functions

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [departments] = useState(["IT", "HR", "Finance", "Operations"]); // Static departments
  const [sites, setSites] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, siteData] = await Promise.all([
          fetchUserById(userId),
          getSites(),
        ]);

        setUser(userData);
        setSites(siteData);

        if (userData.site?.id) {
          fetchLocations(userData.site.id); // Fetch locations if site exists
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const fetchLocations = async (siteId) => {
    try {
      const locationData = await getLocationsBySite(siteId);
      setLocations(locationData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "location") {
      setUser({ ...user, location: { id: parseInt(value, 10) } }); // Store an object with an ID
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSiteChange = (e) => {
    const siteId = e.target.value;
    setUser({ ...user, site: { id: siteId } });
    fetchLocations(siteId); // Fetch locations dynamically based on selected site
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(userId, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="ml-40 lg:ml-40 pt-16 mr-8">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold mb-4">Edit User</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Department</Label>
              <Select
                name="department"
                value={user.department}
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Site</Label>
              <Select
                name="site"
                value={user.site?.id}
                onChange={handleSiteChange}
                required
              >
                <option value="">Select Site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Location</Label>
              <Select
                name="location"
                value={user.location?.id}
                onChange={handleChange}
                required
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Note</Label>
              <Input
                type="text"
                name="note"
                value={user.note || ""}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-4">
              <Button
                type="button"
                className="bg-gray-500"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600">
                Update User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUser;
