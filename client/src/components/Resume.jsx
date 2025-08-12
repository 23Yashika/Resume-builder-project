import React, { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react"; // or your preferred icon library

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: "STEVE WILSON",
    title: "ADMINISTRATION MANAGER",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi facilisis felis a odio auctor, ut fermentum lorem fermentum. Nunc sodales sapien urna ac cursus. Etiam vel pretium odio. Donec id magna sollicitudin, facilisis augue blandit, rutrum erat. Proin non eros justo. Proin id metus sed erat efficitur lacinia. Aliquam erat.",
    education: [
      {
        period: "2009 - 2014",
        institution: "Fauget University",
        degree: "Bachelor in Business Administration",
      },
      {
        period: "2004 - 2008",
        institution: "Fauget High School",
        degree: "Graduation with Honor",
      },
    ],
    skills: [
      "Project Management Tools",
      "Advanced Administration Software",
      "Corporate Sales Account Management",
      "Social Media Management",
      "Spanish Language Proficiency",
    ],
    experience: [
      {
        position: "Assistant Manager",
        company: "Fauget Company",
        period: "2019 - Now",
        description:
          "Comprehensive administrative assistance to Management. Agenda follow-up. Review of documents suitability and file control. Creation of monthly presentations.",
      },
      {
        position: "Administrative Assistant",
        company: "Fauget Company",
        period: "2016 - 2017",
        description:
          "Customer Reception. Dashboard management. Attendance at the front desk. Check-in and check-out book organization. File maintenance. Preparation of weekly reports.",
      },
      {
        position: "Administrative Intern",
        company: "Fauget Company",
        period: "2016 - 2017",
        description:
          "Customer Reception. Dashboard management. Attendance at the front desk. Check-in and check-out book organization. File maintenance. Preparation of weekly reports.",
      },
    ],
  });

  // Missing function added
  const handleDownloadResume = () => {
    // You can implement PDF download here
    alert("Download Resume clicked!");
  };

  return (
    <>
      <div className="p-12">
        {/* Header Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border-2 border-gray-200">
          <div className="mb-6">
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              {resumeData.name}
            </h1>
            <p className="text-gray-600 font-semibold uppercase tracking-wider">
              {resumeData.title}
            </p>
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
              <h2 className="text-2xl font-black text-gray-800 mb-6">
                EDUCATION
              </h2>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="text-gray-600 font-semibold text-sm mb-1">
                      {edu.period}
                    </div>
                    <div className="font-bold text-gray-800 text-lg">
                      {edu.institution}
                    </div>
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
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
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
              <h2 className="text-2xl font-black text-gray-800 mb-6">
                WORK EXPERIENCE
              </h2>
              <div className="space-y-8">
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {job.position}
                        </h3>
                        <div className="text-gray-600 font-medium">
                          {job.company}, {job.period}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-7 leading-relaxed">
                      {job.description}
                    </p>
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
    </>
  );
};

export default Resume;
