import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";

const Template16 = () => {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />

        <div
          style={{
            flexGrow: 1,
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "#ffffff",
              color: "#1f2937",
              maxWidth: "72rem",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "2.5rem",
            }}
          >
            {/* Header Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "2rem",
                borderBottom: "2px solid #3b82f6",
                paddingBottom: "1rem",
              }}
            >
              <div style={{ flex: 1 }}>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={localData.name || ""}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "0.5rem",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                      }}
                    />
                    <input
                      type="text"
                      value={localData.role || ""}
                      onChange={(e) => handleFieldChange("role", e.target.value)}
                      style={{
                        fontSize: "1.25rem",
                        color: "#3b82f6",
                        fontWeight: "600",
                        width: "100%",
                        border: "1px solid #d1d5db",
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {localData.name || "Your Name"}
                    </h1>
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        color: "#3b82f6",
                        fontWeight: "600",
                      }}
                    >
                      {localData.role || "Professional Title"}
                    </h2>
                  </>
                )}
              </div>

           
            </div>

            {/* Summary Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "1rem",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "0.5rem",
                }}
              >
                Professional Summary
              </h3>
              {editMode ? (
                <textarea
                  value={localData.summary || ""}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    resize: "vertical",
                  }}
                  placeholder="Enter your professional summary..."
                />
              ) : (
                <p style={{ fontSize: "0.875rem", lineHeight: "1.6", color: "#374151" }}>
                  {localData.summary || "Experienced professional with a proven track record of delivering results and driving success in dynamic environments."}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "1rem",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "0.5rem",
                }}
              >
                Skills
              </h3>
              {editMode ? (
                <textarea
                  value={localData.skills ? localData.skills.join(", ") : ""}
                  onChange={(e) => handleFieldChange("skills", e.target.value.split(", ").filter(skill => skill.trim()))}
                  style={{
                    width: "100%",
                    minHeight: "60px",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                    resize: "vertical",
                  }}
                  placeholder="Enter skills separated by commas..."
                />
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {localData.skills && localData.skills.length > 0 ? (
                    localData.skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "#ffffff",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#6b7280", fontStyle: "italic" }}>
                      No skills listed
                    </span>
                  )}
                </div>
              )}
            </div>

          {/* Experience Section */}
<div style={{ marginBottom: "2rem" }}>
  <h3
    style={{
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "1rem",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "0.5rem",
    }}
  >
    Professional Experience
  </h3>

  {localData.experience && localData.experience.length > 0 ? (
    localData.experience.map((exp, index) => (
      <div
        key={index}
        style={{
          marginBottom: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "1rem",
          backgroundColor: editMode ? "#f9fafb" : "transparent",
          position: "relative",
        }}
      >
        {editMode && (
          <button
            onClick={() => {
              const newExp = localData.experience.filter((_, i) => i !== index);
              handleFieldChange("experience", newExp);
            }}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            ❌ Remove
          </button>
        )}

        {editMode ? (
          <div>
            <input
              type="text"
              value={exp.title || ""}
              onChange={(e) => {
                const newExp = [...localData.experience];
                newExp[index] = { ...newExp[index], title: e.target.value };
                handleFieldChange("experience", newExp);
              }}
              placeholder="Job Title"
              style={{
                fontSize: "1.125rem",
                fontWeight: "bold",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            />
            <input
              type="text"
              value={exp.company || ""}
              onChange={(e) => {
                const newExp = [...localData.experience];
                newExp[index] = { ...newExp[index], company: e.target.value };
                handleFieldChange("experience", newExp);
              }}
              placeholder="Company"
              style={{
                fontSize: "1rem",
                color: "#3b82f6",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            />
            <input
              type="text"
              value={exp.duration || ""}
              onChange={(e) => {
                const newExp = [...localData.experience];
                newExp[index] = { ...newExp[index], duration: e.target.value };
                handleFieldChange("experience", newExp);
              }}
              placeholder="Duration"
              style={{
                fontSize: "0.875rem",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            />
            <textarea
              value={exp.description || ""}
              onChange={(e) => {
                const newExp = [...localData.experience];
                newExp[index] = { ...newExp[index], description: e.target.value };
                handleFieldChange("experience", newExp);
              }}
              placeholder="Job description..."
              style={{
                width: "100%",
                minHeight: "80px",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
          </div>
        ) : (
          <>
            <h4 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>{exp.title || "Job Title"}</h4>
            <p style={{ color: "#3b82f6", fontWeight: "600" }}>{exp.company || "Company"}</p>
            <p style={{ color: "#6b7280" }}>{exp.duration || "Duration"}</p>
            <p style={{ fontSize: "0.875rem", color: "#374151" }}>
              {exp.description || "Job description"}
            </p>
          </>
        )}
      </div>
    ))
  ) : (
    <p style={{ color: "#6b7280", fontStyle: "italic" }}>No experience listed</p>
  )}

  {editMode && (
    <button
      onClick={() => {
        const newExp = [
          ...(localData.experience || []),
          { title: "", company: "", duration: "", description: "" },
        ];
        handleFieldChange("experience", newExp);
      }}
      style={{
        backgroundColor: "#10b981",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        fontWeight: "500",
      }}
    >
      ➕ Add Experience
    </button>
  )}
</div>

{/* Education Section */}
<div style={{ marginBottom: "2rem" }}>
  <h3
    style={{
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "1rem",
      borderBottom: "1px solid #e5e7eb",
      paddingBottom: "0.5rem",
    }}
  >
    Education
  </h3>

  {localData.education && localData.education.length > 0 ? (
    localData.education.map((edu, index) => (
      <div
        key={index}
        style={{
          marginBottom: "1.5rem",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          padding: "1rem",
          backgroundColor: editMode ? "#f9fafb" : "transparent",
          position: "relative",
        }}
      >
        {editMode && (
          <button
            onClick={() => {
              const newEdu = localData.education.filter((_, i) => i !== index);
              handleFieldChange("education", newEdu);
            }}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
              fontSize: "0.75rem",
            }}
          >
            ❌ Remove
          </button>
        )}

        {editMode ? (
          <div>
            <input
              type="text"
              value={edu.degree || ""}
              onChange={(e) => {
                const newEdu = [...localData.education];
                newEdu[index] = { ...newEdu[index], degree: e.target.value };
                handleFieldChange("education", newEdu);
              }}
              placeholder="Degree"
              style={{
                fontSize: "1rem",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            />
            <input
              type="text"
              value={edu.institution || ""}
              onChange={(e) => {
                const newEdu = [...localData.education];
                newEdu[index] = { ...newEdu[index], institution: e.target.value };
                handleFieldChange("education", newEdu);
              }}
              placeholder="Institution"
              style={{
                fontSize: "0.875rem",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                marginBottom: "0.5rem",
              }}
            />
            <input
              type="text"
              value={edu.year || ""}
              onChange={(e) => {
                const newEdu = [...localData.education];
                newEdu[index] = { ...newEdu[index], year: e.target.value };
                handleFieldChange("education", newEdu);
              }}
              placeholder="Year"
              style={{
                fontSize: "0.875rem",
                width: "100%",
                border: "1px solid #d1d5db",
                padding: "0.5rem",
                borderRadius: "0.375rem",
              }}
            />
          </div>
        ) : (
          <>
            <h4 style={{ fontSize: "1rem", fontWeight: "bold" }}>{edu.degree || "Degree"}</h4>
            <p style={{ color: "#3b82f6", fontWeight: "600" }}>
              {edu.institution || "Institution"}
            </p>
            <p style={{ color: "#6b7280" }}>{edu.year || "Year"}</p>
          </>
        )}
      </div>
    ))
  ) : (
    <p style={{ color: "#6b7280", fontStyle: "italic" }}>No education listed</p>
  )}

  {editMode && (
    <button
      onClick={() => {
        const newEdu = [
          ...(localData.education || []),
          { degree: "", institution: "", year: "" },
        ];
        handleFieldChange("education", newEdu);
      }}
      style={{
        backgroundColor: "#10b981",
        color: "#fff",
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "none",
        cursor: "pointer",
        fontWeight: "500",
      }}
    >
      ➕ Add Education
    </button>
  )}
</div>


            {/* Edit Mode Controls */}
            {editMode && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                  marginTop: "2rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: "#6b7280",
                    color: "#ffffff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Edit Button */}
            {!editMode && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "2rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #e5e7eb",
                  marginRight: "2rem",
                }}
              >
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.2)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#2563eb";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#3b82f6";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  ✏️ Edit Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template16;
  