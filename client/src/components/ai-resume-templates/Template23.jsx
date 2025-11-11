import { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from "lucide-react";

const Template23 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleArrayFieldChange = (section, index, key, value) => {
    const updated = [...(localData[section] || [])];
    if (key) updated[index] = { ...updated[index], [key]: value };
    else updated[index] = value;

    const newData = { ...localData, [section]: updated };
    setLocalData(newData);
    localStorage.setItem("resumeData", JSON.stringify(newData));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const sectionHeaderStyle = {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1f4e79",
    borderBottom: "2px solid #1f4e79",
    marginBottom: "8px",
    paddingBottom: "2px",
    textTransform: "uppercase",
  };

  const renderText = (value, onChange, multiline = false, placeholder = "") =>
    editMode ? (
      multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: "100%", padding: "4px" }}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ width: "100%", padding: "4px" }}
        />
      )
    ) : (
      value
    );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={() => {}} resumeRef={resumeRef} />

        <div
          style={{
            flexGrow: 1,
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <div
              ref={resumeRef}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "0.5rem",
                overflow: "hidden",
                fontFamily: "Arial, sans-serif",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  backgroundColor: "#1f4e79",
                  color: "white",
                  textAlign: "left",
                  padding: "25px 40px",
                }}
              >
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>
                  {renderText(localData.name, (val) => handleFieldChange("name", val), false, "Your Name")}
                </h1>
                <p style={{ fontSize: "1.1rem", marginTop: "5px" }}>
                  {renderText(localData.role, (val) => handleFieldChange("role", val), false, "Your Role")}
                </p>
              </div>

              {/* Main Body */}
              <div style={{ display: "flex", padding: "25px 40px", gap: "40px" }}>
                {/* Left Column */}
                <div style={{ width: "35%", borderRight: "1px solid #ddd" }}>
                  {/* Contact */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Contact</h3>
                    <div style={{ paddingLeft: "10px" }}>
                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Phone size={14} />
                        {renderText(localData.phone, (val) => handleFieldChange("phone", val))}
                      </p>

                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Mail size={14} />
                        {renderText(localData.email, (val) => handleFieldChange("email", val))}
                      </p>

                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <MapPin size={14} />
                        {renderText(localData.location, (val) => handleFieldChange("location", val))}
                      </p>

                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Linkedin size={14} />
                        {renderText(localData.linkedin, (val) => handleFieldChange("linkedin", val))}
                      </p>

                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Github size={14} />
                        {renderText(localData.github, (val) => handleFieldChange("github", val))}
                      </p>

                      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Globe size={14} />
                        {renderText(localData.portfolio, (val) => handleFieldChange("portfolio", val))}
                      </p>
                    </div>
                  </div>

                  {/* Education */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Education</h3>
                    {(localData.education || []).map((edu, i) => (
                      <div key={`edu-${i}`} style={{ marginBottom: "10px", paddingLeft: "10px" }}>
                        <p style={{ fontWeight: "bold" }}>
                          {renderText(edu.degree, (val) => handleArrayFieldChange("education", i, "degree", val))}
                        </p>
                        <p>{renderText(edu.institution, (val) => handleArrayFieldChange("education", i, "institution", val))}</p>
                        <p>{renderText(edu.duration, (val) => handleArrayFieldChange("education", i, "duration", val))}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Skills</h3>
                    <ul style={{ paddingLeft: "20px" }}>
                      {(localData.skills || []).map((skill, i) => (
                        <li key={`skill-${i}`}>
                          {renderText(skill, (val) => handleArrayFieldChange("skills", i, null, val))}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Languages */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Languages</h3>
                    <ul style={{ paddingLeft: "20px" }}>
                      {(localData.languages || []).map((lang, i) => (
                        <li key={`lang-${i}`}>
                          {renderText(lang, (val) => handleArrayFieldChange("languages", i, null, val))}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interests */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Interests</h3>
                    <ul style={{ paddingLeft: "20px" }}>
                      {(localData.interests || []).map((int, i) => (
                        <li key={`interest-${i}`}>
                          {renderText(int, (val) => handleArrayFieldChange("interests", i, null, val))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ width: "65%" }}>
                  {/* Profile */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Profile</h3>
                    {renderText(localData.summary, (val) => handleFieldChange("summary", val), true)}
                  </div>

                  {/* Experience */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Experience</h3>
                    {(localData.experience || []).map((exp, i) => (
                      <div key={`exp-${i}`} style={{ marginBottom: "10px" }}>
                        <p style={{ fontWeight: "bold" }}>
                          {renderText(exp.title, (val) => handleArrayFieldChange("experience", i, "title", val))}
                        </p>
                        <p>
                          {renderText(exp.companyName, (val) => handleArrayFieldChange("experience", i, "companyName", val))}{" "}
                          |{" "}
                          {renderText(exp.date, (val) => handleArrayFieldChange("experience", i, "date", val))}
                        </p>
                        <p>
                          {renderText(exp.companyLocation, (val) =>
                            handleArrayFieldChange("experience", i, "companyLocation", val)
                          )}
                        </p>

                        <ul style={{ paddingLeft: "18px" }}>
                          {(exp.accomplishment || []).map((acc, idx) => (
                            <li key={`acc-${idx}`}>
                              {renderText(acc, (val) => {
                                const updatedAcc = [...(exp.accomplishment || [])];
                                updatedAcc[idx] = val;
                                handleArrayFieldChange("experience", i, "accomplishment", updatedAcc);
                              })}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={sectionHeaderStyle}>Certifications</h3>
                    {(localData.certifications || []).map((cert, i) => (
                      <div key={`cert-${i}`} style={{ marginBottom: "10px" }}>
                        <p style={{ fontWeight: "bold" }}>
                          {renderText(cert.title, (val) => handleArrayFieldChange("certifications", i, "title", val))}
                        </p>
                        <p>
                          {renderText(cert.issuer, (val) => handleArrayFieldChange("certifications", i, "issuer", val))}
                        </p>
                        <p>{renderText(cert.date, (val) => handleArrayFieldChange("certifications", i, "date", val))}</p>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 style={sectionHeaderStyle}>Achievements</h3>
                    <ul>
                      {(localData.achievements || []).map((ach, i) => (
                        <li key={`ach-${i}`}>
                          {renderText(ach, (val) => handleArrayFieldChange("achievements", i, null, val))}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Edit Buttons */}
              <div style={{ textAlign: "center", padding: "1.5rem" }}>
                {editMode ? (
                  <>
                    <button
                      onClick={handleSave}
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        marginRight: "0.5rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      style={{
                        backgroundColor: "#6b7280",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.375rem",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.375rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template23;
