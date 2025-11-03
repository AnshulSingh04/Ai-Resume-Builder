import { useResume } from "../../context/ResumeContext";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Template14 = () => {
  const resumeRef = useRef(null);
  const { resumeData } = useResume();
  const data = resumeData || {};

  const {
    name,
    role,
    email,
    phone,
    linkedin,
    location,
    summary,
    skills = [],
    experience = [],
    education = [],
    certifications = [],
  } = data;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/*  Navbar at top */}
      <Navbar />

      <div className="flex flex-1">
        {/*  Sidebar on left */}
        <Sidebar />

        {/*  Main resume content */}
        <div
          ref={resumeRef}
          className="flex-1 p-6 bg-white text-gray-900 font-sans shadow border border-gray-300 m-4 rounded-lg"
        >
          {/* HEADER */}
          <div className="bg-blue-600 text-white p-6 rounded-t-xl text-left">
            <h1 className="text-4xl font-bold">{name || "Your Name"}</h1>
            <p className="text-lg">{role || "Your Job Title"}</p>
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {email && <p>{email}</p>}
              {phone && <p>• {phone}</p>}
              {linkedin && <p>• {linkedin}</p>}
              {location && <p>• {location}</p>}
            </div>
          </div>

          <div className="p-8">
            {/* SUMMARY */}
            {summary && (
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </section>
            )}

            {/* EXPERIENCE */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                  Experience
                </h2>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg capitalize">
                      {exp.title || "Job Title"}
                    </h3>
                    <p className="italic text-gray-700">
                      {exp.companyName || "Company Name"}{" "}
                      {(exp.date || exp.startDate || exp.endDate) && (
                        <span>
                          —{" "}
                          {exp.date ||
                            `${exp.startDate || ""} - ${
                              exp.endDate || "Present"
                            }`}
                        </span>
                      )}
                    </p>
                    {exp.accomplishment && exp.accomplishment.length > 0 && (
                      <ul className="list-disc list-inside mt-1 text-gray-700">
                        {exp.accomplishment.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* EDUCATION */}
            {education.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="font-semibold text-lg capitalize">
                      {edu.degree}
                    </h3>
                    <p className="italic text-gray-700">
                      {edu.institution}{" "}
                      {edu.duration && <span>— {edu.duration}</span>}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* SKILLS */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 font-medium rounded-full cursor-pointer hover:bg-purple-200 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                  Certifications
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {certifications.map((cert, index) => (
                    <li key={index}>{cert.title}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template14;