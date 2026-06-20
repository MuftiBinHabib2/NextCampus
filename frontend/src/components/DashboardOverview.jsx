import React from "react";

const DashboardOverview = ({
  country,
  scholarships,
  agencies,
  requirements,
  todos,
  onNavigate
}) => {
  // Calculate completion percentages
  const completedReqs = requirements.filter(r => r.status === "Completed").length;
  const inProgressReqs = requirements.filter(r => r.status === "In Progress").length;
  const totalReqs = requirements.length;
  const reqPercent = totalReqs > 0 ? Math.round((completedReqs / totalReqs) * 100) : 0;

  const completedTodos = todos.filter(t => t.status === "Completed").length;
  const pendingTodos = todos.filter(t => t.status === "Pending").length;
  const totalTodos = todos.length;
  const todoPercent = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const activeScholarships = scholarships.filter(s => s.status !== "Rejected");
  const appliedCount = scholarships.filter(s => s.status === "Applied").length;
  const offeredCount = scholarships.filter(s => s.status === "Offered").length;

  const hiredAgencies = agencies.filter(a => a.status === "Hired");

  // Get next deadlines (from scholarships and todos)
  const getDeadlines = () => {
    const list = [];
    scholarships.forEach(s => {
      if (s.deadline && s.status !== "Rejected" && s.status !== "Offered") {
        list.push({
          type: "scholarship",
          title: `Scholarship: ${s.name}`,
          date: s.deadline,
          badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          icon: "🎓"
        });
      }
    });
    todos.forEach(t => {
      if (t.deadline && t.status === "Pending") {
        list.push({
          type: "todo",
          title: `Task: ${t.title}`,
          date: t.deadline,
          badgeColor: t.priority === "High" 
            ? "bg-rose-500/20 text-rose-300 border-rose-500/30" 
            : t.priority === "Medium"
              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
              : "bg-blue-500/20 text-blue-300 border-blue-500/30",
          icon: "📌"
        });
      }
    });

    // Sort by date (ascending)
    return list
      .filter(item => item.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  };

  const upcomingDeadlines = getDeadlines();

  // Dynamic feedback phrase
  const getFeedbackMessage = () => {
    if (!country) return "First step: Choose your dream country study destination!";
    if (reqPercent === 100) return "Outstanding! All documents are ready. Go submit those applications!";
    if (reqPercent > 60) return "Looking great! Most of your documents are set. Keep polishing your SOP.";
    if (reqPercent > 30) return "You're making steady progress. Check your checklist and plan recommendation letters.";
    return "Great start! Get in touch with professors and order transcripts early.";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Study Abroad Dashboard
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base max-w-xl">
              {getFeedbackMessage()}
            </p>
          </div>
          {country ? (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Destination</div>
                <div className="font-bold text-white text-base">{country.name}</div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onNavigate("country")}
              className="px-5 py-3 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-medium rounded-xl text-sm"
            >
              Select Target Country
            </button>
          )}
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Requirements Progress */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-medium">Requirements Checklist</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{completedReqs}</span>
              <span className="text-gray-500 text-sm">/ {totalReqs} ready</span>
            </div>
            <div className="text-xs text-gray-500 pt-2">
              {inProgressReqs} in progress • {totalReqs - completedReqs - inProgressReqs} pending
            </div>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG Circle Progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-white/5"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-emerald-500 transition-all duration-500"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - reqPercent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold text-emerald-400">{reqPercent}%</span>
          </div>
        </div>

        {/* Scholarships Tracker */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-medium">Scholarships Added</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{scholarships.length}</span>
              <span className="text-gray-500 text-sm">tracked</span>
            </div>
            <div className="text-xs text-gray-500 pt-2 flex gap-3">
              <span>✈️ {appliedCount} Applied</span>
              {offeredCount > 0 && <span className="text-emerald-400 font-medium">🎉 {offeredCount} Offered</span>}
            </div>
          </div>
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-3xl">
            🎓
          </div>
        </div>

        {/* Tasks Progress */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-medium">Todo Tasks</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{pendingTodos}</span>
              <span className="text-gray-500 text-sm">remaining</span>
            </div>
            <div className="text-xs text-gray-500 pt-2">
              {completedTodos} completed ({todoPercent}% done)
            </div>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-white/5"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                className="stroke-blue-500 transition-all duration-500"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={2 * Math.PI * 34 * (1 - todoPercent / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-sm font-bold text-blue-400">{todoPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Destination Card & Info */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span>🗺️</span> Destination Profile
          </h3>

          {country ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400">Visa Category</div>
                  <div className="font-semibold text-white mt-1 text-sm">{country.visaType}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400">Processing Timeline</div>
                  <div className="font-semibold text-white mt-1 text-sm">{country.processingTime}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400">Average Expense</div>
                  <div className="font-semibold text-white mt-1 text-sm">{country.avgCost}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="text-xs text-gray-400">Work Privileges</div>
                  <div className="font-semibold text-white mt-1 text-sm">{country.workRights}</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">General Requirements</h4>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {country.requirements && country.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg">
                      <span className="text-blue-400 text-xs">⚡</span> {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-500 italic max-w-md">
                  {country.description}
                </p>
                <button
                  onClick={() => onNavigate("country")}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1"
                >
                  Change Country ↗
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="text-5xl">🧭</div>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                No destination selected. Choosing a country helps personalize visa and fee estimates.
              </p>
              <button
                onClick={() => onNavigate("country")}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition"
              >
                Choose Country Now
              </button>
            </div>
          )}
        </div>

        {/* Deadlines Sidebar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <span>⏰</span> Upcoming Deadlines
          </h3>

          {upcomingDeadlines.length > 0 ? (
            <div className="space-y-4 flex-1">
              {upcomingDeadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition"
                >
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex-1 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-4xl text-gray-600">🎉</span>
              <p className="text-sm text-gray-400">No upcoming deadlines.</p>
              <button
                onClick={() => onNavigate("todo")}
                className="text-xs text-blue-400 hover:underline"
              >
                Add some tasks to keep track
              </button>
            </div>
          )}

          {/* Quick Agency Sync Status */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Agency Support</h4>
            {hiredAgencies.length > 0 ? (
              <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2">
                <span>🤝</span> Hired {hiredAgencies.length} active agency helper: <strong>{hiredAgencies[0].name}</strong>
              </div>
            ) : (
              <div className="text-xs text-gray-400 bg-white/5 p-3 rounded-xl flex justify-between items-center">
                <span>No consultant agencies hired yet.</span>
                <button
                  onClick={() => onNavigate("agency")}
                  className="text-blue-400 hover:underline font-medium"
                >
                  Add One
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
