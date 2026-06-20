import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Gateway to <span className="text-blue-400">Global Education</span>
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            NextCampus helps you choose universities, prepare applications,
            and secure visas — all with guided support built for students.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium">
              Start Free
            </button>
            <button className="px-5 py-3 border border-white/20 hover:bg-white/10 rounded-xl">
              Learn More
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            ✔ University Selection • ✔ SOP Help • ✔ Visa Guidance
          </div>
        </div>

        {/* HERO CARD */}
        <div className="w-full md:w-[380px] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur">
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
      <section id="services" className="px-6 py-16">
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
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition"
            >
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="text-sm text-gray-400 mt-2">
                Professional support to boost your success chances.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="px-6 py-16 bg-white/5 border-y border-white/10">
        <h2 className="text-2xl font-bold text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10 text-center">
          {[
            ["1️⃣", "Sign Up", "Create your student profile"],
            ["2️⃣", "Get Guidance", "We match you with best options"],
            ["3️⃣", "Apply Abroad", "We support your application process"],
          ].map(([step, title, desc]) => (
            <div key={title} className="p-6">
              <div className="text-3xl">{step}</div>
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="text-sm text-gray-400 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Ready to Study Abroad?
        </h2>
        <p className="text-gray-400 mt-3">
          Start your journey with NextCampus today.
        </p>

        <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium">
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-6 text-center text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} NextCampus. All rights reserved.
      </footer>
    </div>
  );
};

export default App;