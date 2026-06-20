export const DEFAULT_COUNTRIES = [
  {
    id: "usa",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    visaType: "F-1 Student Visa",
    processingTime: "1-3 Months",
    avgCost: "$25,000 - $50,000 / year",
    intakes: "Fall (Aug/Sep), Spring (Jan)",
    workRights: "20 hrs/week on-campus, OPT after graduation",
    description: "Home to Ivy League universities and leading research institutions. Outstanding flexibility and career opportunities.",
    requirements: ["GRE/GMAT (often required)", "IELTS (6.5+) or TOEFL (90+)", "SOP & 3 LORs", "WES evaluation (some schools)"]
  },
  {
    id: "canada",
    name: "Canada",
    code: "CA",
    flag: "🇨🇦",
    visaType: "Study Permit",
    processingTime: "2-4 Months",
    avgCost: "CAD 20,000 - 45,000 / year",
    intakes: "Fall (Sep), Winter (Jan), Summer (May)",
    workRights: "20 hrs/week off-campus, PGWP up to 3 years",
    description: "Highly student-friendly environment with excellent pathways to permanent residency and top-tier universities.",
    requirements: ["IELTS Academic (6.5 overall, no band < 6.0)", "SOP & 2 LORs", "Provincial Attestation Letter (PAL)", "GIC (Guaranteed Investment Certificate)"]
  },
  {
    id: "uk",
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    visaType: "Student Visa (Subclass)",
    processingTime: "3-4 Weeks",
    avgCost: "£15,000 - £35,000 / year",
    intakes: "September/October, January/February",
    workRights: "20 hrs/week term-time, Graduate Visa (2 years post-study)",
    description: "Short, intensive degree programs (1-year Master's) and historic academic prestige in a global cultural hub.",
    requirements: ["IELTS UKVI (6.5+)", "SOP & 2 LORs", "CAS (Confirmation of Acceptance for Studies)", "Tuberculosis Test Certificate"]
  },
  {
    id: "germany",
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    visaType: "National Visa (D)",
    processingTime: "2-3 Months",
    avgCost: "€0 tuition at public universities (semi-admin fees €300/sem)",
    intakes: "Winter (Oct), Summer (April)",
    workRights: "120 full days or 240 half days per year",
    description: "World-class engineering and technical courses with zero tuition fees at public universities. Requires blocked bank account.",
    requirements: ["Blocked Account (~€11,208/year)", "German Language A2/B1 (for bilingual) or IELTS (6.5+)", "APS Certificate (for select countries)", "SOP & CV"]
  },
  {
    id: "australia",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    visaType: "Student Visa (Subclass 500)",
    processingTime: "1-2 Months",
    avgCost: "AUD 20,000 - 45,000 / year",
    intakes: "Semester 1 (Feb), Semester 2 (July)",
    workRights: "48 hrs/fortnight, Temporary Graduate Visa (2-4 years)",
    description: "Stunning outdoor lifestyle combined with globally recognized universities and highly structured graduate pathways.",
    requirements: ["IELTS (6.5+ or equivalent)", "GTE (Genuine Temporary Entrant) Statement", "OSHC (Overseas Student Health Cover)", "Financial capacity proof"]
  },
  {
    id: "japan",
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    visaType: "Student Visa",
    processingTime: "2-3 Months",
    avgCost: "¥800,000 - ¥1,500,000 / year",
    intakes: "April (Main), October",
    workRights: "28 hrs/week (with permission)",
    description: "Rich cultural heritage, high safety, and advanced technology. Growing number of English-taught programs.",
    requirements: ["CoE (Certificate of Eligibility)", "Basic Japanese (N5 recommended)", "SOP & Academic Transcripts", "Sponsor financial proof"]
  }
];

export const DEFAULT_SCHOLARSHIPS = [
  {
    id: "sc-1",
    name: "Fulbright Foreign Student Program",
    amount: "Full tuition, living stipend, airfare, health insurance",
    deadline: "2026-09-15",
    link: "https://foreign.fulbrightonline.org/about/foreign-student-program",
    status: "Interested",
    notes: "Prestigious US government scholarship. Requires strong leadership record, SOP, and high English score.",
    isCustom: false
  },
  {
    id: "sc-2",
    name: "Chevening Scholarship",
    amount: "Full tuition, monthly allowance, economy flights, grants",
    deadline: "2026-11-03",
    link: "https://www.chevening.org/",
    status: "Interested",
    notes: "UK government global scholarship program. Requires 2 years of work experience (2,800 hours) and return to home country.",
    isCustom: false
  },
  {
    id: "sc-3",
    name: "DAAD Development-Related Postgraduate Courses (EPOS)",
    amount: "€934-€1,200 monthly, health insurance, travel grant, tuition-free",
    deadline: "2026-10-31",
    link: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    status: "Interested",
    notes: "German Academic Exchange Service. Best for Master's/PhD candidates with at least 2 years of professional experience.",
    isCustom: false
  },
  {
    id: "sc-4",
    name: "MEXT Japanese Government Scholarship",
    amount: "Full tuition, monthly stipend (~¥144,000), round-trip airfare",
    deadline: "2026-05-30",
    link: "https://www.studyinjapan.go.jp/en/planning/scholarship/",
    status: "Interested",
    notes: "Apply via Japanese Embassy or University recommendation. Highly competitive exam/interview is required.",
    isCustom: false
  }
];

export const DEFAULT_REQUIREMENTS = [
  {
    id: "req-1",
    name: "Valid Passport (min. 6 months validity)",
    status: "Not Started",
    notes: "Ensure spelling matches academic certificates.",
    isCustom: false
  },
  {
    id: "req-2",
    name: "Academic Transcripts & Certificates",
    status: "Not Started",
    notes: "Get attested copies from high school / university registrar.",
    isCustom: false
  },
  {
    id: "req-3",
    name: "Statement of Purpose (SOP) / Personal Statement",
    status: "In Progress",
    notes: "Need to write a draft detailing career goals and university fit.",
    isCustom: false
  },
  {
    id: "req-4",
    name: "2-3 Letters of Recommendation (LOR)",
    status: "Not Started",
    notes: "Request academic mentors or professional supervisors.",
    isCustom: false
  },
  {
    id: "req-5",
    name: "English Language Test Score (IELTS / TOEFL / PTE)",
    status: "In Progress",
    notes: "Aiming for IELTS 7.0 overall. Book test date.",
    isCustom: false
  },
  {
    id: "req-6",
    name: "Curriculum Vitae (CV) / Academic Resume",
    status: "Completed",
    notes: "Updated CV using standard academic/professional layout.",
    isCustom: false
  },
  {
    id: "req-7",
    name: "Financial Capability Proof (Bank Statement)",
    status: "Not Started",
    notes: "Will need sponsor bank statements showing tuition + living cover.",
    isCustom: false
  }
];

export const DEFAULT_TODOS = [
  {
    id: "td-1",
    title: "Research university programs & faculty lists",
    priority: "High",
    deadline: "2026-07-10",
    status: "Pending"
  },
  {
    id: "td-2",
    title: "Draft first version of Statement of Purpose (SOP)",
    priority: "High",
    deadline: "2026-07-20",
    status: "Pending"
  },
  {
    id: "td-3",
    title: "Contact professors for LOR permission",
    priority: "Medium",
    deadline: "2026-07-25",
    status: "Pending"
  },
  {
    id: "td-4",
    title: "Register for English proficiency exam",
    priority: "High",
    deadline: "2026-08-01",
    status: "Pending"
  }
];
