import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
  
      {/* Hero Section */}
      <section
        id="home"
        className="text-center py-20 bg-gradient-to-r from-blue-50 to-blue-100"
      >
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">
          Build Your Perfect Resume
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Create, customize, and optimize your resume to land your dream job.
          Fast, easy, and professional.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to='/resume-template'
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create Resume
          </Link>
          <a
            href="#optimise"
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Optimise Resume
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          About Our Resume Builder
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Our Resume Builder is designed to help job seekers create professional
          resumes effortlessly. Whether you're starting from scratch or refining
          an existing resume, our tools guide you every step of the way.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>©️ 2025 ResumeBuilder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
