import React, { useState } from "react";
import {
  FileText,
  User,
  Mail,
  Phone,
  GraduationCap,
  Code,
  Briefcase,
  Download,
  Check,
  MapPin,
  Globe,
  Type,
  Book,
  Plus,
  Trash,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResumeTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
    achievements: [],
  });

  // Templates
  const templates = [
    { id: 1, name: "Professional", color: "from-blue-500 to-blue-600", preview: "Modern clean design with blue accents" },
    { id: 2, name: "Creative", color: "from-purple-500 to-pink-500", preview: "Bold gradient design for creative roles" },
    { id: 3, name: "Executive", color: "from-gray-700 to-gray-900", preview: "Elegant dark theme for senior positions" },
  ];

  // Personal info handler
  const handlePersonalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Array section handler
  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  // Add new entry to array section
  const addArrayItem = (section, emptyObj) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyObj] });
  };

  // Remove entry from array section
  const removeArrayItem = (section, index) => {
    const updated = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: updated });
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.jobTitle.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.location.trim() &&
      formData.summary.trim() &&
      formData.education.length > 0 &&
      formData.experience.length > 0 &&
      formData.skills.length > 0
    );
  };

  const handleGenerateResume = () => {
    if (!selectedTemplate) {
      alert("Please select a template!");
      return;
    }
    if (!isFormValid()) {
      alert("Please fill in all required fields!");
      return;
    }
    console.log("Form data to send:", formData);
    navigate("/resume-preview", { state: { formData, selectedTemplate } });
  };

  const getSelectedTemplate = () => templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-center shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <p className="text-gray-600 mt-2">Create a professional resume in minutes</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Template Selection */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Choose Your Template
              </h2>

              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? "border-blue-500 ring-4 ring-blue-100"
                      : "border-gray-200 hover:border-gray-300"
                  } mb-4`}
                >
                  <div className="flex items-center p-4">
                    <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold flex items-center gap-2">
                        {template.name}
                        {selectedTemplate === template.id && <Check className="w-4 h-4 text-blue-500" />}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{template.preview}</p>
                    </div>
                  </div>
                </div>
              ))}

              {selectedTemplate && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  ✓ {getSelectedTemplate()?.name} template selected
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Personal Information
              </h2>
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <input name="email" placeholder="Email" value={formData.email} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <input name="location" placeholder="Location" value={formData.location} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <input name="website" placeholder="Website/LinkedIn" value={formData.website} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
              <textarea name="summary" placeholder="Professional Summary" value={formData.summary} onChange={handlePersonalChange} className="w-full border px-4 py-2 rounded" />
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Education</h2>
              {formData.education.map((edu, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 border p-2 rounded">
                  <input placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange("education", idx, "degree", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="University" value={edu.university} onChange={(e) => handleArrayChange("education", idx, "university", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="Location" value={edu.location} onChange={(e) => handleArrayChange("education", idx, "location", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="Start Year" value={edu.startYear} onChange={(e) => handleArrayChange("education", idx, "startYear", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="End Year" value={edu.endYear} onChange={(e) => handleArrayChange("education", idx, "endYear", e.target.value)} className="border px-2 py-1 rounded" />
                  <button type="button" onClick={() => removeArrayItem("education", idx)} className="col-span-2 text-red-500 flex items-center gap-1 text-sm"><Trash className="w-4 h-4" /> Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("education", { degree: "", university: "", location: "", startYear: "", endYear: "" })} className="flex items-center gap-1 text-blue-600">
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Briefcase className="w-5 h-5" /> Experience</h2>
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-2 border p-2 rounded">
                  <input placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange("experience", idx, "company", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="Position" value={exp.position} onChange={(e) => handleArrayChange("experience", idx, "position", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="Location" value={exp.location} onChange={(e) => handleArrayChange("experience", idx, "location", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="Start Date" value={exp.startDate} onChange={(e) => handleArrayChange("experience", idx, "startDate", e.target.value)} className="border px-2 py-1 rounded" />
                  <input placeholder="End Date" value={exp.endDate} onChange={(e) => handleArrayChange("experience", idx, "endDate", e.target.value)} className="border px-2 py-1 rounded" />
                  <textarea placeholder="Achievements / Responsibilities" value={exp.details} onChange={(e) => handleArrayChange("experience", idx, "details", e.target.value)} className="col-span-2 border px-2 py-1 rounded" />
                  <button type="button" onClick={() => removeArrayItem("experience", idx)} className="col-span-2 text-red-500 flex items-center gap-1 text-sm"><Trash className="w-4 h-4" /> Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("experience", { company: "", position: "", location: "", startDate: "", endDate: "", details: "" })} className="flex items-center gap-1 text-blue-600">
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Code className="w-5 h-5" /> Skills</h2>
              {formData.skills.map((skill, idx) => (
                <div key={idx} className="flex gap-2 border p-2 rounded">
                  <input placeholder="Skill" value={skill.name} onChange={(e) => handleArrayChange("skills", idx, "name", e.target.value)} className="flex-1 border px-2 py-1 rounded" />
                  <button type="button" onClick={() => removeArrayItem("skills", idx)} className="text-red-500 flex items-center gap-1 text-sm"><Trash className="w-4 h-4" /> Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("skills", { name: "" })} className="flex items-center gap-1 text-blue-600">
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2"><Award className="w-5 h-5" /> Achievements</h2>
              {formData.achievements.map((ach, idx) => (
                <div key={idx} className="flex gap-2 border p-2 rounded">
                  <input placeholder="Achievement" value={ach.title} onChange={(e) => handleArrayChange("achievements", idx, "title", e.target.value)} className="flex-1 border px-2 py-1 rounded" />
                  <button type="button" onClick={() => removeArrayItem("achievements", idx)} className="text-red-500 flex items-center gap-1 text-sm"><Trash className="w-4 h-4" /> Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem("achievements", { title: "" })} className="flex items-center gap-1 text-blue-600">
                <Plus className="w-4 h-4" /> Add Achievement
              </button>
            </div>

            {/* Generate Resume Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleGenerateResume}
                disabled={!isFormValid()}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white ${
                  isFormValid() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <Download className="w-5 h-5 inline-block mr-2" /> Generate Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplatePage;
