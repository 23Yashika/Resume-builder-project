// import React, { useState, useRef, useEffect } from "react";
// import {
//   Download,
//   Eye,
//   Edit,
//   Star,
//   FileText,
//   Award,
//   ZoomIn,
//   ZoomOut,
//   RotateCcw,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import MobileATSScore from "../components/MobileATSScore";
// import Resume from "../components/Resume";

// const ResumePreviewPage = () => {
//   const [atsScore, setAtsScore] = useState(null);
//   const [atsAnalysis, setAtsAnalysis] = useState([]);
//   const [zoomLevel, setZoomLevel] = useState(100);
//   const [optimizedFormData, setOptimizedFormData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const resumeRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { formData, selectedTemplate } = location.state || {};

//   // Redirect if no formData
//   if (!formData) {
//     navigate("/");
//     return null;
//   }

//   // Optimise the resume content with Gemini before rendering
//   useEffect(() => {
//     const optimiseWithGemini = async () => {
//       try {
//         setLoading(true);

//         const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//         if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env");

//         //         const prompt = `
//         // You are an expert in resume writing and ATS optimization.

//         // TASKS:
//         // 1. Take the following resume JSON and optimize it to maximize ATS scoring for a ${formData.targetJob || "target job"}.
//         // 2. Ensure the result follows this order: Contact Info → Professional Summary → Skills → Work Experience → Education → Certifications → Additional Info.
//         // 3. Provide an ATS score (0-100) and detailed category-wise analysis.

//         // Return ONLY JSON in this structure:
//         // {
//         //   "optimizedFormData": {...},
//         //   "atsScore": number,
//         //   "atsAnalysis": [
//         //     { "category": "string", "score": number, "status": "excellent|good|needs improvement", "feedback": "string" }
//         //   ]
//         // }

//         // Resume Data:
//         // ${JSON.stringify(formData)}
//         // `;

//         const prompt = `
// You are an expert in resume optimization for Applicant Tracking Systems (ATS) with 15+ years of experience.

// ### TASK:
// Analyze the given resume JSON **strictly** for ATS readiness for a ${
//           formData.targetJob || "target job"
//         }. Return both an **optimized resume** and a **strict scoring breakdown**.

// ---

// ### SCORING RULES (0–100 scale):
// - **Keyword Relevance (30%)**: Match with job-specific hard skills, soft skills, tools, and certifications from standard job descriptions.
// - **Section Structure (20%)**: Follow exactly: Contact Info → Professional Summary → Skills → Work Experience → Education → Certifications → Additional Info.
// - **Clarity & Conciseness (15%)**: Penalize redundancy, vague descriptions, and overly long sentences.
// - **Formatting for ATS (15%)**: Penalize use of images, columns, unusual fonts, tables, or complex layouts that may confuse ATS parsers.
// - **Quantifiable Achievements (10%)**: Prefer bullet points with metrics (% improvements, revenue impact, etc.).
// - **Grammar & Spelling (10%)**: Strictly penalize any grammar or spelling mistakes.

// ---

// ### INSTRUCTIONS:
// 1. Optimize the resume for the target job while preserving truthfulness.
// 2. Provide **strict** ATS scoring — avoid inflating the score. If major issues exist, score should be <60.
// 3. Return ONLY in this JSON format:

// {
//   "optimizedFormData": {...},
//   "atsScore": number,
//   "atsAnalysis": [
//     { "category": "string", "score": number, "status": "excellent|good|needs improvement", "feedback": "string" }
//   ]
// }

// Resume Data:
// ${JSON.stringify(formData)}
// `;

//         const response = await fetch(
//           `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               contents: [{ parts: [{ text: prompt }] }],
//             }),
//           }
//         );

//         if (!response.ok) {
//           const errText = await response.text();
//           console.error("Gemini API Error Response:", errText);
//           throw new Error(`API Error: ${response.status}`);
//         }

//         const data = await response.json();
//         const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

//         // Clean JSON if wrapped in markdown code fences
//         const cleanedText = aiText.replace(/```json|```/g, "").trim();

//         const parsed = JSON.parse(cleanedText);

//         setOptimizedFormData(parsed.optimizedFormData);
//         setAtsScore(parsed.atsScore);
//         setAtsAnalysis(parsed.atsAnalysis);
//       } catch (error) {
//         console.error("Gemini optimization failed:", error);
//         setOptimizedFormData(formData);
//       } finally {
//         setLoading(false);
//       }
//     };

//     optimiseWithGemini();
//   }, [formData]);

//   const handleDownloadPDF = () => {
//     console.log("Downloading resume...");
//   };

//   const handleEditResume = () => {
//     navigate("/resume-template", { state: { formData, selectedTemplate } });
//   };

//   const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
//   const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
//   const handleResetZoom = () => setZoomLevel(100);

//   return (
//     <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
//       {/* Left Section */}
//       <div className="w-full lg:w-3/4 p-4 flex flex-col">
//         {/* Toolbar */}
//         <div className="flex justify-between items-center bg-white shadow p-3 rounded-lg mb-4">
//           <div className="flex gap-2">
//             <button
//               onClick={handleDownloadPDF}
//               className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//             >
//               <Download size={18} /> Download
//             </button>
//             <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
//               <Eye size={18} /> Preview
//             </button>
//             <button
//               onClick={handleEditResume}
//               className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//             >
//               <Edit size={18} /> Edit
//             </button>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleZoomIn}
//               className="p-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               <ZoomIn size={18} />
//             </button>
//             <button
//               onClick={handleZoomOut}
//               className="p-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               <ZoomOut size={18} />
//             </button>
//             <button
//               onClick={handleResetZoom}
//               className="p-2 bg-gray-200 rounded hover:bg-gray-300"
//             >
//               <RotateCcw size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Resume Preview */}
//         <div
//           className="flex-1 bg-white shadow-lg rounded-lg overflow-auto flex justify-center items-start"
//           ref={resumeRef}
//         >
//           {loading ? (
//             <div className="p-6 text-gray-500">
//               Optimizing resume content...
//             </div>
//           ) : (
//             <div
//               style={{
//                 transform: `scale(${zoomLevel / 100})`,
//                 transformOrigin: "top center",
//               }}
//             >
//               <Resume
//                 formData={optimizedFormData}
//                 selectedTemplate={selectedTemplate}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Sidebar */}
//       <div className="w-full lg:w-1/4 p-4 bg-white shadow-inner">
//         <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Star size={18} /> ATS Score
//         </h2>
//         {/* Mobile + Desktop ATS Score */}
//         <MobileATSScore atsScore={atsScore} atsAnalysis={atsAnalysis} />

//         <hr className="my-4" />
//         <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <FileText size={18} /> Resume Tips
//         </h2>
//         <ul className="list-disc ml-5 space-y-2 text-sm">
//           <li>Keep your resume concise and relevant.</li>
//           <li>Highlight your achievements with numbers.</li>
//           <li>Tailor your resume to the job description.</li>
//         </ul>
//         <hr className="my-4" />
//         <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
//           <Award size={18} /> Certifications
//         </h2>
//         <ul className="list-disc ml-5 space-y-2 text-sm">
//           <li>Google Analytics Certified</li>
//           <li>Microsoft Azure Fundamentals</li>
//           <li>Scrum Master Certified</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ResumePreviewPage;

import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Eye,
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
import { toPng } from "html-to-image";
import jsPDF from "jspdf";


const ResumePreviewPage = () => {
  const [atsScore, setAtsScore] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [optimizedFormData, setOptimizedFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { formData, selectedTemplate } = location.state || {};

  if (!formData) {
    navigate("/");
    return null;
  }

  useEffect(() => {
    const optimiseWithGemini = async () => {
      try {
        setLoading(true);

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY in .env");

        const prompt = `
You are an expert in resume optimization for Applicant Tracking Systems (ATS) with 15+ years of experience.

### TASK:
Analyze the given resume JSON **strictly** for ATS readiness for a ${
          formData.targetJob || "target job"
        }. Return both an **optimized resume** and a **strict scoring breakdown**.

---

### SCORING RULES (0–100 scale):
- **Keyword Relevance (30%)**: Match with job-specific hard skills, soft skills, tools, and certifications from standard job descriptions.
- **Section Structure (20%)**: Follow exactly: Contact Info → Professional Summary → Skills → Work Experience → Education → Certifications → Additional Info.
- **Clarity & Conciseness (15%)**: Penalize redundancy, vague descriptions, and overly long sentences.
- **Formatting for ATS (15%)**: Penalize use of images, columns, unusual fonts, tables, or complex layouts that may confuse ATS parsers.
- **Quantifiable Achievements (10%)**: Prefer bullet points with metrics (% improvements, revenue impact, etc.).
- **Grammar & Spelling (10%)**: Strictly penalize any grammar or spelling mistakes.

---

### INSTRUCTIONS:
1. Optimize the resume for the target job while preserving truthfulness.
2. Provide **strict** ATS scoring — avoid inflating the score. If major issues exist, score should be <60.
3. Return ONLY in this JSON format:

{
  "optimizedFormData": {...}, 
  "atsScore": number, 
  "atsAnalysis": [
    { "category": "string", "score": number, "status": "excellent|good|needs improvement", "feedback": "string" }
  ]
}

Resume Data:
${JSON.stringify(formData)}
`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          console.error("Gemini API Error Response:", errText);
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanedText = aiText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanedText);

        setOptimizedFormData(parsed.optimizedFormData);
        setAtsScore(parsed.atsScore);
        setAtsAnalysis(parsed.atsAnalysis);
      } catch (error) {
        console.error("Gemini optimization failed:", error);
        setOptimizedFormData(formData);
      } finally {
        setLoading(false);
      }
    };

    optimiseWithGemini();
  }, [formData]);

  // ✅ Only added this function
const handleDownloadPDF = async () => {
  if (!resumeRef.current) return;

  try {
    const imgData = await toPng(resumeRef.current, { cacheBust: true });
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

  const handleEditResume = () => {
    navigate("/resume-template", { state: { formData, selectedTemplate } });
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

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
        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-auto flex justify-center items-start">
          {loading ? (
            <div className="p-6 text-gray-500">
              Optimizing resume content...
            </div>
          ) : (
            <div
              ref={resumeRef} // PDF capture target
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
              }}
            >
              <Resume
                formData={optimizedFormData}
                selectedTemplate={selectedTemplate}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-1/4 p-4 bg-white shadow-inner">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star size={18} /> ATS Score
        </h2>
        <MobileATSScore atsScore={atsScore} atsAnalysis={atsAnalysis} />

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
