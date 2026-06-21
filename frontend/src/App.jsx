import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Panel from "./components/Panel";
import {
  DEFAULT_SCHOLARSHIPS,
  DEFAULT_REQUIREMENTS,
  DEFAULT_TODOS,
  DEFAULT_EMAILS
} from "./utils/starterData";

// One-time cleanup of old default dummy data from localStorage
const runDummyDataCleanup = () => {
  const clearedKey = "nextcampus_dummy_cleared_v1";
  if (localStorage.getItem(clearedKey)) return;

  // Cleanup scholarships
  const savedScholarships = localStorage.getItem("nextcampus_scholarships");
  if (savedScholarships) {
    try {
      const parsed = JSON.parse(savedScholarships);
      const filtered = parsed.filter(s => s.isCustom === true);
      localStorage.setItem("nextcampus_scholarships", JSON.stringify(filtered));
    } catch (e) {
      localStorage.removeItem("nextcampus_scholarships");
    }
  }

  // Cleanup requirements
  const savedRequirements = localStorage.getItem("nextcampus_requirements");
  if (savedRequirements) {
    try {
      const parsed = JSON.parse(savedRequirements);
      const filtered = parsed.filter(r => r.isCustom === true);
      localStorage.setItem("nextcampus_requirements", JSON.stringify(filtered));
    } catch (e) {
      localStorage.removeItem("nextcampus_requirements");
    }
  }

  // Cleanup todos
  const savedTodos = localStorage.getItem("nextcampus_todos");
  if (savedTodos) {
    try {
      const parsed = JSON.parse(savedTodos);
      const dummyIds = ["td-1", "td-2", "td-3", "td-4"];
      const filtered = parsed.filter(t => !dummyIds.includes(t.id));
      localStorage.setItem("nextcampus_todos", JSON.stringify(filtered));
    } catch (e) {
      localStorage.removeItem("nextcampus_todos");
    }
  }

  localStorage.setItem(clearedKey, "true");
};

runDummyDataCleanup();

const App = () => {
  // Navigation View State
  const [view, setView] = useState("landing");

  // Local Storage Database States
  const [country, setCountry] = useState(() => {
    const saved = localStorage.getItem("nextcampus_country");
    return saved ? JSON.parse(saved) : null;
  });

  const [scholarships, setScholarships] = useState(() => {
    const saved = localStorage.getItem("nextcampus_scholarships");
    return saved ? JSON.parse(saved) : DEFAULT_SCHOLARSHIPS;
  });

  const [agencies, setAgencies] = useState(() => {
    const saved = localStorage.getItem("nextcampus_agencies");
    return saved ? JSON.parse(saved) : [];
  });

  const [requirements, setRequirements] = useState(() => {
    const saved = localStorage.getItem("nextcampus_requirements");
    return saved ? JSON.parse(saved) : DEFAULT_REQUIREMENTS;
  });

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("nextcampus_todos");
    return saved ? JSON.parse(saved) : DEFAULT_TODOS;
  });

  const [emails, setEmails] = useState(() => {
    const saved = localStorage.getItem("nextcampus_emails");
    return saved ? JSON.parse(saved) : DEFAULT_EMAILS;
  });

  // Sync state modifications to localStorage
  useEffect(() => {
    localStorage.setItem("nextcampus_country", JSON.stringify(country));
  }, [country]);

  useEffect(() => {
    localStorage.setItem("nextcampus_scholarships", JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem("nextcampus_agencies", JSON.stringify(agencies));
  }, [agencies]);

  useEffect(() => {
    localStorage.setItem("nextcampus_requirements", JSON.stringify(requirements));
  }, [requirements]);

  useEffect(() => {
    localStorage.setItem("nextcampus_todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("nextcampus_emails", JSON.stringify(emails));
  }, [emails]);

  // Import Database Handler
  const handleImportData = (data) => {
    if (data.country !== undefined) setCountry(data.country);
    if (data.scholarships) setScholarships(data.scholarships);
    if (data.agencies) setAgencies(data.agencies);
    if (data.requirements) setRequirements(data.requirements);
    if (data.todos) setTodos(data.todos);
    if (data.emails) setEmails(data.emails);
    if (data.customCountries) {
      localStorage.setItem("nextcampus_custom_countries", JSON.stringify(data.customCountries));
    }
  };

  // Reset Database Handler
  const handleResetData = () => {
    setCountry(null);
    setScholarships(DEFAULT_SCHOLARSHIPS);
    setAgencies([]);
    setRequirements(DEFAULT_REQUIREMENTS);
    setTodos(DEFAULT_TODOS);
    setEmails(DEFAULT_EMAILS);
    localStorage.removeItem("nextcampus_custom_countries");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <div>
        {/* NAVBAR */}
        <Navbar currentView={view} onNavigate={setView} />

        {view === "landing" ? (
          <div>
            {/* HERO */}
            <section className="px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto">
              <div className="max-w-xl animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Your Gateway to <span className="text-blue-400">Global Education</span>
                </h2>

                <p className="mt-4 text-gray-400 text-lg">
                  NextCampus helps you choose universities, prepare applications,
                  and secure visas — all with guided support built for students.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setView("panel")}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all rounded-xl font-medium"
                  >
                    Get Started Now
                  </button>
                  <a 
                    href="#services"
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium border border-white/10 transition-all"
                  >
                    Learn More
                  </a>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  ✔ University Selection • ✔ SOP Help • ✔ Visa Guidance
                </div>
              </div>

              {/* HERO CARD */}
              <div className="w-full md:w-[380px] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur animate-slide-down">
                <h3 className="text-lg font-semibold text-blue-300">
                  Why NextCampus?
                </h3>

                <ul className="mt-4 space-y-3 text-gray-300 text-sm">
                  <li>🎓 Personalized University Matching</li>
                  <li>📄 SOP & Application Support</li>
                  <li>✈️ Visa Interview Preparation</li>
                  <li>💰 Scholarship Guidance</li>
                </ul>
              </div>
            </section>

            {/* SERVICES */}
            <section id="services" className="px-6 py-16 border-t border-white/5 bg-slate-900/20">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-center">
                  Our Services
                </h2>

                <p className="text-center text-gray-400 mt-2">
                  Everything you need to study abroad in one place
                </p>

                <div className="grid md:grid-cols-4 gap-6 mt-10">
                  {[
                    ["🎯", "Career Counseling"],
                    ["🏫", "University Applications"],
                    ["📄", "SOP Writing Help"],
                    ["✈️", "Visa Guidance"],
                  ].map(([icon, title]) => (
                    <div
                      key={title}
                      className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="text-2xl">{icon}</div>
                      <h3 className="mt-3 font-semibold">{title}</h3>
                      <p className="text-sm text-gray-400 mt-2">
                        Professional support to boost your success chances.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="px-6 py-20 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-slate-900/10">
              <div className="max-w-4xl mx-auto space-y-4">
                <h2 className="text-3xl font-bold">
                  Ready to Study Abroad?
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Start your application journey with the NextCampus checklist, scholarships tracker, and target country guide.
                </p>

                <button 
                  onClick={() => setView("panel")}
                  className="mt-6 px-8 py-3.5 bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all rounded-xl font-semibold"
                >
                  Enter Application Panel
                </button>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-white/5 py-12">
              <Contact />
            </section>
          </div>
        ) : (
          <Panel
            country={country}
            onSelectCountry={setCountry}
            scholarships={scholarships}
            onUpdateScholarships={setScholarships}
            agencies={agencies}
            onUpdateAgencies={setAgencies}
            requirements={requirements}
            onUpdateRequirements={setRequirements}
            todos={todos}
            onUpdateTodos={setTodos}
            emails={emails}
            onUpdateEmails={setEmails}
            onImportData={handleImportData}
            onResetData={handleResetData}
            onNavigateHome={() => setView("landing")}
          />
        )}
      </div>

      {/* FOOTER */}
      <footer className="px-6 py-6 text-center text-gray-500 border-t border-white/10 bg-slate-950">
        © 2026 UXDesignBD. All rights reserved.
      </footer>
    </div>
  );
};

export default App;