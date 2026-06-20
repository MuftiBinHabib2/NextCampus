import React, { useState } from "react";

const STATUS_OPTIONS = ["Interested", "Applying", "Applied", "Offered", "Rejected"];

const ScholarshipsTracker = ({ scholarships, onUpdateScholarships }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    deadline: "",
    link: "",
    status: "Interested",
    notes: ""
  });

  const [formError, setFormError] = useState("");

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      amount: "",
      deadline: "",
      link: "",
      status: "Interested",
      notes: ""
    });
    setEditingId(null);
    setShowForm(true);
    setFormError("");
  };

  const handleOpenEdit = (scholarship) => {
    setFormData({
      name: scholarship.name,
      amount: scholarship.amount || "",
      deadline: scholarship.deadline || "",
      link: scholarship.link || "",
      status: scholarship.status || "Interested",
      notes: scholarship.notes || ""
    });
    setEditingId(scholarship.id);
    setShowForm(true);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Scholarship Name is required.");
      return;
    }

    if (editingId) {
      // Edit mode
      const updated = scholarships.map((s) =>
        s.id === editingId
          ? { ...s, ...formData, name: formData.name.trim() }
          : s
      );
      onUpdateScholarships(updated);
    } else {
      // Add mode
      const newScholarship = {
        id: `sc-custom-${Date.now()}`,
        name: formData.name.trim(),
        amount: formData.amount,
        deadline: formData.deadline,
        link: formData.link,
        status: formData.status,
        notes: formData.notes,
        isCustom: true
      };
      onUpdateScholarships([...scholarships, newScholarship]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      const filtered = scholarships.filter((s) => s.id !== id);
      onUpdateScholarships(filtered);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = scholarships.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    onUpdateScholarships(updated);
  };

  // Filter scholarships
  const filteredScholarships = scholarships.filter((s) => {
    if (filterStatus === "All") return true;
    return s.status === filterStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "Offered":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Applied":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "Applying":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Rejected":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Scholarship Applications</h2>
          <p className="text-gray-400 text-sm">Add and track financial aid, grants, and scholarships.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-medium rounded-xl text-sm"
        >
          ＋ Add Scholarship
        </button>
      </div>

      {/* Form Drawer */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-2xl animate-slide-down">
          <h3 className="text-lg font-semibold text-blue-300 border-b border-white/10 pb-2">
            {editingId ? "Edit Scholarship" : "Add Scholarship"}
          </h3>
          
          {formError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase">Scholarship Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Fulbright Foreign Student Program"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Amount / Coverage</label>
              <input
                type="text"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="e.g. Full tuition, $10,000/sem"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Deadline Date</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Official Website Link</label>
              <input
                type="url"
                value={formData.link}
                onChange={e => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase">Notes & Requirements</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              placeholder="e.g. GPA requirement, letter count, essays, etc."
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition"
            >
              Save Scholarship
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {["All", ...STATUS_OPTIONS].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              filterStatus === status
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {status} ({status === "All" ? scholarships.length : scholarships.filter(s => s.status === status).length})
          </button>
        ))}
      </div>

      {/* Scholarships List */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredScholarships.map((s) => (
            <div
              key={s.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {s.name}
                  </h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${getStatusStyle(s.status)}`}>
                    {s.status}
                  </span>
                </div>

                {s.amount && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-xl w-fit">
                    <span>💰</span> {s.amount}
                  </div>
                )}

                {s.notes && (
                  <p className="text-gray-400 text-xs mt-4 line-clamp-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    {s.notes}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {s.deadline && (
                    <div className="flex items-center gap-1.5">
                      <span>⏰ Deadline:</span>
                      <strong className="text-white">
                        {new Date(s.deadline).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </strong>
                    </div>
                  )}
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                    >
                      Website ↗
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-1 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded transition text-sm"
                    title="Edit Scholarship"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded transition text-sm"
                    title="Delete Scholarship"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-5xl">🎓</div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            No scholarships found in this category. Let's add some!
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition"
          >
            Add Scholarship
          </button>
        </div>
      )}
    </div>
  );
};

export default ScholarshipsTracker;
