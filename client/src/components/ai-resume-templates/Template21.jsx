import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt, FaGithub, FaGlobe, FaExternalLinkAlt } from "react-icons/fa";

const Template21 = () => {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData || {});

  useEffect(() => {
    setLocalData(resumeData || {});
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    try {
      localStorage.setItem('resumeData', JSON.stringify(updatedData));
    } catch (e) {
      // ignore storage errors
    }
  };

  const handleArrayFieldChange = (field, index, value) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: prev[field] ? prev[field].map((item, i) => (i === index ? { ...item, ...value } : item)) : prev[field],
    }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData || {});
    setEditMode(false);
  };

  const handleEnhance = (section) => {};

  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "1.1rem",
    borderBottom: "2px solid #87CEEB",
    color: "#000000",
    marginTop: "1rem",
    paddingBottom: "0.25rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  };

  const sectionCardStyle = {
    backgroundColor: "#f8f9fa",
    padding: "0.8rem",
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e9ecef",
  };

  const leftSectionCardStyle = {
    backgroundColor: "#f8f9fa",
    padding: "0.8rem",
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e9ecef",
  };

  const headerStyle = {
    backgroundColor: "#E6F3FF",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    marginBottom: "1rem",
    border: "1px solid #87CEEB",
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
              padding: "1.5rem",
              backgroundColor: "#ffffff",
              color: "#000000", // Black text like the image
              boxSizing: "border-box",
              pageBreakAfter: "always",
              pageBreakInside: "avoid",
              overflow: "hidden", // Prevent content overflow
              border: "none", // No border
            }}
          >
            {/* HEADER */}
            <div style={headerStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                }}
              >
                {/* Left - Profile Image */}
                <div style={{ flexShrink: 0 }}>
                  {editMode ? (
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          border: "2px dashed #87CEEB",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "0.5rem",
                          cursor: "pointer",
                          backgroundColor: "#f8f9fa",
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const items = e.clipboardData.items;
                          for (let i = 0; i < items.length; i++) {
                            if (items[i].type.indexOf('image') !== -1) {
                              const file = items[i].getAsFile();
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                handleFieldChange("profileImage", e.target.result);
                              };
                              reader.readAsDataURL(file);
                              break;
                            }
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = e.dataTransfer.files;
                          if (files.length > 0 && files[0].type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              handleFieldChange("profileImage", e.target.result);
                            };
                            reader.readAsDataURL(files[0]);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        title="Paste image (Ctrl+V) or drag & drop image here"
                      >
                        {localData.profileImage ? (
                          <img
                            src={localData.profileImage}
                            alt="Profile Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div style={{ textAlign: "center", color: "#87CEEB" }}>
                            <div style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>📷</div>
                            <div style={{ fontSize: "0.75rem" }}>Paste Image</div>
                          </div>
                        )}
                      </div>
                      <p style={{ fontSize: "0.75rem", color: "#6b7280", margin: 0 }}>
                        Paste image (Ctrl+V) or drag & drop
                      </p>
                    </div>
                  ) : (
                    <img
                      src={localData.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"}
                      alt="Profile"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "3px solid #87CEEB",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face";
                      }}
                    />
                  )}
                </div>

                {/* Center - Name and Role */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={localData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          textAlign: "center",
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          color: "#000000",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <input
                        type="text"
                        value={localData.role}
                        onChange={(e) => handleFieldChange("role", e.target.value)}
                        style={{
                          fontSize: "1.1rem",
                          color: "#000000",
                          textAlign: "center",
                          width: "100%",
                          border: "none",
                          background: "transparent",
                          marginBottom: "0.5rem",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <h1
                        style={{
                          fontSize: "2rem",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          color: "#000000",
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        {resumeData.name || "JOHN DOE"}
                      </h1>
                      <h2 style={{ fontSize: "1.1rem", color: "#000000", margin: "0 0 0.5rem 0" }}>
                        {resumeData.role || "Full Stack Developer"}
                      </h2>
                    </>
                  )}

                  {/* Contact Information - Compact Layout */}
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "#000000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {editMode ? (
                      <>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaPhoneAlt color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.phone || ""}
                              onChange={(e) => handleFieldChange("phone", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "100px",
                                textAlign: "center",
                              }}
                              placeholder="Phone"
                            />
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaEnvelope color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.email || ""}
                              onChange={(e) => handleFieldChange("email", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "120px",
                                textAlign: "center",
                              }}
                              placeholder="Email"
                            />
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaLinkedin color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.linkedin || ""}
                              onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "130px",
                                textAlign: "center",
                              }}
                              placeholder="LinkedIn"
                            />
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaMapMarkerAlt color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.location || ""}
                              onChange={(e) => handleFieldChange("location", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "80px",
                                textAlign: "center",
                              }}
                              placeholder="Location"
                            />
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", justifyContent: "center", marginTop: "0.35rem", flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaGithub color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.github || ""}
                              onChange={(e) => handleFieldChange("github", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "160px",
                                textAlign: "center",
                              }}
                              placeholder="GitHub"
                            />
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaGlobe color="#87CEEB" size="12" />
                            <input
                              type="text"
                              value={localData.portfolio || ""}
                              onChange={(e) => handleFieldChange("portfolio", e.target.value)}
                              style={{
                                border: "none",
                                background: "transparent",
                                fontSize: "0.85rem",
                                color: "#000000",
                                width: "160px",
                                textAlign: "center",
                              }}
                              placeholder="Website"
                            />
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaPhoneAlt color="#87CEEB" size="12" /> {resumeData.phone || "123 456 7890"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaEnvelope color="#87CEEB" size="12" /> {resumeData.email || "john@example.com"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaLinkedin color="#87CEEB" size="12" /> {resumeData.linkedin || "https://linkedin.com/in/john"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaMapMarkerAlt color="#87CEEB" size="12" /> {resumeData.location || "Pune"}
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", marginTop: "0.35rem", flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaGithub color="#87CEEB" size="12" /> {resumeData.github || "https://github.com/johndoe"}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <FaGlobe color="#87CEEB" size="12" /> {resumeData.portfolio || "https://johndoe.dev"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {/* Left Column */}
              <div style={{ width: "35%" }}>
                {/* SKILLS SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Skills & Technologies</h3>
                  <div style={leftSectionCardStyle}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.skills) ? localData.skills.join(", ") : localData.skills || ""}
                        onChange={(e) => handleFieldChange("skills", e.target.value.split(", ").filter(skill => skill.trim()))}
                        style={{
                          width: "100%",
                          minHeight: "80px",
                          border: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.85rem",
                          lineHeight: "1.3",
                          background: "transparent",
                        }}
                        placeholder="Enter your skills..."
                      />
                    ) : (
                      <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.85rem", lineHeight: "1.3" }}>
                        {Array.isArray(resumeData.skills) && resumeData.skills.length > 0 ? resumeData.skills.map((skill, idx) => (
                          <li key={idx} style={{ marginBottom: "0.5rem" }}>{skill}</li>
                        )) : (
                          <>
                            <li style={{ marginBottom: "0.5rem" }}>React</li>
                            <li style={{ marginBottom: "0.5rem" }}>Node.js</li>
                            <li style={{ marginBottom: "0.5rem" }}>MongoDB</li>
                            <li style={{ marginBottom: "0.5rem" }}>Express</li>
                            <li style={{ marginBottom: "0.5rem" }}>Tailwind CSS</li>
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                {/* LANGUAGES SECTION */}
                <div style={{ marginTop: "0.8rem" }}>
                  <h3 style={sectionTitleStyle}>Languages</h3>
                  <div style={leftSectionCardStyle}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.languages) ? localData.languages.join(", ") : localData.languages || ""}
                        onChange={(e) => handleFieldChange("languages", e.target.value.split(", ").filter(lang => lang.trim()))}
                        style={{
                          width: "100%",
                          minHeight: "50px",
                          border: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.85rem",
                          lineHeight: "1.3",
                          background: "transparent",
                        }}
                        placeholder="Enter languages..."
                      />
                    ) : (
                      <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.85rem", lineHeight: "1.3" }}>
                        {Array.isArray(resumeData.languages) && resumeData.languages.length > 0 ? resumeData.languages.map((lang, idx) => (
                          <li key={idx} style={{ marginBottom: "0.5rem" }}>{lang}</li>
                        )) : (
                          <>
                            <li style={{ marginBottom: "0.5rem" }}>English</li>
                            <li style={{ marginBottom: "0.5rem" }}>Hindi</li>
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                </div>

                {/* EDUCATION SECTION */}
                <div style={{ marginTop: "0.8rem" }}>
                  <h3 style={sectionTitleStyle}>Education</h3>
                  {resumeData.education && resumeData.education.length > 0 ? (
                    resumeData.education.map((edu, index) => (
                      <div key={index} style={sectionCardStyle}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={edu.degree || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { degree: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.95rem",
                                fontWeight: "bold",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Degree"
                            />
                            <input
                              type="text"
                              value={edu.institution || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { institution: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.85rem",
                                color: "#000000",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Institution"
                            />
                            <input
                              type="text"
                              value={edu.duration || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { duration: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Duration (e.g., 2016 - 2020)"
                            />
                            <input
                              type="text"
                              value={edu.location || ""}
                              onChange={(e) => handleArrayFieldChange("education", index, { location: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                background: "transparent",
                              }}
                              placeholder="Location"
                            />
                          </>
                        ) : (
                          <>
                            <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                              {edu.degree || "B.Tech in Computer Science"}
                            </h4>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.85rem", color: "#000000" }}>
                              {edu.institution || "XYZ University"}
                            </p>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                              {edu.duration || "2016 - 2020"}
                            </p>
                            <p style={{ margin: "0", fontSize: "0.75rem", color: "#6b7280" }}>
                              {edu.location || "Pune"}
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div style={sectionCardStyle}>
                      {editMode ? (
                        <textarea
                          placeholder="Add your education details..."
                          style={{
                            width: "100%",
                            minHeight: "60px",
                            border: "none",
                            resize: "vertical",
                            fontFamily: "inherit",
                            fontSize: "0.85rem",
                            lineHeight: "1.3",
                            background: "transparent",
                          }}
                        />
                      ) : (
                        <>
                          <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                            B.Tech in Computer Science
                          </h4>
                          <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.85rem", color: "#000000" }}>
                            XYZ University
                          </p>
                          <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                            2016 - 2020
                          </p>
                          <p style={{ margin: "0", fontSize: "0.75rem", color: "#6b7280" }}>
                            Pune
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* INTERESTS SECTION */}
                <div style={{ marginTop: "0.8rem" }}>
                  <h3 style={sectionTitleStyle}>Interests</h3>
                  <div style={leftSectionCardStyle}>
                    {editMode ? (
                      <textarea
                        value={Array.isArray(localData.interests) ? localData.interests.join(", ") : localData.interests || ""}
                        onChange={(e) => handleFieldChange("interests", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                        style={{
                          width: "100%",
                          minHeight: "50px",
                          border: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.85rem",
                          lineHeight: "1.3",
                          background: "transparent",
                        }}
                        placeholder="Enter your interests (comma separated)..."
                      />
                    ) : (
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#000000", lineHeight: "1.3" }}>
                        {Array.isArray(resumeData?.interests) && resumeData.interests.length > 0
                          ? resumeData.interests.join(', ')
                          : 'Open Source, Chess, UI Design'
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ width: "65%" }}>
                {/* SUMMARY SECTION */}
                <div>
                  <h3 style={sectionTitleStyle}>Professional Summary</h3>
                  <div style={sectionCardStyle}>
                    {editMode ? (
                      <textarea
                        value={localData.summary || ""}
                        onChange={(e) => handleFieldChange("summary", e.target.value)}
                        style={{
                          width: "100%",
                          minHeight: "60px",
                          border: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                          fontSize: "0.85rem",
                          lineHeight: "1.3",
                          background: "transparent",
                        }}
                        placeholder="Enter your professional summary..."
                      />
                    ) : (
                      <p style={{ margin: "0", fontSize: "0.85rem", lineHeight: "1.3" }}>
                        {resumeData.summary || "Passionate full-stack developer with 3+ years of experience..."}
                      </p>
                    )}
                  </div>
                </div>

                {/* EXPERIENCE SECTION */}
                <div style={{ marginTop: "0.8rem" }}>
                  <h3 style={sectionTitleStyle}>Professional Experience</h3>
                  {resumeData.experience && resumeData.experience.length > 0 ? (
                    resumeData.experience.map((exp, index) => (
                      <div key={index} style={sectionCardStyle}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={exp.title || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { title: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.95rem",
                                fontWeight: "bold",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Job Title"
                            />
                            <input
                              type="text"
                              value={exp.companyName || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { companyName: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.85rem",
                                color: "#000000",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Company Name"
                            />
                            <input
                              type="text"
                              value={exp.date || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { date: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Duration (e.g., 2020 - Present)"
                            />
                            <input
                              type="text"
                              value={exp.companyLocation || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { companyLocation: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Company Location"
                            />
                            <textarea
                              value={Array.isArray(exp.accomplishment) ? exp.accomplishment.join("\n") : exp.accomplishment || ""}
                              onChange={(e) => handleArrayFieldChange("experience", index, { accomplishment: e.target.value.split("\n").filter(item => item.trim()) })}
                              style={{
                                width: "100%",
                                minHeight: "60px",
                                border: "none",
                                resize: "vertical",
                                fontFamily: "inherit",
                                fontSize: "0.8rem",
                                lineHeight: "1.3",
                                background: "transparent",
                              }}
                              placeholder="Describe your key accomplishments..."
                            />
                          </>
                        ) : (
                          <>
                            <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                              {exp.title || "Software Developer"}
                            </h4>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.85rem", color: "#000000" }}>
                              {exp.companyName || "ABC Company"}
                            </p>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                              {exp.date || "2020 - Present"} | {exp.companyLocation || "New York, NY"}
                            </p>
                            {Array.isArray(exp.accomplishment) && exp.accomplishment.length > 0 ? (
                              <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: "1.3" }}>
                                {exp.accomplishment.map((acc, accIndex) => (
                                  <li key={accIndex}>{acc}</li>
                                ))}
                              </ul>
                            ) : (
                              <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: "1.3" }}>
                                <li>Built scalable MERN applications used by 10k+ users.</li>
                                <li>Improved API performance by 40%.</li>
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                      <div style={sectionCardStyle}>
                        {editMode ? (
                          <textarea
                            placeholder="Add your experience details..."
                            style={{
                              width: "100%",
                              minHeight: "80px",
                              border: "none",
                              resize: "vertical",
                              fontFamily: "inherit",
                              fontSize: "0.85rem",
                              lineHeight: "1.3",
                              background: "transparent",
                            }}
                          />
                        ) : (
                          <>
                            <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                              Software Developer
                            </h4>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.85rem", color: "#000000" }}>
                              ABC Pvt Ltd
                            </p>
                            <p style={{ margin: "0 0 0.3rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                              2020 - Present | Mumbai
                            </p>
                            <ul style={{ margin: "0", paddingLeft: "1rem", fontSize: "0.8rem", lineHeight: "1.3" }}>
                              <li>Built scalable MERN applications used by 10k+ users.</li>
                              <li>Improved API performance by 40%.</li>
                            </ul>
                          </>
                        )}
                      </div>
                  )}
                </div>

                {/* PROJECTS SECTION */}
                <div style={{ marginTop: "0.8rem" }}>
                  <h3 style={sectionTitleStyle}>Projects</h3>
                  {resumeData.projects && resumeData.projects.length > 0 ? (
                    resumeData.projects.map((project, index) => (
                      <div key={index} style={sectionCardStyle}>
                        {editMode ? (
                          <>
                            <input
                              type="text"
                              value={project.name || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { name: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.95rem",
                                fontWeight: "bold",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Project Name"
                            />
                            <textarea
                              value={project.description || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { description: e.target.value })}
                              style={{
                                width: "100%",
                                minHeight: "50px",
                                border: "none",
                                resize: "vertical",
                                fontFamily: "inherit",
                                fontSize: "0.8rem",
                                lineHeight: "1.3",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Project description..."
                            />
                            <input
                              type="text"
                              value={Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { technologies: e.target.value.split(", ").filter(tech => tech.trim()) })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Technologies used (comma separated)..."
                            />
                            <input
                              type="text"
                              value={project.link || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { link: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                marginBottom: "0.3rem",
                                background: "transparent",
                              }}
                              placeholder="Project link (optional)..."
                            />
                            <input
                              type="text"
                              value={project.github || ""}
                              onChange={(e) => handleArrayFieldChange("projects", index, { github: e.target.value })}
                              style={{
                                width: "100%",
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                border: "none",
                                background: "transparent",
                              }}
                              placeholder="GitHub link (optional)..."
                            />
                          </>
                        ) : (
                          <>
                            <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                              {project.name || "StudySync"}
                            </h4>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.8rem", lineHeight: "1.3" }}>
                              {project.description || "An online platform where students can upload, download, and interact with study notes."}
                            </p>
                            { (Array.isArray(project.technologies) && project.technologies.length > 0) || (!project.technologies) ? (
                              <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                                <strong>Tech:</strong> {Array.isArray(project.technologies) && project.technologies.length > 0 ? project.technologies.join(", ") : "React, Express, MongoDB"}
                              </p>
                            ) : null}
                            {(project.link || project.github) && (
                              <p style={{ margin: "0", fontSize: "0.75rem", color: "#6b7280" }}>
                                {project.link && <span style={{ marginRight: "1rem" }}>🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "#87CEEB" }}>Live Demo</a></span>}
                                {project.github && <span>📁 <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#87CEEB" }}>GitHub</a></span>}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                      <div style={sectionCardStyle}>
                        {editMode ? (
                          <textarea
                            placeholder="Add your project details..."
                            style={{
                              width: "100%",
                              minHeight: "60px",
                              border: "none",
                              resize: "vertical",
                              fontFamily: "inherit",
                              fontSize: "0.85rem",
                              lineHeight: "1.3",
                              background: "transparent",
                            }}
                          />
                        ) : (
                          <>
                            <h4 style={{ margin: "0 0 0.2rem 0", fontSize: "0.95rem", fontWeight: "bold" }}>
                              StudySync
                            </h4>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.8rem", lineHeight: "1.3" }}>
                              An online platform where students can upload, download, and interact with study notes.
                            </p>
                            <p style={{ margin: "0 0 0.2rem 0", fontSize: "0.75rem", color: "#6b7280" }}>
                              <strong>Tech:</strong> React, Express, MongoDB
                            </p>
                            <p style={{ margin: "0", fontSize: "0.75rem", color: "#6b7280" }}>
                              <a href="https://studysync.example" target="_blank" rel="noopener noreferrer" aria-label="Live Demo" style={{ color: "#0875b8", textDecoration: "none", marginRight: "1rem", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontSize: "0.95rem" }}>🔗</span>
                                <span>Live Demo</span>
                              </a>
                              <a href="https://github.com/studysync" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "#0875b8", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontSize: "0.95rem" }}>📁</span>
                                <span>GitHub</span>
                              </a>
                            </p>
                          </>
                        )}
                      </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Mode Controls - Simple and Clean */}
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
                  backgroundColor: "#87CEEB",
                  color: "#000",
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

      {/* Add CSS for print optimization */}
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
            min-height: 297mm !important;
            height: 297mm !important;
            padding: 15mm !important;
            margin: 0 !important;
            border: none !important;
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
          
          /* Ensure content doesn't overflow on single page */
          .resume-page > * {
            page-break-inside: avoid !important;
            border: none !important;
          }
          
          /* Remove any remaining border elements */
          .resume-page::before,
          .resume-page::after {
            display: none !important;
            border: none !important;
          }
          
          /* Ensure proper page breaks */
          @page {
            size: A4;
            margin: 0;
          }
          
          /* Force single page layout and prevent border extension */
          .resume-page {
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            border: none !important;
            outline: none !important;
          }
          
          /* Remove section borders that might cause issues */
          h3 {
            border-bottom: 2px solid #87CEEB !important;
          }
          
          /* Ensure text is readable and not cut off */
          p, h1, h2, h3, h4, li, input, textarea {
            font-size: inherit !important;
            line-height: 1.3 !important;
            margin: 0.2rem 0 !important;
            padding: 0 !important;
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
            display: block !important;
          }
          
          /* Remove any flexbox properties that might cause issues */
          .resume-page {
            display: block !important;
            flex: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Template21;