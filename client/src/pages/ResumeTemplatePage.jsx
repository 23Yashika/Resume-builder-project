




import React, { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Check,
  GraduationCap,
  Code,
  Briefcase,
  Plus,
  Trash,
  Award,
  Languages
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeTemplatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
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
    languages: []
  });



  // Load data if returning from preview
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
      setSelectedTemplate(location.state.selectedTemplate);
    }
  }, [location.state]);

 const templates = [
  {
    id: 1,
    name: "Professional",
    color: "from-blue-500 to-blue-600",
    preview: "Modern clean design with blue accents",
    image: "/Black and White Clean Professional A4 Resume.png" // image ka path
  },
  {
    id: 2,
    name: "Creative",
    color: "from-purple-500 to-pink-500",
    preview: "Bold gradient design for creative roles",
    image: "/images/creative.png"
  },
  {
    id: 3,
    name: "Executive",
    color: "from-gray-700 to-gray-900",
    preview: "Elegant dark theme for senior positions",
    image: "/images/executive.png"
  },
];

  const handlePersonalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    updated[index][field] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addArrayItem = (section, emptyObj) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyObj] });
  };

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
          {/* Template Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Choose Your Template
            </h2>
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative cursor-pointer rounded-lg border-2 mb-4 ${
                  selectedTemplate === template.id
                    ? "border-blue-500 ring-4 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
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

          {/* Form */}
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold mb-4">2. Personal Information</h2>
              {["name", "jobTitle", "email", "phone", "location", "website"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                  value={formData[field]}
                  onChange={handlePersonalChange}
                  className="w-full border px-4 py-2 rounded"
                />
              ))}
              <textarea
                name="summary"
                placeholder="Professional Summary"
                value={formData.summary}
                onChange={handlePersonalChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>

            {/* Sections */}
            <SectionArray title="Education" icon={<GraduationCap />} section="education" fields={["degree", "university", "location", "startYear", "endYear"]} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} emptyObj={{ degree: "", university: "", location: "", startYear: "", endYear: "" }} />

            <SectionArray title="Experience" icon={<Briefcase />} section="experience" fields={["company", "position", "location", "startDate", "endDate", "details"]} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} emptyObj={{ company: "", position: "", location: "", startDate: "", endDate: "", details: "" }} />

            <SectionArray title="Skills" icon={<Code />} section="skills" fields={["name"]} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} emptyObj={{ name: "" }} />

            <SectionArray title="Languages" icon={<Languages />} section="languages" fields={["language", "proficiency"]} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} emptyObj={{ language: "", proficiency: "" }} />

            <SectionArray title="Achievements" icon={<Award />} section="achievements" fields={["title"]} formData={formData} handleArrayChange={handleArrayChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} emptyObj={{ title: "" }} />

            {/* Generate */}
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

// Reusable section component
const SectionArray = ({ title, icon, section, fields, formData, handleArrayChange, addArrayItem, removeArrayItem, emptyObj }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
    <h2 className="text-xl font-bold flex items-center gap-2">{icon} {title}</h2>
    {formData[section].map((item, idx) => (
      <div key={idx} className="grid grid-cols-2 gap-2 border p-2 rounded">
        {fields.map((field, fIdx) => (
          <input
            key={fIdx}
            placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
            value={item[field] || ""}
            onChange={(e) => handleArrayChange(section, idx, field, e.target.value)}
            className="border px-2 py-1 rounded"
          />
        ))}
        <button type="button" onClick={() => removeArrayItem(section, idx)} className="col-span-2 text-red-500 flex items-center gap-1 text-sm">
          <Trash className="w-4 h-4" /> Remove
        </button>
      </div>
    ))}
    <button type="button" onClick={() => addArrayItem(section, emptyObj)} className="flex items-center gap-1 text-blue-600">
      <Plus className="w-4 h-4" /> Add {title}
    </button>
  </div>
);

export default ResumeTemplatePage;











// import React, { useState } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   FileText,
//   GraduationCap,
//   Briefcase,
//   Award,
//   Plus,
//   Trash,
//   CheckCircle,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// // <-- Put your Gemini API key here

// const ResumeTemplatePage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     website: "",
//     summary: "",
//     education: [{ degree: "", institution: "", year: "" }],
//     experience: [{ title: "", company: "", year: "", description: "" }],
//     skills: [""],
//     awards: [""],
//   });

//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleArrayChange = (index, field, value, section) => {
//     const updatedArray = [...formData[section]];
//     updatedArray[index][field] = value;
//     setFormData((prev) => ({ ...prev, [section]: updatedArray }));
//   };

//   const handleArrayAdd = (section, newItem) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: [...prev[section], newItem],
//     }));
//   };

//   const handleArrayRemove = (section, index) => {
//     const updatedArray = formData[section].filter((_, i) => i !== index);
//     setFormData((prev) => ({ ...prev, [section]: updatedArray }));
//   };

//   const handleGenerateResume = async () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("Please fill in required fields: Name, Email, Phone");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `You are an ATS resume optimizer.
// Given the following resume data: ${JSON.stringify(
//                       formData
//                     )},
// return a JSON with:
// 1. "polishedData" - improved, professional, ATS-friendly resume details.
// 2. "atsScore" - a number from 0 to 100 estimating ATS match quality.

// Return strictly JSON only.`,
//                   },
//                 ],
//               },
//             ],
//           }),
//         }
//       );

//       const data = await res.json();
//       const geminiResponse = JSON.parse(
//         data.candidates[0].content.parts[0].text
//       );

//       navigate("/resume-preview", {
//         state: {
//           formData: geminiResponse.polishedData,
//           atsScore: geminiResponse.atsScore,
//           selectedTemplate,
//         },
//       });
//     } catch (error) {
//       console.error("Error calling Gemini API:", error);
//       alert("Error generating polished resume. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
//         <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//           <FileText size={24} /> Resume Builder
//         </h1>

//         {/* Basic Info */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">
//             Personal Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               className="border p-2 rounded w-full"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <input
//               className="border p-2 rounded w-full"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <input
//               className="border p-2 rounded w-full"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//             <input
//               className="border p-2 rounded w-full"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//             <input
//               className="border p-2 rounded w-full"
//               name="website"
//               placeholder="Website"
//               value={formData.website}
//               onChange={handleChange}
//             />
//           </div>
//           <textarea
//             className="border p-2 rounded w-full mt-4"
//             name="summary"
//             placeholder="Professional Summary"
//             value={formData.summary}
//             onChange={handleChange}
//           ></textarea>
//         </section>

//         {/* Education */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <GraduationCap size={18} /> Education
//           </h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="flex flex-wrap gap-2 mb-2">
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Degree"
//                 value={edu.degree}
//                 onChange={(e) =>
//                   handleArrayChange(index, "degree", e.target.value, "education")
//                 }
//               />
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Institution"
//                 value={edu.institution}
//                 onChange={(e) =>
//                   handleArrayChange(index, "institution", e.target.value, "education")
//                 }
//               />
//               <input
//                 className="border p-2 rounded w-24"
//                 placeholder="Year"
//                 value={edu.year}
//                 onChange={(e) =>
//                   handleArrayChange(index, "year", e.target.value, "education")
//                 }
//               />
//               <button
//                 className="text-red-500"
//                 onClick={() => handleArrayRemove("education", index)}
//               >
//                 <Trash size={18} />
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-blue-500 flex items-center gap-1"
//             onClick={() =>
//               handleArrayAdd("education", {
//                 degree: "",
//                 institution: "",
//                 year: "",
//               })
//             }
//           >
//             <Plus size={18} /> Add Education
//           </button>
//         </section>

//         {/* Experience */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <Briefcase size={18} /> Experience
//           </h2>
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="flex flex-wrap gap-2 mb-2">
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Title"
//                 value={exp.title}
//                 onChange={(e) =>
//                   handleArrayChange(index, "title", e.target.value, "experience")
//                 }
//               />
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Company"
//                 value={exp.company}
//                 onChange={(e) =>
//                   handleArrayChange(index, "company", e.target.value, "experience")
//                 }
//               />
//               <input
//                 className="border p-2 rounded w-24"
//                 placeholder="Year"
//                 value={exp.year}
//                 onChange={(e) =>
//                   handleArrayChange(index, "year", e.target.value, "experience")
//                 }
//               />
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Description"
//                 value={exp.description}
//                 onChange={(e) =>
//                   handleArrayChange(index, "description", e.target.value, "experience")
//                 }
//               />
//               <button
//                 className="text-red-500"
//                 onClick={() => handleArrayRemove("experience", index)}
//               >
//                 <Trash size={18} />
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-blue-500 flex items-center gap-1"
//             onClick={() =>
//               handleArrayAdd("experience", {
//                 title: "",
//                 company: "",
//                 year: "",
//                 description: "",
//               })
//             }
//           >
//             <Plus size={18} /> Add Experience
//           </button>
//         </section>

//         {/* Skills */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
//           {formData.skills.map((skill, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Skill"
//                 value={skill}
//                 onChange={(e) => {
//                   const updated = [...formData.skills];
//                   updated[index] = e.target.value;
//                   setFormData((prev) => ({ ...prev, skills: updated }));
//                 }}
//               />
//               <button
//                 className="text-red-500"
//                 onClick={() => handleArrayRemove("skills", index)}
//               >
//                 <Trash size={18} />
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-blue-500 flex items-center gap-1"
//             onClick={() => handleArrayAdd("skills", "")}
//           >
//             <Plus size={18} /> Add Skill
//           </button>
//         </section>

//         {/* Awards */}
//         <section>
//           <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//             <Award size={18} /> Awards
//           </h2>
//           {formData.awards.map((award, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 className="border p-2 rounded flex-1"
//                 placeholder="Award"
//                 value={award}
//                 onChange={(e) => {
//                   const updated = [...formData.awards];
//                   updated[index] = e.target.value;
//                   setFormData((prev) => ({ ...prev, awards: updated }));
//                 }}
//               />
//               <button
//                 className="text-red-500"
//                 onClick={() => handleArrayRemove("awards", index)}
//               >
//                 <Trash size={18} />
//               </button>
//             </div>
//           ))}
//           <button
//             className="text-blue-500 flex items-center gap-1"
//             onClick={() => handleArrayAdd("awards", "")}
//           >
//             <Plus size={18} /> Add Award
//           </button>
//         </section>

//         {/* Generate Resume Button */}
//         <div className="text-right">
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
//             onClick={handleGenerateResume}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate Resume"}
//             {!loading && <CheckCircle size={18} />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeTemplatePage;
