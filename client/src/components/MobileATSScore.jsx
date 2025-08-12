import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Target } from 'lucide-react';

const MobileATSScore = () => {
  const [atsScore, setAtsScore] = useState(0);
  const [atsAnalysis, setAtsAnalysis] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    analyzeResume();
  }, []);

  const analyzeResume = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = [
        { category: "Contact Information", score: 100, status: "excellent", feedback: "All required contact details are present and properly formatted" },
        { category: "Professional Summary", score: 75, status: "good", feedback: "Good summary present, could include more industry-specific keywords" },
        { category: "Work Experience", score: 90, status: "excellent", feedback: "Clear job progression with quantifiable achievements" },
        { category: "Education", score: 85, status: "good", feedback: "Education section is complete and well-structured" },
        { category: "Skills & Keywords", score: 80, status: "good", feedback: "Good mix of technical and soft skills, add more industry keywords" },
        { category: "Formatting", score: 95, status: "excellent", feedback: "Clean, ATS-friendly formatting with proper structure" }
      ];
      setAtsAnalysis(analysis);
      setAtsScore(Math.round(analysis.reduce((sum, item) => sum + item.score, 0) / analysis.length));
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

  return (
    <>
      {/* Mobile View */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" /> ATS Score
          </h2>
          <button onClick={analyzeResume} className="text-xs text-blue-600 hover:text-blue-700">
            Re-analyze
          </button>
        </div>

        {isAnalyzing ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Analyzing your resume...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {/* Score */}
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                {atsScore}/100
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    atsScore >= 90 ? 'bg-green-500' : atsScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {atsScore >= 90 ? 'Excellent!' : atsScore >= 75 ? 'Good' : 'Needs improvement'}
              </p>
            </div>

            {/* Quick Analysis */}
            <div className="space-y-1">
              <h4 className="font-semibold text-gray-900 text-sm">Quick Analysis:</h4>
              {atsAnalysis.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {getScoreIcon(item.status)}
                  <span className="text-xs text-gray-600">{item.category}</span>
                  <span className={`text-xs font-semibold ${getScoreColor(item.score)}`}>
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block xl:col-span-1 space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" /> ATS Score
            </h2>
            <button onClick={analyzeResume} className="text-sm text-blue-600 hover:text-blue-700">
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
                      atsScore >= 90 ? 'bg-green-500' : atsScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${atsScore}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {atsScore >= 90 ? 'Excellent - Ready to submit!' : atsScore >= 75 ? 'Good - Minor improvements needed' : 'Needs improvement'}
                </p>
              </div>

              {/* Detailed Analysis */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Detailed Analysis</h3>
                {atsAnalysis.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
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
      </div>
    </>
  );
};

export default MobileATSScore;
