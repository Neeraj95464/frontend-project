
import {
  fetchTicketStatusCounts,
  fetchTicketsPerDay,
  fetchTicketCategoryCounts,
  fetchAssigneeTicketCounts,
  fetchTopTicketReporters,
  getAssigneeResolutionStats,
  getAssignees,
  fetchLocationStats,
  fetchResolutionStats,
} from "../services/api";
import AssigneeFeedbackOverview from "./TicketFeedback";
import { BarChart3, CalendarDays, User, TrendingUp, MapPin, Tag, Users, Clock, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Theme & Palette ───────────────────────────────────────────────────────────
const PALETTE = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6"];

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0F172A",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 10,
      padding: "10px 16px",
      fontSize: 13,
      color: "#E2E8F0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <div style={{ color: "#94A3B8", marginBottom: 4, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#6366F1" }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

// ─── Section Card ──────────────────────────────────────────────────────────────
const Card = ({ children, style = {} }) => (
  <div style={{
    background: "linear-gradient(145deg, #1E293B, #0F172A)",
    border: "1px solid rgba(99,102,241,0.15)",
    borderRadius: 16,
    padding: "24px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    ...style,
  }}>
    {children}
  </div>
);

// ─── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, color = "#6366F1" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
    <div style={{
      width: 36, height: 36, borderRadius: 10,
      background: `${color}22`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon size={18} color={color} />
    </div>
    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#F1F5F9", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.3px" }}>
      {title}
    </h2>
  </div>
);

// ─── Stat Pill ─────────────────────────────────────────────────────────────────
const StatPill = ({ label, value, color = "#6366F1" }) => (
  <div style={{
    background: "#0F172A",
    border: `1px solid ${color}33`,
    borderRadius: 10,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  }}>
    <span style={{ fontSize: 11, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: 20, fontWeight: 800, color, fontFamily: "'DM Mono', monospace" }}>{value}</span>
  </div>
);

// ─── Donut Status Chart ────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = 80, cx = 120, cy = 120, stroke = 28;
  const circumference = 2 * Math.PI * r;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <svg width={240} height={240} viewBox="0 0 240 240">
        {/* background ring */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1E293B" strokeWidth={stroke} />
        {data.map((d, i) => {
          const pct = d.value / total;
          const dash = pct * circumference;
          const offset = -(cumulative / total) * circumference;
          cumulative += d.value;
          return (
            <circle
              key={i} cx={cx} cy={cy} r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset + circumference * 0.25}
              strokeLinecap="butt"
              style={{ transition: "stroke-dasharray 0.6s ease" }}
            />
          );
        })}
        {/* center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#F1F5F9" fontSize={28} fontWeight={800} fontFamily="'DM Mono', monospace">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill="#64748B" fontSize={11} fontWeight={600} letterSpacing={1} textTransform="uppercase">TOTAL</text>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 140 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: PALETTE[i % PALETTE.length], flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#94A3B8", flex: 1 }}>{d.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9", fontFamily: "'DM Mono', monospace" }}>{d.value}</span>
            <span style={{ fontSize: 11, color: "#475569" }}>({((d.value / total) * 100).toFixed(0)}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Horizontal Bar ────────────────────────────────────────────────────────────
const HorizontalBarList = ({ data, color }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {data.slice(0, 8).map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 120, fontSize: 12, color: "#94A3B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flexShrink: 0 }}>
            {d.name}
          </div>
          <div style={{ flex: 1, height: 8, background: "#1E293B", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${(d.value / max) * 100}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${color}, ${color}88)`,
              borderRadius: 4,
              transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>
          <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: "#F1F5F9", textAlign: "right", fontFamily: "'DM Mono', monospace" }}>
            {d.value}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Resolution Stats Card ─────────────────────────────────────────────────────
const ResolutionCard = ({ label, stats, color }) => (
  <div style={{
    background: "#0F172A",
    border: `1px solid ${color}22`,
    borderRadius: 12,
    padding: "14px 16px",
  }}>
    <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {[
        ["Avg", `${(stats?.avg ?? 0).toFixed(1)}d`],
        ["Max", `${(stats?.max ?? 0).toFixed(1)}d`],
        ["Opened", stats?.ticketOpened ?? 0],
        ["Closed", stats?.ticketClosed ?? 0],
      ].map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94A3B8" }}>
          <span>{k}</span>
          <span style={{ fontWeight: 700, color: "#F1F5F9", fontFamily: "'DM Mono', monospace" }}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const TicketDashboardChart = () => {
  const [statusData, setStatusData] = useState([]);
  const [createdPerDay, setCreatedPerDay] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [assigneeData, setAssigneeData] = useState([]);
  const [reportersData, setReportersData] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [resolutionStats, setResolutionStats] = useState(null);
  const [locationData, setLocationData] = useState([]);

  const sortDesc = (data, key = "value") => [...data].sort((a, b) => b[key] - a[key]);
  const mapObj = (obj, k = "name", v = "value") =>
    Object.entries(obj).map(([key, val]) => ({ [k]: key, [v]: val }));

  useEffect(() => {
    fetchTicketStatusCounts().then(r => setStatusData(mapObj(r.data)));
    fetchTicketsPerDay().then(r => setCreatedPerDay(mapObj(r.data, "date", "count")));
    fetchResolutionStats().then(r => setResolutionStats(r.data));
    getAssignees().then(r => setAssignees(r.data));
    fetchTicketCategoryCounts().then(r => setCategoryData(sortDesc(mapObj(r.data))));
    fetchAssigneeTicketCounts().then(r => setAssigneeData(sortDesc(mapObj(r.data))));
    fetchTopTicketReporters().then(r => setReportersData(sortDesc(mapObj(r.data))));
    fetchLocationStats().then(r => setLocationData(sortDesc(mapObj(r.data))));
  }, []);

  const handleAssigneeChange = async (e) => {
    const data = await getAssigneeResolutionStats(e.target.value || "");
    setResolutionStats(data);
  };

  const gridFull = { gridColumn: "1 / -1" };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');

        * { box-sizing: border-box; }

        .dash-root {
          min-height: 100vh;
          background: #020817;
          background-image: radial-gradient(ellipse at 20% 0%, #6366F115 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 100%, #06B6D415 0%, transparent 60%);
          padding: 32px 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .dash-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 900px) {
          .dash-grid { grid-template-columns: 1fr; }
        }

        .assignee-select {
          width: 100%;
          padding: 10px 14px;
          background: #0F172A;
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 10px;
          color: #E2E8F0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748B' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.2s;
        }
        .assignee-select:focus { border-color: #6366F1; }
        .assignee-select option { background: #1E293B; }

        .weekly-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
        .monthly-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; }
      `}</style>

      <div className="dash-root">
        {/* Header */}
        <div style={{ maxWidth: 1400, margin: "0 auto 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <h1 style={{
              margin: 0, fontSize: 28, fontWeight: 800, color: "#F1F5F9",
              fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.5px",
            }}>
              Ticket Analytics
            </h1>
            <span style={{
              fontSize: 12, fontWeight: 600, color: "#6366F1",
              background: "#6366F115", border: "1px solid #6366F133",
              borderRadius: 6, padding: "2px 10px", letterSpacing: "0.5px",
            }}>LIVE</span>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#64748B" }}>
            Real-time overview of support ticket metrics and performance
          </p>
        </div>

        <div className="dash-grid">

          {/* ── Status Distribution ─────────────────────────────── */}
          <Card>
            <SectionHeader icon={CheckCircle} title="Ticket Status Distribution" color="#10B981" />
            {statusData.length > 0
              ? <DonutChart data={statusData} />
              : <div style={{ color: "#475569", fontSize: 13, textAlign: "center", padding: "40px 0" }}>Loading...</div>
            }
          </Card>

          {/* ── Resolution Time Statistics ──────────────────────── */}
          <Card>
            <SectionHeader icon={Clock} title="Resolution Time Statistics" color="#6366F1" />

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>
                Filter by Assignee
              </label>
              <select className="assignee-select" onChange={handleAssigneeChange}>
                <option value="">All Assignees</option>
                {assignees.map(a => (
                  <option key={a.employeeId} value={a.employeeId}>{a.username}</option>
                ))}
              </select>
            </div>

            {resolutionStats && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Overall */}
                <div>
                  <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>Overall</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    <StatPill label="Avg Resolution" value={`${(resolutionStats?.overall?.avg ?? 0).toFixed(1)}d`} color="#6366F1" />
                    <StatPill label="Max Resolution" value={`${(resolutionStats?.overall?.max ?? 0).toFixed(1)}d`} color="#F59E0B" />
                    <StatPill label="Tickets Opened" value={resolutionStats?.overall?.ticketOpened ?? 0} color="#06B6D4" />
                    <StatPill label="Tickets Closed" value={resolutionStats?.overall?.ticketClosed ?? 0} color="#10B981" />
                  </div>
                </div>

                {/* Weekly */}
                <div>
                  <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>Weekly Breakdown</div>
                  <div className="weekly-grid">
                    {Object.entries(resolutionStats.weekly || {}).map(([week, stats]) => (
                      <ResolutionCard key={week} label={week} stats={stats} color="#06B6D4" />
                    ))}
                  </div>
                </div>

                {/* Monthly */}
                <div>
                  <div style={{ fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>Monthly Breakdown</div>
                  <div className="monthly-grid">
                    {Object.entries(resolutionStats.monthly || {}).map(([month, stats]) => (
                      <ResolutionCard key={month} label={month} stats={stats} color="#8B5CF6" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* ── Tickets Created Per Day ─────────────────────────── */}
          <Card style={gridFull}>
            <SectionHeader icon={TrendingUp} title="Tickets Created Per Day" color="#06B6D4" />
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={createdPerDay} margin={{ top: 4, right: 16, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#64748B", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} height={60} axisLine={{ stroke: "#1E293B" }} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#06B6D4" strokeWidth={2.5} dot={{ fill: "#06B6D4", r: 3, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#06B6D4", stroke: "#020817", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* ── Ticket Categories ───────────────────────────────── */}
          <Card style={gridFull}>
            <SectionHeader icon={Tag} title="Ticket Categories" color="#10B981" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={categoryData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} height={60} axisLine={{ stroke: "#1E293B" }} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <HorizontalBarList data={categoryData} color="#10B981" />
            </div>
          </Card>

          {/* ── Tickets per Assignee ────────────────────────────── */}
          <Card style={gridFull}>
            <SectionHeader icon={User} title="Tickets per Assignee" color="#F59E0B" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={assigneeData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 11 }} angle={-35} textAnchor="end" interval={0} height={60} axisLine={{ stroke: "#1E293B" }} tickLine={false} />
                  <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {assigneeData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <HorizontalBarList data={assigneeData} color="#F59E0B" />
            </div>
          </Card>

          {/* ── Top Reporters ───────────────────────────────────── */}
          <Card>
            <SectionHeader icon={Users} title="Top Ticket Reporters" color="#8B5CF6" />
            <HorizontalBarList data={reportersData} color="#8B5CF6" />
          </Card>

          {/* ── Tickets by Location ─────────────────────────────── */}
          <Card>
            <SectionHeader icon={MapPin} title="Tickets by Location" color="#F43F5E" />
            <HorizontalBarList data={locationData} color="#F43F5E" />
          </Card>

          {/* ── Feedback Overview ───────────────────────────────── */}
          <Card style={{ ...gridFull, background: "linear-gradient(145deg, #1E293B, #0F172A)" }}>
            <SectionHeader icon={BarChart3} title="Assignee Feedback Overview" color="#06B6D4" />
            <AssigneeFeedbackOverview />
          </Card>

        </div>
      </div>
    </>
  );
};

export default TicketDashboardChart;
