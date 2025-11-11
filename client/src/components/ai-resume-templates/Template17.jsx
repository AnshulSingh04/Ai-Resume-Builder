import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import resumeService from "../../services/resumeService";
import LoginPrompt from "../auth/LoginPrompt";

const Template17 = () => {
  const resumeContext = useResume();
  const { isAuthenticated } = useAuth();

  // 1. FIXED DEFAULT DATA to use objects for Languages and Interests for consistency
  const resumeData = resumeContext?.resumeData || {
    name: "John Doe",
    role: "Full Stack Developer",
    phone: "123-456-7890",
    email: "john@example.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
    summary: "Passionate full-stack developer with 3+ years of experience...",
    experience: [
      {
        title: "Software Developer",
        company: "ABC Pvt Ltd",
        duration: "2020 - Present",
        description: "Built scalable MERN applications used by 10k+ users. Improved API performance by 40%.",
      },
    ],
    education: {
      degree: "B.Tech in Computer Science",
      university: "XYZ University",
      duration: "2016 - 2020",
      location: "Pune",
    },
    skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    languages: [
        { language: "English", proficiency: "Native" },
        { language: "Hindi", proficiency: "Fluent" }
    ], 
    interests: [
        { name: "Open Source" }, 
        { name: "Chess" }, 
        { name: "UI Design" }
    ], 
    font: "Arial, sans-serif",
    textColor: "#1f2937",
  };

  const updateResumeData = resumeContext?.updateResumeData;
  const [localData, setLocalData] = useState(resumeData);
  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [isSavingToDatabase, setIsSavingToDatabase] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    if (!isAuthenticated) setShowLoginPrompt(true);
  }, [isAuthenticated]);

  useEffect(() => {
    if (resumeData) setLocalData(JSON.parse(JSON.stringify(resumeData)));
  }, [resumeData]);

  // Generic handlers
  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  // Used for arrays of objects (experience, languages, interests)
  const handleObjectChange = (section, index, field, value) => {
    const updatedSection = [...(localData[section] || [])];
    updatedSection[index] = { ...updatedSection[index], [field]: value };
    const updatedData = { ...localData, [section]: updatedSection };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  // Used for arrays of strings (skills)
  const handleArrayChange = (section, index, value) => {
    const updatedSection = [...(localData[section] || [])];
    updatedSection[index] = value;
    const updatedData = { ...localData, [section]: updatedSection };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleEducationChange = (field, value) => {
    const updatedData = {
      ...localData,
      education: { ...localData.education, [field]: value },
    };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const addItem = (section, newItem) => {
    const updatedData = { ...localData, [section]: [...(localData[section] || []), newItem] };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const removeItem = (section, index) => {
    const updatedData = { ...localData, [section]: (localData[section] || []).filter((_, i) => i !== index) };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleSave = async () => {
    try {
      setSaveStatus("Saving...");
      setIsSavingToDatabase(true);
      if (!resumeContext || typeof updateResumeData !== "function") throw new Error("Context error");
      await updateResumeData(localData);
      if (isAuthenticated) {
        const structuredData = {
          templateId: 29,
          personalInfo: {
            name: localData.name,
            role: localData.role,
            phone: localData.phone,
            email: localData.email,
            linkedin: localData.linkedin,
            github: localData.github,
            portfolio: localData.portfolio,
          },
          summary: localData.summary,
          experience: localData.experience,
          education: localData.education,
          skills: localData.skills,
          languages: localData.languages,
          interests: localData.interests,
        };
        const saveResult = await resumeService.saveResumeData(structuredData);
        saveResult.success ? toast.success("Resume saved to database") : toast.error("Failed to save");
      }
      setEditMode(false);
      setSaveStatus("Data saved successfully");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      console.error("Error saving resume data:", error);
      setSaveStatus(`Error: ${error.message}`);
      toast.error("Failed to save");
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsSavingToDatabase(false);
    }
  };

  const handleCancel = () => {
    setLocalData(resumeData ? JSON.parse(JSON.stringify(resumeData)) : {});
    setEditMode(false);
    setSaveStatus("");
  };

  const handleSaveLocal = () => {
    try {
      localStorage.setItem("resumeData", JSON.stringify(localData));
      setEditMode(false);
      setSaveStatus("Saved locally!");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("Error saving locally");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };

  const handleEnhance = (section) => {};
  const handleFontChange = (font) => {
    handleInputChange("font", font);
  };
  const handleColorChange = (color) => {
    handleInputChange("textColor", color);
  };
  const handleDownload = () => {};

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Left Sidebar */}
        <Sidebar
          onEnhance={handleEnhance}
          resumeRef={resumeRef}
          onFontChange={handleFontChange}
          onColorChange={handleColorChange}
          onDownload={handleDownload}
        />

        {/* Main Resume Content */}
        <div style={{ flex: 3, padding: "0 2rem" }}>
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              fontFamily: localData.font || "Arial, sans-serif",
              color: localData.textColor,
            }}
          >
            {/* Header */}
            <header style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              {!editMode ? (
                <>
                  <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0 0 0.25rem", color: "#1f2937" }}>
                    {localData.name}
                  </h1>
                  <p style={{ fontSize: "1.25rem", color: "#4b5563", margin: "0 0 0.5rem" }}>
                    {localData.role}
                  </p>
                  <div style={{ fontSize: "0.95rem", color: "#6b7280", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <span>Phone: {localData.phone}</span>
                    <span>Email: {localData.email}</span>
                    {localData.linkedin && <a href={`https://${localData.linkedin}`} style={{ color: "#2563eb" }}>LinkedIn</a>}
                    {localData.github && <a href={`https://${localData.github}`} style={{ color: "#2563eb" }}>GitHub</a>}
                    {localData.portfolio && <a href={`https://${localData.portfolio}`} style={{ color: "#2563eb" }}>Portfolio</a>}
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={localData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      width: "100%",
                      color: "#1f2937",
                    }}
                    placeholder="Your Name"
                  />
                  <input
                    type="text"
                    value={localData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    style={{
                      fontSize: "1.25rem",
                      textAlign: "center",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      width: "100%",
                      color: "#4b5563",
                    }}
                    placeholder="Your Role"
                  />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginTop: "0.5rem" }}>
                    {["phone", "email", "linkedin", "github", "portfolio"].map((field) => (
                      <input
                        key={field}
                        type="text"
                        value={localData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        style={{
                          fontSize: "0.9rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.25rem",
                          padding: "0.25rem 0.5rem",
                          width: "150px",
                        }}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      />
                    ))}
                  </div>
                </>
              )}
            </header>

            {/* Summary */}
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Summary
              </h2>
              {!editMode ? (
                <p style={{ fontSize: "1rem", lineHeight: "1.6", margin: "0.75rem 0 0" }}>
                  {localData.summary}
                </p>
              ) : (
                <textarea
                  value={localData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "4rem",
                    fontSize: "1rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                    resize: "vertical",
                  }}
                  placeholder="Your summary..."
                />
              )}
            </section>

            {/* Experience */}
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Experience
              </h2>
              {localData.experience?.map((exp, idx) => (
                <div key={idx} style={{ marginTop: "1rem" }}>
                  {!editMode ? (
                    <>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: "0 0 0.25rem" }}>
                        {exp.title} — <span style={{ color: "#4b5563" }}>{exp.company}</span>
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#6b7280", margin: "0 0 0.5rem" }}>
                        {exp.duration}
                      </p>
                      <p style={{ fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>
                        {exp.description}
                      </p>
                    </>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleObjectChange("experience", idx, "title", e.target.value)}
                        style={{ fontWeight: "600", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                        placeholder="Job Title"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleObjectChange("experience", idx, "company", e.target.value)}
                        style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleObjectChange("experience", idx, "duration", e.target.value)}
                        style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                        placeholder="Duration"
                      />
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleObjectChange("experience", idx, "description", e.target.value)}
                        style={{ minHeight: "3rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem", resize: "vertical" }}
                        placeholder="Description"
                      />
                      <button
                        onClick={() => removeItem("experience", idx)}
                        style={{ color: "#ef4444", alignSelf: "flex-start", background: "none", border: "none", fontWeight: "bold" }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() =>
                    addItem("experience", {
                      title: "New Role",
                      company: "Company",
                      duration: "YYYY - Present",
                      description: "Description",
                    })
                  }
                  style={{ color: "#2563eb", background: "none", border: "none", fontWeight: "bold", marginTop: "0.5rem" }}
                >
                  + Add Experience
                </button>
              )}
            </section>

            {/* Education */}
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Education
              </h2>
              {!editMode ? (
                <div style={{ marginTop: "0.75rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", margin: "0 0 0.25rem" }}>
                    {localData.education?.degree}
                  </h3>
                  <p style={{ fontSize: "1rem", margin: "0 0 0.25rem" }}>
                    {localData.education?.university} — {localData.education?.location}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                    {localData.education?.duration}
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    value={localData.education?.degree || ""}
                    onChange={(e) => handleEducationChange("degree", e.target.value)}
                    style={{ fontWeight: "600", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                    placeholder="Degree"
                  />
                  <input
                    type="text"
                    value={localData.education?.university || ""}
                    onChange={(e) => handleEducationChange("university", e.target.value)}
                    style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                    placeholder="University"
                  />
                  <input
                    type="text"
                    value={localData.education?.location || ""}
                    onChange={(e) => handleEducationChange("location", e.target.value)}
                    style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    value={localData.education?.duration || ""}
                    onChange={(e) => handleEducationChange("duration", e.target.value)}
                    style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.4rem" }}
                    placeholder="Duration"
                  />
                </div>
              )}
            </section>

            {/* Skills (Stays as Array of Strings) */}
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Skills
              </h2>
              <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {!editMode ? (
                  localData.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: "#f3f4f6",
                        color: "#1f2937",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <>
                    {localData.skills?.map((skill, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleArrayChange("skills", idx, e.target.value)}
                          style={{
                            border: "1px solid #d1d5db",
                            borderRadius: "0.25rem",
                            padding: "0.25rem 0.5rem",
                            fontSize: "0.9rem",
                          }}
                        />
                        <button
                          onClick={() => removeItem("skills", idx)}
                          style={{ color: "#ef4444", background: "none", border: "none", fontSize: "1.1rem" }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem("skills", "New Skill")}
                      style={{ color: "#2563eb", background: "none", border: "none", fontWeight: "bold" }}
                    >
                      + Add
                    </button>
                  </>
                )}
              </div>
            </section>

            {/* Languages (FIXED to handle objects {language, proficiency}) */}
            <section style={{ marginBottom: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Languages
              </h2>
              <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem", listStyle: "disc" }}>
                {!editMode ? (
                  localData.languages?.map((lang, idx) => (
                    <li key={idx} style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                        {/* Safely render string property from the object/string */}
                      {typeof lang === 'string' 
                         ? lang 
                         : `${lang.language || ''} (${lang.proficiency || ''})`}
                    </li>
                  ))
                ) : (
                  <>
                    {localData.languages?.map((lang, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {/* Use inputs and handleObjectChange for object properties */}
                        <input
                            type="text"
                            value={lang.language || ''}
                            onChange={(e) => handleObjectChange("languages", idx, "language", e.target.value)}
                            style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", width: '120px' }}
                            placeholder="Language"
                        />
                        <input
                            type="text"
                            value={lang.proficiency || ''}
                            onChange={(e) => handleObjectChange("languages", idx, "proficiency", e.target.value)}
                            style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", width: '120px' }}
                            placeholder="Proficiency"
                        />
                        <button
                          onClick={() => removeItem("languages", idx)}
                          style={{ color: "#ef4444", background: "none", border: "none" }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem("languages", { language: "New Language", proficiency: "Intermediate" })}
                      style={{ color: "#2563eb", background: "none", border: "none", fontWeight: "bold", marginTop: "0.5rem" }}
                    >
                      + Add Language
                    </button>
                  </>
                )}
              </ul>
            </section>

            {/* Interests (FIXED to handle objects {name} for consistency) */}
            <section>
              <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#000080", textTransform: "uppercase", borderBottom: "2px solid #e5e7eb", paddingBottom: "0.25rem" }}>
                Interests
              </h2>
              <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.25rem", listStyle: "disc" }}>
                {!editMode ? (
                  localData.interests?.map((interest, idx) => (
                    <li key={idx} style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
                        {/* Safely render string property from the object/string */}
                        {typeof interest === 'string' ? interest : interest.name}
                    </li>
                  ))
                ) : (
                  <>
                    {localData.interests?.map((interest, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                        {/* Use input and handleObjectChange for object property 'name' */}
                        <input
                            type="text"
                            value={interest.name || ''}
                            onChange={(e) => handleObjectChange("interests", idx, "name", e.target.value)}
                            style={{ border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem 0.5rem" }}
                            placeholder="Interest Name"
                        />
                        <button
                          onClick={() => removeItem("interests", idx)}
                          style={{ color: "#ef4444", background: "none", border: "none" }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addItem("interests", { name: "New Interest" })}
                      style={{ color: "#2563eb", background: "none", border: "none", fontWeight: "bold", marginTop: "0.5rem" }}
                    >
                      + Add Interest
                    </button>
                  </>
                )}
              </ul>
            </section>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", alignItems: "center" }}>
            {editMode ? (
              <>
                <button
                  onClick={typeof updateResumeData === "function" ? handleSave : handleSaveLocal}
                  disabled={saveStatus === "Saving..."}
                  style={{
                    backgroundColor: saveStatus === "Saving..." ? "#9ca3af" : "#10b981",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: saveStatus === "Saving..." ? "not-allowed" : "pointer",
                  }}
                >
                  {saveStatus === "Saving..." ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saveStatus === "Saving..."}
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    border: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: saveStatus === "Saving..." ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                {saveStatus && (
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: saveStatus.includes("Error") ? "#ef4444" : "#10b981",
                      fontWeight: "500",
                    }}
                  >
                    {saveStatus}
                  </span>
                )}
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Edit Resume
              </button>
            )}
          </div>
        </div>
      </div>

      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default Template17;