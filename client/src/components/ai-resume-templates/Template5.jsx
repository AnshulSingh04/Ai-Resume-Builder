import React, { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useResume } from "../../context/ResumeContext";

const Template5 = () => {
  const resumeRef = useRef();
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);
  const emptyTemplate = {
    name: "",
    role: "",
    phone: "",
    email: "",
    linkedin: "",
    location: "",
    summary: "",
    experience: [
      {
        companyName: "",
        title: "",
        date: "",
        companyLocation: "",
        description: "",
        accomplishment: [""],
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        duration: "",
        grade: "",
      },
    ],
    achievements: [""],
    skills: [""],
    courses: [
      {
        title: "",
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        description: "",
        technologies: [],
        duration: "",
        link: "",
        github: "",
      },
    ],
  };
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [sectionsOrder, setSectionsOrder] = useState([
    "summary",
    "experience",
    "education",
    "achievements",
    "skills",
    "courses",
    "projects",
  ]);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const summaryRef = useRef(null);

  // UI State (keeping original functionality)
  const [loading, setLoading] = useState(false);
  const [showEnhancementOptions, setShowEnhancementOptions] = useState(false);
  // Tie button visibility to edit mode so controls only show while editing
  const showButtons = editMode;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sectionSettings, setSectionSettings] = useState({
    header: {
      showTitle: true,
      showPhone: true,
      showEmail: true,
      showLink: true,
      showLocation: true,
      uppercaseName: false,
    },
    summary: { showSummary: true },
    experience: { showExperience: true },
    education: { showEducation: true },
    achievements: { showAchievements: true },
    skills: { showSkills: true },
    courses: { showCourses: true },
    projects: { showProjects: true },
  });

  // Local display defaults used only for Template5 visual output when resumeData
  // doesn't contain a meaningful value. This keeps the context untouched while
  // ensuring Template5 looks friendly for users with empty saved data.
  const displayDefaults = {
    name: "Your Name",
    role: "Your Title (e.g. Software Engineer)",
    phone: "123-456-7890",
    email: "email@example.com",
    linkedin: "https://linkedin.com/in/your-profile",
    location: "City, Country",
    summary: "Write a short professional summary that highlights your experience and goals.",
    experience: [
      {
        companyName: "Company Name",
        title: "Job Title",
        date: "MM/YYYY - MM/YYYY",
        companyLocation: "City, Country",
        description: "Describe your responsibilities and achievements.",
        accomplishment: ["Highlight a key accomplishment."]
      }
    ],
    education: [
      {
        institution: "Institution Name",
        degree: "Degree (e.g. BSc Computer Science)",
        duration: "YYYY - YYYY",
        grade: "GPA or Grade"
      }
    ],
    achievements: ["List a notable achievement (e.g. Top 5% in coding competition)"],
    skills: ["Skill 1", "Skill 2"],
    courses: [
      {
        title: "Course Title",
        description: "Short course description"
      }
    ],
    projects: [
      {
        name: "Project Title",
        description: "Brief description of the project and your role",
        technologies: ["Tech1", "Tech2"],
        duration: "MM/YYYY - MM/YYYY",
        link: "",
        github: ""
      }
    ]
  };

  const viewData = editMode ? localData : { ...displayDefaults, ...resumeData };

  const handleEnhance = (section) => {
    // This will be handled by the Sidebar component
  };

  const handleSave = () => {
    const newErrors = {};
    if (!localData.name || !localData.name.toString().trim()) {
      newErrors.name = "Name cannot be empty";
    }
    if (!localData.summary || !localData.summary.toString().trim()) {
      newErrors.summary = "Summary cannot be empty";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // focus first invalid field
      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.summary) {
        summaryRef.current?.focus();
      }
      return;
    }
    setResumeData(localData);
    setErrors({});
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setErrors({});
    setEditMode(false);
  };

  const handleRemoveSection = (section, index) => {
    if (index !== undefined) {
      setLocalData((prevData) => {
        const updatedSection = [...prevData[section]];
        updatedSection.splice(index, 1);
        return { ...prevData, [section]: updatedSection };
      });
    } else {
      setSectionSettings((prevSettings) => ({
        ...prevSettings,
        [section]: {
          ...prevSettings[section],
          [`show${section.charAt(0).toUpperCase() + section.slice(1)}`]: false,
        },
      }));
    }
  };

  const handleInputChange = (section, field, value, index) => {
    let updatedData;
    if (section && index !== undefined) {
      const updatedSection = [...localData[section]];
      updatedSection[index][field] = value;
      updatedData = { ...localData, [section]: updatedSection };
    } else if (section) {
      updatedData = { ...localData, [section]: value };
    } else {
      updatedData = { ...localData, [field]: value };
    }
    setLocalData(updatedData);
  };

  const handleAddSection = (section, itemToDuplicate) => {
    let newItem = itemToDuplicate
      ? JSON.parse(JSON.stringify(itemToDuplicate))
      : {
          experience: {
            title: "New Title",
            companyName: "New Company",
            date: "MM/YYYY - MM/YYYY",
            companyLocation: "City, Country",
            description: "Describe your responsibilities and achievements.",
            accomplishment: ["Highlight a key accomplishment."],
          },
          education: {
            degree: "Degree Name",
            institution: "Institution Name",
            duration: "YYYY - YYYY",
            location: "City, Country",
          },
          achievements: "New Achievement",
          courses: {
            title: "Course Title",
            description: "Course description.",
          },
          skills: "New Skill",
          projects: {
            name: "Project Title",
            description: "Project description.",
            technologies: ["Tech1", "Tech2"],
            link: "https://project.com",
            github: "https://github.com/user/project",
          },
        }[section] || {};

    setLocalData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  const handleSectionHover = (section) => setHoveredSection(section);
  const handleSectionLeave = () => setHoveredSection(null);
  const handleSectionClick = (section) =>
    setActiveSection(section === activeSection ? null : section);
  const handleSettingChange = (section, key) => {
    setSectionSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] },
    }));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fef3c7" }}>
      <Navbar />

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "0.5rem",
              boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "4rem",
                height: "4rem",
                border: "2px solid #e5e7eb",
                borderTop: "2px solid #8b5cf6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "1rem",
              }}
            ></div>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              Loading...
            </p>
          </div>
        </div>
      )}

      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />

        {/* Mobile Menu Button */}
        <button
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 50,
            color: "white",
            background: "linear-gradient(to right, #fbbf24, #ec4899)",
            padding: "0.5rem",
            borderRadius: "50%",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            display: sidebarOpen ? "none" : "block",
          }}
          className="md:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        {/* Resume Content */}
        <div
          style={{
            flexGrow: 1,
            padding: "1rem",
            marginLeft: "10rem",
            marginRight: "8rem",
            marginTop: "4rem",
          }}
          className="md:ml-72 mt-16 md:mt-0"
        >
          <div
            ref={resumeRef}
            style={{
              maxWidth: "100%",
              width: "95%",
              margin: "1.25rem auto",
              padding: "1.5rem",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
            className="max-w-full mx-auto my-5 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-xl"
          >
            {/* Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                padding: "1rem",
              }}
            >
              {editMode ? (
                <input
                  type="text"
                  value={localData.name || ""}
                  onChange={(e) => handleInputChange(null, "name", e.target.value)}
                  placeholder="Enter your name"
                  ref={nameRef}
                  style={{
                    fontWeight: "bold",
                    wordBreak: "break-words",
                    textTransform: sectionSettings.header.uppercaseName ? "uppercase" : "none",
                    fontSize: "2rem",
                    width: "100%",
                    border: "1px solid #e5e7eb",
                    borderRadius: "4px",
                    padding: "6px",
                    outline: "none",
                  }}
                  className={`font-bold break-words ${sectionSettings.header.uppercaseName ? "uppercase" : ""} text-2xl sm:text-3xl md:text-4xl`}
                />
              ) : (
                <h1
                  style={{
                    fontWeight: "bold",
                    wordBreak: "break-words",
                    textTransform: sectionSettings.header.uppercaseName ? "uppercase" : "none",
                    fontSize: "2rem",
                  }}
                  className={`font-bold break-words ${sectionSettings.header.uppercaseName ? "uppercase" : ""} text-2xl sm:text-3xl md:text-4xl`}
                  onClick={() => handleSectionClick("header")}
                  onMouseEnter={() => handleSectionHover("header")}
                  onMouseLeave={handleSectionLeave}
                >
                  {viewData.name}
                </h1>
              )}
              {sectionSettings.header.showTitle && (
                editMode ? (
                  <input
                    type="text"
                    value={localData.role || ""}
                    onChange={(e) => handleInputChange(null, "role", e.target.value)}
                    placeholder="Enter your current title (e.g. Software Engineer)"
                    style={{
                      fontSize: "1.125rem",
                      color: "#6b7280",
                      marginTop: "0.5rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: "4px",
                      padding: "6px",
                      width: "100%",
                      outline: "none",
                    }}
                    className="text-sm sm:text-base md:text-lg text-gray-600 mt-2"
                  />
                ) : (
                  <p
                    style={{
                      fontSize: "1.125rem",
                      color: "#6b7280",
                      marginTop: "0.5rem",
                    }}
                    className="text-sm sm:text-base md:text-lg text-gray-600 mt-2"
                  >
                    {viewData.role}
                  </p>
                )
              )}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "0.5rem",
                  fontSize: "1rem",
                  color: "#374151",
                }}
                className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm md:text-base text-gray-700"
              >
                {sectionSettings.header.showPhone && (
                  <span>
                    {editMode ? (
                      <input
                        type="tel"
                        value={localData.phone || ""}
                        onChange={(e) => handleInputChange(null, "phone", e.target.value)}
                        style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "4px" }}
                        placeholder="Enter phone number"
                      />
               ) : (
               viewData.phone
                    )}
                  </span>
                )}
                {sectionSettings.header.showEmail && (
                  <span>
                    {editMode ? (
                      <input
                        type="email"
                        value={localData.email || ""}
                        onChange={(e) => handleInputChange(null, "email", e.target.value)}
                        style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "4px" }}
                        placeholder="email@example.com"
                      />
                    ) : (
                      viewData.email
                    )}
                  </span>
                )}
                {sectionSettings.header.showLink && (
                  <span>
                    {editMode ? (
                      <input
                        type="text"
                        value={localData.linkedin || ""}
                        onChange={(e) => handleInputChange(null, "linkedin", e.target.value)}
                        style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "4px" }}
                        placeholder="LinkedIn URL"
                      />
                    ) : (
                      viewData.linkedin
                    )}
                  </span>
                )}
                {sectionSettings.header.showLocation && (
                  <span>
                    {editMode ? (
                      <input
                        type="text"
                        value={localData.location || ""}
                        onChange={(e) => handleInputChange(null, "location", e.target.value)}
                        style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "4px" }}
                        placeholder="Location"
                      />
                    ) : (
                      viewData.location
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Sections */}
            {sectionsOrder.map((section) => (
              <div
                key={section}
                style={{ position: "relative", marginBottom: "1.5rem" }}
              >
                {section === "summary" &&
                  sectionSettings.summary.showSummary && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("summary")}
                        onMouseEnter={() => handleSectionHover("summary")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Summary
                      </h2>
                      {editMode ? (
                        <textarea
                          value={localData.summary || ""}
                          onChange={(e) => handleInputChange(null, "summary", e.target.value)}
                          placeholder="Enter a short professional summary..."
                          ref={summaryRef}
                          style={{
                            width: "100%",
                            minHeight: "4rem",
                            fontSize: "0.875rem",
                            lineHeight: "1.5",
                            border: "1px solid #e5e7eb",
                            borderRadius: "4px",
                            padding: "8px",
                            resize: "vertical",
                            outline: "none",
                          }}
                        />
                      ) : (
                        <p
                          style={{
                            fontSize: "1rem",
                            color: viewData.summary ? "#374151" : "#9CA3AF",
                          }}
                          className="text-xs sm:text-sm md:text-base text-gray-700"
                        >
                          {viewData.summary ? viewData.summary : "No summary provided. Click Edit to add one."}
                        </p>
                      )}
                      {errors.summary && (
                        <div style={{ color: "#ef4444", marginTop: "6px", fontSize: "0.875rem" }}>{errors.summary}</div>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("summary")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}

                {section === "experience" &&
                  sectionSettings.experience.showExperience && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("experience")}
                        onMouseEnter={() => handleSectionHover("experience")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Experience
                      </h2>
                      {((editMode ? localData : viewData).experience || []).map(
                        (exp, idx) => (
                          <div key={idx} style={{ marginBottom: "1rem" }}>
                            {editMode ? (
                              <input
                                type="text"
                                value={localData.experience?.[idx]?.companyName || ""}
                                onChange={(e) =>
                                  handleInputChange("experience", "companyName", e.target.value, idx)
                                }
                                placeholder="Company name"
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                }}
                                className="text-base sm:text-lg font-semibold"
                              />
                            ) : (
                              <h3
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                }}
                                className="text-base sm:text-lg font-semibold"
                              >
                                {exp.companyName}
                              </h3>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.experience?.[idx]?.title || ""}
                                onChange={(e) =>
                                  handleInputChange("experience", "title", e.target.value, idx)
                                }
                                placeholder="Job title (e.g. Frontend Developer)"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {exp.title}
                              </p>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.experience?.[idx]?.date || ""}
                                onChange={(e) =>
                                  handleInputChange("experience", "date", e.target.value, idx)
                                }
                                placeholder="MM/YYYY - MM/YYYY"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {exp.date}
                              </p>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.experience?.[idx]?.companyLocation || ""}
                                onChange={(e) =>
                                  handleInputChange("experience", "companyLocation", e.target.value, idx)
                                }
                                placeholder="City, Country"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {exp.companyLocation}
                              </p>
                            )}

                            {editMode ? (
                              <textarea
                                value={localData.experience?.[idx]?.description || ""}
                                onChange={(e) =>
                                  handleInputChange("experience", "description", e.target.value, idx)
                                }
                                placeholder="Describe your responsibilities and achievements"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#374151",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                  resize: "vertical",
                                }}
                                className="text-xs sm:text-sm text-gray-700"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#374151",
                                }}
                                className="text-xs sm:text-sm text-gray-700"
                              >
                                {exp.description}
                              </p>
                            )}

                            {/* Accomplishment details removed by user request */}

                            {showButtons && (
                              <button
                                onClick={() => handleRemoveSection("experience", idx)}
                                style={{
                                  fontSize: "0.875rem",
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  padding: "0.35rem 0.6rem",
                                  borderRadius: "0.375rem",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                className="text-xs sm:text-sm transition-colors duration-300"
                              >
                                Remove Experience
                              </button>
                            )}
                          </div>
                        )
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection("experience")}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="text-xs sm:text-sm transition-colors duration-300"
                        >
                          Add Experience
                        </button>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("experience")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                          aria-label="Remove Experience Section"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}

                {section === "education" &&
                  sectionSettings.education.showEducation && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("education")}
                        onMouseEnter={() => handleSectionHover("education")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Education
                      </h2>
                      {((editMode ? localData : viewData).education || []).map(
                        (edu, idx) => (
                          <div key={idx} style={{ marginBottom: "1rem" }}>
                            {editMode ? (
                                <input
                                  type="text"
                                  value={localData.education?.[idx]?.institution || ""}
                                  onChange={(e) =>
                                  handleInputChange("education", "institution", e.target.value, idx)
                                }
                                placeholder="Institution name"
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                }}
                                className="text-base sm:text-lg font-semibold"
                              />
                            ) : (
                              <h3
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                }}
                                className="text-base sm:text-lg font-semibold"
                              >
                                {edu.institution}
                              </h3>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.education?.[idx]?.degree || ""}
                                onChange={(e) =>
                                  handleInputChange("education", "degree", e.target.value, idx)
                                }
                                placeholder="Degree (e.g. BSc Computer Science)"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {edu.degree}
                              </p>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.education?.[idx]?.duration || ""}
                                onChange={(e) =>
                                  handleInputChange("education", "duration", e.target.value, idx)
                                }
                                placeholder="YYYY - YYYY"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {edu.duration}
                              </p>
                            )}

                            {editMode ? (
                              <input
                                type="text"
                                value={localData.education?.[idx]?.grade || ""}
                                onChange={(e) =>
                                  handleInputChange("education", "grade", e.target.value, idx)
                                }
                                placeholder="GPA or Grade (optional)"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                  marginTop: "6px",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              />
                            ) : (
                              <p
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#6b7280",
                                }}
                                className="text-xs sm:text-sm text-gray-600"
                              >
                                {edu.grade}
                              </p>
                            )}

                            {showButtons && (
                              <button
                                onClick={() => handleRemoveSection("education", idx)}
                                style={{
                                  fontSize: "0.875rem",
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  padding: "0.35rem 0.6rem",
                                  borderRadius: "0.375rem",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                className="text-xs sm:text-sm transition-colors duration-300"
                              >
                                Remove Education
                              </button>
                            )}
                          </div>
                        )
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection("education")}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="text-xs sm:text-sm transition-colors duration-300"
                        >
                          Add Education
                        </button>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("education")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                          aria-label="Remove Education Section"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}

                {section === "achievements" &&
                  sectionSettings.achievements.showAchievements && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("achievements")}
                        onMouseEnter={() => handleSectionHover("achievements")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Key Achievements
                      </h2>
                      {((editMode ? localData : viewData).achievements || []).map(
                        (achievement, idx) => (
                          <div key={idx} style={{ marginBottom: "1rem" }}>
                            {typeof achievement === "object" ? (
                              <>
                                {editMode ? (
                                  <input
                                type="text"
                                value={localData.achievements?.[idx]?.keyAchievements || ""}
                                onChange={(e) =>
                                  handleInputChange("achievements", "keyAchievements", e.target.value, idx)
                                }
                                placeholder="Achievement title (e.g. Employee of the Month)"
                                style={{
                                  fontSize: "1.125rem",
                                  fontWeight: "600",
                                  width: "100%",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                }}
                                className="text-base sm:text-lg font-semibold"
                              />
                                ) : (
                                  <h3
                                    style={{
                                      fontSize: "1.125rem",
                                      fontWeight: "600",
                                    }}
                                    className="text-base sm:text-lg font-semibold"
                                  >
                                    {achievement.keyAchievements}
                                  </h3>
                                )}

                                {editMode ? (
                                  <textarea
                                      value={localData.achievements?.[idx]?.describe || ""}
                                      onChange={(e) =>
                                        handleInputChange("achievements", "describe", e.target.value, idx)
                                      }
                                      placeholder="Describe the achievement and impact (e.g. reduced costs by 15%)"
                                      style={{
                                        fontSize: "0.875rem",
                                        color: "#374151",
                                        width: "100%",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "4px",
                                        padding: "6px",
                                        outline: "none",
                                        marginTop: "6px",
                                        resize: "vertical",
                                      }}
                                      className="text-xs sm:text-sm text-gray-700"
                                    />
                                ) : (
                                  <p
                                    style={{
                                      fontSize: "0.875rem",
                                      color: "#374151",
                                    }}
                                    className="text-xs sm:text-sm text-gray-700"
                                  >
                                    {achievement.describe}
                                  </p>
                                )}
                              </>
                            ) : (
                              editMode ? (
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                <input
                                  type="text"
                                  value={localData.achievements?.[idx] || ""}
                                  onChange={(e) => {
                                    const updated = [...(localData.achievements || [])];
                                    updated[idx] = e.target.value;
                                    handleInputChange(null, "achievements", updated);
                                  }}
                                  placeholder="Describe an achievement (e.g. Increased sales by 20%)"
                                  style={{
                                    fontSize: "0.875rem",
                                    color: "#374151",
                                    flexGrow: 1,
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "4px",
                                    padding: "6px",
                                    outline: "none",
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    const updated = [...(localData.achievements || [])];
                                    updated.splice(idx, 1);
                                    handleInputChange(null, "achievements", updated);
                                  }}
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "#ef4444",
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  X
                                </button>
                              </div>
                              ) : (
                                <p
                                  style={{
                                    fontSize: "0.875rem",
                                    color: "#374151",
                                  }}
                                  className="text-xs sm:text-sm text-gray-700"
                                >
                                  {achievement}
                                </p>
                              )
                            )}

                            {showButtons && (
                              <button
                                onClick={() => handleRemoveSection("achievements", idx)}
                                style={{
                                  fontSize: "0.875rem",
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  padding: "0.35rem 0.6rem",
                                  borderRadius: "0.375rem",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                className="text-xs sm:text-sm transition-colors duration-300"
                              >
                                Remove Achievement
                              </button>
                            )}
                          </div>
                        )
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection("achievements")}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="text-xs sm:text-sm transition-colors duration-300"
                        >
                          Add Achievement
                        </button>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("achievements")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                          aria-label="Remove Achievements Section"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}

                {section === "skills" && sectionSettings.skills.showSkills && (
                  <div>
                    <h2
                      onClick={() => handleSectionClick("skills")}
                      onMouseEnter={() => handleSectionHover("skills")}
                      onMouseLeave={handleSectionLeave}
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        borderBottom: "2px solid #d1d5db",
                        paddingBottom: "0.25rem",
                        marginBottom: "0.5rem",
                      }}
                      className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                    >
                      Skills
                    </h2>
                    <ul
                      style={{
                        listStyle: "disc",
                        paddingLeft: "1.25rem",
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "0.5rem",
                      }}
                      className="list-disc pl-5 grid grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                      {((editMode ? localData : viewData).skills || []).map((skill, idx) => (
                        <li key={`${skill}-${idx}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="flex items-center justify-between">
                          {editMode ? (
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", width: "100%" }}>
                              <input
                                type="text"
                                value={localData.skills?.[idx] || ""}
                                onChange={(e) => {
                                  const updated = [...(localData.skills || [])];
                                  updated[idx] = e.target.value;
                                  handleInputChange(null, "skills", updated);
                                }}
                                placeholder="Skill (e.g. React, Node.js)"
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#374151",
                                  flexGrow: 1,
                                  border: "1px solid #e5e7eb",
                                  borderRadius: "4px",
                                  padding: "6px",
                                  outline: "none",
                                }}
                                className="text-xs sm:text-sm text-gray-700 flex-1"
                              />
                              <button
                                onClick={() => {
                                  handleRemoveSection("skills", idx);
                                }}
                                style={{
                                  fontSize: "0.875rem",
                                  backgroundColor: "#ef4444",
                                  color: "white",
                                  padding: "0.35rem 0.6rem",
                                  borderRadius: "0.375rem",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                                className="text-xs sm:text-sm transition-colors duration-300"
                              >
                                Remove Skill
                              </button>
                            </div>
                          ) : (
                            <>
                              <span style={{ fontSize: "0.875rem", color: "#374151", flexGrow: 1 }} className="text-xs sm:text-sm text-gray-700 flex-1">{skill}</span>
                              {showButtons && (
                                <button
                                  onClick={() => handleRemoveSection("skills", idx)}
                                  style={{
                                    fontSize: "0.875rem",
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    padding: "0.35rem 0.6rem",
                                    borderRadius: "0.375rem",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                  className="text-xs sm:text-sm transition-colors duration-300"
                                >
                                  Remove Skill
                                </button>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                    {showButtons && (
                      <button
                        onClick={() => handleAddSection("skills")}
                        style={{
                          fontSize: "0.875rem",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          padding: "0.35rem 0.6rem",
                          borderRadius: "0.375rem",
                          border: "none",
                          cursor: "pointer",
                          marginTop: "0.5rem",
                        }}
                        className="text-xs sm:text-sm transition-colors duration-300 mt-2"
                      >
                        Add Skill
                      </button>
                    )}
                    {showButtons && (
                      <button
                        onClick={() => handleRemoveSection("skills")}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          fontSize: "0.75rem",
                          color: "#ef4444",
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                        }}
                        className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                        aria-label="Remove Skills Section"
                      >
                        X
                      </button>
                    )}
                  </div>
                )}

                {section === "courses" &&
                  sectionSettings.courses.showCourses && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("courses")}
                        onMouseEnter={() => handleSectionHover("courses")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Courses
                      </h2>
                      {((editMode ? localData : viewData).courses || []).map((course, idx) => (
                        <div key={idx} style={{ marginBottom: "1rem" }}>
                          {editMode ? (
                            <input
                              type="text"
                              value={localData.courses?.[idx]?.title || ""}
                              onChange={(e) => handleInputChange("courses", "title", e.target.value, idx)}
                              placeholder="Course title (e.g. Algorithms & Data Structures)"
                              style={{
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                              }}
                              className="text-base sm:text-lg font-semibold"
                            />
                          ) : (
                            <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }} className="text-base sm:text-lg font-semibold">{course.title}</h3>
                          )}

                          {editMode ? (
                            <textarea
                              value={localData.courses?.[idx]?.description || ""}
                              onChange={(e) => handleInputChange("courses", "description", e.target.value, idx)}
                              placeholder="Brief description of the course and what you learned"
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                                marginTop: "6px",
                                resize: "vertical",
                              }}
                              className="text-xs sm:text-sm text-gray-700"
                            />
                          ) : (
                            <p style={{ fontSize: "0.875rem", color: "#374151" }} className="text-xs sm:text-sm text-gray-700">{course.description}</p>
                          )}

                          {showButtons && (
                            <button onClick={() => handleRemoveSection("courses", idx)} style={{ fontSize: "0.875rem", backgroundColor: "#ef4444", color: "white", padding: "0.35rem 0.6rem", borderRadius: "0.375rem", border: "none", cursor: "pointer" }} className="text-xs sm:text-sm transition-colors duration-300">Remove Course</button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection("courses")}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="text-xs sm:text-sm transition-colors duration-300"
                        >
                          Add Course
                        </button>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("courses")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                          aria-label="Remove Courses Section"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}

                {section === "projects" &&
                  sectionSettings.projects.showProjects && (
                    <div>
                      <h2
                        onClick={() => handleSectionClick("projects")}
                        onMouseEnter={() => handleSectionHover("projects")}
                        onMouseLeave={handleSectionLeave}
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          borderBottom: "2px solid #d1d5db",
                          paddingBottom: "0.25rem",
                          marginBottom: "0.5rem",
                        }}
                        className="text-lg sm:text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2"
                      >
                        Projects
                      </h2>
                      {((editMode ? localData : viewData).projects || []).map((project, idx) => (
                        <div key={idx} style={{ marginBottom: "1rem" }}>
                            {editMode ? (
                            <input
                              type="text"
                              value={localData.projects?.[idx]?.name || localData.projects?.[idx]?.title || ""}
                              onChange={(e) => handleInputChange("projects", "name", e.target.value, idx)}
                              placeholder="Project title (e.g. Personal Portfolio)"
                              style={{
                                fontSize: "1.125rem",
                                fontWeight: "600",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                              }}
                              className="text-base sm:text-lg font-semibold"
                            />
                          ) : (
                            <h3 style={{ fontSize: "1.125rem", fontWeight: "600", color: project.name || project.title ? "#111827" : "rgba(0,0,0,0.35)" }} className="text-base sm:text-lg font-semibold">{project.name || project.title}</h3>
                          )}

                          {editMode ? (
                            <textarea
                              value={localData.projects?.[idx]?.description || ""}
                              onChange={(e) => handleInputChange("projects", "description", e.target.value, idx)}
                              placeholder="Brief description of the project and your role"
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                                marginTop: "6px",
                                resize: "vertical",
                              }}
                              className="text-xs sm:text-sm text-gray-700"
                            />
                          ) : (
                            <p style={{ fontSize: "0.875rem", color: "#374151" }} className="text-xs sm:text-sm text-gray-700">{project.description}</p>
                          )}

                          {editMode ? (
                            <input
                              type="text"
                              value={Array.isArray(localData.projects?.[idx]?.technologies) ? localData.projects[idx].technologies.join(", ") : localData.projects?.[idx]?.technologies || ""}
                              onChange={(e) => {
                                const parsed = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                                handleInputChange("projects", "technologies", parsed, idx);
                              }}
                              placeholder="Technologies (comma separated)"
                              style={{
                                fontSize: "0.875rem",
                                color: "#6b7280",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                                marginTop: "6px",
                              }}
                              className="text-xs sm:text-sm text-gray-600"
                            />
                          ) : (
                            project.technologies && (
                              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                                <strong>Technologies:</strong> {Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies}
                              </p>
                            )
                          )}

                            {editMode ? (
                            <input
                              type="text"
                              value={localData.projects?.[idx]?.duration || ""}
                              onChange={(e) => handleInputChange("projects", "duration", e.target.value, idx)}
                              placeholder="MM/YYYY - MM/YYYY or 'Ongoing'"
                              style={{
                                fontSize: "0.875rem",
                                color: "#6b7280",
                                width: "100%",
                                border: "1px solid #e5e7eb",
                                borderRadius: "4px",
                                padding: "6px",
                                outline: "none",
                                marginTop: "6px",
                              }}
                              className="text-xs sm:text-sm text-gray-600"
                            />
                          ) : (
                            project.duration && (
                              <p style={{ fontSize: "0.875rem", color: "#6b7280" }} className="text-xs sm:text-sm text-gray-600">{project.duration}</p>
                            )
                          )}

                          {editMode ? (
                            <div style={{ display: "flex", gap: "0.5rem", marginTop: "6px" }}>
                              <input
                                type="text"
                                value={localData.projects?.[idx]?.link || ""}
                                onChange={(e) => handleInputChange("projects", "link", e.target.value, idx)}
                                placeholder="Live demo URL"
                                style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "4px", padding: "6px" }}
                              />
                              <input
                                type="text"
                                value={localData.projects?.[idx]?.github || ""}
                                onChange={(e) => handleInputChange("projects", "github", e.target.value, idx)}
                                placeholder="GitHub URL"
                                style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "4px", padding: "6px" }}
                              />
                            </div>
                          ) : (
                            (project.link || project.github) && (
                              <div style={{ marginTop: "0.5rem" }}>
                                {project.link && (
                                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", marginRight: "1rem" }}>Live Demo</a>
                                )}
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6" }}>GitHub</a>
                                )}
                              </div>
                            )
                          )}

                          {showButtons && (
                            <button
                              onClick={() => handleRemoveSection("projects", idx)}
                              style={{
                                fontSize: "0.875rem",
                                backgroundColor: "#ef4444",
                                color: "white",
                                padding: "0.35rem 0.6rem",
                                borderRadius: "0.375rem",
                                border: "none",
                                cursor: "pointer",
                              }}
                              className="text-xs sm:text-sm transition-colors duration-300"
                            >
                              Remove Project
                            </button>
                          )}
                        </div>
                      ))}
                      {showButtons && (
                        <button
                          onClick={() => handleAddSection("projects")}
                          style={{
                            fontSize: "0.875rem",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "0.35rem 0.6rem",
                            borderRadius: "0.375rem",
                            border: "none",
                            cursor: "pointer",
                          }}
                          className="text-xs sm:text-sm transition-colors duration-300"
                        >
                          Add Project
                        </button>
                      )}
                      {showButtons && (
                        <button
                          onClick={() => handleRemoveSection("projects")}
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            fontSize: "0.75rem",
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                          className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700 transition-colors duration-300"
                        >
                          X
                        </button>
                      )}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Edit/Save Controls */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
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
                onClick={() => { setLocalData(emptyTemplate); setEditMode(true); setErrors({}); }}
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
  );
};

export default Template5;
