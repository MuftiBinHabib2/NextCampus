import React, { useState } from "react";
import DashboardOverview from "./DashboardOverview";
import CountrySelection from "./CountrySelection";
import ScholarshipsTracker from "./ScholarshipsTracker";
import AgencyChecklist from "./AgencyChecklist";
import RequirementsChecklist from "./RequirementsChecklist";
import TodoList from "./TodoList";
import DataManagement from "./DataManagement";

const Panel = ({
  country,
  onSelectCountry,
  scholarships,
  onUpdateScholarships,
  agencies,
  onUpdateAgencies,
  requirements,
  onUpdateRequirements,
  todos,
  onUpdateTodos,
  onImportData,
  onResetData,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard Overview", icon: "📊" },
    { id: "country", label: "Target Destination", icon: "🗺️" },
    { id: "scholarships", label: "Scholarships Tracker", icon: "🎓" },
    { id: "agency", label: "Agency Checklist", icon: "🤝" },
    { id: "requirements", label: "Requirements List", icon: "📋" },
    { id: "todo", label: "Todo Action List", icon: "📌" },
    { id: "storage", label: "Storage & Settings", icon: "⚙️" }
  ];

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "country":
        return (
          <CountrySelection
            selectedCountry={country}
            onSelectCountry={onSelectCountry}
          />
        );
      case "scholarships":
        return (
          <ScholarshipsTracker
            scholarships={scholarships}
            onUpdateScholarships={onUpdateScholarships}
          />
        );
      case "agency":
        return (
          <AgencyChecklist
            agencies={agencies}
            onUpdateAgencies={onUpdateAgencies}
          />
        );
      case "requirements":
        return (
          <RequirementsChecklist
            requirements={requirements}
            onUpdateRequirements={onUpdateRequirements}
          />
        );
      case "todo":
        return (
          <TodoList
            todos={todos}
            onUpdateTodos={onUpdateTodos}
          />
        );
      case "storage":
        return (
          <DataManagement
            onImportData={(data) => {
              onImportData(data);
              setActiveTab("dashboard");
            }}
            onResetData={onResetData}
          />
        );
      case "dashboard":
      default:
        return (
          <DashboardOverview
            country={country}
            scholarships={scholarships}
            agencies={agencies}
            requirements={requirements}
            todos={todos}
            onNavigate={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-68px)] bg-slate-950 text-white relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-white/10 shrink-0 justify-between">
        <div className="p-4 space-y-6">
          <div className="px-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Navigation Panel
            </h3>
          </div>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabSelect(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500 text-slate-950 font-bold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onNavigateHome}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition border border-white/10"
          >
            ← Back to Landing
          </button>
        </div>
      </aside>

      {/* Mobile Sticky Tab bar / Header toggle */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-xl"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-slate-950/90 backdrop-blur z-30 flex flex-col justify-between p-6 animate-fade-in">
          <div className="space-y-6 mt-12">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
              NextCampus Dashboard
            </h3>
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabSelect(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold transition ${
                      isActive
                        ? "bg-blue-500 text-slate-950 font-bold"
                        : "text-gray-300 hover:text-white bg-white/5"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-white/10 text-white font-bold rounded-xl text-sm transition text-center"
            >
              ← Back to Landing
            </button>
          </div>
        </div>
      )}

      {/* Main Panel Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto overflow-y-auto">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default Panel;
