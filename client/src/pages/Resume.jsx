// import React from "react";

// export default function Resume() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
//       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
//         {/* Header */}
//         <div className="text-center border-b border-gray-300 py-8">
//           <h1 className="text-3xl font-bold tracking-wide">OLIVIA WILSON</h1>
//           <p className="text-gray-600 tracking-widest">MARKETING MANAGER</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
//           {/* Left Column */}
//           <div className="p-6 space-y-6">
//             {/* Contact */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">CONTACT</h2>
//               <ul className="text-gray-600 space-y-1 text-sm">
//                 <li>📞 +123-456-7890</li>
//                 <li>📧 hello@reallygreatsite.com</li>
//                 <li>📍 123 Anywhere St., Any City</li>
//                 <li>🌐 www.reallygreatsite.com</li>
//               </ul>
//             </section>

//             {/* Education */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">EDUCATION</h2>
//               <div className="text-sm space-y-3">
//                 <div>
//                   <p className="font-semibold">2029 - 2030</p>
//                   <p className="font-medium">BORCELLE UNIVERSITY</p>
//                   <p>Master of Business Management</p>
//                 </div>
//                 <div>
//                   <p className="font-semibold">2025 - 2029</p>
//                   <p className="font-medium">BORCELLE UNIVERSITY</p>
//                   <p>Bachelor of Business Management</p>
//                   <p>GPA: 3.8 / 4.0</p>
//                 </div>
//               </div>
//             </section>

//             {/* Skills */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">SKILLS</h2>
//               <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                 <li>Project Management</li>
//                 <li>Public Relations</li>
//                 <li>Teamwork</li>
//                 <li>Time Management</li>
//                 <li>Leadership</li>
//                 <li>Effective Communication</li>
//                 <li>Critical Thinking</li>
//               </ul>
//             </section>

//             {/* Languages */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">LANGUAGES</h2>
//               <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                 <li>English: Fluent</li>
//                 <li>French: Fluent</li>
//                 <li>German: Basics</li>
//                 <li>Spanish: Intermediate</li>
//               </ul>
//             </section>
//           </div>

//           {/* Right Column */}
//           <div className="p-6 space-y-6">
//             {/* Profile Summary */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">PROFILE SUMMARY</h2>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives.
//               </p>
//             </section>

//             {/* Work Experience */}
//             <section>
//               <h2 className="font-bold text-gray-700 text-lg mb-2">WORK EXPERIENCE</h2>
//               <div className="space-y-4">
//                 <div>
//                   <p className="font-semibold">Borcelle Studio — Marketing Manager & Specialist</p>
//                   <p className="text-xs text-gray-500">2030 - Present</p>
//                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                     <li>Led development and implementation of marketing strategies increasing brand visibility by 20% and sales by 15% in the first year.</li>
//                     <li>Launched and managed multiple cross-channel campaigns improving customer acquisition and retention.</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Fauget Studio — Marketing Manager & Specialist</p>
//                   <p className="text-xs text-gray-500">2025 - 2029</p>
//                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                     <li>Conducted market research to identify emerging trends and consumer preferences.</li>
//                     <li>Oversaw creation of engaging content ensuring brand consistency.</li>
//                   </ul>
//                 </div>
//                 <div>
//                   <p className="font-semibold">Studio Shodwe — Marketing Manager & Specialist</p>
//                   <p className="text-xs text-gray-500">2024 - 2025</p>
//                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                     <li>Executed targeted marketing campaigns increasing lead generation by 25%.</li>
//                     <li>Implemented SEO strategies improving website traffic by 30%.</li>
//                     <li>Collaborated with sales teams to create effective sales materials.</li>
//                   </ul>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// Resume.jsx
import React from "react";

// Sample JSON Data for Resume
const resumeData = {
  name: "John Doe",
  title: "Full Stack Developer",
  contact: {
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    website: "www.johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
  },
  summary:
    "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Proficient in MERN stack, REST APIs, and cloud deployment.",
  skills: [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "Tailwind CSS",
    "REST APIs",
    "Git & GitHub",
  ],
  experience: [
    {
      role: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2021 - Present",
      description: [
        "Developed and maintained full-stack web applications using MERN stack.",
        "Implemented authentication, authorization, and role-based access control.",
        "Optimized backend queries, reducing API response time by 40%.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Creative Web Agency",
      duration: "Jun 2018 - Dec 2020",
      description: [
        "Built responsive UI components using React.js and Tailwind CSS.",
        "Collaborated with designers to create pixel-perfect layouts.",
        "Integrated third-party APIs for dynamic content rendering.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "ABC University",
      duration: "2014 - 2018",
      details: "Graduated with honors, CGPA: 8.5/10",
    },
  ],
  awards: [
    "Best Developer Award - Tech Solutions Inc. (2022)",
    "Employee of the Month - Creative Web Agency (2020)",
  ],
};

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 border border-gray-300">
      {/* Header */}
      <header className="border-b border-gray-400 pb-4 mb-6">
        <h1 className="text-3xl font-bold">{resumeData.name}</h1>
        <p className="text-lg">{resumeData.title}</p>
        <div className="text-sm mt-2">
          <p>{resumeData.contact.email} | {resumeData.contact.phone}</p>
          <p>{resumeData.contact.location}</p>
          <p>{resumeData.contact.website} | {resumeData.contact.linkedin}</p>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed">{resumeData.summary}</p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Skills
        </h2>
        <ul className="grid grid-cols-2 gap-1 text-sm">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>• {skill}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Experience
        </h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold">{exp.role} - {exp.company}</p>
            <p className="text-sm text-gray-600">{exp.duration}</p>
            <ul className="list-disc list-inside text-sm mt-1">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index}>
            <p className="font-bold">{edu.degree} - {edu.institution}</p>
            <p className="text-sm text-gray-600">{edu.duration}</p>
            <p className="text-sm">{edu.details}</p>
          </div>
        ))}
      </section>

      {/* Awards */}
      <section>
        <h2 className="text-xl font-semibold border-b border-gray-400 mb-2">
          Awards & Achievements
        </h2>
        <ul className="list-disc list-inside text-sm">
          {resumeData.awards.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Resume;

