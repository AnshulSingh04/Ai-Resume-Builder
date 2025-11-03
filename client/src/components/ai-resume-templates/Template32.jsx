import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaGithub, FaGlobe, FaExternalLinkAlt, FaCog, FaLeaf } from "react-icons/fa";

const Template32 = () => {
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
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? { ...item, ...value } : item)),
    }));
  };

  const addSkill = () => {
    setLocalData((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), ""]
    }));
  };

  const removeSkill = (index) => {
    setLocalData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index, value) => {
    setLocalData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill))
    }));
  };

  const addLanguage = () => {
    setLocalData((prev) => ({
      ...prev,
      languages: [...(prev.languages || []), ""]
    }));
  };

  const removeLanguage = (index) => {
    setLocalData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const updateLanguage = (index, value) => {
    setLocalData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang, i) => (i === index ? value : lang))
    }));
  };

  const addInterest = () => {
    setLocalData((prev) => ({
      ...prev,
      interests: [...(prev.interests || []), ""]
    }));
  };

  const removeInterest = (index) => {
    setLocalData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index)
    }));
  };

  const updateInterest = (index, value) => {
    setLocalData((prev) => ({
      ...prev,
      interests: prev.interests.map((interest, i) => (i === index ? value : interest))
    }));
  };

  const addProject = () => {
    setLocalData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { name: "", description: "", technologies: [], link: "", github: "" }]
    }));
  };

  const removeProject = (index) => {
    setLocalData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addCertification = () => {
    setLocalData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), { title: "", issuer: "", date: "" }]
    }));
  };

  const removeCertification = (index) => {
    setLocalData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setLocalData((prev) => ({
      ...prev,
      experience: [...(prev.experience || []), { title: "", companyName: "", date: "", companyLocation: "", accomplishment: [] }]
    }));
  };

  const removeExperience = (index) => {
    setLocalData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setLocalData((prev) => ({
      ...prev,
      education: [...(prev.education || []), { degree: "", institution: "", duration: "", location: "", grade: "" }]
    }));
  };

  const removeEducation = (index) => {
    setLocalData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const handleEnhance = (section) => {
  };

  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "#20B2AA", // Teal/green color
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "0.3rem",
  };

  const skillTagStyle = {
    backgroundColor: "#E0F7FA", // Light teal background
    color: "#1F2937", // Dark text
    padding: "0.3rem 0.6rem",
    borderRadius: "0.25rem",
    fontSize: "0.75rem",
    margin: "0.2rem 0.2rem 0.2rem 0",
    display: "inline-block",
    fontWeight: "500",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />
        <div
          style={{
            flexGrow: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          <div
            ref={resumeRef}
            className="resume-page"
            style={{
              maxWidth: "793px", // A4 width
              width: "100%",
              minHeight: "1123px", // A4 height
              backgroundColor: "#ffffff",
              color: "#1F2937",
              boxSizing: "border-box",
              pageBreakAfter: "always",
              pageBreakInside: "avoid",
              overflow: "hidden",
              border: "1px solid #000000",
            }}
          >
            {/* DARK HEADER SECTION */}
            <div
              style={{
                backgroundColor: "#2D3748", // Dark gray/black background
                color: "#ffffff",
                padding: "2rem",
                width: "100%",
              }}
            >
              {/* Name and Title */}
              <div style={{ marginBottom: "1rem" }}>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={localData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#ffffff",
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        marginBottom: "0.5rem",
                      }}
                      placeholder="Your Name"
                    />
                    <input
                      type="text"
                      value={localData.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                      style={{
                        fontSize: "1.2rem",
                        color: "#ffffff",
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        marginBottom: "1rem",
                      }}
                      placeholder="Your Title"
                    />
                  </>
                ) : (
                  <>
                    <h1
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#ffffff",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {resumeData.name || "Your Name"}
                    </h1>
                    <h2
                      style={{
                        fontSize: "1.2rem",
                        color: "#ffffff",
                        margin: "0 0 1rem 0",
                        fontWeight: "normal",
                      }}
                    >
                      {resumeData.role || "Your Title"}
                    </h2>
                  </>
                )}
              </div>

              {/* Professional Summary */}
              <div style={{ marginBottom: "1.5rem" }}>
                {editMode ? (
                  <textarea
                    value={localData.summary || ""}
                    onChange={(e) => handleFieldChange("summary", e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "60px",
                      border: "none",
                      background: "transparent",
                      color: "#ffffff",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      resize: "vertical",
                    }}
                    placeholder="Professional summary..."
                  />
                ) : (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      color: "#ffffff",
                      margin: "0",
                    }}
                  >
                    {resumeData.summary || "Passionate professional with extensive experience in delivering exceptional results and driving innovation in dynamic environments."}
                  </p>
                )}
              </div>

              {/* Contact Information */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  fontSize: "0.85rem",
                }}
              >
                {editMode ? (
                  <>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaEnvelope color="#20B2AA" size="14" />
                      <input
                        type="text"
                        value={localData.email || ""}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          width: "150px",
                        }}
                        placeholder="Email"
                      />
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaPhoneAlt color="#20B2AA" size="14" />
                      <input
                        type="text"
                        value={localData.phone || ""}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          width: "120px",
                        }}
                        placeholder="Phone"
                      />
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaMapMarkerAlt color="#20B2AA" size="14" />
                      <input
                        type="text"
                        value={localData.location || ""}
                        onChange={(e) => handleFieldChange("location", e.target.value)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          width: "120px",
                        }}
                        placeholder="Location"
                      />
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaLinkedin color="#20B2AA" size="14" />
                      <input
                        type="text"
                        value={localData.linkedin || ""}
                        onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#ffffff",
                          fontSize: "0.85rem",
                          width: "150px",
                        }}
                        placeholder="LinkedIn"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaEnvelope color="#20B2AA" size="14" />
                      {resumeData.email || "your.email@example.com"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaPhoneAlt color="#20B2AA" size="14" />
                      {resumeData.phone || "123 456 7890"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaMapMarkerAlt color="#20B2AA" size="14" />
                      {resumeData.location || "Your City, State"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FaLinkedin color="#20B2AA" size="14" />
                      {resumeData.linkedin || "linkedin.com/in/yourprofile"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* HORIZONTAL SEPARATOR */}
            <div
              style={{
                height: "1px",
                backgroundColor: "#E5E7EB",
                width: "100%",
              }}
            />

            {/* MAIN CONTENT AREA */}
            <div style={{ display: "flex", padding: "1.5rem" }}>
              {/* LEFT COLUMN - Narrow */}
              <div style={{ width: "35%", paddingRight: "1rem" }}>
                {/* SKILLS SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Skills</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.skills) ? localData.skills.join(", ") : localData.skills || ""}
                        onChange={(e) => handleFieldChange("skills", e.target.value.split(", ").filter(skill => skill.trim()))}
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "0.25rem",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.8rem",
                          lineHeight: "1.3",
                          background: "#ffffff",
                          padding: "0.5rem",
                        }}
                        placeholder="Enter skills (comma separated)..."
                      />
                    ) : (
                      <div>
                        {Array.isArray(resumeData.skills) && resumeData.skills.length > 0 ? resumeData.skills.map((skill, idx) => (
                          <span key={idx} style={skillTagStyle}>{skill}</span>
                        )) : (
                          <>
                            <span style={skillTagStyle}>Marketing Strategy</span>
                            <span style={skillTagStyle}>Team Leadership</span>
                            <span style={skillTagStyle}>Project Management</span>
                            <span style={skillTagStyle}>Customer Service</span>
                            <span style={skillTagStyle}>Sales Management</span>
                            <span style={skillTagStyle}>Data Analysis</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* PROJECTS SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Personal Projects</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <div>
                        {(localData.projects || []).map((project, index) => (
                          <div key={index} style={{ marginBottom: "1rem" }}>
                            <input
                              type="text"
                              value={project.name || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { name: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Project Name"
                            />
                            <textarea
                              value={project.description || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { description: e.target.value })}
                              style={{
                                width: "100%",
                                minHeight: "40px",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                resize: "vertical",
                                fontFamily: "inherit",
                                fontSize: "0.75rem",
                                lineHeight: "1.3",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Project description..."
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newProjects = [...(localData.projects || []), { name: "", description: "" }];
                            handleFieldChange("projects", newProjects);
                          }}
                          style={{
                            backgroundColor: "#20B2AA",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "0.25rem",
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            marginTop: "0.3rem",
                          }}
                        >
                          + Add Project
                        </button>
                      </div>
                    ) : (
                      <div>
                        {(resumeData.projects || []).slice(0, 2).map((project, index) => (
                          <div key={index} style={{ marginBottom: "1rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.85rem", fontWeight: "bold" }}>
                              {project.name || "Project Name"}
                            </h4>
                            <p style={{ margin: "0", fontSize: "0.75rem", lineHeight: "1.3" }}>
                              {project.description || "Project description goes here..."}
                            </p>
                          </div>
                        ))}
                        {(!resumeData.projects || resumeData.projects.length === 0) && (
                          <div style={{ marginBottom: "1rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.85rem", fontWeight: "bold" }}>
                              E-commerce Platform
                            </h4>
                            <p style={{ margin: "0", fontSize: "0.75rem", lineHeight: "1.3" }}>
                              Developed a full-stack e-commerce solution with React and Node.js
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* CERTIFICATES SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Certificates</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <div>
                        {(localData.certifications || []).map((cert, index) => (
                          <div key={index} style={{ marginBottom: "0.8rem" }}>
                            <input
                              type="text"
                              value={cert.title || ""}
                              onChange={(e) => handleArrayFieldChange("certifications", index, { title: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.2rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Certificate Title"
                            />
                            <input
                              type="text"
                              value={cert.issuer || ""}
                              onChange={(e) => handleArrayFieldChange("certifications", index, { issuer: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.2rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Issuing Organization"
                            />
                            <input
                              type="text"
                              value={cert.date || ""}
                              onChange={(e) => handleArrayFieldChange("certifications", index, { date: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.7rem",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Date"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newCerts = [...(localData.certifications || []), { title: "", issuer: "", date: "" }];
                            handleFieldChange("certifications", newCerts);
                          }}
                          style={{
                            backgroundColor: "#20B2AA",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "0.25rem",
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            marginTop: "0.3rem",
                          }}
                        >
                          + Add Certificate
                        </button>
                      </div>
                    ) : (
                      <div>
                        {(resumeData.certifications || []).slice(0, 2).map((cert, index) => (
                          <div key={index} style={{ marginBottom: "0.8rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.2rem" }}>
                              <FaExternalLinkAlt color="#20B2AA" size="10" />
                              <span style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                                {cert.title || "Professional Certification"} {cert.date && `(${cert.date})`}
                              </span>
                            </div>
                            <p style={{ margin: "0", fontSize: "0.7rem", color: "#6b7280" }}>
                              {cert.issuer || "Industry Professional Association"}
                            </p>
                          </div>
                        ))}
                        {(!resumeData.certifications || resumeData.certifications.length === 0) && (
                          <div style={{ marginBottom: "0.8rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.2rem" }}>
                              <FaExternalLinkAlt color="#20B2AA" size="10" />
                              <span style={{ fontSize: "0.75rem", fontWeight: "bold" }}>
                                Professional Certification (2023)
                              </span>
                            </div>
                            <p style={{ margin: "0", fontSize: "0.7rem", color: "#6b7280" }}>
                              Industry Professional Association
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* LANGUAGES SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Languages</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.languages) ? localData.languages.join(", ") : localData.languages || ""}
                        onChange={(e) => handleFieldChange("languages", e.target.value.split(", ").filter(lang => lang.trim()))}
                        style={{
                          width: "100%",
                          minHeight: "60px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "0.25rem",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.8rem",
                          lineHeight: "1.3",
                          background: "#ffffff",
                          padding: "0.5rem",
                        }}
                        placeholder="Enter languages (comma separated)..."
                      />
                    ) : (
                      <div>
                        {resumeData.languagesDetailed && resumeData.languagesDetailed.length > 0 ? (
                          resumeData.languagesDetailed.map((lang, idx) => (
                            <div key={idx} style={{ marginBottom: "0.3rem", fontSize: "0.75rem", lineHeight: "1.3" }}>
                              <span style={{ fontWeight: "500" }}>{lang.language}</span>
                              <span style={{ color: "#6b7280", marginLeft: "0.5rem" }}>
                                - {lang.proficiency}
                              </span>
                            </div>
                          ))
                        ) : Array.isArray(resumeData.languages) && resumeData.languages.length > 0 ? (
                          resumeData.languages.map((lang, idx) => (
                            <div key={idx} style={{ marginBottom: "0.3rem", fontSize: "0.75rem", lineHeight: "1.3" }}>
                              {lang} - Native or Bilingual Proficiency
                            </div>
                          ))
                        ) : (
                          <div style={{ fontSize: "0.75rem", lineHeight: "1.3", color: "#6b7280" }}>
                            English - Native or Bilingual Proficiency
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* INTERESTS SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Interests</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.interests) ? localData.interests.join(", ") : localData.interests || ""}
                        onChange={(e) => handleFieldChange("interests", e.target.value.split(", ").filter(interest => interest.trim()))}
                        style={{
                          width: "100%",
                          minHeight: "60px",
                          border: "1px solid #E5E7EB",
                          borderRadius: "0.25rem",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.8rem",
                          lineHeight: "1.3",
                          background: "#ffffff",
                          padding: "0.5rem",
                        }}
                        placeholder="Enter interests (comma separated)..."
                      />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                        {Array.isArray(resumeData.interests) && resumeData.interests.length > 0 ? resumeData.interests.map((interest, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <FaCog color="#20B2AA" size="10" />
                            <span style={{ fontSize: "0.75rem" }}>{interest}</span>
                          </div>
                        )) : (
                          <div style={{ fontSize: "0.75rem", color: "#6b7280", fontStyle: "italic" }}>
                            No interests added yet
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN - Wide */}
              <div style={{ width: "65%", paddingLeft: "1rem" }}>
                {/* WORK EXPERIENCE SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Work Experience</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <div>
                        {(localData.experience || []).map((exp, index) => (
                          <div key={index} style={{ marginBottom: "1.5rem" }}>
                            <input
                              type="text"
                              value={exp.title || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { title: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Job Title"
                            />
                            <input
                              type="text"
                              value={exp.companyName || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { companyName: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.7rem",
                                color: "#1F2937",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Company Name"
                            />
                            <input
                              type="text"
                              value={exp.date || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { date: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.65rem",
                                color: "#6b7280",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.5rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Duration (e.g., 01/2022 - Present)"
                            />
                            <h5 style={{ margin: "0 0 0.3rem 0", fontSize: "0.7rem", fontWeight: "bold", color: "#1F2937" }}>
                              Achievements
                            </h5>
                            <textarea
                              value={Array.isArray(exp.accomplishment) ? exp.accomplishment.join("\n") : exp.accomplishment || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { accomplishment: e.target.value.split("\n").filter(item => item.trim()) })}
                              style={{
                                width: "100%",
                                minHeight: "60px",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                resize: "vertical",
                                fontFamily: "inherit",
                                fontSize: "0.7rem",
                                lineHeight: "1.3",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Describe your key accomplishments..."
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newExp = [...(localData.experience || []), { title: "", companyName: "", date: "", accomplishment: [] }];
                            handleFieldChange("experience", newExp);
                          }}
                          style={{
                            backgroundColor: "#20B2AA",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "0.25rem",
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            marginTop: "0.3rem",
                          }}
                        >
                          + Add Experience
                        </button>
                      </div>
                    ) : (
                      <div>
                        {(resumeData.experience || []).slice(0, 3).map((exp, index) => (
                          <div key={index} style={{ marginBottom: "1.5rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem", fontWeight: "bold" }}>
                              {exp.title || "Software Developer"}
                            </h4>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem", color: "#1F2937" }}>
                              {exp.companyName || "ABC Company"}
                            </p>
                            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.7rem", color: "#6b7280" }}>
                              {exp.date || "01/2022 - Present"}
                            </p>
                            <h5 style={{ margin: "0 0 0.3rem 0", fontSize: "0.75rem", fontWeight: "bold", color: "#1F2937" }}>
                              Achievements
                            </h5>
                            {Array.isArray(exp.accomplishment) && exp.accomplishment.length > 0 ? (
                              <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.75rem", lineHeight: "1.3" }}>
                                {exp.accomplishment.map((acc, accIndex) => (
                                  <li key={accIndex} style={{ marginBottom: "0.2rem" }}>{acc}</li>
                                ))}
                              </ul>
                            ) : (
                              <p style={{ margin: "0", fontSize: "0.75rem", lineHeight: "1.3" }}>
                                • Built scalable web applications and improved system performance
                              </p>
                            )}
                          </div>
                        ))}
                        {(!resumeData.experience || resumeData.experience.length === 0) && (
                          <div style={{ marginBottom: "1.5rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem", fontWeight: "bold" }}>
                              Freelance Consultant
                            </h4>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem", color: "#1F2937" }}>
                              Independent Contractor
                            </p>
                            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.7rem", color: "#6b7280" }}>
                              01/2022 - Present
                            </p>
                            <h5 style={{ margin: "0 0 0.3rem 0", fontSize: "0.75rem", fontWeight: "bold", color: "#1F2937" }}>
                              Achievements
                            </h5>
                            <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.75rem", lineHeight: "1.3" }}>
                              <li style={{ marginBottom: "0.2rem" }}>Led digital transformation initiatives for 15+ clients</li>
                              <li style={{ marginBottom: "0.2rem" }}>Increased client revenue by an average of 35%</li>
                              <li style={{ marginBottom: "0.2rem" }}>Developed comprehensive business strategies</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* EDUCATION SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Education</h3>
                  <div style={{ marginTop: "0.5rem" }}>
                    {editMode ? (
                      <div>
                        {(localData.education || []).map((edu, index) => (
                          <div key={index} style={{ marginBottom: "1rem" }}>
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { degree: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Degree"
                            />
                            <input
                              type="text"
                              value={edu.institution || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { institution: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.7rem",
                                color: "#1F2937",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Institution"
                            />
                            <input
                              type="text"
                              value={edu.duration || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { duration: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.65rem",
                                color: "#6b7280",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                marginBottom: "0.3rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Duration (e.g., 2007 - 2010)"
                            />
                            <input
                              type="text"
                              value={edu.grade || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { grade: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.65rem",
                                color: "#6b7280",
                                border: "1px solid #E5E7EB",
                                borderRadius: "0.25rem",
                                background: "#ffffff",
                                padding: "0.5rem",
                              }}
                              placeholder="Grade/GPA (Optional)"
                            />
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newEdu = [...(localData.education || []), { degree: "", institution: "", duration: "", grade: "" }];
                            handleFieldChange("education", newEdu);
                          }}
                          style={{
                            backgroundColor: "#20B2AA",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "0.25rem",
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            marginTop: "0.3rem",
                          }}
                        >
                          + Add Education
                        </button>
                      </div>
                    ) : (
                      <div>
                        {(resumeData.education || []).slice(0, 2).map((edu, index) => (
                          <div key={index} style={{ marginBottom: "1rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem", fontWeight: "bold" }}>
                              {edu.degree || "B.A. in Business Administration"}
                            </h4>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem", color: "#1F2937" }}>
                              {edu.institution || "The University of Technology"}
                            </p>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.7rem", color: "#6b7280" }}>
                              {edu.duration || "2007 - 2010"}
                            </p>
                            {edu.grade && (
                              <p style={{ margin: "0", fontSize: "0.7rem", color: "#6b7280" }}>
                                Grade: {edu.grade}
                              </p>
                            )}
                          </div>
                        ))}
                        {(!resumeData.education || resumeData.education.length === 0) && (
                          <div style={{ marginBottom: "1rem" }}>
                            <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem", fontWeight: "bold" }}>
                              B.A. in Business Administration
                            </h4>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.8rem", color: "#1F2937" }}>
                              The University of Technology
                            </p>
                            <p style={{ margin: "0", fontSize: "0.7rem", color: "#6b7280" }}>
                              2007 - 2010
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Mode Controls */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "#9ca3af",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    margin: "0 0.5rem",
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
                  backgroundColor: "#20B2AA",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  margin: "0 0.5rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Print optimization styles */}
      <style jsx>{`
        @media print {
          /* Reset all borders and decorative elements */
          * {
            border: none !important;
            border-radius: 0 !important;
            border-image: none !important;
            border-style: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          
          /* Specific resume page styling for print */
          .resume-page {
            max-width: 210mm !important;
            width: 210mm !important;
            min-height: auto !important;
            height: auto !important;
            margin: 0 !important;
            border: 1px solid #000000 !important;
            border-radius: 0 !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
            overflow: visible !important;
            position: relative !important;
            background: white !important;
          }
          
          /* Ensure body has no margins or padding */
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          
          /* Allow content to flow naturally */
          .resume-page > * {
            page-break-inside: auto !important;
          }
          
          /* Ensure proper page breaks */
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Allow natural page breaks */
          .resume-page {
            page-break-after: auto !important;
            page-break-before: auto !important;
          }
          
          /* Section titles styling for print */
          h3 {
            border-bottom: 1px solid #E5E7EB !important;
            color: #20B2AA !important;
          }
          
          /* Ensure text is readable and not cut off */
          p, h1, h2, h3, h4, li, input, textarea {
            font-size: inherit !important;
            line-height: 1.3 !important;
            margin: 0.2rem 0 !important;
            padding: 0 !important;
          }
          
          /* Skill tags styling for print */
          span[style*="skillTagStyle"] {
            background-color: #E0F7FA !important;
            color: #1F2937 !important;
            border: none !important;
          }
          
          /* Prevent awkward page breaks */
          .resume-page > div:first-child {
            page-break-inside: avoid !important;
          }
          
          /* Allow natural breaks between main sections */
          .resume-page > div:nth-child(2) {
            page-break-inside: auto !important;
          }
        }
        
        /* A4 sizing for screen display */
        .resume-page {
          aspect-ratio: 1 / 1.414; /* A4 ratio */
          max-height: 1123px; /* A4 height in pixels at 96 DPI */
        }
        
        /* Ensure content fits within page bounds */
        .resume-page {
          overflow: hidden;
          position: relative;
        }
        
        /* Additional print-specific styles */
        @media print {
          /* Hide any elements that might cause layout issues */
          .resume-page {
            transform: none !important;
            transition: none !important;
            animation: none !important;
          }
          
          /* Ensure all content is visible */
          .resume-page * {
            visibility: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Template32;
