

import { useEffect, useState, useMemo } from "react";
import { getAssigneePerformance } from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line, Legend,
} from "recharts";

// ─── Palette ───────────────────────────────────────────────────────────────────
const PALETTE = ["#6366F1", "#06B6D4", "#10B981", "#F59E0B", "#F43F5E", "#8B5CF6", "#EC4899", "#14B8A6"];

const getRatingColor = (r) => {
  if (!r) return "#475569";
  if (r >= 4.5) return "#10B981";
  if (r >= 3.5) return "#F59E0B";
  return "#F43F5E";
};

const getPerfColor = (p) => {
  if (p >= 90) return "#10B981";
  if (p >= 70) return "#F59E0B";
  return "#F43F5E";
};

const StarRating = ({ rating }) => {
  const color = getRatingColor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={12} height={12} viewBox="0 0 12 12">
          <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
            fill={s <= Math.round(rating) ? color : "#1E293B"}
            stroke={color}
            strokeWidth={0.5}
          />
        </svg>
      ))}
      <span style={{ fontSize: 11, color, fontWeight: 700, marginLeft: 2, fontFamily: "'DM Mono', monospace" }}>
        {rating ? rating.toFixed(1) : "—"}
      </span>
    </div>
  );
};

const MiniBar = ({ value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ flex: 1, height: 6, background: "#1E293B", borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        width: `${Math.min((value / max) * 100, 100)}%`,
        height: "100%",
        background: color,
        borderRadius: 3,
        transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  </div>
);

const PerfBadge = ({ value }) => {
  const color = getPerfColor(value);
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: `${color}15`, border: `1px solid ${color}33`,
      borderRadius: 20, padding: "3px 10px",
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{value}%</span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0F172A", border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 10, padding: "10px 16px", fontSize: 12, color: "#E2E8F0",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    }}>
      <div style={{ color: "#94A3B8", marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong style={{ fontFamily: "'DM Mono', monospace" }}>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color = "#6366F1", sub }) => (
  <div style={{
    background: "linear-gradient(145deg, #1E293B, #0F172A)",
    border: `1px solid ${color}22`,
    borderRadius: 14,
    padding: "16px 20px",
    display: "flex", flexDirection: "column", gap: 4,
  }}>
    <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</span>
    <span style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'DM Mono', monospace", lineHeight: 1.1 }}>{value}</span>
    {sub && <span style={{ fontSize: 11, color: "#475569" }}>{sub}</span>}
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
const AssigneeDashboard = () => {
  const [overallStats, setOverallStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("totalTickets");
  const [sortDir, setSortDir] = useState("desc");
  const [activeTab, setActiveTab] = useState("table");

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getAssigneePerformance();
        const overall = (result?.overallStats || []).sort((a, b) => b.totalTickets - a.totalTickets);
        const monthly = result?.monthlyStats || [];
        setOverallStats(overall);
        setMonthlyStats(monthly);
      } catch (e) {
        console.error("Dashboard error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Summary stats
  const summary = useMemo(() => {
    const total = overallStats.reduce((s, a) => s + a.totalTickets, 0);
    const closed = overallStats.reduce((s, a) => s + a.totalClosedTickets, 0);
    const feedback = overallStats.reduce((s, a) => s + a.closedTicketsWithFeedback, 0);
    const ratings = overallStats.filter(a => a.averageRating > 0);
    const avgRating = ratings.length ? ratings.reduce((s, a) => s + a.averageRating, 0) / ratings.length : 0;
    return { total, closed, feedback, avgRating, agents: overallStats.length };
  }, [overallStats]);

  // Filtered + sorted table data
  const filtered = useMemo(() => {
    let d = overallStats.filter(a =>
      a.assigneeName?.toLowerCase().includes(search.toLowerCase())
    );
    d = [...d].sort((a, b) => {
      const av = a[sortKey] ?? 0, bv = b[sortKey] ?? 0;
      return sortDir === "desc" ? bv - av : av - bv;
    });
    return d;
  }, [overallStats, search, sortKey, sortDir]);

  // Monthly chart data – top 8 agents
  const monthlyChartData = useMemo(() => {
    const topAgents = overallStats.slice(0, 8).map(a => a.assigneeName);
    const grouped = {};
    monthlyStats.forEach(m => {
      const key = `${m.year}-${String(m.month).padStart(2, "0")}`;
      if (!grouped[key]) grouped[key] = { month: key };
      if (topAgents.includes(m.assigneeName)) {
        grouped[key][m.assigneeName] = m.closedTickets;
      }
    });
    return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
  }, [overallStats, monthlyStats]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const maxTickets = Math.max(...filtered.map(a => a.totalTickets), 1);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#020817", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #1E293B", borderTop: "3px solid #6366F1", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "#64748B", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Loading performance data...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const thStyle = (key) => ({
    padding: "12px 16px",
    fontSize: 11,
    fontWeight: 700,
    color: sortKey === key ? "#6366F1" : "#64748B",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #1E293B",
    background: "#0A1628",
    userSelect: "none",
    transition: "color 0.2s",
  });

  const SortIcon = ({ col }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === col ? 1 : 0.3 }}>
      {sortKey === col && sortDir === "asc" ? "↑" : "↓"}
    </span>
  );

  return (
    <>
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        .dash-root { min-height: 100vh; background: #020817; padding: 32px 24px; font-family: 'DM Sans', sans-serif; background-image: radial-gradient(ellipse at 10% 0%, #6366F112 0%, transparent 50%), radial-gradient(ellipse at 90% 100%, #06B6D412 0%, transparent 50%); }
        .search-input { width: 100%; padding: 10px 16px 10px 40px; background: #0F172A; border: 1px solid rgba(99,102,241,0.25); border-radius: 10px; color: #E2E8F0; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; }
        .search-input::placeholder { color: #475569; }
        .search-input:focus { border-color: #6366F1; }
        .tab-btn { padding: 8px 20px; border-radius: 8px; border: none; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .tab-btn.active { background: #6366F1; color: #fff; }
        .tab-btn.inactive { background: #1E293B; color: #64748B; }
        .tab-btn.inactive:hover { background: #263348; color: #94A3B8; }
        .tr-row:hover td { background: #12203A !important; }
        .tr-row td { transition: background 0.15s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease; }
      `}</style>

      <div className="dash-root">
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>

          {/* ── Header ──────────────────────────────────────────── */}
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.5px" }}>
              Assignee Performance
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#64748B" }}>
              Comprehensive overview of support agent metrics and ticket resolution
            </p>
          </div>

          {/* ── Summary Cards ────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 24 }}>
            <StatCard label="Total Agents" value={summary.agents} color="#6366F1" />
            <StatCard label="Total Tickets" value={summary.total.toLocaleString()} color="#06B6D4" />
            <StatCard label="Closed Tickets" value={summary.closed.toLocaleString()} color="#10B981" sub={`${((summary.closed / summary.total) * 100).toFixed(1)}% resolution rate`} />
            <StatCard label="With Feedback" value={summary.feedback.toLocaleString()} color="#F59E0B" sub={`${((summary.feedback / summary.closed) * 100).toFixed(1)}% of closed`} />
            <StatCard label="Avg Rating" value={summary.avgRating.toFixed(2)} color="#8B5CF6" sub="across rated agents" />
          </div>

 

          <div
  style={{
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20
  }}
>
  {/* Search */}
  <div style={{ position: "relative", maxWidth: 280 }}>
    <svg
      style={{
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#475569"
      }}
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>

    <input
      className="search-input"
      placeholder="Search assignee..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  </div>

  {/* Tabs */}
  <div style={{ display: "flex", gap: 8 }}>
    <button
      className={`tab-btn ${activeTab === "table" ? "active" : "inactive"}`}
      onClick={() => setActiveTab("table")}
    >
      Table View
    </button>

    <button
      className={`tab-btn ${activeTab === "chart" ? "active" : "inactive"}`}
      onClick={() => setActiveTab("chart")}
    >
      Monthly Chart
    </button>
  </div>
</div>

          {/* ── TABLE VIEW ───────────────────────────────────────── */}
          {activeTab === "table" && (
            <div className="fade-in" style={{ background: "linear-gradient(145deg, #1E293B, #0F172A)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.5)" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                  <thead>
                    <tr>
                      {[
                        ["#", null],
                        ["Assignee", "assigneeName"],
                        ["Total Tickets", "totalTickets"],
                        ["Closed", "totalClosedTickets"],
                        ["With Feedback", "closedTicketsWithFeedback"],
                        ["Feedback %", "feedbackPercentage"],
                        ["Avg Rating", "averageRating"],
                        ["Closure Rate", null],
                        ["Volume", null],
                      ].map(([label, key]) => (
                        <th key={label} style={thStyle(key)} onClick={() => key && handleSort(key)}>
                          {label}{key && <SortIcon col={key} />}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => {
                      const perf = item.totalTickets > 0
                        ? ((item.totalClosedTickets / item.totalTickets) * 100).toFixed(1)
                        : "0.0";
                      const feedbackPct = item.feedbackPercentage?.toFixed(1) ?? "0.0";

                      return (
                        <tr key={item.assigneeId} className="tr-row">
                          <td style={{ padding: "12px 16px", color: "#475569", fontSize: 12, fontFamily: "'DM Mono', monospace", borderBottom: "1px solid #0F172A" }}>
                            {idx + 1}
                          </td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #0F172A" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                background: `${PALETTE[idx % PALETTE.length]}22`,
                                border: `1px solid ${PALETTE[idx % PALETTE.length]}44`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, color: PALETTE[idx % PALETTE.length],
                              }}>
                                {item.assigneeName?.[0]?.toUpperCase()}
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0", whiteSpace: "nowrap" }}>
                                {item.assigneeName}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#F1F5F9", fontFamily: "'DM Mono', monospace", borderBottom: "1px solid #0F172A" }}>
                            {item.totalTickets.toLocaleString()}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#06B6D4", fontFamily: "'DM Mono', monospace", borderBottom: "1px solid #0F172A" }}>
                            {item.totalClosedTickets.toLocaleString()}
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#10B981", fontFamily: "'DM Mono', monospace", borderBottom: "1px solid #0F172A" }}>
                            {item.closedTicketsWithFeedback}
                          </td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #0F172A" }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: parseFloat(feedbackPct) > 20 ? "#10B981" : "#F59E0B", fontFamily: "'DM Mono', monospace" }}>
                              {feedbackPct}%
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #0F172A" }}>
                            <StarRating rating={item.averageRating} />
                          </td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #0F172A" }}>
                            <PerfBadge value={parseFloat(perf)} />
                          </td>
                          <td style={{ padding: "12px 16px", borderBottom: "1px solid #0F172A", minWidth: 120 }}>
                            <MiniBar value={item.totalTickets} max={maxTickets} color={PALETTE[idx % PALETTE.length]} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filtered.length === 0 && (
                <div style={{ padding: "48px", textAlign: "center", color: "#475569", fontSize: 14 }}>
                  No assignees match your search.
                </div>
              )}

              <div style={{ padding: "12px 20px", borderTop: "1px solid #1E293B", fontSize: 12, color: "#475569" }}>
                Showing {filtered.length} of {overallStats.length} agents
              </div>
            </div>
          )}

          {/* ── MONTHLY CHART VIEW ───────────────────────────────── */}
          {activeTab === "chart" && (
            <div className="fade-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Monthly Closed Tickets - Top 8 agents */}
              <div style={{ background: "linear-gradient(145deg, #1E293B, #0F172A)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 16, padding: 24, boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
                <div style={{ marginBottom: 20 }}>
                  <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>Monthly Closed Tickets — Top 8 Agents</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>Ticket closures per month by highest-volume assignees</p>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={monthlyChartData} margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={{ stroke: "#1E293B" }} tickLine={false} />
                    <YAxis tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: "#94A3B8" }} />
                    {overallStats.slice(0, 8).map((a, i) => (
                      <Line key={a.assigneeId} type="monotone" dataKey={a.assigneeName}
                        stroke={PALETTE[i % PALETTE.length]} strokeWidth={2}
                        dot={{ r: 3, fill: PALETTE[i % PALETTE.length], strokeWidth: 0 }}
                        activeDot={{ r: 5 }} connectNulls />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Stats Cards Grid */}
              <div style={{ background: "linear-gradient(145deg, #1E293B, #0F172A)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 16, padding: 24, boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
                <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#F1F5F9" }}>This Month's Agent Breakdown</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                  {monthlyStats
                    .sort((a, b) => b.closedTickets - a.closedTickets)
                    .map((m, i) => {
                      const feedbackPct = m.feedbackPercentage?.toFixed(1) ?? "0.0";
                      return (
                        <div key={m.assigneeId} style={{
                          background: "#0F172A",
                          border: `1px solid ${PALETTE[i % PALETTE.length]}22`,
                          borderLeft: `3px solid ${PALETTE[i % PALETTE.length]}`,
                          borderRadius: 10,
                          padding: "14px 16px",
                        }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#F1F5F9", marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {m.assigneeName}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {[
                              ["Closed", m.closedTickets, "#06B6D4"],
                              ["With Feedback", m.closedTicketsWithFeedback, "#10B981"],
                              ["Feedback %", `${feedbackPct}%`, "#F59E0B"],
                              ["Avg Rating", m.averageRating ? m.averageRating.toFixed(1) : "—", "#8B5CF6"],
                            ].map(([label, val, color]) => (
                              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748B" }}>
                                <span>{label}</span>
                                <span style={{ fontWeight: 700, color, fontFamily: "'DM Mono', monospace" }}>{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      </div>
    </>
  );
};

export default AssigneeDashboard;
