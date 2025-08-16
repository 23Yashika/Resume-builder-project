
// import React, { useState, useEffect } from "react";
// import {
//   FileText,
//   Download,
//   Check,
//   GraduationCap,
//   Code,
//   Briefcase,
//   Plus,
//   Trash,
//   Award,
//   Languages,
//   Sparkles,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Globe,
//   FileUser,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// const ResumeTemplatePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     jobTitle: "",
//     email: "",
//     phone: "",
//     location: "",
//     website: "",
//     summary: "",
//     education: [],
//     experience: [],
//     skills: [],
//     achievements: [],
//     languages: []
//   });

//   // Load data if returning from preview
//   useEffect(() => {
//     if (location.state?.formData) {
//       setFormData(location.state.formData);
//       setSelectedTemplate(location.state.selectedTemplate);
//     }
//   }, [location.state]);

//   const templates = [
//     {
//       id: 1,
//       name: "Professional",
//       color: "from-blue-500 to-blue-600",
//       preview: "Modern clean design with blue accents",
//       image: "/Black and White Clean Professional A4 Resume.png"
//     },
//     {
//       id: 2,
//       name: "Creative",
//       color: "from-purple-500 to-pink-500",
//       preview: "Bold gradient design for creative roles",
//       image: "/images/creative.png"
//     },
//     {
//       id: 3,
//       name: "Executive",
//       color: "from-gray-700 to-gray-900",
//       preview: "Elegant dark theme for senior positions",
//       image: "/images/executive.png"
//     },
//   ];

//   const handlePersonalChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleArrayChange = (section, index, field, value) => {
//     const updated = [...formData[section]];
//     updated[index][field] = value;
//     setFormData({ ...formData, [section]: updated });
//   };

//   const addArrayItem = (section, emptyObj) => {
//     setFormData({ ...formData, [section]: [...formData[section], emptyObj] });
//   };

//   const removeArrayItem = (section, index) => {
//     const updated = formData[section].filter((_, i) => i !== index);
//     setFormData({ ...formData, [section]: updated });
//   };

//   const isFormValid = () => {
//     return (
//       formData.name.trim() &&
//       formData.jobTitle.trim() &&
//       formData.email.trim() &&
//       formData.phone.trim() &&
//       formData.location.trim() &&
//       formData.summary.trim() &&
//       formData.education.length > 0 &&
//       formData.experience.length > 0 &&
//       formData.skills.length > 0
//     );
//   };

//   const handleGenerateResume = () => {
//     if (!selectedTemplate) {
//       alert("Please select a template!");
//       return;
//     }
//     if (!isFormValid()) {
//       alert("Please fill in all required fields!");
//       return;
//     }
//     navigate("/resume-preview", { state: { formData, selectedTemplate } });
//   };

//   const getSelectedTemplate = () => templates.find((t) => t.id === selectedTemplate);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Enhanced Header */}
//       <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-6xl mx-auto px-6 py-8">
//           <div className="flex items-center gap-4 mb-3">
//             <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
//               <FileText className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                 Resume Builder
//               </h1>
//               <p className="text-gray-600 text-lg">Create a professional resume in minutes with AI optimization</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <Sparkles className="w-4 h-4" />
//             <span>Smart templates • ATS optimized • Professional formatting</span>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Enhanced Template Selection */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
//                 1
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">Choose Your Template</h2>
//                 <p className="text-gray-600">Select a design that matches your career level</p>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {templates.map((template) => (
//                 <div
//                   key={template.id}
//                   onClick={() => setSelectedTemplate(template.id)}
//                   className={`group relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-300 ${
//                     selectedTemplate === template.id
//                       ? "border-blue-500 ring-4 ring-blue-100/50 shadow-lg transform scale-[1.02]"
//                       : "border-gray-200/50 hover:border-blue-300 hover:shadow-md hover:transform hover:scale-[1.01]"
//                   }`}
//                 >
//                   <div className="flex items-center p-6 gap-6">
//                     {/* Enhanced Template Image */}
//                     <div className="relative">
//                       <img
//                         src={template.image}
//                         alt={`${template.name} preview`}
//                         className="w-20 h-24 object-cover rounded-lg border-2 border-gray-100 shadow-md"
//                         onError={(e) => {
//                           e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='96' viewBox='0 0 80 96'%3E%3Crect width='80' height='96' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3EPreview%3C/text%3E%3C/svg%3E";
//                         }}
//                       />
//                       <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-10 rounded-lg`}></div>
//                     </div>
                    
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
//                         {selectedTemplate === template.id && (
//                           <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
//                             <Check className="w-3 h-3" />
//                             Selected
//                           </div>
//                         )}
//                       </div>
//                       <p className="text-gray-600 text-sm leading-relaxed">{template.preview}</p>
//                       <div className={`mt-3 h-1 w-full bg-gradient-to-r ${template.color} rounded-full opacity-30`}></div>
//                     </div>
//                   </div>
                  
//                   {/* Selection Indicator */}
//                   {selectedTemplate === template.id && (
//                     <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-blue-500">
//                       <Check className="w-3 h-3 text-white absolute -top-4 -right-2" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {selectedTemplate && (
//               <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-600 rounded-lg">
//                     <Check className="w-4 h-4 text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-blue-800">
//                       {getSelectedTemplate()?.name} template selected
//                     </p>
//                     <p className="text-sm text-blue-600">Ready to customize your resume</p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Enhanced Form */}
//           <div className="space-y-6">
//             {/* Personal Information */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
//               <div className="flex items-center gap-4 mb-8">
//                 <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
//                   2
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
//                   <p className="text-gray-600">Tell us about yourself</p>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {/* Name and Job Title */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="name"
//                       placeholder="Full Name *"
//                       value={formData.name}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="jobTitle"
//                       placeholder="Job Title *"
//                       value={formData.jobTitle}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Contact Information */}
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="email"
//                       placeholder="Email Address *"
//                       value={formData.email}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="phone"
//                       placeholder="Phone Number *"
//                       value={formData.phone}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div className="relative">
//                     <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="location"
//                       placeholder="Location *"
//                       value={formData.location}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                   <div className="relative">
//                     <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       name="website"
//                       placeholder="Website/Portfolio"
//                       value={formData.website}
//                       onChange={handlePersonalChange}
//                       className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                     />
//                   </div>
//                 </div>

//                 <div className="relative">
//                   <FileUser className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
//                   <textarea
//                     name="summary"
//                     placeholder="Professional Summary - Describe your key strengths and career highlights *"
//                     value={formData.summary}
//                     onChange={handlePersonalChange}
//                     rows="4"
//                     className="w-full border-2 border-gray-200/50 pl-11 pr-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Enhanced Sections */}
//             <EnhancedSectionArray 
//               title="Education" 
//               icon={<GraduationCap className="w-6 h-6" />} 
//               color="from-blue-600 to-blue-700"
//               section="education" 
//               fields={["degree", "university", "location", "startYear", "endYear"]} 
//               formData={formData} 
//               handleArrayChange={handleArrayChange} 
//               addArrayItem={addArrayItem} 
//               removeArrayItem={removeArrayItem} 
//               emptyObj={{ degree: "", university: "", location: "", startYear: "", endYear: "" }} 
//             />

//             <EnhancedSectionArray 
//               title="Experience" 
//               icon={<Briefcase className="w-6 h-6" />} 
//               color="from-purple-600 to-purple-700"
//               section="experience" 
//               fields={["company", "position", "location", "startDate", "endDate", "details"]} 
//               formData={formData} 
//               handleArrayChange={handleArrayChange} 
//               addArrayItem={addArrayItem} 
//               removeArrayItem={removeArrayItem} 
//               emptyObj={{ company: "", position: "", location: "", startDate: "", endDate: "", details: "" }} 
//             />

//             <EnhancedSectionArray 
//               title="Skills" 
//               icon={<Code className="w-6 h-6" />} 
//               color="from-green-600 to-green-700"
//               section="skills" 
//               fields={["name"]} 
//               formData={formData} 
//               handleArrayChange={handleArrayChange} 
//               addArrayItem={addArrayItem} 
//               removeArrayItem={removeArrayItem} 
//               emptyObj={{ name: "" }} 
//             />

//             <EnhancedSectionArray 
//               title="Languages" 
//               icon={<Languages className="w-6 h-6" />} 
//               color="from-indigo-600 to-indigo-700"
//               section="languages" 
//               fields={["language", "proficiency"]} 
//               formData={formData} 
//               handleArrayChange={handleArrayChange} 
//               addArrayItem={addArrayItem} 
//               removeArrayItem={removeArrayItem} 
//               emptyObj={{ language: "", proficiency: "" }} 
//             />

//             <EnhancedSectionArray 
//               title="Achievements" 
//               icon={<Award className="w-6 h-6" />} 
//               color="from-yellow-600 to-orange-600"
//               section="achievements" 
//               fields={["title"]} 
//               formData={formData} 
//               handleArrayChange={handleArrayChange} 
//               addArrayItem={addArrayItem} 
//               removeArrayItem={removeArrayItem} 
//               emptyObj={{ title: "" }} 
//             />

//             {/* Enhanced Generate Button */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Generate Your Resume?</h3>
//                 <p className="text-gray-600">Make sure all required fields are filled out</p>
//               </div>
              
//               <button
//                 onClick={handleGenerateResume}
//                 disabled={!isFormValid()}
//                 className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
//                   isFormValid() 
//                     ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105" 
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-3">
//                   <Download className="w-6 h-6" />
//                   <span>{isFormValid() ? "Generate My Resume" : "Complete Required Fields"}</span>
//                   {isFormValid() && <Sparkles className="w-5 h-5" />}
//                 </div>
//               </button>
              
//               {isFormValid() && (
//                 <p className="text-center text-sm text-gray-500 mt-3">
//                   Your resume will be optimized for ATS compatibility
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Reusable Section Component
// const EnhancedSectionArray = ({ 
//   title, 
//   icon, 
//   color, 
//   section, 
//   fields, 
//   formData, 
//   handleArrayChange, 
//   addArrayItem, 
//   removeArrayItem, 
//   emptyObj 
// }) => (
//   <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
//     <div className="flex items-center gap-4 mb-6">
//       <div className={`w-12 h-12 bg-gradient-to-br ${color} text-white rounded-full flex items-center justify-center shadow-lg`}>
//         {icon}
//       </div>
//       <div>
//         <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//         <p className="text-gray-600 text-sm">Add your {title.toLowerCase()} details</p>
//       </div>
//     </div>

//     <div className="space-y-4">
//       {formData[section].map((item, idx) => (
//         <div key={idx} className="group relative bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             {fields.map((field, fIdx) => (
//               field === "details" ? (
//                 <textarea
//                   key={fIdx}
//                   placeholder={`${field.replace(/^\w/, (c) => c.toUpperCase())}...`}
//                   value={item[field] || ""}
//                   onChange={(e) => handleArrayChange(section, idx, field, e.target.value)}
//                   rows="3"
//                   className="md:col-span-2 border-2 border-gray-200/50 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 resize-none"
//                 />
//               ) : (
//                 <input
//                   key={fIdx}
//                   placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
//                   value={item[field] || ""}
//                   onChange={(e) => handleArrayChange(section, idx, field, e.target.value)}
//                   className="border-2 border-gray-200/50 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70"
//                 />
//               )
//             ))}
//           </div>
//           <button 
//             type="button" 
//             onClick={() => removeArrayItem(section, idx)} 
//             className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-semibold hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
//           >
//             <Trash className="w-4 h-4" />
//             Remove {title.slice(0, -1)}
//           </button>
//         </div>
//       ))}
//     </div>

//     <button 
//       type="button" 
//       onClick={() => addArrayItem(section, emptyObj)} 
//       className={`mt-4 flex items-center gap-3 text-white font-semibold px-6 py-3 rounded-lg bg-gradient-to-r ${color} hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
//     >
//       <Plus className="w-5 h-5" />
//       Add {title.slice(0, -1)}
//     </button>
//   </div>
// );

// export default ResumeTemplatePage;



import React, { useState, useEffect, useRef } from "react";
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
  Languages,
  Sparkles,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileUser,
  ChevronUp,
  ChevronDown,
  Save,
  Eye,
  AlertCircle,
  CheckCircle,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeTemplatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    education: true,
    experience: true,
    skills: true,
    languages: false,
    achievements: false,
  });
  const [formProgress, setFormProgress] = useState(0);
  const [savedStatus, setSavedStatus] = useState('');
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

  // Auto-save functionality
  const autoSaveRef = useRef();
  
  useEffect(() => {
    clearTimeout(autoSaveRef.current);
    autoSaveRef.current = setTimeout(() => {
      if (formData.name || formData.email) { // Only save if there's some content
        localStorage.setItem('resumeFormData', JSON.stringify(formData));
        setSavedStatus('saved');
        setTimeout(() => setSavedStatus(''), 2000);
      }
    }, 1000);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData && !location.state?.formData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Load data if returning from preview
  useEffect(() => {
    if (location.state?.formData) {
      setFormData(location.state.formData);
      setSelectedTemplate(location.state.selectedTemplate);
    }
  }, [location.state]);

  // Calculate form progress
  useEffect(() => {
    const requiredFields = [
      formData.name, formData.jobTitle, formData.email, formData.phone, 
      formData.location, formData.summary
    ];
    const filledFields = requiredFields.filter(field => field.trim()).length;
    const hasEducation = formData.education.length > 0;
    const hasExperience = formData.experience.length > 0;
    const hasSkills = formData.skills.length > 0;
    
    const totalRequirements = 9; // 6 personal + 3 sections
    const completed = filledFields + (hasEducation ? 1 : 0) + (hasExperience ? 1 : 0) + (hasSkills ? 1 : 0);
    setFormProgress((completed / totalRequirements) * 100);
  }, [formData]);

  const templates = [
    {
      id: 1,
      name: "Professional",
      color: "from-blue-500 to-blue-600",
      preview: "Modern clean design with blue accents • Perfect for corporate roles",
      image: "/Black and White Clean Professional A4 Resume.png",
      tags: ["Corporate", "Clean", "ATS-Friendly"]
    },
    {
      id: 2,
      name: "Creative",
      color: "from-purple-500 to-pink-500",
      preview: "Bold gradient design for creative roles • Stand out from the crowd",
      image: "/images/creative.png",
      tags: ["Design", "Creative", "Bold"]
    },
    {
      id: 3,
      name: "Executive",
      color: "from-gray-700 to-gray-900",
      preview: "Elegant dark theme for senior positions • Sophisticated and minimal",
      image: "/images/executive.png",
      tags: ["Executive", "Elegant", "Premium"]
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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

  const clearForm = () => {
    setFormData({
      name: "", jobTitle: "", email: "", phone: "", location: "", website: "", summary: "",
      education: [], experience: [], skills: [], achievements: [], languages: []
    });
    localStorage.removeItem('resumeFormData');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header with Progress */}
      <div className="bg-white/85 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Resume Builder
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600">Create a professional resume in minutes</p>
                  {savedStatus === 'saved' && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Auto-saved</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700">
                  {Math.round(formProgress)}% Complete
                </span>
                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                    style={{ width: `${formProgress}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={clearForm}
                className="px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
          
          {/* Mobile Progress */}
          <div className="md:hidden mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Progress: {Math.round(formProgress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid xl:grid-cols-5 gap-8">
          {/* Enhanced Template Selection - Smaller Width */}
          <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 h-fit">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                1
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Choose Template</h2>
                <p className="text-gray-600">Select your perfect design</p>
              </div>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`group relative cursor-pointer rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? "border-blue-500 ring-4 ring-blue-100/50 shadow-lg transform scale-[1.02]"
                      : "border-gray-200/50 hover:border-blue-300 hover:shadow-md hover:transform hover:scale-[1.01]"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={template.image}
                        alt={`${template.name} preview`}
                        className="w-16 h-20 object-cover rounded-lg border-2 border-gray-100 shadow-md"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='80' viewBox='0 0 64 80'%3E%3Crect width='64' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='10' fill='%236b7280' text-anchor='middle' dy='.3em'%3EPreview%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
                          {selectedTemplate === template.id && (
                            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                              <Check className="w-3 h-3" />
                              Selected
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{template.preview}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className={`h-1 w-full bg-gradient-to-r ${template.color} rounded-full opacity-30`}></div>
                  </div>
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-800">
                      {getSelectedTemplate()?.name} template selected
                    </p>
                    <p className="text-sm text-blue-600">Ready to customize</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Form - Larger Width */}
          <div className="xl:col-span-3 space-y-6">
            {/* Personal Information */}
            <CollapsibleSection
              title="Personal Information"
              subtitle="Tell us about yourself"
              icon={<User className="w-6 h-6" />}
              color="from-emerald-600 to-emerald-700"
              isExpanded={expandedSections.personal}
              onToggle={() => toggleSection('personal')}
              stepNumber="2"
            >
              <div className="space-y-6">
                {/* Name and Job Title */}
                <div className="grid md:grid-cols-2 gap-6">
                  <ResizableInput
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handlePersonalChange}
                    required
                  />
                  <ResizableInput
                    icon={<Briefcase className="w-5 h-5 text-gray-400" />}
                    name="jobTitle"
                    placeholder="Job Title *"
                    value={formData.jobTitle}
                    onChange={handlePersonalChange}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <ResizableInput
                    icon={<Mail className="w-5 h-5 text-gray-400" />}
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handlePersonalChange}
                    type="email"
                    required
                  />
                  <ResizableInput
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handlePersonalChange}
                    type="tel"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <ResizableInput
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                    name="location"
                    placeholder="Location *"
                    value={formData.location}
                    onChange={handlePersonalChange}
                    required
                  />
                  <ResizableInput
                    icon={<Globe className="w-5 h-5 text-gray-400" />}
                    name="website"
                    placeholder="Website/Portfolio"
                    value={formData.website}
                    onChange={handlePersonalChange}
                    type="url"
                  />
                </div>

                <ResizableTextarea
                  icon={<FileUser className="w-5 h-5 text-gray-400" />}
                  name="summary"
                  placeholder="Professional Summary - Describe your key strengths and career highlights *"
                  value={formData.summary}
                  onChange={handlePersonalChange}
                  required
                />
              </div>
            </CollapsibleSection>

            {/* Enhanced Sections */}
            <CollapsibleSection
              title="Education"
              subtitle="Your academic background"
              icon={<GraduationCap className="w-6 h-6" />}
              color="from-blue-600 to-blue-700"
              isExpanded={expandedSections.education}
              onToggle={() => toggleSection('education')}
              required
            >
              <EnhancedSectionArray 
                section="education" 
                fields={["degree", "university", "location", "startYear", "endYear"]} 
                formData={formData} 
                handleArrayChange={handleArrayChange} 
                addArrayItem={addArrayItem} 
                removeArrayItem={removeArrayItem} 
                emptyObj={{ degree: "", university: "", location: "", startYear: "", endYear: "" }}
                color="from-blue-600 to-blue-700"
                itemName="Education"
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="Experience"
              subtitle="Your work history"
              icon={<Briefcase className="w-6 h-6" />}
              color="from-purple-600 to-purple-700"
              isExpanded={expandedSections.experience}
              onToggle={() => toggleSection('experience')}
              required
            >
              <EnhancedSectionArray 
                section="experience" 
                fields={["company", "position", "location", "startDate", "endDate", "details"]} 
                formData={formData} 
                handleArrayChange={handleArrayChange} 
                addArrayItem={addArrayItem} 
                removeArrayItem={removeArrayItem} 
                emptyObj={{ company: "", position: "", location: "", startDate: "", endDate: "", details: "" }}
                color="from-purple-600 to-purple-700"
                itemName="Experience"
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="Skills"
              subtitle="Your technical and soft skills"
              icon={<Code className="w-6 h-6" />}
              color="from-green-600 to-green-700"
              isExpanded={expandedSections.skills}
              onToggle={() => toggleSection('skills')}
              required
            >
              <EnhancedSectionArray 
                section="skills" 
                fields={["name"]} 
                formData={formData} 
                handleArrayChange={handleArrayChange} 
                addArrayItem={addArrayItem} 
                removeArrayItem={removeArrayItem} 
                emptyObj={{ name: "" }}
                color="from-green-600 to-green-700"
                itemName="Skill"
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="Languages"
              subtitle="Languages you speak"
              icon={<Languages className="w-6 h-6" />}
              color="from-indigo-600 to-indigo-700"
              isExpanded={expandedSections.languages}
              onToggle={() => toggleSection('languages')}
            >
              <EnhancedSectionArray 
                section="languages" 
                fields={["language", "proficiency"]} 
                formData={formData} 
                handleArrayChange={handleArrayChange} 
                addArrayItem={addArrayItem} 
                removeArrayItem={removeArrayItem} 
                emptyObj={{ language: "", proficiency: "" }}
                color="from-indigo-600 to-indigo-700"
                itemName="Language"
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="Achievements"
              subtitle="Awards and accomplishments"
              icon={<Award className="w-6 h-6" />}
              color="from-yellow-600 to-orange-600"
              isExpanded={expandedSections.achievements}
              onToggle={() => toggleSection('achievements')}
            >
              <EnhancedSectionArray 
                section="achievements" 
                fields={["title"]} 
                formData={formData} 
                handleArrayChange={handleArrayChange} 
                addArrayItem={addArrayItem} 
                removeArrayItem={removeArrayItem} 
                emptyObj={{ title: "" }}
                color="from-yellow-600 to-orange-600"
                itemName="Achievement"
              />
            </CollapsibleSection>

            {/* Enhanced Generate Button */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {isFormValid() ? "🎉 Ready to Generate!" : "Complete Your Resume"}
                </h3>
                <p className="text-gray-600">
                  {isFormValid() 
                    ? "All required fields are completed. Let's create your resume!" 
                    : "Fill out the required fields to generate your professional resume"}
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/resume-preview", { state: { formData, selectedTemplate, preview: true } })}
                  disabled={!selectedTemplate}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    selectedTemplate 
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-5 h-5" />
                    Preview
                  </div>
                </button>
                
                <button
                  onClick={handleGenerateResume}
                  disabled={!isFormValid() || !selectedTemplate}
                  className={`flex-[2] py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                    isFormValid() && selectedTemplate
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Download className="w-6 h-6" />
                    <span>Generate Resume</span>
                    {isFormValid() && selectedTemplate && <Sparkles className="w-5 h-5" />}
                  </div>
                </button>
              </div>
              
              {isFormValid() && selectedTemplate && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  ✨ Your resume will be optimized for ATS compatibility and professional formatting
                </p>
              )}
              
              {!selectedTemplate && (
                <p className="text-center text-sm text-amber-600 mt-4 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Please select a template to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Resizable Input Component
const ResizableInput = ({ icon, name, placeholder, value, onChange, type = "text", required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative group">
      <div className={`absolute left-3 transition-all duration-200 ${
        isFocused ? 'top-3 text-blue-500' : 'top-1/2 transform -translate-y-1/2 text-gray-400'
      }`}>
        {icon}
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full border-2 border-gray-200/50 pl-11 pr-12 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-y ${
          isExpanded ? 'min-h-[120px]' : 'h-12'
        } ${value.trim() ? 'border-green-200 bg-green-50/30' : ''}`}
        style={{ resize: 'vertical', minHeight: '48px', maxHeight: '200px' }}
      />
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors"
      >
        {isExpanded ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
      </button>
      {required && !value.trim() && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

// Resizable Textarea Component
const ResizableTextarea = ({ icon, name, placeholder, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(120, Math.min(300, textarea.scrollHeight))}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);
  
  return (
    <div className="relative group">
      <div className={`absolute left-3 transition-all duration-200 z-10 ${
        isFocused || value ? 'top-4 text-blue-500' : 'top-6 text-gray-400'
      }`}>
        {icon}
      </div>
      <textarea
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          adjustHeight();
        }}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full border-2 border-gray-200/50 pl-11 pr-4 py-4 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none ${
          value.trim() ? 'border-green-200 bg-green-50/30' : ''
        }`}
        style={{ minHeight: '120px', maxHeight: '300px' }}
        rows="4"
      />
      {required && !value.trim() && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

// Collapsible Section Component
const CollapsibleSection = ({ title, subtitle, icon, color, isExpanded, onToggle, children, stepNumber, required = false }) => (
  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
    <div 
      className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        {stepNumber && (
          <div className={`w-10 h-10 bg-gradient-to-br ${color} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}>
            {stepNumber}
          </div>
        )}
        <div className={`w-12 h-12 bg-gradient-to-br ${color} text-white rounded-full flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            {required && (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">Required</span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full ${isExpanded ? 'bg-blue-100' : 'bg-gray-100'} flex items-center justify-center transition-colors`}>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
        </div>
      </div>
    </div>
    
    <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  </div>
);

// Enhanced Section Array Component
const EnhancedSectionArray = ({ 
  section, 
  fields, 
  formData, 
  handleArrayChange, 
  addArrayItem, 
  removeArrayItem, 
  emptyObj,
  color,
  itemName
}) => (
  <div className="space-y-4">
    {formData[section].map((item, idx) => (
      <div key={idx} className="group relative bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100/50 hover:border-gray-200 transition-all duration-200 hover:shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {fields.map((field, fIdx) => (
            field === "details" ? (
              <div key={fIdx} className="md:col-span-2 relative">
                <textarea
                  placeholder={`${field.replace(/^\w/, (c) => c.toUpperCase())} - Describe your responsibilities and achievements...`}
                  value={item[field] || ""}
                  onChange={(e) => {
                    handleArrayChange(section, idx, field, e.target.value);
                    // Auto-resize textarea
                    e.target.style.height = 'auto';
                    e.target.style.height = `${Math.max(80, Math.min(200, e.target.scrollHeight))}px`;
                  }}
                  className="w-full border-2 border-gray-200/50 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
                  style={{ minHeight: '80px', maxHeight: '200px' }}
                  rows="3"
                />
              </div>
            ) : field === "proficiency" ? (
              <div key={fIdx} className="relative">
                <select
                  value={item[field] || ""}
                  onChange={(e) => handleArrayChange(section, idx, field, e.target.value)}
                  className="w-full border-2 border-gray-200/50 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm appearance-none"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            ) : (
              <div key={fIdx} className="relative">
                <input
                  placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                  value={item[field] || ""}
                  onChange={(e) => handleArrayChange(section, idx, field, e.target.value)}
                  className="w-full border-2 border-gray-200/50 px-4 py-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/70 backdrop-blur-sm resize-x"
                  style={{ resize: 'horizontal', minWidth: '200px', maxWidth: '100%' }}
                />
              </div>
            )
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
          <span className="text-sm text-gray-500 font-medium">
            {itemName} #{idx + 1}
          </span>
          <button 
            type="button" 
            onClick={() => removeArrayItem(section, idx)} 
            className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-semibold group"
          >
            <Trash className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Remove
          </button>
        </div>
      </div>
    ))}
    
    {formData[section].length === 0 && (
      <div className="text-center py-12 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
        <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center mx-auto mb-4 opacity-50`}>
          <Plus className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-500 mb-4">No {section} added yet</p>
        <p className="text-sm text-gray-400">Click the button below to add your first {itemName.toLowerCase()}</p>
      </div>
    )}

    <button 
      type="button" 
      onClick={() => addArrayItem(section, emptyObj)} 
      className={`w-full flex items-center justify-center gap-3 text-white font-semibold px-6 py-4 rounded-xl bg-gradient-to-r ${color} hover:shadow-lg transition-all duration-200 transform hover:scale-105 group`}
    >
      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
      Add {itemName}
      <span className="text-xs opacity-75">({formData[section].length} added)</span>
    </button>
  </div>
);

export default ResumeTemplatePage;