import {
  getAssetsByCategory,
  getAssetCounts,
  getAssetValueByCategory,
} from "../services/api";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
  "#8b5cf6",
];
const STATUS_COLORS = {
  available: "#10b981",
  assigned: "#ef4444",
  inRepair: "#f59e0b",
  disposed: "#9ca3af",
  lost: "#e11d48",
  reserved: "#3b82f6",
};

const AssetCategoryChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [valueData, setValueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResult, counts, valueResult] = await Promise.all([
          getAssetsByCategory(),
          getAssetCounts(),
          getAssetValueByCategory(),
        ]);

        const cleanedCategory = categoryResult.filter(
          (item) => item.name && item.value != null
        );

        const cleanedStatus = [
          {
            name: "Available",
            value: counts.available,
            fill: STATUS_COLORS.available,
          },
          {
            name: "Assigned",
            value: counts.assigned,
            fill: STATUS_COLORS.assigned,
          },
          {
            name: "In Repair",
            value: counts.inRepair,
            fill: STATUS_COLORS.inRepair,
          },
          {
            name: "Disposed",
            value: counts.disposed,
            fill: STATUS_COLORS.disposed,
          },
          { name: "Lost", value: counts.lost, fill: STATUS_COLORS.lost },
          {
            name: "Reserved",
            value: counts.reserved,
            fill: STATUS_COLORS.reserved,
          },
        ];

        const cleanedValue = Object.entries(valueResult).map(
          ([name, value], index) => ({
            name,
            value,
            fill: COLORS[index % COLORS.length],
          })
        );

        setCategoryData(cleanedCategory);
        setStatusData(cleanedStatus);
        setValueData(cleanedValue);
      } catch (err) {
        console.error("Chart Fetch Error:", err);
        setError("Unable to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center text-sm text-gray-500">Loading charts...</div>
    );
  if (error)
    return <div className="text-red-500 text-sm text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Assets by Category */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Assets by Category
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={3}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name.length > 10 ? name.slice(0, 10) + "…" : name} (${(
                    percent * 100
                  ).toFixed(0)}%)`
                }
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={36}
                wrapperStyle={{ fontSize: "12px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Assets by Status */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Assets by Status
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={90}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="value" barSize={20}>
                {statusData.map((entry, index) => (
                  <Cell key={`status-bar-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  style={{ fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Value by Category */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Asset Value by Category
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={valueData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(val) => `₹${val / 1000}k`} />
              <YAxis
                type="category"
                dataKey="name"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
              <Bar dataKey="value" barSize={20}>
                {valueData.map((entry, index) => (
                  <Cell key={`value-bar-${index}`} fill={entry.fill} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(val) => `₹${val.toLocaleString()}`}
                  style={{ fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AssetCategoryChart;
