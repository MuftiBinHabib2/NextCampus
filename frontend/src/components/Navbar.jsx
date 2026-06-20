import React, { useState } from "react";

const Navbar = ({ currentView, onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 
          className="text-xl font-bold text-blue-400 tracking-wide cursor-pointer"
          onClick={() => onNavigate("landing")}
        >
          NextCampus
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          {currentView === "landing" ? (
            <>
              <a href="#services" className="hover:text-white transition">
                Services
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
              <button 
                onClick={() => onNavigate("panel")}
                className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 transition rounded-lg text-white font-medium"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => onNavigate("landing")}
                className="hover:text-white transition text-gray-400"
              >
                Back to Home
              </button>
              <button 
                onClick={() => onNavigate("panel")}
                className="ml-4 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg font-medium"
              >
                Dashboard Active ✓
              </button>
            </>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-gray-300 bg-slate-950 border-t border-white/10">
          {currentView === "landing" ? (
            <>
              <a href="#services" onClick={() => setOpen(false)}>
                Services
              </a>
              <a href="#contact" onClick={() => setOpen(false)}>
                Contact
              </a>
              <button 
                onClick={() => {
                  onNavigate("panel");
                  setOpen(false);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-center"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => {
                  onNavigate("landing");
                  setOpen(false);
                }}
                className="text-left py-2 hover:text-white"
              >
                Back to Home
              </button>
              <button 
                onClick={() => {
                  onNavigate("panel");
                  setOpen(false);
                }}
                className="mt-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-center"
              >
                Dashboard Active ✓
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;