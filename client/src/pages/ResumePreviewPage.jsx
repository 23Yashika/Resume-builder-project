import React, { useState, useEffect } from "react";
import { 
  Download, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  Star,
  TrendingUp,
  FileText,
  Award,
  Target,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";

const ResumePreviewPage = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [atsScore, setAtsScore] = useState(0);
  const [atsAnalysis, setAtsAnalysis] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "STEVE WILSON",
    title: "ADMINISTRATION MANAGER",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis felis a odio auctor, ut fermentum lorem fermentum. Nunc sodales sapien urna ac cursus. Etiam vel pretium odio. Donec id magna sollicitudin, facilisis augue blandit, rutrum erat. Proin non eros justo. Proin id metus sed erat efficitur lacinia. Aliquam erat.",
    education: [
      {
        period: "2009 - 2014",
        institution: "Fauget University",
        degree: "Bachelor in Business Administration"
      },
      {
        period: "2004 - 2008",
        institution: "Fauget High School",
        degree: "Graduation with Honor"
      }
    ],
    skills: [
      "Project Management Tools",
      "Advanced Administration Software",
      "Corporate Sales Account Management",
      "Social Media Management",
      "Spanish Language Proficiency"
    ],
    experience: [
      {
        position: "Assistant Manager",
        company: "Fauget Company",
        period: "2019 - Now",
        description: "Comprehensive administrative assistance to Management. Agenda follow-up. Review of documents suitability and file control. Creation of monthly presentations."
      },
      {
        position: "Administrative Assistant",
        company: "Fauget Company",
        period: "2016 - 2017",
        description: "Customer Reception. Dashboard management. Attendance at the front desk. Check-in and check-out book organization. File maintenance. Preparation of weekly reports."
      },
      {
        position: "Administrative Intern",
        company: "Fauget Company",
        period: "2016 - 2017",
        description: "Customer Reception. Dashboard management. Attendance at the front desk. Check-in and check-out book organization. File maintenance. Preparation of weekly reports."
      }
    ]
  });

  // Simulate ATS analysis
  useEffect(() => {
    analyzeResume();
  }, []);

  const analyzeResume = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const analysis = [
        { 
          category: "Contact Information", 
          score: 100, 
          status: "excellent",
          feedback: "All required contact details are present and properly formatted"
        },
        { 
          category: "Professional Summary", 
          score: 75, 
          status: "good",
          feedback: "Good summary present, could include more industry-specific keywords"
        },
        { 
          category: "Work Experience", 
          score: 90, 
          status: "excellent",
          feedback: "Clear job progression with quantifiable achievements"
        },
        { 
          category: "Education", 
          score: 85, 
          status: "good",
          feedback: "Education section is complete and well-structured"
        },
        { 
          category: "Skills & Keywords", 
          score: 80, 
          status: "good",
          feedback: "Good mix of technical and soft skills, add more industry keywords"
        },
        { 
          category: "Formatting", 
          score: 95, 
          status: "excellent",
          feedback: "Clean, ATS-friendly formatting with proper structure"
        }
      ];

      setAtsAnalysis(analysis);
      const averageScore = Math.round(analysis.reduce((sum, item) => sum + item.score, 0) / analysis.length);
      setAtsScore(averageScore);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (status) => {
    switch (status) {
      case "excellent": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "good": return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

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
    alert("Resume downloaded successfully! (PDF generation would be implemented here)");
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

            {/* Controls - Stack on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center justify-center gap-2 bg-gray-50 rounded-lg p-1">
                <button 
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  disabled={zoomLevel <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <button 
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-gray-200 rounded transition-colors"
                  disabled={zoomLevel >= 150}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleResetZoom}
                  className="p-2 hover:bg-gray-200 rounded transition-colors ml-1"
                >
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

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Mobile Layout - Stack vertically */}
        <div className="block xl:hidden space-y-6">
          {/* Mobile ATS Score Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                ATS Score
              </h2>
              <button 
                onClick={analyzeResume}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700"
              >
                Re-analyze
              </button>
            </div>

            {isAnalyzing ? (
              <div className="text-center py-4 sm:py-8">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm sm:text-base text-gray-600">Analyzing your resume...</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Score Display */}
                <div className="text-center">
                  <div className={`text-2xl sm:text-4xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                    {atsScore}/100
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div 
                      className={`h-2 sm:h-3 rounded-full transition-all duration-1000 ${
                        atsScore >= 90 ? 'bg-green-500' : 
                        atsScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${atsScore}%` }}
                    ></div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">
                    {atsScore >= 90 ? 'Excellent!' : 
                     atsScore >= 75 ? 'Good' : 
                     'Needs improvement'}
                  </p>
                </div>

                {/* Quick Analysis */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Quick Analysis:</h4>
                  <div className="space-y-1">
                    {atsAnalysis.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {getScoreIcon(item.status)}
                        <span className="text-xs text-gray-600">{item.category}</span>
                        <span className={`text-xs font-semibold ${getScoreColor(item.score)}`}>
                          {item.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Resume Preview */}
          <div className="bg-white rounded-xl shadow-lg p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Resume Preview
              </h2>
              <div className="flex items-center gap-2 text-blue-600 text-xs">
                <Award className="w-4 h-4" />
                <span>ATS Optimized</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[600px] mx-auto" style={{ 
                transform: `scale(${Math.min(zoomLevel / 100, 0.8)})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease'
              }}>
                <div className="w-[794px] h-[1123px] bg-gradient-to-br from-pink-100 to-pink-200 relative mx-auto shadow-xl rounded-lg overflow-hidden">
                  {/* ATS Score Badge */}
                  <div className="absolute top-6 right-6 bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm border-2 border-blue-300">
                    ATS SCORE
                  </div>

                  {/* Content Container */}
                  <div className="p-12">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2 border-gray-200">
                      <div className="mb-6">
                        <h1 className="text-4xl font-black text-gray-800 mb-2">{resumeData.name}</h1>
                        <p className="text-gray-600 font-semibold uppercase tracking-wider">{resumeData.title}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-6 text-sm text-gray-700 mb-6">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{resumeData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{resumeData.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{resumeData.address}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
                        {resumeData.summary}
                      </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-8">
                        {/* Education Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                          <h2 className="text-2xl font-black text-gray-800 mb-6">EDUCATION</h2>
                          <div className="space-y-6">
                            {resumeData.education.map((edu, index) => (
                              <div key={index}>
                                <div className="text-gray-600 font-semibold text-sm mb-1">{edu.period}</div>
                                <div className="font-bold text-gray-800 text-lg">{edu.institution}</div>
                                <div className="text-gray-600 text-sm">{edu.degree}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                          <h2 className="text-2xl font-black text-gray-800 mb-6">SKILLS</h2>
                          <ul className="space-y-3">
                            {resumeData.skills.map((skill, index) => (
                              <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
                        {/* Work Experience Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                          <h2 className="text-2xl font-black text-gray-800 mb-6">WORK EXPERIENCE</h2>
                          <div className="space-y-8">
                            {resumeData.experience.map((job, index) => (
                              <div key={index} className="relative">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
                                  <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{job.position}</h3>
                                    <div className="text-gray-600 font-medium">{job.company}, {job.period}</div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 ml-7 leading-relaxed">{job.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Download Button */}
                    <div className="mt-12 text-center">
                      <button 
                        onClick={handleDownloadResume}
                        className="inline-flex items-center gap-3 bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-12 py-4 rounded-2xl border-3 border-gray-800 font-black text-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        DOWNLOAD RESUME
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-8">
          {/* ATS Score Section */}
          <div className="xl:col-span-1 space-y-6">
            {/* ATS Score Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  ATS Score
                </h2>
                <button 
                  onClick={analyzeResume}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Re-analyze
                </button>
              </div>

              {isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing your resume...</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                      {atsScore}/100
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          atsScore >= 90 ? 'bg-green-500' : 
                          atsScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {atsScore >= 90 ? 'Excellent - Ready to submit!' : 
                       atsScore >= 75 ? 'Good - Minor improvements needed' : 
                       'Needs improvement'}
                    </p>
                  </div>

                  {/* Detailed Analysis */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      Detailed Analysis
                    </h3>
                    {atsAnalysis.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {getScoreIcon(item.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{item.category}</h4>
                            <span className={`text-sm font-semibold ${getScoreColor(item.score)}`}>
                              {item.score}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{item.feedback}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Improvement Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Add more industry-specific keywords</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Include quantifiable achievements</p>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600">Optimize for specific job descriptions</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Preview Section */}
          <div className="xl:col-span-3 flex justify-center">
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ 
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease'
            }}>
              {/* Resume Template */}
              <div className="w-[794px] h-[1123px] bg-gradient-to-br from-pink-100 to-pink-200 relative">
                {/* ATS Score Badge */}
                <div className="absolute top-6 right-6 bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm border-2 border-blue-300">
                  ATS SCORE
                </div>

                {/* Content Container */}
                <div className="p-12">
                  {/* Header Section */}
                  <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2 border-gray-200">
                    <div className="mb-6">
                      <h1 className="text-4xl font-black text-gray-800 mb-2">{resumeData.name}</h1>
                      <p className="text-gray-600 font-semibold uppercase tracking-wider">{resumeData.title}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-700 mb-6">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{resumeData.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{resumeData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{resumeData.address}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-700 leading-relaxed">
                      {resumeData.summary}
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                      {/* Education Section */}
                      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                        <h2 className="text-2xl font-black text-gray-800 mb-6">EDUCATION</h2>
                        <div className="space-y-6">
                          {resumeData.education.map((edu, index) => (
                            <div key={index}>
                              <div className="text-gray-600 font-semibold text-sm mb-1">{edu.period}</div>
                              <div className="font-bold text-gray-800 text-lg">{edu.institution}</div>
                              <div className="text-gray-600 text-sm">{edu.degree}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                        <h2 className="text-2xl font-black text-gray-800 mb-6">SKILLS</h2>
                        <ul className="space-y-3">
                          {resumeData.skills.map((skill, index) => (
                            <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      {/* Work Experience Section */}
                      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
                        <h2 className="text-2xl font-black text-gray-800 mb-6">WORK EXPERIENCE</h2>
                        <div className="space-y-8">
                          {resumeData.experience.map((job, index) => (
                            <div key={index} className="relative">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
                                <div>
                                  <h3 className="font-bold text-gray-800 text-lg">{job.position}</h3>
                                  <div className="text-gray-600 font-medium">{job.company}, {job.period}</div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 ml-7 leading-relaxed">{job.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-12 text-center">
                    <button 
                      onClick={handleDownloadResume}
                      className="inline-flex items-center gap-3 bg-yellow-300 hover:bg-yellow-400 text-gray-800 px-12 py-4 rounded-2xl border-3 border-gray-800 font-black text-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      DOWNLOAD RESUME
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewPage;