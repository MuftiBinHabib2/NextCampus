import React, { useState } from "react";

const AGENCY_STATUSES = ["Not Contacted", "Contacted", "In Consultation", "Hired", "Avoid"];

const AgencyChecklist = ({ agencies, onUpdateAgencies }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    counselor: "",
    contact: "",
    fees: "",
    rating: 3,
    status: "Not Contacted",
    notes: ""
  });

  const [formError, setFormError] = useState("");

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      counselor: "",
      contact: "",
      fees: "",
      rating: 3,
      status: "Not Contacted",
      notes: ""
    });
    setEditingId(null);
    setShowForm(true);
    setFormError("");
  };

  const handleOpenEdit = (agency) => {
    setFormData({
      name: agency.name,
      counselor: agency.counselor || "",
      contact: agency.contact || "",
      fees: agency.fees || "",
      rating: agency.rating || 3,
      status: agency.status || "Not Contacted",
      notes: agency.notes || ""
    });
    setEditingId(agency.id);
    setShowForm(true);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Agency Name is required.");
      return;
    }

    if (editingId) {
      const updated = agencies.map((a) =>
        a.id === editingId ? { ...a, ...formData, name: formData.name.trim() } : a
      );
      onUpdateAgencies(updated);
    } else {
      const newAgency = {
        id: `ag-${Date.now()}`,
        name: formData.name.trim(),
        counselor: formData.counselor,
        contact: formData.contact,
        fees: formData.fees,
        rating: formData.rating,
        status: formData.status,
        notes: formData.notes
      };
      onUpdateAgencies([...agencies, newAgency]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this agency log?")) {
      const filtered = agencies.filter((a) => a.id !== id);
      onUpdateAgencies(filtered);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Hired":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "In Consultation":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case "Contacted":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Avoid":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Agency Tracker & Checklist</h2>
          <p className="text-gray-400 text-sm">Keep notes on consultants, review fees, and mark who you are working with.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-medium rounded-xl text-sm"
        >
          ＋ Add Agency Log
        </button>
      </div>

      {/* Info Alert */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3">
        <span className="text-lg">💡</span>
        <p className="text-xs text-gray-300 leading-relaxed">
          <strong>Pro Tip:</strong> While applying, verify application deadlines directly on university portals. Agencies can help handle document shipments or translation services, but you should track service fees, counselors assigned, and keep local notes here to prevent overcharging.
        </p>
      </div>

      {/* Form Drawer */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-2xl animate-slide-down">
          <h3 className="text-lg font-semibold text-blue-300 border-b border-white/10 pb-2">
            {editingId ? "Edit Agency Details" : "Add Agency Record"}
          </h3>

          {formError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Agency Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Global Education Consultants"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Assigned Counselor</label>
              <input
                type="text"
                value={formData.counselor}
                onChange={e => setFormData({ ...formData, counselor: e.target.value })}
                placeholder="e.g. Mr. John Doe"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Contact Information</label>
              <input
                type="text"
                value={formData.contact}
                onChange={e => setFormData({ ...formData, contact: e.target.value })}
                placeholder="e.g. +123 456 789 / info@global.com"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Service Fees / Charges</label>
              <input
                type="text"
                value={formData.fees}
                onChange={e => setFormData({ ...formData, fees: e.target.value })}
                placeholder="e.g. Free (commission), $300 package"
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
                {AGENCY_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">My Rating (1-5)</label>
              <select
                value={formData.rating}
                onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{"★".repeat(num) + "☆".repeat(5-num)}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase">Service Notes & Comments</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              placeholder="e.g. Friendly staff but slow responses. Specializes in Canada applications..."
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
              Save Agency Log
            </button>
          </div>
        </form>
      )}

      {/* Grid of logged agencies */}
      {agencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agencies.map((agency) => (
            <div
              key={agency.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {agency.name}
                    </h3>
                    {agency.counselor && (
                      <div className="text-xs text-gray-400 mt-1">
                        Counselor: <span className="text-gray-300 font-semibold">{agency.counselor}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap ${getStatusBadge(agency.status)}`}>
                    {agency.status}
                  </span>
                </div>

                {/* Rating & Fees */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                  <div className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/10">
                    {renderStars(agency.rating)}
                  </div>
                  {agency.fees && (
                    <div className="text-blue-300 font-semibold bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/10">
                      💰 Fees: {agency.fees}
                    </div>
                  )}
                </div>

                {agency.notes && (
                  <p className="text-gray-400 text-xs mt-4 bg-white/5 p-3 rounded-xl border border-white/5 line-clamp-3">
                    {agency.notes}
                  </p>
                )}
              </div>

              {/* Contact and Actions Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4 text-xs">
                <div className="truncate max-w-[200px] text-gray-400">
                  {agency.contact ? (
                    <span title={agency.contact}>📞 {agency.contact}</span>
                  ) : (
                    <span className="italic text-gray-600">No contact entered</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(agency)}
                    className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded transition text-sm"
                    title="Edit Record"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(agency.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded transition text-sm"
                    title="Delete Record"
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
          <div className="text-5xl">🤝</div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            No consulting agencies logged yet. Log agencies you call or consult with to evaluate fees and services.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition"
          >
            Add First Agency
          </button>
        </div>
      )}
    </div>
  );
};

export default AgencyChecklist;
