import { useResume } from "../../context/ResumeContext";
import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Template14 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData || {});

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

 const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...localData[section]];
    updated[index][key] = value;
    const updatedData = { ...localData, [section]: updated };
    setLocalData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
    setActiveSection(null);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
    setActiveSection(null);
  };

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
  } = localData;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <div
          ref={resumeRef}
          className="flex-1 p-6 bg-white text-gray-900 font-sans shadow border border-gray-300 m-4 rounded-lg"
        >
          {/* HEADER */}
          <div className="bg-blue-600 text-white p-6 rounded-t-xl text-left">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={name || ""}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="Your Name"
                />
                <input
                  type="text"
                  value={role || ""}
                  onChange={(e) => handleFieldChange("role", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="Your Role"
                />
                <input
                  type="text"
                  value={email || ""}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="Phone"
                />
                <input
                  type="text"
                  value={linkedin || ""}
                  onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="LinkedIn"
                />
                <input
                  type="text"
                  value={location || ""}
                  onChange={(e) => handleFieldChange("location", e.target.value)}
                  className="w-full bg-white text-black p-2 mb-2 rounded"
                  placeholder="Location"
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">{name || "Your Name"}</h1>
                <p className="text-lg">{role || "Your Job Title"}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  {email && <p>{email}</p>}
                  {phone && <p>• {phone}</p>}
                  {linkedin && <p>• {linkedin}</p>}
                  {location && <p>• {location}</p>}
                </div>
              </>
            )}
          </div>

          <div className="p-8">
            {/* SUMMARY */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Professional Summary
              </h2>
              {editMode ? (
                <textarea
                  value={summary || ""}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  className="w-full border p-2 rounded min-h-[80px]"
                  placeholder="Write a short summary..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              )}
            </section>

            {/* EXPERIENCE */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Experience
              </h2>
              {experience.map((exp, i) => (
                <div key={i} className="mb-4">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          handleArrayFieldChange("experience", i, "title", e.target.value)
                        }
                        className="w-full border p-2 mb-1 rounded"
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) =>
                          handleArrayFieldChange("experience", i, "companyName", e.target.value)
                        }
                        className="w-full border p-2 mb-1 rounded"
                        placeholder="Company Name"
                      />
                      <input
                        type="text"
                        value={exp.date || ""}
                        onChange={(e) =>
                          handleArrayFieldChange("experience", i, "date", e.target.value)
                        }
                        className="w-full border p-2 mb-1 rounded"
                        placeholder="Duration"
                      />
                      <textarea
                        value={(exp.accomplishment || []).join("\n")}
                        onChange={(e) =>
                          handleArrayFieldChange(
                            "experience",
                            i,
                            "accomplishment",
                            e.target.value.split("\n")
                          )
                        }
                        className="w-full border p-2 rounded min-h-[80px]"
                        placeholder="Achievements (one per line)"
                      />
                    </>
                  ) : (
                    <>
                <h3
                 className={`text-lg ${
                   exp.title ? "font-semibold text-black" : "text-gray-400 italic"
                     }`}
                 >
                       {exp.title || "Job Title"}
                  </h3>

                 <p
                    className={`${
                 exp.companyName ? "italic text-gray-700" : "text-gray-400 italic"
                   }`}
                  >
                {exp.companyName || "Company Name"}
              {exp.date && (
                <span className="text-gray-500"> — {exp.date}</span>
                )}
                </p>

                <ul className="list-disc list-inside text-gray-700">
               {(exp.accomplishment && exp.accomplishment.length > 0 ? exp.accomplishment : ["Key achievement or responsibility"]).map((a, idx) => (
                <li
                  key={idx}
                  className={'${a ? "text-black" : "text-gray-400 italic"}'}
                >
                  {a}
                 </li>
                 ))}
              </ul>
              </>
                  )}
                </div>
              ))}
            </section>

            {/* EDUCATION */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Education
              </h2>
              {education.map((edu, i) => (
                <div key={i} className="mb-3">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayFieldChange("education", i, "degree", e.target.value)
                        }
                        className="w-full border p-2 mb-1 rounded"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleArrayFieldChange("education", i, "institution", e.target.value)
                        }
                        className="w-full border p-2 mb-1 rounded"
                        placeholder="Institution"
                      />
                      <input
                        type="text"
                        value={edu.duration}
                        onChange={(e) =>
                          handleArrayFieldChange("education", i, "duration", e.target.value)
                        }
                        className="w-full border p-2 rounded"
                        placeholder="Duration"
                      />
                    </>
                  ) : (
                    <>
               <h3
              className={`text-lg ${
                 edu.degree ? "font-semibold text-black" : "text-gray-400 italic"
             }`}
             >
              {edu.degree || "Degree Name"}
               </h3>

              <p
              className={`${
               edu.institution ? "italic text-gray-700" : "text-gray-400 italic"
               }`}
                   >
                 {edu.institution || "Institution Name"}
                 {edu.duration && (
                    <span className="text-gray-500"> — {edu.duration}</span>
                    )}
                </p>
                   </>
                  )}
                </div>
              ))}
            </section>

            {/* SKILLS */}
            <section className="mb-6">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
               Skills
                </h2>

             {editMode ? (
              <textarea
             value={skills && skills.length > 0 ? skills.join(", ") : ""}
                 onChange={(e) =>
                  handleFieldChange(
                 "skills",
                 e.target.value
                 .split(",")
             .map((s) => s.trim())
            .filter((s) => s !== "")
        )
      }
      className="w-full border p-2 rounded min-h-[80px]"
      placeholder="New Skill, New Skill"
     />
        ) : (
        <div className="flex flex-wrap gap-2">
      {skills.length > 0 ? (
        skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-purple-100 text-purple-700 font-medium rounded-full"
          >
            {skill}
          </span>
        ))
      ) : (
        <span className="text-gray-400 italic">New Skill, New Skill</span>
        )}
         </div>
            )}
            </section>

            {/* CERTIFICATIONS */}
            <section>
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Certifications
              </h2>
              {editMode ? (
                <textarea
            value={
              certifications
               .map((c) => (typeof c === "string" ? c : c.title || ""))
              .join(", ")
             }
              onChange={(e) =>
              handleFieldChange(
               "certifications",
                 e.target.value
                 .split(",")
                  .map((c) => c.trim())
                 .filter((c) => c !== "")
                 )
                }
             className="w-full border p-2 rounded min-h-[80px]"
             placeholder="Enter certifications"
            />
              ) : (
               <ul className="list-disc list-inside">
               {certifications.length > 0 ? (
                 certifications.map((cert, i) => {
                  const title = cert?.title || (typeof cert === "string" ? cert : "");
                const isEmpty = !title || title.trim() === "";
                    return (
                  <li
                    key={i}
                    className={`${
                  isEmpty ? "text-gray-400 italic" : "text-black font-medium"
                   }`}
                   >
                 {title || "Certification Title"}
                 </li>
               );
                })
              ) : (
              <li className="text-gray-400 italic">Certification Title</li>
              )}
          </ul>
              )}
            </section>
          </div>

          {/* BUTTONS */}
          <div className="text-center mt-4 mb-6">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template14;