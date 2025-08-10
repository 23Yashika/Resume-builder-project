import React, { useState } from "react";
import { FileText, User, Mail, Phone, GraduationCap, Code, Briefcase, Download, Check } from "lucide-react";

const ResumeTemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: ""
  });

  const templates = [
    { 
      id: 1, 
      name: "Professional", 
      color: "from-blue-500 to-blue-600",
      preview: "Modern clean design with blue accents"
    },
    { 
      id: 2, 
      name: "Creative", 
      color: "from-purple-500 to-pink-500",
      preview: "Bold gradient design for creative roles"
    },
    { 
      id: 3, 
      name: "Executive", 
      color: "from-gray-700 to-gray-900",
      preview: "Elegant dark theme for senior positions"
    }
  ];

  const formFields = [
    { name: "name", placeholder: "Full Name", type: "text", icon: User, required: true },
    { name: "email", placeholder: "Email Address", type: "email", icon: Mail, required: true },
    { name: "phone", placeholder: "Phone Number", type: "tel", icon: Phone, required: true },
    { name: "education", placeholder: "Education Details (Degree, University, Year)", type: "textarea", icon: GraduationCap, required: true },
    { name: "skills", placeholder: "Skills (comma-separated)", type: "textarea", icon: Code, required: true },
    { name: "experience", placeholder: "Work Experience (Company, Position, Duration, Achievements)", type: "textarea", icon: Briefcase, required: true }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return formFields.every(field => {
      if (field.required) {
        return formData[field.name]?.trim() !== "";
      }
      return true;
    });
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
    console.log("Generating resume with:", formData, "Template:", selectedTemplate);
    // Logic to preview or generate PDF would go here
    alert("Resume generated successfully! (Preview functionality would be implemented here)");
  };

  const getSelectedTemplate = () => {
    return templates.find(t => t.id === selectedTemplate);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-center shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className=" flex gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl  font-bold text-gray-900">Resume Builder</h1>
          </div>
          <p className="text-gray-600 mt-2">Create a professional resume in minutes</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Template Selection */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Choose Your Template
              </h2>
              
              <div className="grid gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`relative group cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedTemplate === template.id
                        ? "border-blue-500 ring-4 ring-blue-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center p-4">
                      <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${template.color} shadow-md flex items-center justify-center`}>
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          {template.name}
                          {selectedTemplate === template.id && (
                            <Check className="w-4 h-4 text-blue-500" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{template.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTemplate && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm font-medium">
                    ✓ {getSelectedTemplate()?.name} template selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Enter Your Details
              </h2>

              <div className="space-y-4">
                {formFields.map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {field.placeholder}
                        {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Generate Resume
              </h3>
              <button
                onClick={handleGenerateResume}
                disabled={!selectedTemplate || !isFormValid()}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedTemplate && isFormValid()
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <Download className="w-5 h-5" />
                Generate Resume
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Preview and download your professional resume
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplatePage;