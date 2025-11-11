import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";

const Template19 = () => {
  const resumeRef = useRef(null);
  const { resumeData = {}, setResumeData } = useResume();

  // Ensure resumeData has sensible defaults to avoid undefined issues
  const getDefaulted = (data) => ({
    name: "",
    role: "",
    location: "",
    phone: "",
    email: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    skills: [],
    projects: [],
    education: [],
    experience: [],
    languagesDetailed: [],
    languages: [],
    certifications: [],
    achievements: [],
    ...data,
  });

  const [localData, setLocalData] = useState(getDefaulted(resumeData));
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // debounce timer ref
  const saveTimerRef = useRef(null);

  // sync context -> localData (and ensure arrays exist)
  useEffect(() => {
    setLocalData(getDefaulted(resumeData));
  }, [resumeData]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  // Debounced save to localStorage (only local autosave)
  const debouncedLocalSave = (updatedData) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem("resumeData", JSON.stringify(updatedData));
        // replace with toast if you have one
        console.log("Resume saved locally. Sign in to save permanently.");
      } catch (e) {
        console.warn("Failed to save locally:", e);
      }
    }, 800);
  };

  // Generic field update
  const handleFieldChange = (field, value) => {
    setLocalData((prev) => {
      const updated = { ...prev, [field]: value };

      // keep languages in sync if languagesDetailed changed
      if (field === "languagesDetailed") {
        updated.languages = (value || []).map((l) => l.language || "").filter(Boolean);
      }

      debouncedLocalSave(updated);
      return updated;
    });
  };

  const handleSave = () => {
    // ensure final normalization before saving
    const normalized = getDefaulted(localData);
    normalized.skills = Array.isArray(normalized.skills) ? normalized.skills : (typeof normalized.skills === "string" ? normalized.skills.split(",").map(s => s.trim()).filter(Boolean) : []);
    normalized.languagesDetailed = normalized.languagesDetailed || [];
    normalized.languages = normalized.languagesDetailed.map(l => l.language).filter(Boolean);

    setResumeData(normalized);
    try {
      localStorage.setItem("resumeData", JSON.stringify(normalized));
    } catch (e) {
      // ignore storage failures
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(getDefaulted(resumeData));
    setEditMode(false);
  };

  // Education helpers
  const addEducation = () => {
    const updated = [...(localData.education || [])];
    updated.push({
      degree: "New Degree",
      institution: "New Institution",
      duration: "Year - Year",
    });
    handleFieldChange("education", updated);
  };

  const removeEducation = (index) => {
    const updated = [...(localData.education || [])];
    updated.splice(index, 1);
    handleFieldChange("education", updated);
  };

  // Experience helpers
  const addExperience = () => {
    const updated = [...(localData.experience || [])];
    updated.push({
      title: "New Title",
      companyName: "New Company",
      date: "Year - Year",
      accomplishment: ["Achievement 1"],
    });
    handleFieldChange("experience", updated);
  };

  const removeExperience = (index) => {
    const updated = [...(localData.experience || [])];
    updated.splice(index, 1);
    handleFieldChange("experience", updated);
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Utility to safely read arrays for rendering
  const safe = (arr) => (Array.isArray(arr) ? arr : []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar resumeRef={resumeRef} />
        <div
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Resume Box */}
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "#fff",
              padding: "2rem",
              width: "100%",
              maxWidth: "850px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              borderRadius: "0.5rem",
              fontFamily: "Segoe UI, sans-serif",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "1.5rem",
              }}
            >
              {/* Name & Role */}
              <div style={{ marginBottom: "0.5rem" }}>
                {editMode ? (
                  <>
                    <input
                      value={localData.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      placeholder="Full name"
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        width: "100%",
                        marginBottom: "0.25rem",
                      }}
                    />
                    <input
                      value={localData.role}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                      placeholder="Role / Title (e.g. Frontend Developer)"
                      style={{
                        fontSize: "1rem",
                        color: "#6b7280",
                        width: "100%",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {localData.name || "Your Name"}
                    </h1>
                    <h2
                      style={{ fontSize: "1rem", color: "#6b7280", margin: 0 }}
                    >
                      {localData.role || "Your Role / Title"}
                    </h2>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  alignItems: "center",
                }}
              >
                {[
                  { key: "location", placeholder: "Location (City, Country)" },
                  { key: "phone", placeholder: "Phone" },
                  { key: "email", placeholder: "Email" },
                  { key: "linkedin", placeholder: "LinkedIn URL" },
                  { key: "github", placeholder: "GitHub URL" },
                  { key: "portfolio", placeholder: "Portfolio" },
                ].map(({ key, placeholder }) =>
                  editMode ? (
                    <input
                      key={key}
                      value={localData[key] || ""}
                      onChange={(e) => handleFieldChange(key, e.target.value)}
                      placeholder={placeholder}
                      style={{
                        borderBottom: "1px solid #ccc",
                        width: "150px",
                        margin: 0,
                        padding: "0 0.25rem",
                        fontSize: "0.875rem",
                      }}
                    />
                  ) : (
                    <span key={key} style={{ minWidth: 120 }}>
                      {localData[key] || (key === "email" ? "your@email.com" : "")}
                    </span>
                  )
                )}
              </div>
            </div>

            <hr style={{ marginBottom: "1rem", borderColor: "#e5e7eb" }} />

            {/* Summary */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Summary</h3>
              {editMode ? (
                <textarea
                  value={localData.summary}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  rows={4}
                  placeholder="Write a short professional summary or objective..."
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    borderRadius: "0.375rem",
                    padding: "0.5rem",
                  }}
                />
              ) : (
                <p>{localData.summary || "Add a short summary about yourself."}</p>
              )}
            </div>
            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Skills */}
<div>
  <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Skills</h3>
  {editMode ? (
    <textarea
      value={Array.isArray(localData.skills) ? localData.skills.join(", ") : ""}
      onChange={(e) =>
        handleFieldChange(
          "skills",
          e.target.value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
      placeholder="Add skills separated by commas (e.g. React, Node.js, CSS)"
      style={{
        width: "100%",
        marginTop: "0.5rem",
        padding: "0.5rem",
      }}
    />
  ) : (
    <p style={{ marginTop: "0.5rem" }}>
      {Array.isArray(localData.skills) && localData.skills.length > 0
        ? localData.skills.join(", ")
        : <span style={{ color: "#9ca3af" }}>No skills added yet.</span>}
    </p>
  )}
</div>

<hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />


            {/* Projects */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Projects</h3>
              {safe(localData.projects).map((proj, i) => (
                <div key={i} style={{ marginTop: "0.75rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={proj.title || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.projects)];
                          updated[i] = { ...proj, title: e.target.value };
                          handleFieldChange("projects", updated);
                        }}
                        placeholder="Project Title"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <textarea
                        value={proj.description || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.projects)];
                          updated[i] = { ...proj, description: e.target.value };
                          handleFieldChange("projects", updated);
                        }}
                        placeholder="Project Description"
                        rows={3}
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={(proj.technologies || []).join(", ")}
                        onChange={(e) => {
                          const updated = [...safe(localData.projects)];
                          updated[i] = {
                            ...proj,
                            technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          };
                          handleFieldChange("projects", updated);
                        }}
                        placeholder="Technologies (comma separated)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={proj.link || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.projects)];
                          updated[i] = { ...proj, link: e.target.value };
                          handleFieldChange("projects", updated);
                        }}
                        placeholder="Live Demo Link (optional)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={proj.githubLink || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.projects)];
                          updated[i] = { ...proj, githubLink: e.target.value };
                          handleFieldChange("projects", updated);
                        }}
                        placeholder="GitHub Link (optional)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <button
                        onClick={() => {
                          const updated = [...safe(localData.projects)];
                          updated.splice(i, 1);
                          handleFieldChange("projects", updated);
                        }}
                        style={{ color: "#dc2626", fontSize: "0.75rem" }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600" }}>{proj.title}</p>
                      <p style={{ fontSize: "0.9rem" }}>{proj.description}</p>
                      {proj.technologies?.length > 0 && (
                        <p style={{ fontSize: "0.85rem", color: "#4b5563" }}>
                          <strong>Tech:</strong> {proj.technologies.join(", ")}
                        </p>
                      )}
                      {proj.link && (
                        <p>
                          <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>
                            Live Demo
                          </a>
                        </p>
                      )}
                      {proj.githubLink && (
                        <p>
                          <a href={proj.githubLink} target="_blank" rel="noreferrer" style={{ color: "#2563eb" }}>
                            GitHub
                          </a>
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() => {
                    const updated = [...safe(localData.projects)];
                    updated.push({
                      title: "New Project",
                      description: "Project description...",
                      technologies: [],
                      link: "",
                      githubLink: "",
                    });
                    handleFieldChange("projects", updated);
                  }}
                  style={{ marginTop: "0.5rem", color: "#2563eb" }}
                >
                  + Add Project
                </button>
              )}
            </div>

            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Education */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Education</h3>
              {safe(localData.education).map((edu, i) => (
                <div key={i} style={{ marginTop: "0.75rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={edu.degree || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.education)];
                          updated[i] = { ...edu, degree: e.target.value };
                          handleFieldChange("education", updated);
                        }}
                        placeholder="Degree (e.g. B.Tech in ECE)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={edu.institution || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.education)];
                          updated[i] = { ...edu, institution: e.target.value };
                          handleFieldChange("education", updated);
                        }}
                        placeholder="Institution"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={edu.duration || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.education)];
                          updated[i] = { ...edu, duration: e.target.value };
                          handleFieldChange("education", updated);
                        }}
                        placeholder="Duration (e.g. 2021 - 2025)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <button
                        onClick={() => removeEducation(i)}
                        style={{ color: "#dc2626", fontSize: "0.75rem" }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600" }}>{edu.degree}</p>
                      <p>
                        {edu.institution} ({edu.duration})
                      </p>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button onClick={addEducation} style={{ marginTop: "0.5rem", color: "#2563eb" }}>
                  + Add Education
                </button>
              )}
            </div>

            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Experience */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Experience</h3>
              {safe(localData.experience).map((exp, i) => (
                <div key={i} style={{ marginTop: "0.75rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={exp.title || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.experience)];
                          updated[i] = { ...exp, title: e.target.value };
                          handleFieldChange("experience", updated);
                        }}
                        placeholder="Job Title"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={exp.companyName || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.experience)];
                          updated[i] = { ...exp, companyName: e.target.value };
                          handleFieldChange("experience", updated);
                        }}
                        placeholder="Company"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <input
                        value={exp.date || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.experience)];
                          updated[i] = { ...exp, date: e.target.value };
                          handleFieldChange("experience", updated);
                        }}
                        placeholder="Date (e.g. Jun 2023 - Aug 2023)"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      <textarea
                        value={(exp.accomplishment || []).join("\n")}
                        onChange={(e) => {
                          const updated = [...safe(localData.experience)];
                          updated[i] = { ...exp, accomplishment: e.target.value.split("\n").filter(Boolean) };
                          handleFieldChange("experience", updated);
                        }}
                        rows={3}
                        placeholder="Accomplishments (one per line)"
                        style={{ width: "100%", marginTop: "0.5rem" }}
                      />
                      <button
                        onClick={() => removeExperience(i)}
                        style={{ color: "#dc2626", fontSize: "0.75rem" }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600" }}>
                        {exp.title} at {exp.companyName}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>{exp.date}</p>
                      <ul style={{ paddingLeft: "1.5rem", listStyle: "disc" }}>
                        {safe(exp.accomplishment).map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
              {editMode && (
                <button onClick={addExperience} style={{ marginTop: "0.5rem", color: "#2563eb" }}>
                  + Add Experience
                </button>
              )}
            </div>
            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Languages */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Languages</h3>
              {safe(localData.languagesDetailed).map((lang, i) => (
                <div key={i} style={{ marginTop: "0.5rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={lang.language || ""}
                        onChange={(e) => {
                          const updated = [...(localData.languagesDetailed || [])];
                          updated[i] = { ...lang, language: e.target.value };
                          handleFieldChange("languagesDetailed", updated);
                        }}
                        placeholder="Language (e.g. English)"
                        style={{ width: "60%", marginRight: "0.5rem" }}
                      />
                      <select
                        value={lang.proficiency || "Beginner"}
                        onChange={(e) => {
                          const updated = [...(localData.languagesDetailed || [])];
                          updated[i] = { ...lang, proficiency: e.target.value };
                          handleFieldChange("languagesDetailed", updated);
                        }}
                        style={{ width: "35%" }}
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Native</option>
                      </select>
                      <button
                        onClick={() => {
                          const updated = [...(localData.languagesDetailed || [])];
                          updated.splice(i, 1);
                          handleFieldChange("languagesDetailed", updated);
                        }}
                        style={{
                          color: "#dc2626",
                          fontSize: "0.75rem",
                          marginLeft: "0.5rem",
                        }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <p style={{ fontSize: "0.95rem" }}>
                      <strong>{lang.language}</strong> – {lang.proficiency}
                    </p>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() => {
                    const updated = [...(localData.languagesDetailed || [])];
                    updated.push({ language: "", proficiency: "Beginner" });
                    handleFieldChange("languagesDetailed", updated);
                  }}
                  style={{ marginTop: "0.5rem", color: "#2563eb" }}
                >
                  + Add Language
                </button>
              )}
            </div>

            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Certifications */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Certifications</h3>
              {safe(localData.certifications).map((cert, i) => (
                <div key={i} style={{ marginTop: "0.75rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={(typeof cert === "object" ? cert.title : cert) || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.certifications)];
                          if (typeof cert === "object") updated[i] = { ...cert, title: e.target.value };
                          else updated[i] = e.target.value;
                          handleFieldChange("certifications", updated);
                        }}
                        placeholder="Certification Title"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      {typeof cert === "object" && (
                        <>
                          <input
                            value={cert.issuer || ""}
                            onChange={(e) => {
                              const updated = [...safe(localData.certifications)];
                              updated[i] = { ...cert, issuer: e.target.value };
                              handleFieldChange("certifications", updated);
                            }}
                            placeholder="Issuing Organization"
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                          />
                          <input
                            value={cert.date || ""}
                            onChange={(e) => {
                              const updated = [...safe(localData.certifications)];
                              updated[i] = { ...cert, date: e.target.value };
                              handleFieldChange("certifications", updated);
                            }}
                            placeholder="Year"
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                          />
                        </>
                      )}
                      <button
                        onClick={() => {
                          const updated = [...safe(localData.certifications)];
                          updated.splice(i, 1);
                          handleFieldChange("certifications", updated);
                        }}
                        style={{ color: "#dc2626", fontSize: "0.75rem" }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div>
                      <p style={{ fontWeight: "600" }}>
                        {typeof cert === "object" ? cert.title : cert}
                      </p>
                      {typeof cert === "object" && cert.issuer && (
                        <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>
                          {cert.issuer} {cert.date && `(${cert.date})`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() => {
                    const updated = [...safe(localData.certifications)];
                    updated.push({ title: "", issuer: "", date: "" });
                    handleFieldChange("certifications", updated);
                  }}
                  style={{ marginTop: "0.5rem", color: "#2563eb" }}
                >
                  + Add Certification
                </button>
              )}
            </div>

            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />

            {/* Achievements */}
            <div>
              <h3 style={{ fontWeight: "650", fontSize: "1.1rem" }}>Achievements</h3>
              {safe(localData.achievements).map((ach, i) => (
                <div key={i} style={{ marginTop: "0.75rem" }}>
                  {editMode ? (
                    <>
                      <input
                        value={(typeof ach === "object" ? ach.title : ach) || ""}
                        onChange={(e) => {
                          const updated = [...safe(localData.achievements)];
                          if (typeof ach === "object") updated[i] = { ...ach, title: e.target.value };
                          else updated[i] = e.target.value;
                          handleFieldChange("achievements", updated);
                        }}
                        placeholder="Achievement Title"
                        style={{ width: "100%", marginBottom: "0.5rem" }}
                      />
                      {typeof ach === "object" && (
                        <>
                          <textarea
                            value={ach.description || ""}
                            onChange={(e) => {
                              const updated = [...safe(localData.achievements)];
                              updated[i] = { ...ach, description: e.target.value };
                              handleFieldChange("achievements", updated);
                            }}
                            placeholder="Description"
                            rows={2}
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                          />
                          <input
                            value={ach.year || ""}
                            onChange={(e) => {
                              const updated = [...safe(localData.achievements)];
                              updated[i] = { ...ach, year: e.target.value };
                              handleFieldChange("achievements", updated);
                            }}
                            placeholder="Year"
                            style={{ width: "100%", marginBottom: "0.5rem" }}
                          />
                        </>
                      )}
                      <button
                        onClick={() => {
                          const updated = [...safe(localData.achievements)];
                          updated.splice(i, 1);
                          handleFieldChange("achievements", updated);
                        }}
                        style={{ color: "#dc2626", fontSize: "0.75rem" }}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div>
                      <p style={{ fontWeight: "600" }}>
                        {typeof ach === "object" ? ach.title : ach}
                      </p>
                      {typeof ach === "object" && ach.description && (
                        <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>{ach.description}</p>
                      )}
                      {typeof ach === "object" && ach.year && (
                        <p style={{ fontSize: "0.85rem", color: "#6b7280" }}>{ach.year}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {editMode && (
                <button
                  onClick={() => {
                    const updated = [...safe(localData.achievements)];
                    updated.push({ title: "", description: "", year: "" });
                    handleFieldChange("achievements", updated);
                  }}
                  style={{ marginTop: "0.5rem", color: "#2563eb" }}
                >
                  + Add Achievement
                </button>
              )}
            </div>

            <hr style={{ margin: "1.5rem 0", borderColor: "#e5e7eb" }} />
          </div>
        </div>
      </div>

      <div className="no-print" style={{ textAlign: "center", padding: "1rem" }}>
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.375rem",
                marginRight: "0.5rem",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#9ca3af",
                color: "#fff",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.375rem",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            style={{
              backgroundColor: "#2563eb",
              color: "#fff",
              padding: "0.5rem 1.25rem",
              borderRadius: "0.375rem",
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Template19;
