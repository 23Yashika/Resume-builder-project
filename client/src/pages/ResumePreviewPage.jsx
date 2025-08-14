import React, { useState, useRef } from "react";
import {
  Download,
  Eye,
  Phone,
  Mail,
  MapPin,
  Edit,
  Star,
  FileText,
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import MobileATSScore from "../components/MobileATSScore";
import Resume from "../components/Resume";

const ResumePreviewPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const resumeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { formData, selectedTemplate } = location.state || {};

  if (!formData) {
    navigate("/"); // Redirect if opened directly
    return null;
  }

  const handleDownloadPDF = () => {
    console.log("Downloading resume...");
  };

  const handleEditResume = () => {
    navigate("/resume-template", { state: { formData, selectedTemplate } });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-full lg:w-3/4 p-4 flex flex-col">
        {/* Toolbar */}
        <div className="flex justify-between items-center bg-white shadow p-3 rounded-lg mb-4">
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              <Download size={18} /> Download
            </button>
            <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
              <Eye size={18} /> Preview
            </button>
            <button
              onClick={handleEditResume}
              className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              <Edit size={18} /> Edit
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div
          className="flex-1 bg-white shadow-lg rounded-lg overflow-auto flex justify-center items-start"
          ref={resumeRef}
        >
          <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}>
            <Resume formData={formData} selectedTemplate={selectedTemplate} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4 p-4 bg-white shadow-inner">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star size={18} /> ATS Score
        </h2>
        <MobileATSScore />
        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <FileText size={18} /> Resume Tips
        </h2>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Keep your resume concise and relevant.</li>
          <li>Highlight your achievements with numbers.</li>
          <li>Tailor your resume to the job description.</li>
        </ul>
        <hr className="my-4" />
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Award size={18} /> Certifications
        </h2>
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li>Google Analytics Certified</li>
          <li>Microsoft Azure Fundamentals</li>
          <li>Scrum Master Certified</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumePreviewPage;






// import React from "react";
// import { useLocation } from "react-router-dom";

// const ResumePreviewPage = () => {
//   const location = useLocation();
//   const { formData, atsScore, selectedTemplate } = location.state || {};

//   if (!formData) {
//     return <div className="p-6">No data provided. Please go back and fill out the form.</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white p-4 rounded shadow-md max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-2">{formData.name}</h1>
//         <p>{formData.email} | {formData.phone} | {formData.address}</p>
//         <p>{formData.website}</p>

//         <div className="bg-green-100 text-green-800 px-3 py-1 rounded inline-block mt-4">
//           ATS Score: <strong>{atsScore}</strong>/100
//         </div>

//         <h2 className="mt-6 font-bold text-xl">Summary</h2>
//         <p>{formData.summary}</p>

//         <h2 className="mt-6 font-bold text-xl">Education</h2>
//         <ul>
//           {formData.education.map((edu, index) => (
//             <li key={index}>{edu.degree} - {edu.institution} ({edu.year})</li>
//           ))}
//         </ul>

//         <h2 className="mt-6 font-bold text-xl">Experience</h2>
//         <ul>
//           {formData.experience.map((exp, index) => (
//             <li key={index}>
//               <strong>{exp.title}</strong> at {exp.company} ({exp.year}) - {exp.description}
//             </li>
//           ))}
//         </ul>

//         <h2 className="mt-6 font-bold text-xl">Skills</h2>
//         <p>{formData.skills.join(", ")}</p>

//         <h2 className="mt-6 font-bold text-xl">Awards</h2>
//         <p>{formData.awards.join(", ")}</p>
//       </div>
//     </div>
//   );
// };

// export default ResumePreviewPage;
