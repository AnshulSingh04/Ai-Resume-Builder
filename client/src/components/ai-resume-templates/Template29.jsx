import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useResume } from "../../context/ResumeContext";
import { useAuth } from "../../context/AuthContext";
import resumeService from "../../services/resumeService";
import LoginPrompt from "../auth/LoginPrompt";

const Template29 = () => {
  const resumeContext = useResume();
  const { isAuthenticated } = useAuth();
  const resumeData = resumeContext?.resumeData || {
    name: "John Doe",
    role: "Full Stack Developer",
    summary: "Passionate full-stack developer with 3+ years of experience...",
    experience: [
      {
        title: "Software Developer",
        company: "ABC Pvt Ltd",
        duration: "2020 - Present",
        description: "Built scalable MERN applications used by 10k+ users. Improved API performance by 40%.",
      },
    ],
    skills: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    projects: [
      {
        name: "StudySync",
        technologies: "React, Express, MongoDB",
        description: "An online platform where students can upload, download, and interact with study notes.",
      },
    ],
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

  const handleInputChange = (field, value) => {
    const updatedData = { ...localData, [field]: value };
    setLocalData(updatedData);
    localStorage.setItem("resumeData", JSON.stringify(updatedData));
  };

  const handleObjectChange = (section, index, field, value) => {
    const updatedSection = [...(localData[section] || [])];
    updatedSection[index] = { ...updatedSection[index], [field]: value };
    const updatedData = { ...localData, [section]: updatedSection };
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
        const structuredData = { templateId: 26, personalInfo: { name: localData.name, role: localData.role }, summary: localData.summary, experience: localData.experience, skills: localData.skills, projects: localData.projects };
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
    setLocalData({ ...localData, font });
  };
  const handleColorChange = (color) => {
    setLocalData({ ...localData, textColor: color });
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
        {/* Combined Main Content with Flex Layout */}
        <div style={{ flex: 3, padding: "0 2rem" }}>
          <div
            ref={resumeRef}
            style={{ backgroundColor: "#ffffff", width: "100%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "2rem", fontFamily: localData.font || "Arial, sans-serif", display: "flex", gap: "2rem" }}
          >
            {/* Left Section (Summary, Experience, Projects) */}
            <div style={{ flex: 2 }}>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "2px solid #000080" }}>
                {!editMode && (<><h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#000080" }}>{localData.name}</h1><p style={{ fontSize: "1.5rem", color: "#6b7280", marginBottom: "1rem" }}>{localData.role}</p></>)}
                {editMode && (<><input type="text" value={localData.name} onChange={(e) => handleInputChange("name", e.target.value)} style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#000080", border: "none", background: "transparent", textAlign: "center", outline: "none", width: "100%" }} placeholder="Your Name" /><input type="text" value={localData.role} onChange={(e) => handleInputChange("role", e.target.value)} style={{ fontSize: "1.5rem", color: "#6b7280", border: "none", background: "transparent", textAlign: "center", outline: "none", width: "100%" }} placeholder="Your Professional Role" /></>)}
              </div>

              {/* Professional Summary */}
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000080", marginBottom: "0.5rem" }}>Professional Summary</h2>
                {!editMode && <p style={{ fontSize: "1rem", lineHeight: "1.6", textAlign: "justify", margin: "0" }}>{localData.summary}</p>}
                {editMode && <textarea value={localData.summary} onChange={(e) => handleInputChange("summary", e.target.value)} style={{ width: "100%", minHeight: "4rem", fontSize: "1rem", lineHeight: "1.6", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", resize: "vertical", outline: "none", backgroundColor: "white" }} placeholder="Write your professional summary here..." />}
              </div>

              {/* Experience */}
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000080", marginBottom: "0.5rem" }}>Experience</h2>
                {localData.experience?.map((exp, idx) => (
                  <div key={idx} style={{ padding: "1rem", backgroundColor: "#f8fafc", borderLeft: "3px solid #000080", marginBottom: "1rem" }}>
                    {!editMode && (<><h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.25rem" }}>{exp.title}</h3><p style={{ fontSize: "1rem", color: "#000080", fontWeight: "500", marginBottom: "0.25rem" }}>{exp.company}</p><p style={{ fontSize: "0.9rem", color: "#6b7280", marginBottom: "0.25rem" }}>{exp.duration}</p><p style={{ fontSize: "0.9rem", lineHeight: "1.5", textAlign: "justify", margin: "0" }}>{exp.description}</p></>)}
                    {editMode && (<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}><input type="text" value={exp.title} onChange={(e) => handleObjectChange("experience", idx, "title", e.target.value)} style={{ fontSize: "1.2rem", fontWeight: "600", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", outline: "none" }} placeholder="Job Title" /><input type="text" value={exp.company} onChange={(e) => handleObjectChange("experience", idx, "company", e.target.value)} style={{ fontSize: "1rem", color: "#000080", fontWeight: "500", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", outline: "none" }} placeholder="Company" /><input type="text" value={exp.duration} onChange={(e) => handleObjectChange("experience", idx, "duration", e.target.value)} style={{ fontSize: "0.9rem", color: "#6b7280", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", outline: "none" }} placeholder="Duration" /><textarea value={exp.description} onChange={(e) => handleObjectChange("experience", idx, "description", e.target.value)} style={{ fontSize: "0.9rem", lineHeight: "1.5", minHeight: "3rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", resize: "vertical", outline: "none" }} placeholder="Job description" /><button onClick={() => removeItem("experience", idx)} style={{ color: "#ef4444", fontWeight: "bold", fontSize: "0.9rem", cursor: "pointer", border: "none", background: "none", alignSelf: "flex-start" }}>Remove</button></div>)}
                  </div>
                ))}
                {editMode && <button onClick={() => addItem("experience", { title: "Job Title", company: "Company Name", duration: "Duration", description: "Job description" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", border: "none", background: "none", alignSelf: "flex-start", padding: "0.5rem" }}>+ Add Experience</button>}
              </div>

              {/* Projects */}
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000080", marginBottom: "0.5rem" }}>Projects</h2>
                {localData.projects?.map((project, idx) => (
                  <div key={idx} style={{ padding: "1rem", backgroundColor: "#f8fafc", borderLeft: "3px solid #000080", marginBottom: "1rem" }}>
                    {!editMode && (<><h3 style={{ fontSize: "1.2rem", fontWeight: "600", marginBottom: "0.25rem" }}>{project.name}</h3><p style={{ fontSize: "0.9rem", lineHeight: "1.5", textAlign: "justify", margin: "0" }}>{project.description}</p><div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>{project.technologies.split(", ").map((tech, i) => (<span key={i} style={{ backgroundColor: "#e0f7fa", color: "#000080", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.9rem", fontWeight: "500" }}>{tech}</span>))}</div></>)}
                    {editMode && (<div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}><input type="text" value={project.name} onChange={(e) => handleObjectChange("projects", idx, "name", e.target.value)} style={{ fontSize: "1.2rem", fontWeight: "600", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", outline: "none" }} placeholder="Project Name" /><textarea value={project.description} onChange={(e) => handleObjectChange("projects", idx, "description", e.target.value)} style={{ fontSize: "0.9rem", lineHeight: "1.5", minHeight: "3rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", resize: "vertical", outline: "none" }} placeholder="Project description" /><input type="text" value={project.technologies} onChange={(e) => handleObjectChange("projects", idx, "technologies", e.target.value)} style={{ fontSize: "0.9rem", color: "#000080", fontWeight: "500", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.5rem", outline: "none" }} placeholder="Technologies (e.g., React, Express, MongoDB)" /><button onClick={() => removeItem("projects", idx)} style={{ color: "#ef4444", fontWeight: "bold", fontSize: "0.9rem", cursor: "pointer", border: "none", background: "none", alignSelf: "flex-start" }}>Remove</button></div>)}
                  </div>
                ))}
                {editMode && <button onClick={() => addItem("projects", { name: "Project Name", technologies: "Technologies", description: "Project description" })} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", border: "none", background: "none", alignSelf: "flex-start", padding: "0.5rem" }}>+ Add Project</button>}
              </div>
            </div>

            {/* Right Section (Skills) */}
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000080", marginBottom: "0.5rem" }}>Skills</h2>
                {!editMode && localData.skills?.map((skill, idx) => (
                  <p key={idx} style={{ fontSize: "1rem", color: "#000080", marginBottom: "0.5rem" }}>{skill}</p>
                ))}
                {editMode && localData.skills?.map((skill, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input type="text" value={skill} onChange={(e) => { const updatedSkills = [...localData.skills]; updatedSkills[idx] = e.target.value; setLocalData({ ...localData, skills: updatedSkills }); }} style={{ fontSize: "1rem", color: "#000080", border: "1px solid #d1d5db", borderRadius: "0.25rem", padding: "0.25rem", outline: "none", flex: 1 }} />
                    <button onClick={() => removeItem("skills", idx)} style={{ color: "#ef4444", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", border: "none", background: "none" }}>×</button>
                  </div>
                ))}
                {editMode && <button onClick={() => addItem("skills", "New Skill")} style={{ color: "#2563eb", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", border: "none", background: "none", alignSelf: "flex-start", padding: "0.5rem" }}>+ Add Skill</button>}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", alignItems: "center" }}>
            {editMode ? (<><button onClick={typeof updateResumeData === "function" ? handleSave : handleSaveLocal} disabled={saveStatus === "Saving..."} style={{ backgroundColor: saveStatus === "Saving..." ? "#9ca3af" : "#10b981", color: "white", padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: saveStatus === "Saving..." ? "not-allowed" : "pointer" }}>{saveStatus === "Saving..." ? "Saving..." : "Save Changes"}</button><button onClick={handleCancel} disabled={saveStatus === "Saving..."} style={{ backgroundColor: "#6b7280", color: "white", padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: saveStatus === "Saving..." ? "not-allowed" : "pointer" }}>Cancel</button>{saveStatus && <span style={{ fontSize: "0.875rem", color: saveStatus.includes("Error") ? "#ef4444" : "#10b981", fontWeight: "500" }}>{saveStatus}</span>}</>) : <button onClick={() => setEditMode(true)} style={{ backgroundColor: "#2563eb", color: "white", padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>Edit Resume</button>}
          </div>
        </div>
      </div>
      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default Template29;