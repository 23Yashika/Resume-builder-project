
import React, { useState, useRef, useEffect, useCallback } from "react";
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
  Loader2,
  GripVertical,
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
  const [sidebarWidth, setSidebarWidth] = useState(25); // Percentage width
  const [isResizing, setIsResizing] = useState(false);
  const resumeRef = useRef(null);
  const sidebarRef = useRef(null);

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

  // Calculate zoom based on available space
  const calculateAutoZoom = useCallback((availableWidth) => {
    const resumeWidth = 794; // A4 width in pixels
    const containerPadding = 48; // 6 * 8px (p-6 on both sides)
    const maxWidth = availableWidth - containerPadding;
    const optimalZoom = Math.floor((maxWidth / resumeWidth) * 100);
    return Math.max(50, Math.min(150, optimalZoom));
  }, []);

  // Handle resize functionality
  const handleMouseDown = useCallback((e) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const containerWidth = window.innerWidth;
    const newSidebarWidth = ((containerWidth - e.clientX) / containerWidth) * 100;
    const clampedWidth = Math.max(20, Math.min(50, newSidebarWidth));
    
    setSidebarWidth(clampedWidth);
    
    // Auto-adjust zoom based on available space
    const availableWidth = containerWidth * (1 - clampedWidth / 100);
    const newZoom = calculateAutoZoom(availableWidth);
    setZoomLevel(newZoom);
  }, [isResizing, calculateAutoZoom]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // Mouse event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Initial zoom calculation on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      const containerWidth = window.innerWidth * (1 - sidebarWidth / 100);
      const newZoom = calculateAutoZoom(containerWidth);
      setZoomLevel(newZoom);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Calculate initial zoom

    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarWidth, calculateAutoZoom]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex flex-col lg:flex-row h-screen relative">
        {/* Left Section - Resume Preview */}
        <div 
          className="flex flex-col p-6"
          style={{ width: `${100 - sidebarWidth}%` }}
        >
          {/* Enhanced Toolbar */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 p-4 rounded-xl mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                >
                  <Download size={18} className="group-hover:scale-110 transition-transform" />
                  Download PDF
                </button>
                <button className="group flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium">
                  <Eye size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <button
                  onClick={handleEditResume}
                  className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium"
                >
                  <Edit size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium hidden sm:inline">
                  Zoom: {zoomLevel}% {isResizing && '(Auto)'}
                </span>
                <div className="flex gap-1 bg-gray-100/60 p-1 rounded-lg">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-white/70 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-gray-900"
                    title="Zoom Out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="p-2 bg-white/70 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-gray-900"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={18} />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-white/70 rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-gray-700 hover:text-gray-900"
                    title="Zoom In"
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Resume Preview Container */}
          <div className="flex-1 bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-auto flex justify-center items-start p-6 shadow-inner">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                <p className="text-gray-600 font-medium">Optimizing resume content...</p>
                <p className="text-sm text-gray-500 mt-2">Analyzing ATS compatibility</p>
              </div>
            ) : (
              <div
                ref={resumeRef}
                style={{
                  width: "794px",
                  height: "1123px",
                  background: "white",
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: "top center",
                }}
                className="rounded-lg shadow-2xl border border-gray-200 transition-transform duration-300 ease-out"
              >
                <Resume
                  formData={optimizedFormData}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            )}
          </div>
        </div>

        {/* Resize Handle */}
        <div
          className="hidden lg:block w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors duration-200 relative group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <GripVertical 
              size={16} 
              className="text-gray-500 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" 
            />
          </div>
          {isResizing && (
            <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
          )}
        </div>

        {/* Enhanced Right Sidebar */}
        <div 
          ref={sidebarRef}
          className="p-6 bg-white/90 backdrop-blur-sm border-l border-gray-200/50 overflow-y-auto"
          style={{ width: `${sidebarWidth}%`, minWidth: '280px' }}
        >
          <div className="space-y-8">
            {/* ATS Score Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200/50 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                <div className="p-2  rounded-lg">
                  <Star size={20} className="text-black" />
                </div>
                <span className="truncate">ATS Score</span>
                {isResizing && (
                  <span className="text-xs bg-blue-100 text-black px-2 py-1 rounded-full">
                    Resizing
                  </span>
                )}
              </h2>
              <MobileATSScore atsScore={atsScore} atsAnalysis={atsAnalysis} />
            </div>

            {/* Resume Tips Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200/50 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <FileText size={20} className="text-white" />
                </div>
                Resume Tips
              </h2>
              <div className="space-y-3">
                {[
                  "Keep your resume concise and relevant",
                  "Highlight achievements with quantifiable metrics",
                  "Tailor content to match job descriptions",
                  "Use industry-specific keywords naturally"
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-xl border border-amber-200/50 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-amber-600 rounded-lg">
                  <Award size={20} className="text-white" />
                </div>
                Popular Certifications
              </h2>
              <div className="space-y-3">
                {[
                  "Google Analytics Certified",
                  "Microsoft Azure Fundamentals",
                  "Scrum Master Certified",
                  "AWS Cloud Practitioner"
                ].map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/70 rounded-lg hover:bg-white/90 transition-colors">
                    <Award size={16} className="text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-gray-700 font-medium">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPage;