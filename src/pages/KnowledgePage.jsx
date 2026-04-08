


import React, { useEffect, useState } from "react";
import { Plus, Pin, BookOpen, FileText, ChevronDown, CheckCircle2, Circle, Bell, ClipboardList } from "lucide-react";
import { useAuth } from "../components/AuthContext";
import {
  fetchUpdates,
  fetchSOPs,
  createUpdate,
  createSOP,
  markKnowledgeRead,
} from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PRIORITY_CONFIG = {
  HIGH:   { label: "High",   dot: "bg-rose-500",   badge: "bg-rose-50 text-rose-600 border border-rose-200 ring-1 ring-rose-100" },
  MEDIUM: { label: "Medium", dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-600 border border-amber-200 ring-1 ring-amber-100" },
  LOW:    { label: "Low",    dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-600 border border-emerald-200 ring-1 ring-emerald-100" },
};

const KnowledgePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("UPDATE");
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "UPDATE",
    priority: "MEDIUM",
    roles: ["USER"],
    pinned: false,
  });

  const loadData = async () => {
    try {
      let res = [];
      if (activeTab === "UPDATE") res = await fetchUpdates();
      else res = await fetchSOPs();
      res.sort((a, b) => (b.pinned === true) - (a.pinned === true));
      setData(res);
    } catch (e) {
      toast.error("Failed to load data.");
    }
  };

  useEffect(() => { loadData(); }, [activeTab]);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleOpen = async (index, id) => {
    const isOpening = openIndex !== index;
    toggle(index);
    if (isOpening) {
      try {
        await markKnowledgeRead(id);
        setData((prev) => prev.map((item) => item.id === id ? { ...item, isRead: true } : item));
      } catch (err) {
        console.error("Read tracking failed", err);
      }
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (form.type === "UPDATE") await createUpdate(form);
      else await createSOP(form);
      toast.success(`${form.type} created successfully!`);
      setFormOpen(false);
      setForm({ title: "", description: "", type: "UPDATE", priority: "MEDIUM", roles: ["USER"], pinned: false });
      loadData();
    } catch (e) {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const pinnedItems = data.filter((d) => d.pinned);
  const regularItems = data.filter((d) => !d.pinned);
  const unreadCount = data.filter((d) => !d.isRead).length;

  return (
    <div className="lg:ml-48 min-h-screen" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 60%, #f5f0ff 100%)", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <div
          className="rounded-2xl px-6 py-5 flex items-center justify-between shadow-lg"
          style={{
            background: "linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #7c3aed 100%)",
            boxShadow: "0 8px 32px rgba(79,70,229,0.25), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg tracking-tight leading-tight">Knowledge Center</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-indigo-200 text-xs">{data.length} items</span>
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>
          </div>

          {(user?.role === "ADMIN" || user?.role === "HR_ADMIN") && (
            <button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-1.5 bg-white text-indigo-700 font-semibold text-sm px-4 py-2 rounded-xl shadow-sm hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Plus size={15} /> Add New
            </button>
          )}
        </div>
      </div>

      {/* TABS */}
      <div className="px-6 mb-5">
        <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-slate-100 gap-1">
          {[
            { key: "UPDATE", icon: Bell, label: "Updates" },
            { key: "SOP", icon: ClipboardList, label: "SOPs" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* PINNED SECTION */}
      {pinnedItems.length > 0 && (
        <div className="px-6 mb-2">
          <div className="flex items-center gap-2 mb-3">
            <Pin size={12} className="text-amber-500" />
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Pinned</span>
          </div>
          <div className="space-y-2">
            {pinnedItems.map((item, i) => (
              <AccordionItem key={item.id} item={item} index={i} openIndex={openIndex} handleOpen={handleOpen} isPinned />
            ))}
          </div>
        </div>
      )}

      {/* REGULAR ITEMS */}
      {regularItems.length > 0 && (
        <div className="px-6 mb-8">
          {pinnedItems.length > 0 && (
            <div className="flex items-center gap-2 mb-3 mt-5">
              <FileText size={12} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">All Items</span>
            </div>
          )}
          <div className="space-y-2">
            {regularItems.map((item, i) => (
              <AccordionItem key={item.id} item={item} index={pinnedItems.length + i} openIndex={openIndex} handleOpen={handleOpen} />
            ))}
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="px-6 text-center py-20">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-slate-300" />
          </div>
          <p className="text-slate-400 font-medium">No items found</p>
          <p className="text-slate-300 text-sm mt-1">Items will appear here once added.</p>
        </div>
      )}

      {/* MODAL FORM */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,15,30,0.45)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800 text-lg">Add New Item</h3>
              <button onClick={() => setFormOpen(false)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Title</label>
                <input
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                  placeholder="Enter title..."
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Description</label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                  rows={4}
                  placeholder="Enter description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Type</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                  >
                    <option value="UPDATE">Update</option>
                    <option value="SOP">SOP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">Priority</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>

                            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                   Roles <span className="text-slate-400 normal-case font-normal">(comma separated)</span>
                </label>
                 <input
                  placeholder="e.g. ADMIN,EXECUTIVE"
                  className="w-full border border-slate-200 bg-slate-50 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                  value={form.roles.join(",")}
                  onChange={(e) => setForm({ ...form, roles: e.target.value.split(",") })}
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-indigo-600"
                  checked={form.pinned}
                  onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
                />
                <span className="text-sm text-slate-600 font-medium">Pin this item to the top</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setFormOpen(false)}
                className="flex-1 border border-slate-200 text-slate-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex-1 bg-indigo-600 text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-colors shadow-sm"
              >
                {saving ? "Saving..." : "Save Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const AccordionItem = ({ item, index, openIndex, handleOpen, isPinned }) => {
  const isOpen = openIndex === index;
  const cfg = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.MEDIUM;

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? "border-indigo-200 shadow-md"
          : isPinned
          ? "border-amber-100 shadow-sm bg-amber-50/30"
          : "border-slate-100 shadow-sm bg-white hover:border-slate-200 hover:shadow"
      }`}
      style={{ background: isOpen ? "#fff" : undefined }}
    >
      {/* HEADER ROW */}
      <div
        onClick={() => handleOpen(index, item.id)}
        className="flex items-center justify-between px-4 py-3.5 cursor-pointer group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Unread dot */}
          {!item.isRead && (
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500"></span>
          )}

          {/* Pin icon */}
          {isPinned && (
            <Pin size={13} className="flex-shrink-0 text-amber-500" />
          )}

          <span className={`font-semibold text-sm truncate ${isOpen ? "text-indigo-700" : "text-slate-800"}`}>
            {item.title}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          {/* Priority badge */}
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
            {cfg.label}
          </span>

          {/* Read status */}
          {item.isRead ? (
            <CheckCircle2 size={15} className="text-emerald-500" title="Read" />
          ) : (
            <Circle size={15} className="text-slate-300" title="Unread" />
          )}

          {/* Chevron */}
          <ChevronDown
            size={15}
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* EXPANDED CONTENT */}
      {isOpen && (
        <div className="border-t border-slate-100">
          <div
            className="px-5 py-4 text-sm text-slate-700 leading-relaxed prose prose-sm max-w-none
              prose-headings:text-slate-800 prose-headings:font-bold
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-li:text-slate-700
              prose-strong:text-slate-800
              prose-a:text-indigo-600 prose-a:underline
              prose-pre:bg-slate-50 prose-pre:rounded-lg prose-pre:border prose-pre:border-slate-200
              prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-300 prose-blockquote:text-slate-600
              prose-table:rounded-lg prose-th:bg-slate-50 prose-th:text-slate-600"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />

          {/* Footer meta */}
          <div className="px-5 pb-4 flex items-center justify-between gap-4 border-t border-slate-50 pt-3">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              {item.createdBy && (
                <span className="flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs">
                    {item.createdBy?.[0]?.toUpperCase()}
                  </span>
                  {item.createdBy}
                </span>
              )}
              {item.createdAt && (
                <span>{new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              )}
            </div>
            {item.roles?.length > 0 && (
              <div className="flex gap-1">
                {item.roles.map((r) => (
                  <span key={r} className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-medium">{r}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgePage;