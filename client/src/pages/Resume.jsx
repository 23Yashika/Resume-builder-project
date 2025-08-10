import React from "react";

export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="text-center border-b border-gray-300 py-8">
          <h1 className="text-3xl font-bold tracking-wide">OLIVIA WILSON</h1>
          <p className="text-gray-600 tracking-widest">MARKETING MANAGER</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          {/* Left Column */}
          <div className="p-6 space-y-6">
            {/* Contact */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">CONTACT</h2>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>📞 +123-456-7890</li>
                <li>📧 hello@reallygreatsite.com</li>
                <li>📍 123 Anywhere St., Any City</li>
                <li>🌐 www.reallygreatsite.com</li>
              </ul>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">EDUCATION</h2>
              <div className="text-sm space-y-3">
                <div>
                  <p className="font-semibold">2029 - 2030</p>
                  <p className="font-medium">BORCELLE UNIVERSITY</p>
                  <p>Master of Business Management</p>
                </div>
                <div>
                  <p className="font-semibold">2025 - 2029</p>
                  <p className="font-medium">BORCELLE UNIVERSITY</p>
                  <p>Bachelor of Business Management</p>
                  <p>GPA: 3.8 / 4.0</p>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">SKILLS</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Project Management</li>
                <li>Public Relations</li>
                <li>Teamwork</li>
                <li>Time Management</li>
                <li>Leadership</li>
                <li>Effective Communication</li>
                <li>Critical Thinking</li>
              </ul>
            </section>

            {/* Languages */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">LANGUAGES</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>English: Fluent</li>
                <li>French: Fluent</li>
                <li>German: Basics</li>
                <li>Spanish: Intermediate</li>
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="p-6 space-y-6">
            {/* Profile Summary */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">PROFILE SUMMARY</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives.
              </p>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="font-bold text-gray-700 text-lg mb-2">WORK EXPERIENCE</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Borcelle Studio — Marketing Manager & Specialist</p>
                  <p className="text-xs text-gray-500">2030 - Present</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Led development and implementation of marketing strategies increasing brand visibility by 20% and sales by 15% in the first year.</li>
                    <li>Launched and managed multiple cross-channel campaigns improving customer acquisition and retention.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Fauget Studio — Marketing Manager & Specialist</p>
                  <p className="text-xs text-gray-500">2025 - 2029</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Conducted market research to identify emerging trends and consumer preferences.</li>
                    <li>Oversaw creation of engaging content ensuring brand consistency.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Studio Shodwe — Marketing Manager & Specialist</p>
                  <p className="text-xs text-gray-500">2024 - 2025</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Executed targeted marketing campaigns increasing lead generation by 25%.</li>
                    <li>Implemented SEO strategies improving website traffic by 30%.</li>
                    <li>Collaborated with sales teams to create effective sales materials.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
