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











