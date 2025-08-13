










import React, { useState, useRef } from "react";
import { 
  Download, Eye, Edit, FileText, Award, ZoomIn, ZoomOut, RotateCcw
} from "lucide-react";
import MobileATSScore from "../components/MobileATSScore";
import Resume from "../components/Resume";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumePreviewPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const resumeRef = useRef(null);

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(prev => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(prev => prev - 10);
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handleDownloadResume = () => {
    if (!resumeRef.current) return;

    html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    });
  };

  const handleEditResume = () => {
    alert("Edit mode activated - You can now modify the resume content");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Resume Preview</h1>
                <p className="text-sm sm:text-base text-gray-600">Review your resume and ATS score</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-1">
                <button onClick={handleZoomOut} disabled={zoomLevel <= 50} className="p-2 hover:bg-gray-200 rounded transition-colors">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <button onClick={handleZoomIn} disabled={zoomLevel >= 150} className="p-2 hover:bg-gray-200 rounded transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={handleResetZoom} className="p-2 hover:bg-gray-200 rounded transition-colors ml-1">
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button 
                  onClick={handleEditResume}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Resume</span>
                  <span className="sm:hidden">Edit</span>
                </button>
                <button 
                  onClick={handleDownloadResume}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Mobile */}
        <div className="block xl:hidden space-y-6">
          <MobileATSScore />
          <div className="bg-white rounded-xl shadow-lg p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> Resume Preview
              </h2>
              <div className="flex items-center gap-2 text-blue-600 text-xs">
                <Award className="w-4 h-4" /> <span>ATS Optimized</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[600px] mx-auto" style={{
                transform: `scale(${Math.min(zoomLevel / 100, 0.8)})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease"
              }}>
                <div ref={resumeRef} className="w-[794px] h-[1123px] bg-gradient-to-br from-pink-100 to-pink-200 relative mx-auto shadow-xl rounded-lg overflow-hidden">
                  <div className="absolute top-6 right-6 bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm border-2 border-blue-300">
                    ATS SCORE
                  </div>
                  <Resume />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-8">
          <MobileATSScore />
          <div className="xl:col-span-3 flex justify-center">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
              transition: "transform 0.2s ease"
            }}>
              <div ref={resumeRef} className="w-[794px] h-[1123px] bg-gradient-to-br from-pink-100 to-pink-200 relative">
                <div className="absolute top-6 right-6 bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm border-2 border-blue-300">
                  ATS SCORE
                </div>
                <Resume />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPage;

