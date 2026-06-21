import React, { useState } from "react";

const STATUS_OPTIONS = [
  "Draft / Not Sent",
  "Sent",
  "Awaiting Reply",
  "Response Received",
  "Followed Up"
];

const EMAIL_TEMPLATES = [
  {
    name: "Supervisor Cold Inquiry",
    subject: "Inquiry regarding potential Graduate Supervision - [Your Name]",
    body: `Dear Dr. [Professor Surname],

I hope this email finds you well.

My name is [Your Name], and I am a student from [Your Country] interested in pursuing a [Master's/PhD] degree in [Field] at [University Name]. I have read your recent research papers on [Topic], particularly [specific paper/finding], and I am highly motivated by your work.

Would you be accepting new graduate students for the [Fall/Spring Year] semester? I have attached my CV and transcript for your review. I would appreciate the opportunity to discuss potential research alignment with you.

Thank you for your time and consideration.

Sincerely,
[Your Name]
[Your Contact Info]`
  },
  {
    name: "Application Fee Waiver Request",
    subject: "Request for Graduate Application Fee Waiver - [Your Name]",
    body: `Dear Admissions Team,

I hope this email finds you well.

I am writing to express my strong interest in applying to the [Program Name] at [University Name] for the [Fall/Spring Year] intake. I have prepared all of my academic credentials and am eager to submit my application.

However, due to severe financial constraints, the standard application fee poses a significant financial hardship for me. I would like to kindly inquire if the department offers application fee waivers or if my circumstances qualify for one.

I have attached my CV and unofficial transcript for your reference. Thank you very much for your time, support, and consideration.

Sincerely,
[Your Name]
[Your Contact Info]`
  },
  {
    name: "Recommendation Letter Request",
    subject: "Request for Academic Recommendation Letter - [Your Name]",
    body: `Dear Professor [Professor Surname],

I hope you are having a great week.

I am writing to ask if you would feel comfortable writing a letter of recommendation on my behalf for my graduate school applications to [University Name] for the [Program Name].

I thoroughly enjoyed your class, [Class Name], in [Semester/Year], where I worked on a project about [Project Topic] and received a grade of [Your Grade]. I believe your perspective would be invaluable to the admissions committee.

The deadline for submission is [Deadline Date]. I have attached my CV, transcript, and Statement of Purpose to assist you.

Thank you very much for your time and guidance.

Best regards,
[Your Name]
[Your Contact Info]`
  },
  {
    name: "Admission Status Inquiry",
    subject: "Status Inquiry: Application for [Program Name] - ID: [App ID]",
    body: `Dear Admissions Coordinator,

I hope this email finds you well.

I am writing to politely inquire about the status of my application for the [Program Name] (Application ID: [App ID]) for the upcoming [Fall/Spring Year] semester.

According to my portal, all required materials, including test scores and recommendation letters, were successfully received by the deadline of [Deadline Date]. I understand the admissions committee has a high volume of dossiers to review, but I wanted to make sure my file is complete and ask if any additional details are needed from my end.

Thank you for your assistance and for reviewing my application.

Sincerely,
[Your Name]
[Your Contact Info]`
  }
];

const EmailList = ({ emails, onUpdateEmails }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState({ type: "", id: null });

  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    subject: "",
    status: "Draft / Not Sent",
    notes: "",
    dateContacted: ""
  });

  const [formError, setFormError] = useState("");

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      institution: "",
      email: "",
      subject: "",
      status: "Draft / Not Sent",
      notes: "",
      dateContacted: ""
    });
    setEditingId(null);
    setShowForm(true);
    setFormError("");
  };

  const handleOpenEdit = (contact) => {
    setFormData({
      name: contact.name,
      institution: contact.institution || "",
      email: contact.email || "",
      subject: contact.subject || "",
      status: contact.status || "Draft / Not Sent",
      notes: contact.notes || "",
      dateContacted: contact.dateContacted || ""
    });
    setEditingId(contact.id);
    setShowForm(true);
    setFormError("");
  };

  const loadTemplate = (template) => {
    if (formData.subject.trim() || formData.notes.trim()) {
      if (!window.confirm("Overwrite your current Subject and Draft with this template?")) {
        return;
      }
    }
    setFormData({
      ...formData,
      subject: template.subject,
      notes: template.body
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Contact Name/Role is required.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Email Address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (editingId) {
      // Edit contact
      const updated = emails.map((contact) =>
        contact.id === editingId
          ? { 
              ...contact, 
              ...formData, 
              name: formData.name.trim(), 
              email: formData.email.trim() 
            }
          : contact
      );
      onUpdateEmails(updated);
    } else {
      // Add contact
      const newContact = {
        id: `em-custom-${Date.now()}`,
        name: formData.name.trim(),
        institution: formData.institution.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        status: formData.status,
        notes: formData.notes,
        dateContacted: formData.dateContacted,
        isCustom: true
      };
      onUpdateEmails([...emails, newContact]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const filtered = emails.filter((contact) => contact.id !== id);
      onUpdateEmails(filtered);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = emails.map((contact) =>
      contact.id === id ? { ...contact, status: newStatus } : contact
    );
    onUpdateEmails(updated);
  };

  const copyToClipboard = (text, type, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId({ type, id });
    setTimeout(() => {
      setCopiedId({ type: "", id: null });
    }, 2000);
  };

  const getMailtoLink = (contact) => {
    const subject = encodeURIComponent(contact.subject || "");
    const body = encodeURIComponent(contact.notes || "");
    return `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Response Received":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Awaiting Reply":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Sent":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Followed Up":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  // Filter & Search contacts
  const filteredContacts = emails.filter((contact) => {
    const matchesStatus = filterStatus === "All" || contact.status === filterStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !query ||
      contact.name.toLowerCase().includes(query) ||
      (contact.institution && contact.institution.toLowerCase().includes(query)) ||
      contact.email.toLowerCase().includes(query) ||
      (contact.subject && contact.subject.toLowerCase().includes(query));
    
    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const totalContacts = emails.length;
  const sentContacts = emails.filter(c => c.status !== "Draft / Not Sent").length;
  const awaitingReply = emails.filter(c => c.status === "Awaiting Reply").length;
  const responseReceived = emails.filter(c => c.status === "Response Received").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Email Outreach Contacts</h2>
          <p className="text-gray-400 text-sm">Draft, track, and manage emails sent to supervisors, admissions offices, and sponsors.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white font-medium rounded-xl text-sm"
        >
          ＋ Add Contact
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ["👥 Total Contacts", totalContacts, "bg-white/5 border-white/10"],
          ["✉️ Sent / Outreach", sentContacts, "bg-blue-500/10 border-blue-500/20 text-blue-300"],
          ["⏳ Awaiting Reply", awaitingReply, "bg-amber-500/10 border-amber-500/20 text-amber-300"],
          ["🎉 Responses", responseReceived, "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"],
        ].map(([title, val, borderStyle], idx) => (
          <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-center ${borderStyle}`}>
            <span className="text-xs text-gray-400 font-medium">{title}</span>
            <span className="text-2xl font-bold mt-1 text-white">{val}</span>
          </div>
        ))}
      </div>

      {/* Form Drawer */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 max-w-3xl animate-slide-down">
          <h3 className="text-lg font-semibold text-blue-300 border-b border-white/10 pb-2">
            {editingId ? "Edit Outreach Contact" : "Add Outreach Contact"}
          </h3>
          
          {formError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
              ⚠️ {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Contact Name / Role *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Jane Doe (Supervisor)"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Institution / University</label>
              <input
                type="text"
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. University of Munich"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. jane.doe@uni.edu"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase">Email Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Inquiry regarding potential MSc supervision"
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quick template selector */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 space-y-2">
            <span className="block text-xs font-semibold text-gray-400 uppercase">💡 Load Email Template Preset</span>
            <div className="flex flex-wrap gap-2">
              {EMAIL_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.name}
                  type="button"
                  onClick={() => loadTemplate(tmpl)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-blue-500/20 hover:text-blue-300 border border-white/10 hover:border-blue-500/35 rounded-lg text-xs transition-all text-gray-300"
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase">Email Draft / Conversation Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              rows="6"
              placeholder="Write your email body or record contact notes here..."
              className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-y font-mono text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase">Date Contacted</label>
              <input
                type="date"
                value={formData.dateContacted}
                onChange={e => setFormData({ ...formData, dateContacted: e.target.value })}
                className="mt-1 w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-sm font-semibold transition"
            >
              Save Contact
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-white/10 pb-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500 text-sm">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 placeholder-gray-500"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
          {["All", ...STATUS_OPTIONS].map((status) => {
            const count = status === "All" ? emails.length : emails.filter(c => c.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  filterStatus === status
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Contacts List Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {contact.name}
                    </h3>
                    {contact.institution && (
                      <span className="text-blue-400 text-xs font-medium block mt-1">
                        🏫 {contact.institution}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full border whitespace-nowrap font-medium ${getStatusStyle(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>

                {/* Email Address details */}
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 w-fit max-w-full">
                  <span className="truncate">📧 {contact.email}</span>
                  <button
                    onClick={() => copyToClipboard(contact.email, "email", contact.id)}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold shrink-0 cursor-pointer ml-1.5"
                  >
                    {copiedId.type === "email" && copiedId.id === contact.id ? "Copied! ✓" : "Copy"}
                  </button>
                </div>

                {/* Subject */}
                {contact.subject && (
                  <div className="mt-4 space-y-1">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Subject Line</span>
                    <p className="text-xs text-gray-200 bg-slate-900/60 p-2.5 rounded-lg border border-white/5 truncate font-medium">
                      {contact.subject}
                    </p>
                  </div>
                )}

                {/* Notes/Draft */}
                {contact.notes && (
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">Email Draft / Notes</span>
                      <button
                        onClick={() => copyToClipboard(contact.notes, "notes", contact.id)}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                      >
                        {copiedId.type === "notes" && copiedId.id === contact.id ? "Copied! ✓" : "📋 Copy Draft"}
                      </button>
                    </div>
                    <pre className="text-[11px] text-gray-400 bg-slate-900/80 p-3 rounded-lg border border-white/5 whitespace-pre-wrap font-mono line-clamp-5 leading-relaxed">
                      {contact.notes}
                    </pre>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-gray-400">
                  {contact.dateContacted ? (
                    <div className="flex items-center gap-1.5">
                      <span>⏰ Contacted:</span>
                      <strong className="text-white">
                        {new Date(contact.dateContacted).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </strong>
                    </div>
                  ) : (
                    <span className="italic text-gray-500">Not contacted yet</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Status Dropdown */}
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                    className="bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {/* Mailto link */}
                  <a
                    href={getMailtoLink(contact)}
                    className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                    title="Compose Email"
                  >
                    <span>✉️</span> Compose
                  </a>

                  {/* Edit */}
                  <button
                    onClick={() => handleOpenEdit(contact)}
                    className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg border border-white/10 transition text-sm flex items-center justify-center"
                    title="Edit Contact"
                  >
                    ✏️
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg border border-white/10 transition text-sm flex items-center justify-center"
                    title="Delete Contact"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 bg-white/5 border border-white/10 rounded-2xl">
          <div className="text-5xl">✉️</div>
          <p className="text-gray-400 text-sm max-w-sm mx-auto">
            {searchQuery 
              ? "No contacts found matching your search. Try another query."
              : "No outreach contacts added yet. Let's create your first email outreach profile!"}
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm transition"
          >
            Add Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailList;
