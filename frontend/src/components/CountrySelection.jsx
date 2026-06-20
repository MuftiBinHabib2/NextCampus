import React, { useState } from "react";
import { DEFAULT_COUNTRIES } from "../utils/starterData";

const CountrySelection = ({ selectedCountry, onSelectCountry }) => {
  const [countries, setCountries] = useState(() => {
    // Check if there is a custom country in local storage that is not in DEFAULT_COUNTRIES
    const stored = localStorage.getItem("nextcampus_custom_countries");
    return stored ? [...DEFAULT_COUNTRIES, ...JSON.parse(stored)] : DEFAULT_COUNTRIES;
  });

  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    flag: "✈️",
    visaType: "",
    processingTime: "",
    avgCost: "",
    intakes: "",
    workRights: "",
    description: "",
    requirements: ""
  });

  const [formError, setFormError] = useState("");

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Country Name is required.");
      return;
    }

    const newCountry = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      code: "CUSTOM",
      flag: formData.flag,
      visaType: formData.visaType || "Student Visa",
      processingTime: formData.processingTime || "N/A",
      avgCost: formData.avgCost || "N/A",
      intakes: formData.intakes || "N/A",
      workRights: formData.workRights || "N/A",
      description: formData.description || "Custom added study destination.",
      requirements: formData.requirements
        ? formData.requirements.split(",").map(r => r.trim()).filter(Boolean)
        : ["Passport", "Academic records"]
    };

    const updatedCustomList = [...countries.filter(c => c.id.startsWith("custom-")), newCountry];
    localStorage.setItem("nextcampus_custom_countries", JSON.stringify(updatedCustomList));

    setCountries([...DEFAULT_COUNTRIES, ...updatedCustomList]);
    onSelectCountry(newCountry);
    setShowCustomForm(false);
    setFormData({
      name: "",
      flag: "✈️",
      visaType: "",
      processingTime: "",
      avgCost: "",
      intakes: "",
      workRights: "",
      description: "",
      requirements: ""
    });
    setFormError("");
  };

  const handleRemoveCustom = (id, e) => {
    e.stopPropagation(); // Avoid selecting the country while removing
    const updatedCustomList = countries
      .filter(c => c.id.startsWith("custom-") && c.id !== id)
      .map(c => ({ ...c }));

    localStorage.setItem("nextcampus_custom_countries", JSON.stringify(updatedCustomList));
    setCountries([...DEFAULT_COUNTRIES, ...updatedCustomList]);

    // If the currently selected country is the one being deleted, clear the selection
    if (selectedCountry && selectedCountry.id === id) {
      onSelectCountry(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Select Target Destination</h2>
          <p className="text-gray-400 text-sm">Choose the country you want to apply to or add a custom one.</p>
        </div>
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="px-4 py-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-sm transition"
        >
          {showCustomForm ? "Close Add Form" : "＋ Add Custom Country"}
        </button>
      </div>

      {/* Custom Country Form */}
      {showCustomForm && (
        <form onSubmit={handleCustomSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-2xl animate-slide-down">
          <h3 className="text-lg font-semibold text-blue-300 border-b border-white/10 pb-2">Add New Destination Country</h3>
          
          {formError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Country Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sweden, South Korea"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Flag Emoji</label>
              <input
                type="text"
                value={formData.flag}
                onChange={e => setFormData({ ...formData, flag: e.target.value })}
                placeholder="e.g. 🇸🇪, 🇰🇷"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Visa Type / Category</label>
              <input
                type="text"
                value={formData.visaType}
                onChange={e => setFormData({ ...formData, visaType: e.target.value })}
                placeholder="e.g. Student Permit, Residence Permit"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Visa Processing Time</label>
              <input
                type="text"
                value={formData.processingTime}
                onChange={e => setFormData({ ...formData, processingTime: e.target.value })}
                placeholder="e.g. 1-2 Months, 3 Weeks"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Avg. Annual Cost (Tuition + Living)</label>
              <input
                type="text"
                value={formData.avgCost}
                onChange={e => setFormData({ ...formData, avgCost: e.target.value })}
                placeholder="e.g. $15,000 / year"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Intake Semesters</label>
              <input
                type="text"
                value={formData.intakes}
                onChange={e => setFormData({ ...formData, intakes: e.target.value })}
                placeholder="e.g. Autumn (Sep), Spring (Jan)"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Part-time / Work Rights</label>
              <input
                type="text"
                value={formData.workRights}
                onChange={e => setFormData({ ...formData, workRights: e.target.value })}
                placeholder="e.g. 20 hours/week, 40 hours/holiday"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Key Requirements (comma separated)</label>
              <input
                type="text"
                value={formData.requirements}
                onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="e.g. IELTS 6.5, Bank Solvency, SOP"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase">Country Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows="2"
              placeholder="Brief summary of educational benefits..."
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCustomForm(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition"
            >
              Save & Choose
            </button>
          </div>
        </form>
      )}

      {/* Grid List */}
      {countries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((countryItem) => {
            const isSelected = selectedCountry && selectedCountry.id === countryItem.id;
            const isCustom = countryItem.id.startsWith("custom-");

            return (
              <div
                key={countryItem.id}
                onClick={() => onSelectCountry(countryItem)}
                className={`group relative overflow-hidden flex flex-col justify-between bg-white/5 border rounded-3xl p-6 cursor-pointer hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 ${
                  isSelected ? "border-blue-500 bg-blue-900/10" : "border-white/10"
                }`}
              >
                {/* Card border shine */}
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-bl-xl border-l border-b border-blue-500/20">
                    Selected ✓
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl filter drop-shadow">{countryItem.flag}</span>
                    {isCustom && (
                      <button
                        onClick={(e) => handleRemoveCustom(countryItem.id, e)}
                        className="text-gray-400 hover:text-rose-400 p-1.5 hover:bg-white/5 rounded-lg transition"
                        title="Remove Custom Country"
                      >
                        🗑️
                      </button>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mt-4 group-hover:text-blue-300 transition-colors">
                    {countryItem.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 italic">
                    {countryItem.description}
                  </p>

                  {/* Quick Info Grid */}
                  <div className="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Visa:</span>
                      <span className="text-gray-200 font-medium truncate max-w-[150px]">{countryItem.visaType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Processing:</span>
                      <span className="text-gray-200 font-medium">{countryItem.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost:</span>
                      <span className="text-gray-200 font-medium truncate max-w-[150px]">{countryItem.avgCost}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-1">
                  {countryItem.requirements && countryItem.requirements.slice(0, 2).map((req, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-gray-400">
                      {req}
                    </span>
                  ))}
                  {countryItem.requirements && countryItem.requirements.length > 2 && (
                    <span className="text-[10px] px-2 py-0.5 text-gray-500">
                      +{countryItem.requirements.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-5xl">🧭</div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            No target destination countries registered. Click "＋ Add Custom Country" above to add your own destination options!
          </p>
        </div>
      )}
    </div>
  );
};

export default CountrySelection;
