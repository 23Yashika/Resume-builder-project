// //import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const Resume = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { formData, selectedTemplate } = location.state || {};

//   // If no data is passed (e.g., direct URL visit), redirect to form
//   if (!formData) {
//     navigate("/");
//     return null;
//   }

//   return (
//     <div className="max-w-4xl mx-auto bg-white text-black p-8 border border-gray-300 my-6 rounded-lg shadow-lg">

//       {/* Header */}
//       <header className="border-b border-gray-400 pb-4 mb-6">
//         <h1 className="text-3xl font-bold">{formData.name}</h1>
//         <p className="text-lg">{formData.jobTitle}</p>
//         <div className="text-sm mt-2 space-y-1">
//           <p>
//             {formData.email} | {formData.phone}
//           </p>
//           <p>{formData.location}</p>
//           {formData.website && <p>{formData.website}</p>}
//         </div>
//       </header>

//       {/* Summary */}
//       {formData.summary && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Professional Summary
//           </h2>
//           <p className="text-sm leading-relaxed">{formData.summary}</p>
//         </section>
//       )}

//       {/* Education */}
//       {formData.education.length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Education
//           </h2>
//           {formData.education.map((edu, index) => (
//             <div key={index} className="mb-2">
//               <p className="font-bold">
//                 {edu.degree} - {edu.university}
//               </p>
//               <p className="text-sm text-gray-600">
//                 {edu.startYear} - {edu.endYear} | {edu.location}
//               </p>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Experience */}
//       {formData.experience.length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Experience
//           </h2>
//           {formData.experience.map((exp, index) => (
//             <div key={index} className="mb-3">
//               <p className="font-bold">
//                 {exp.position} - {exp.company}
//               </p>
//               <p className="text-sm text-gray-600">
//                 {exp.startDate} - {exp.endDate} | {exp.location}
//               </p>
//               {exp.details && (
//                 <p className="text-sm mt-1">{exp.details}</p>
//               )}
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Skills */}
//       {formData.skills.length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Skills
//           </h2>
//           <ul className="grid grid-cols-2 gap-1 text-sm">
//             {formData.skills.map((skill, index) => (
//               <li key={index}>• {skill.name}</li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Languages */}
//       {formData.languages.length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Languages
//           </h2>
//           <ul className="text-sm">
//             {formData.languages.map((lang, index) => (
//               <li key={index}>
//                 {lang.language} ({lang.proficiency})
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       {/* Achievements */}
//       {formData.achievements.length > 0 && (
//         <section>
//           <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
//             Awards & Achievements
//           </h2>
//           <ul className="list-disc list-inside text-sm">
//             {formData.achievements.map((award, index) => (
//               <li key={index}>{award.title}</li>
//             ))}
//           </ul>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Resume;

//import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Resume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    navigate("/");
    return null;
  }

  return (
    <div className="w-[794px] h-[1123px] bg-white text-black p-10 mx-auto shadow-lg rounded-lg border border-gray-300">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-blue-900 uppercase">
          {formData.name}
        </h1>
        <div className="text-sm text-gray-700 mt-2">
          <p>
            {formData.email} | {formData.phone} | {formData.location}
          </p>
          {formData.website && <p>{formData.website}</p>}
        </div>
      </header>

      {/* Summary */}
      {formData.summary && (
        <section className="mb-6">
          <h2 className="text-blue-900 font-bold uppercase text-sm mb-1">
            Summary
          </h2>
          <div className="border-t border-blue-900 mb-2"></div>
          <p className="text-sm leading-relaxed">{formData.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {formData.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-900 font-bold uppercase text-sm mb-1">
            Work Experience
          </h2>
          <div className="border-t border-blue-900 mb-2"></div>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <p className="font-bold text-sm">
                  {exp.position}, {exp.company}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                {exp.details &&
                  exp.details
                    .split("\n")
                    .map((point, idx) => <li key={idx}>{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {formData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-blue-900 font-bold uppercase text-sm mb-1">
            Education
          </h2>
          <div className="border-t border-blue-900 mb-2"></div>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <p className="font-bold text-sm">
                  {edu.degree}, {edu.university}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
              {edu.cgpa && <p className="text-sm">Final CGPA: {edu.cgpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Key Skills */}
      {formData.skills.length > 0 && (
        <section>
          <h2 className="text-blue-900 font-bold uppercase text-sm mb-1">
            Key Skills
          </h2>
          <div className="border-t border-blue-900 mb-2"></div>
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {formData.skills.map((skill, index) => (
              <li key={index}>• {skill.name}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Resume;
