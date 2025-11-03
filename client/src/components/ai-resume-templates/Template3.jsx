import React, { useState } from "react";
import { Mail, Phone, MapPin, Link as LinkIcon } from "lucide-react";

const Template3 = () => {
  const [localData, setLocalData] = useState({
    name: "ISABELLE TODD",
    tagline: "I solve problems and help people overcome obstacles.",
    email: "isabelle@gmail.com",
    phone: "91+ 6369411212",
    location: "New York City, NY",
    linkedin: "LinkedIn",
    profile:
      "Results-oriented Software Engineer with 5 years of experience leveraging JavaScript, React.js, Tailwind CSS, and Node.js to build and optimize high-impact applications. Harvard and MIT graduate with expertise in developing and managing fast-growing startups. Proven ability to lead project teams and deliver exceptional results.",
    experience: [
      {
        title: "Software Engineer",
        company: "Google",
        duration: "2020 - Present",
        responsibilities: [
          "Engineered scalable web applications for high-traffic environments.",
          "Improved backend performance, resulting in a 15% reduction in server response time.",
        ],
      },
      {
        title: "Frontend Developer",
        company: "Facebook",
        duration: "2018 - 2020",
        responsibilities: [
          "Developed reusable UI components for streamlined development.",
          "Accelerated website performance by 40%, enhancing user experience.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Harvard University",
        year: "2016 - 2020",
      },
      {
        degree: "Master of Science in AI",
        institution: "MIT",
        year: "2020 - 2022",
      },
    ],
    projects: [
      "Developed a full-stack e-commerce platform using React and Node.js.",
      "Developed an AI-powered chatbot for customer service automation, improving response times and efficiency.",
    ],
    certifications: ["AWS Certified Solutions Architect"],
  });

  const [editMode, setEditMode] = useState(false);

  // Generic input change
  const handleInputChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  // Experience handlers
  const handleExperienceChange = (index, field, value) => {
    setLocalData((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    setLocalData((prev) => {
      const updated = [...prev.experience];
      updated[expIndex].responsibilities[respIndex] = value;
      return { ...prev, experience: updated };
    });
  };

  const addResponsibility = (expIndex) => {
    setLocalData((prev) => {
      const updated = [...prev.experience];
      updated[expIndex].responsibilities.push("New responsibility");
      return { ...prev, experience: updated };
    });
  };

  const removeResponsibility = (expIndex, respIndex) => {
    setLocalData((prev) => {
      const updated = [...prev.experience];
      updated[expIndex].responsibilities.splice(respIndex, 1);
      return { ...prev, experience: updated };
    });
  };

  const addExperience = () => {
    setLocalData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", duration: "", responsibilities: [] },
      ],
    }));
  };

  const removeExperience = (index) => {
    setLocalData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  // Education handlers
  const handleEducationChange = (index, field, value) => {
    setLocalData((prev) => {
      const updated = [...prev.education];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  const addEducation = () => {
    setLocalData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }],
    }));
  };

  const removeEducation = (index) => {
    setLocalData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Projects & Certifications
  const updateArray = (key, index, value) => {
    setLocalData((prev) => {
      const updated = [...prev[key]];
      updated[index] = value;
      return { ...prev, [key]: updated };
    });
  };

  const addArrayItem = (key, defaultValue) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: [...prev[key], defaultValue],
    }));
  };

  const removeArrayItem = (key, index) => {
    setLocalData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg p-12">
          {/* Header */}
          <div className="text-center mb-8 pb-6">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={localData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-5xl font-bold tracking-wide uppercase text-center w-full border border-gray-300 px-2 py-1 mb-3"
                />
                <input
                  type="text"
                  value={localData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                  className="text-base text-gray-600 text-center w-full border border-gray-300 px-2 py-1 mb-4"
                />
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold tracking-wide uppercase mb-3">
                  {localData.name}
                </h1>
                <p className="text-base text-gray-600 mb-4">
                  {localData.tagline}
                </p>
              </>
            )}

            {/* Contact Info */}
            <div className="flex justify-center items-center gap-4 text-sm text-gray-600 flex-wrap">
              {editMode ? (
                <>
                  <input
                    type="tel"
                    value={localData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    value={localData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={localData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm"
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    value={localData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="border border-gray-300 px-2 py-1 text-sm"
                    placeholder="LinkedIn"
                  />
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1">
                    <Phone size={14} /> {localData.phone}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} /> {localData.email}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {localData.location}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="flex items-center gap-1">
                    <LinkIcon size={14} /> {localData.linkedin}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Profile */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-2 pb-1 border-b-4 border-black">
              PROFILE
            </h2>
            {editMode ? (
              <textarea
                value={localData.profile}
                onChange={(e) => handleInputChange("profile", e.target.value)}
                className="w-full min-h-24 text-sm leading-relaxed border border-gray-300 px-2 py-1 resize-vertical"
              />
            ) : (
              <p className="text-sm leading-relaxed text-justify text-gray-700">
                {localData.profile}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-3 pb-1 border-b-4 border-black">
              EXPERIENCE
            </h2>
            {localData.experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(idx, "title", e.target.value)
                      }
                      className="text-lg font-bold border border-gray-300 px-2 py-1 w-full mb-1"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(idx, "company", e.target.value)
                      }
                      className="text-sm text-gray-600 border border-gray-300 px-2 py-1 w-full mb-1"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) =>
                        handleExperienceChange(idx, "duration", e.target.value)
                      }
                      className="text-sm text-gray-600 border border-gray-300 px-2 py-1 w-full mb-2"
                      placeholder="Duration"
                    />
                    <button
                      onClick={() => removeExperience(idx)}
                      className="text-red-500 font-semibold text-sm mb-2"
                    >
                      Remove Experience
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold mb-0">{exp.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.company} | {exp.duration}
                    </p>
                  </>
                )}
                <ul className="list-disc ml-6 space-y-1">
                  {exp.responsibilities.map((resp, respIdx) => (
                    <li key={respIdx} className="text-sm text-gray-700">
                      {editMode ? (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={resp}
                            onChange={(e) =>
                              handleResponsibilityChange(
                                idx,
                                respIdx,
                                e.target.value
                              )
                            }
                            className="flex-1 border border-gray-300 px-2 py-1"
                          />
                          <button
                            onClick={() =>
                              removeResponsibility(idx, respIdx)
                            }
                            className="text-red-500"
                          >
                            x
                          </button>
                        </div>
                      ) : (
                        resp
                      )}
                    </li>
                  ))}
                  {editMode && (
                    <button
                      onClick={() => addResponsibility(idx)}
                      className="text-blue-600 text-sm"
                    >
                      + Add Responsibility
                    </button>
                  )}
                </ul>
              </div>
            ))}
            {editMode && (
              <button
                onClick={addExperience}
                className="text-blue-600 font-semibold"
              >
                + Add Experience
              </button>
            )}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-3 pb-1 border-b-4 border-black">
              EDUCATION
            </h2>
            {localData.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(idx, "degree", e.target.value)
                      }
                      className="text-base font-bold border border-gray-300 px-2 py-1 w-full mb-1"
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(idx, "institution", e.target.value)
                      }
                      className="text-sm text-gray-600 border border-gray-300 px-2 py-1 w-full mb-1"
                      placeholder="Institution"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        handleEducationChange(idx, "year", e.target.value)
                      }
                      className="text-sm text-gray-600 border border-gray-300 px-2 py-1 w-full mb-1"
                      placeholder="Year"
                    />
                    <button
                      onClick={() => removeEducation(idx)}
                      className="text-red-500 font-semibold text-sm"
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-bold mb-0">{edu.degree}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.institution} | {edu.year}
                    </p>
                  </>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={addEducation}
                className="text-blue-600 font-semibold"
              >
                + Add Education
              </button>
            )}
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-3 pb-1 border-b-4 border-black">
              PROJECTS
            </h2>
            {localData.projects.map((project, idx) => (
              <div key={idx} className="mb-3">
                {editMode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={project}
                      onChange={(e) => updateArray("projects", idx, e.target.value)}
                      className="flex-1 border border-gray-300 px-2 py-1"
                    />
                    <button
                      onClick={() => removeArrayItem("projects", idx)}
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {project}
                  </p>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={() => addArrayItem("projects", "New project")}
                className="text-blue-600 font-semibold"
              >
                + Add Project
              </button>
            )}
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-3 pb-1 border-b-4 border-black">
              CERTIFICATIONS
            </h2>
            {localData.certifications.map((cert, idx) => (
              <div key={idx} className="mb-2">
                {editMode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e) => updateArray("certifications", idx, e.target.value)}
                      className="flex-1 border border-gray-300 px-2 py-1"
                    />
                    <button
                      onClick={() => removeArrayItem("certifications", idx)}
                      className="text-red-500"
                    >
                      x
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{cert}</p>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={() => addArrayItem("certifications", "New Certification")}
                className="text-blue-600 font-semibold"
              >
                + Add Certification
              </button>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`${
              editMode
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-3 rounded-md font-semibold transition-colors`}
          >
            {editMode ? "Save Changes" : "Edit Resume"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Template3;