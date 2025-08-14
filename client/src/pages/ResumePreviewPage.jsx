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

const ResumePreviewPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [optimizedFormData, setOptimizedFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { formData, selectedTemplate } = location.state || {};

  // Redirect if no formData
  if (!formData) {
    navigate("/");
    return null;
  }

  // Optimise the resume content with Gemini before rendering
  useEffect(() => {
    const optimiseWithGemini = async () => {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GEMINI_API_KEY; // Store in .env
        const prompt = `
       You are an expert in resume writing and ATS (Applicant Tracking System) optimization. I will provide you with my resume data in JSON format. Your task is to:

      1.Parse the JSON into a well-structured, professional resume.

      2.Rewrite the content to maximize ATS scoring for [TARGET JOB TITLE or FIELD] by integrating relevant industry keywords naturally.

      3.Strengthen bullet points with measurable achievements, active verbs, and quantified results.

      4.Ensure the resume is ATS-friendly — avoid tables, images, special symbols, or unusual fonts.

      5.Maintain a clear section order: Contact Info → Professional Summary → Skills → Work Experience → Education → Certifications → Additional Info.

      Output in plain text or clean Markdown, ready for submission to ATS systems.
        
        Resume Data:
        ${JSON.stringify(formData)}
        `;

        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
            apiKey,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const data = await response.json();
        const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanedJson = JSON.parse(aiText);

        setOptimizedFormData(cleanedJson);
      } catch (error) {
        console.error("Gemini optimization failed:", error);
        // Fallback to original data
        setOptimizedFormData(formData);
      } finally {
        setLoading(false);
      }
    };

    optimiseWithGemini();
  }, [formData]);

  const handleDownloadPDF = () => {
    console.log("Downloading resume...");
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
        <div
          className="flex-1 bg-white shadow-lg rounded-lg overflow-auto flex justify-center items-start"
          ref={resumeRef}
        >
          {loading ? (
            <div className="p-6 text-gray-500">
              Optimizing resume content...
            </div>
          ) : (
            <div
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
