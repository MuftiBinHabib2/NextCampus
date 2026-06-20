import React, { useState } from "react";

const REQ_STATUSES = ["Not Started", "In Progress", "Completed"];

const RequirementsChecklist = ({ requirements, onUpdateRequirements }) => {
  const [newReqName, setNewReqName] = useState("");
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState("");

  const handleStatusChange = (id, newStatus) => {
    const updated = requirements.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    onUpdateRequirements(updated);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newReqName.trim()) return;

    const newReq = {
      id: `req-custom-${Date.now()}`,
      name: newReqName.trim(),
      status: "Not Started",
      notes: "",
      isCustom: true
    };

    onUpdateRequirements([...requirements, newReq]);
    setNewReqName("");
  };

  const handleDeleteCustom = (id) => {
    if (window.confirm("Delete this requirement?")) {
      const filtered = requirements.filter((r) => r.id !== id);
      onUpdateRequirements(filtered);
    }
  };

  const handleStartEditingNotes = (req) => {
    setEditingNotesId(req.id);
    setTempNotes(req.notes || "");
  };

  const handleSaveNotes = (id) => {
    const updated = requirements.map((r) =>
      r.id === id ? { ...r, notes: tempNotes } : r
    );
    onUpdateRequirements(updated);
    setEditingNotesId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "border-emerald-500 text-emerald-400 bg-emerald-500/10";
      case "In Progress":
        return "border-amber-500 text-amber-400 bg-amber-500/10";
      default:
        return "border-white/10 text-gray-400 bg-white/5";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Requirements & Documents</h2>
          <p className="text-gray-400 text-sm">Prepare and track files needed for your applications.</p>
        </div>
        
        {/* Custom Adder Form */}
        <form onSubmit={handleAddCustom} className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={newReqName}
            onChange={(e) => setNewReqName(e.target.value)}
            placeholder="e.g. Portfolio, GRE score"
            className="flex-1 sm:w-60 bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition whitespace-nowrap"
          >
            ＋ Add Custom
          </button>
        </form>
      </div>

      {/* Progress Bar */}
      {requirements.length > 0 && (
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-400">Preparation Progress</span>
            <span className="text-emerald-400">
              {requirements.filter(r => r.status === "Completed").length} of {requirements.length} completed
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{
                width: `${(requirements.filter(r => r.status === "Completed").length / requirements.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}

      {/* Requirements List */}
      <div className="space-y-4">
        {requirements.map((req) => (
          <div
            key={req.id}
            className={`bg-white/5 border rounded-2xl p-5 hover:border-white/20 transition-all ${
              req.status === "Completed" ? "border-emerald-500/20 bg-emerald-500/[0.02]" : "border-white/10"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Visual Status Indicator Checkbox style */}
                <button
                  onClick={() => {
                    const nextStatus = req.status === "Completed"
                      ? "Not Started"
                      : req.status === "In Progress"
                        ? "Completed"
                        : "In Progress";
                    handleStatusChange(req.id, nextStatus);
                  }}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border font-bold text-xs transition-all ${
                    req.status === "Completed"
                      ? "bg-emerald-500 border-emerald-500 text-slate-950"
                      : req.status === "In Progress"
                        ? "bg-amber-500 border-amber-500 text-slate-950"
                        : "border-white/20 hover:border-white/40 text-transparent"
                  }`}
                  title="Click to toggle status"
                >
                  {req.status === "Completed" ? "✓" : req.status === "In Progress" ? "⚡" : ""}
                </button>

                <div>
                  <h4 className={`font-semibold text-sm sm:text-base ${
                    req.status === "Completed" ? "text-gray-300 line-through decoration-gray-600" : "text-white"
                  }`}>
                    {req.name}
                  </h4>
                  {req.isCustom && (
                    <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded-md text-blue-300">
                      Custom Item
                    </span>
                  )}
                </div>
              </div>

              {/* Status Select & Remove Button */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select
                  value={req.status}
                  onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  className={`border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none ${getStatusColor(req.status)}`}
                >
                  {REQ_STATUSES.map((status) => (
                    <option key={status} value={status} className="bg-slate-950 text-white">{status}</option>
                  ))}
                </select>

                {req.isCustom && (
                  <button
                    onClick={() => handleDeleteCustom(req.id)}
                    className="p-1 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded transition text-xs"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>

            {/* Note Editor */}
            <div className="mt-4 pt-3 border-t border-white/5">
              {editingNotesId === req.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempNotes}
                    onChange={(e) => setTempNotes(e.target.value)}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                    placeholder="Write a status note..."
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveNotes(req.id)}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-emerald-400"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingNotesId(null)}
                    className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-lg text-xs hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <div className="text-gray-400 italic truncate max-w-[80%]">
                    {req.notes ? (
                      <span>📝 <strong className="text-gray-300 not-italic">{req.notes}</strong></span>
                    ) : (
                      <span className="text-gray-500">No notes written. Click edit to add instructions.</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleStartEditingNotes(req)}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {req.notes ? "Edit Note" : "＋ Add Note"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementsChecklist;
