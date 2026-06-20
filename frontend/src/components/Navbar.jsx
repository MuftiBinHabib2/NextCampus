import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-400 tracking-wide">
          NextCampus
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <a href="#services" className="hover:text-white transition">
            Services
          </a>
          
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>

          <button className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium">
            Get Started
          </button>
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
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

          <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;