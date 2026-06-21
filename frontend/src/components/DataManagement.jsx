import React, { useRef, useState } from "react";

const DataManagement = ({ onImportData, onResetData }) => {
  const fileInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState({ success: null, message: "" });

  const handleExport = () => {
    // Collect all data keys from localStorage
    const data = {
      country: localStorage.getItem("nextcampus_country") 
        ? JSON.parse(localStorage.getItem("nextcampus_country")) 
        : null,
      scholarships: localStorage.getItem("nextcampus_scholarships") 
        ? JSON.parse(localStorage.getItem("nextcampus_scholarships")) 
        : [],
      agencies: localStorage.getItem("nextcampus_agencies") 
        ? JSON.parse(localStorage.getItem("nextcampus_agencies")) 
        : [],
      requirements: localStorage.getItem("nextcampus_requirements") 
        ? JSON.parse(localStorage.getItem("nextcampus_requirements")) 
        : [],
      todos: localStorage.getItem("nextcampus_todos") 
        ? JSON.parse(localStorage.getItem("nextcampus_todos")) 
        : [],
      emails: localStorage.getItem("nextcampus_emails")
        ? JSON.parse(localStorage.getItem("nextcampus_emails"))
        : [],
      customCountries: localStorage.getItem("nextcampus_custom_countries")
        ? JSON.parse(localStorage.getItem("nextcampus_custom_countries"))
        : []
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `nextcampus_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImportFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        
        // Simple validation checks to ensure structure matches
        if (
          !("scholarships" in parsed) ||
          !("agencies" in parsed) ||
          !("requirements" in parsed) ||
          !("todos" in parsed)
        ) {
          throw new Error("Invalid file schema. Backup is missing vital fields.");
        }

        if (!("emails" in parsed)) {
          parsed.emails = [];
        }

        // Call the parent import handler to reload states
        onImportData(parsed);

        setImportStatus({
          success: true,
          message: "Database backup imported successfully! Page refreshed."
        });
      } catch (err) {
        setImportStatus({
          success: false,
          message: `Import failed: ${err.message}`
        });
      }
    };
    reader.readAsText(file);
    
    // Reset file input so same file can be selected again
    e.target.value = "";
  };

  const handleResetClick = () => {
    if (
      window.confirm(
        "⚠️ WARNING: This will erase all of your progress, custom scholarships, checklist items, and todos, and reset to a clean empty database. Are you sure?"
      )
    ) {
      onResetData();
      setImportStatus({
        success: true,
        message: "Database has been reset and cleared."
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold">Database & Storage Manager</h2>
        <p className="text-gray-400 text-sm">Your data is stored locally in your web browser. Use this panel to backup or reset.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📥</span> Backup / Export Data
            </h3>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              Export your target country, checklists, comments, ratings, and todos into a single `.json` backup file. You can download and save this file on your physical hard drive.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-slate-950 font-bold rounded-xl text-sm transition"
          >
            Download Backup File (.json)
          </button>
        </div>

        {/* Import Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📤</span> Restore / Import Data
            </h3>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              Select and upload a previously exported `.json` file to restore your entire profile, tasks, and tracking metrics. This will overwrite current workspace data.
            </p>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFileChange}
            accept=".json"
            className="hidden"
          />
          
          <button
            onClick={handleImportClick}
            className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition border border-white/10"
          >
            Upload Backup File
          </button>
        </div>
      </div>

      {/* Import Status Alert */}
      {importStatus.message && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            importStatus.success
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}
        >
          {importStatus.success ? "✓" : "⚠️"} {importStatus.message}
        </div>
      )}

      <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
          <span>⚠️</span> Danger Zone
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed">
          Clear all application progress and custom data points. This resets the local database back to a clean empty state.
        </p>
        <button
          onClick={handleResetClick}
          className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-xl text-sm font-semibold transition"
        >
          Reset Database & Clear All
        </button>
      </div>
    </div>
  );
};

export default DataManagement;
