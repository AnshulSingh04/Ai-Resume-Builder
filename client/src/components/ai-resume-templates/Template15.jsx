import React, { useState, useEffect, useRef, forwardRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
// This is the correct hook from your file
import { useResume } from "../../context/ResumeContext";

import PropTypes from "prop-types";
import {
  Eye,
  Edit3,
  Download,
  PlusCircle,
  Trash2,
  Briefcase,
  GraduationCap,
  Lightbulb,
  User,
  Phone,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Save,
  Share2,
  Palette,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon,
  Languages,
} from "lucide-react";

// --- Resume Preview Component ---
const UserResumePreview = forwardRef(
  ({ data, font, themeColor, zoomLevel }, ref) => {
    
    const colorMap = {
      indigo: { text: "text-indigo-700", accent: "text-indigo-600", border: "border-indigo-300", bg: "bg-indigo-50", bullet: "text-indigo-500" },
      blue: { text: "text-blue-700", accent: "text-blue-600", border: "border-blue-300", bg: "bg-blue-50", bullet: "text-blue-500" },
      green: { text: "text-green-700", accent: "text-green-600", border: "border-green-300", bg: "bg-green-50", bullet: "text-green-500" },
      purple: { text: "text-purple-700", accent: "text-purple-600", border: "border-purple-300", bg: "bg-purple-50", bullet: "text-purple-500" },
      red: { text: "text-red-700", accent: "text-red-600", border: "border-red-300", bg: "bg-red-50", bullet: "text-red-500" },
      orange: { text: "text-orange-700", accent: "text-orange-600", border: "border-orange-300", bg: "bg-orange-50", bullet: "text-orange-500" },
      teal: { text: "text-teal-700", accent: "text-teal-600", border: "border-teal-300", bg: "bg-teal-50", bullet: "text-teal-500" },
      pink: { text: "text-pink-700", accent: "text-pink-600", border: "border-pink-300", bg: "bg-pink-50", bullet: "text-pink-500" },
      yellow: { text: "text-yellow-700", accent: "text-yellow-600", border: "border-yellow-300", bg: "bg-yellow-50", bullet: "text-yellow-500" },
      gray: { text: "text-gray-700", accent: "text-gray-600", border: "border-gray-300", bg: "bg-gray-50", bullet: "text-gray-500" },
    };

    const theme = colorMap[themeColor] || colorMap.indigo; 

    const themeColorClass = theme.text;
    const themeAccentClass = theme.accent;
    const themeBorderClass = theme.border;
    const themeBgLight = theme.bg;
    const themeBulletClass = theme.bullet;

    const Section = ({ title, children, icon, className = "" }) => (
      // FIX 1: Use backticks for template literal
      <section className={`mb-8 pb-4 ${className}`}>
        {title && (
          <h2
            // FIX 2: Use backticks for template literal
            className={`text-2xl md:text-3xl font-bold ${themeColorClass} mb-4 flex items-center`}
          >
            {icon &&
              React.createElement(icon, {
                // FIX 3: Use backticks for template literal
                className: `mr-3 h-6 w-6 ${themeAccentClass}`,
              })}
            {title}
          </h2>
        )}
        {children}
      </section>
    );

    Section.propTypes = {
      title: PropTypes.string,
      children: PropTypes.node,
      icon: PropTypes.elementType,
      className: PropTypes.string,
    };

    return (
      <div
        ref={ref}
        id="resume-preview-id"
        // FIX 4: Use backticks for transform style
        className="text-base text-gray-800 max-w-4xl mx-auto bg-white rounded-xl shadow-2xl printable-area overflow-hidden"
        style={{
          fontFamily: font,
          transform: `scale(${zoomLevel})`, // Correct style
          transformOrigin: "top left",
        }}
      >
        <header
          // FIX 5: Use backticks for template literal
          className={`py-10 px-12 text-center ${themeBgLight} border-b ${themeBorderClass}`}
        >
          <h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-2"
          >
            {data.name || "Your Name"}
          </h1>
          {data.role && ( 
            <p
              // FIX 6: Use backticks for template literal
              className={`text-2xl md:text-3xl ${themeAccentClass} font-semibold mb-6`}
            >
              {data.role}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg text-gray-700">
            {data.location && ( 
              <p className="flex items-center">
                <MapPin size={18} className="mr-2.5 shrink-0 text-gray-600" />
                {data.location}
              </p>
            )}
            {data.phone && (
              <p className="flex items-center">
                <Phone size={18} className="mr-2.5 shrink-0 text-gray-600" />
                {data.phone}
              </p>
            )}
            {data.email && (
              <p className="flex items-center">
                <Mail size={18} className="mr-2.5 shrink-0 text-gray-600" />
                {/* FIX 7: Use backticks for mailto link */}
                <a href={`mailto:${data.email}`} className="hover:underline">
                  {data.email}
                </a>
              </p>
            )}
            {data.linkedin && data.linkedin.trim() !== "" && (
              <p className="flex items-center">
                <Linkedin size={18} className="mr-2.5 shrink-0 text-gray-600" />
                <a
                  href={`https://${
                    data.linkedin.startsWith("http") ? "" : "https://"
                  }${data.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {data.linkedin.replace(
                    /(https?:\/\/)?(www\.)?(linkedin\.com\/in\/)?/i,
                    ""
                  )}
                </a>
              </p>
            )}
            {data.github && data.github.trim() !== "" && (
              <p className="flex items-center">
                <Github size={18} className="mr-2.5 shrink-0 text-gray-600" />
                {/* FIX 8: Use backticks for GitHub link */}
                <a
                  href={`https://github.com/${data.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {data.github}
                </a>
              </p>
            )}
            {data.portfolio && data.portfolio.trim() !== "" && ( 
              <p className="flex items-center">
                <User size={18} className="mr-2.5 shrink-0 text-gray-600" />
                <a
                  href={`https://${
                    data.portfolio.startsWith("http") ? "" : "https://"
                  }${data.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Portfolio
                </a>
              </p>
            )}
          </div>
        </header>

        <div className="p-10 md:p-12">
          {data.summary && (
            <Section title="Summary" icon={User}>
              <p className="text-lg leading-relaxed text-gray-700">
                {data.summary}
              </p>
            </Section>
          )}

          {data.experience && data.experience.length > 0 && (
            <Section title="Experience" icon={Briefcase}>
              {data.experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-800 text-xl">
                      {exp.title} at{" "}
                      {/* FIX 9: Use backticks for span class */}
                      <span className={`${themeAccentClass}`}>
                        {exp.companyName} 
                      </span>
                    </h3>
                    <span className="text-md text-gray-500 font-semibold flex-shrink-0 ml-4">
                      {exp.date}
                    </span>
                  </div>
                  <p className="text-md italic text-gray-500 mb-2">
                    {exp.companyLocation}
                  </p>
                  <ul className="list-inside text-md text-gray-700 space-y-1.5 pl-4">
                    {exp.accomplishment &&
                      exp.accomplishment.map(
                        (point, j) =>
                          point.trim() !== "" && (
                            <li key={j} className="flex items-start">
                              {/* FIX 10: Use backticks for span class */}
                              <span
                                className={`mr-2.5 mt-1 ${themeBulletClass}`}
                              >
                                &bull;
                              </span>{" "}
                              {point}
                            </li>
                          )
                      )}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {data.education && data.education.length > 0 && (
            <Section title="Education" icon={GraduationCap}>
              {data.education.map((edu, i) => (
                <div key={edu.id || i} className="mb-5 last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-medium text-gray-800">
                      {edu.degree}
                    </h3>
                    <span className="text-md text-gray-500 font-semibold flex-shrink-0 ml-4">
                      {edu.duration}
                    </span>
                  </div>
                  {/* FIX 11: Use backticks for p class */}
                  <p className={`text-md ${themeAccentClass}`}>
                    {edu.institution}
                  </p>
                  {edu.location && ( 
                    <p className="text-md italic text-gray-500 mt-1">
                      {edu.location}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {data.skills && data.skills.length > 0 && (
            <Section title="Skills" icon={Lightbulb}>
              <ul className="columns-1 md:columns-2 list-inside text-lg text-gray-700 space-y-2">
                {data.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="break-inside-avoid-column flex items-center"
                  >
                    {/* FIX 12: Use backticks for span class */}
                    <span className={`mr-2.5 ${themeBulletClass}`}>&bull;</span>{" "}
                    {skill}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {data.languages && data.languages.length > 0 && (
            <Section title="Languages" icon={Languages}>
              <ul className="columns-1 md:columns-2 list-inside text-lg text-gray-700 space-y-2">
                {data.languages.map((lang, i) => (
                  <li
                    key={i}
                    className="break-inside-avoid-column flex items-center"
                  >
                    {/* FIX 13: Use backticks for span class */}
                    <span className={`mr-2.5 ${themeBulletClass}`}>&bull;</span>{" "}
                    {lang}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {data.interests && data.interests.length > 0 && (
            <Section title="Interests" icon={Palette}>
              <ul className="columns-1 md:columns-2 list-inside text-lg text-gray-700 space-y-2">
                {data.interests.map((hobby, i) => (
                  <li 
                    key={i}
                    className="break-inside-avoid-column flex items-center"
                  >
                    {/* FIX 14: Use backticks for span class */}
                    <span className={`mr-2.5 ${themeBulletClass}`}>&bull;</span>{" "}
                    {hobby}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    );
  }
);

UserResumePreview.propTypes = {
  data: PropTypes.object.isRequired,
  font: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number.isRequired,
};

UserResumePreview.displayName = "UserResumePreview";

// --- Resume Edit Form ---
// This form updates the LOCAL 'formData', which is fast.
// THIS IS THE FIX FOR THE "single character" LAG.
const UserResumeEditForm = ({ formData, setFormData }) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("profileImage", reader.result); // Use 'profileImage'
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayFieldChange = (section, index, field, value) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [section]: newArray };
    });
  };

  const handleExperiencePointChange = (expIndex, pointIndex, value) => {
    setFormData((prev) => {
      const newExperience = [...prev.experience];
      const currentPoints = newExperience[expIndex].accomplishment
        ? [...newExperience[expIndex].accomplishment]
        : [];
      currentPoints[pointIndex] = value;
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        accomplishment: currentPoints,
      };
      return { ...prev, experience: newExperience };
    });
  };

  const addArrayItem = (section, template) => {
    setFormData((prev) => ({
      ...prev,
      // FIX 15: Use backticks for ID generation
      [section]: [
        ...prev[section],
        { ...template, id: `${section.slice(0, 3)}-${Date.now()}` },
      ],
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addExperiencePoint = (expIndex) => {
    setFormData((prev) => {
      const newExperience = [...prev.experience];
      const currentPoints = newExperience[expIndex].accomplishment
        ? [...newExperience[expIndex].accomplishment]
        : [];
      currentPoints.push("");
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        accomplishment: currentPoints,
      };
      return { ...prev, experience: newExperience };
    });
  };

  const removeExperiencePoint = (expIndex, pointIndex) => {
    setFormData((prev) => {
      const newExperience = [...prev.experience];
      if (newExperience[expIndex] && newExperience[expIndex].accomplishment) {
        newExperience[expIndex] = {
          ...newExperience[expIndex],
          accomplishment: newExperience[expIndex].accomplishment.filter(
            (_, i) => i !== pointIndex
          ),
        };
      }
      return { ...prev, experience: newExperience };
    });
  };

  const handleListChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    }));
  };

  const FormSectionWrapper = ({ title, children }) => (
    <div className="mb-8 p-5 border rounded-lg bg-slate-50 shadow-sm">
      <h3 className="text-xl font-semibold text-indigo-700 mb-5">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
  FormSectionWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  const Input = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || label}
        className="border border-gray-300 p-2.5 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
      />
    </div>
  );
  Input.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  };

  const Textarea = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <textarea
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || label}
        rows={rows}
        className="border border-gray-300 p-2.5 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
      />
    </div>
  );
  Textarea.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl space-y-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Edit Your Resume
      </h2>

      <FormSectionWrapper title="Personal Details">
        <Input
          label="Full Name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="e.g., Jane Doe"
        />
        <Input
          label="Job Title"
          value={formData.role} // Use 'role'
          onChange={(e) => updateField("role", e.target.value)}
          placeholder="e.g., Software Engineer"
        />
        <Input
          label="Address"
          value={formData.location} // Use 'location'
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="e.g., San Francisco, CA"
        />
        <Input
          label="Phone"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          type="tel"
          placeholder="e.g., +1 123-456-7890"
        />
        <Input
          label="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          type="email"
          placeholder="e.g., jane.doe@example.com"
        />
        <Input
          label="LinkedIn Profile"
          value={formData.linkedin}
          onChange={(e) => updateField("linkedin", e.target.value)}
          placeholder="e.g., linkedin.com/in/janedoe"
        />
        <Input
          label="GitHub Username"
          value={formData.github}
          onChange={(e) => updateField("github", e.target.value)}
          placeholder="e.g., janedoe"
        />
        <Input
          label="Portfolio URL"
          value={formData.portfolio} // Use 'portfolio'
          onChange={(e) => updateField("portfolio", e.target.value)}
          placeholder="e.g., my-portfolio.com"
        />
        <div>
          <label className="text-base font-medium text-gray-700 mb-1.5 flex items-center">
            <ImageIcon size={18} className="mr-2.5 text-gray-600" />
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-base text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100 cursor-pointer"
          />
          {formData.profileImage && (
            <div className="mt-4 flex items-center space-x-3">
              <img
                src={formData.profileImage}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              <p className="text-sm text-gray-500">Image loaded.</p>
              <button
                onClick={() => updateField("profileImage", "")}
                className="text-red-500 hover:text-red-700 text-sm flex items-center"
              >
                <Trash2 size={16} className="mr-1" /> Remove
              </button>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Or paste an Image URL (Optional):
          </p>
          <Input
            label="Image URL"
            value={formData.profileImage}
            onChange={(e) => updateField("profileImage", e.target.value)}
            placeholder="e.g., https://example.com/your-photo.jpg"
          />
        </div>
      </FormSectionWrapper>

      <FormSectionWrapper title="Profile Summary">
        <Textarea
          label="Summary"
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          rows={5}
          placeholder="Write a brief summary about your professional background..."
        />
      </FormSectionWrapper>

      <FormSectionWrapper title="Work Experience">
        {formData.experience.map((exp, i) => (
          <div
            key={exp.id || i}
            className="p-4 border rounded-md bg-white space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem("experience", i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={20} />
            </button>
            <Input
              label="Job Title"
              value={exp.title}
              onChange={(e) =>
                handleArrayFieldChange("experience", i, "title", e.target.value)
              }
            />
            <Input
              label="Company"
              value={exp.companyName} // Use 'companyName'
              onChange={(e) =>
                handleArrayFieldChange(
                  "experience", i, "companyName", e.target.value
                )
              }
            />
            <Input
              label="Duration (e.g., Jan 2023 - Present)"
              value={exp.date} // Use 'date'
              onChange={(e) =>
                handleArrayFieldChange(
                  "experience", i, "date", e.target.value
                )
              }
            />
            <Input
              label="Location"
              value={exp.companyLocation} // Use 'companyLocation'
              onChange={(e) =>
                handleArrayFieldChange(
                  "experience", i, "companyLocation", e.target.value
                )
              }
            />
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1.5">
                Key Responsibilities/Achievements:
              </label>
              {/* Use 'accomplishment' */}
              {exp.accomplishment &&
                exp.accomplishment.map((point, j) => (
                  <div key={j} className="flex items-center mb-2">
                    <Textarea
                      value={point}
                      onChange={(e) =>
                        handleExperiencePointChange(i, j, e.target.value)
                      }
                      rows={1}
                      // FIX 16: Use backticks for placeholder
                      placeholder={`Point ${j + 1}`}
                    />
                    <button
                      onClick={() => removeExperiencePoint(i, j)}
                      className="ml-3 text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              <button
                onClick={() => addExperiencePoint(i)}
                className="text-md text-indigo-600 hover:text-indigo-800 flex items-center mt-2"
              >
                <PlusCircle size={18} className="mr-2" /> Add Point
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={() =>
            addArrayItem("experience", {
              // FIX 17: Use backticks for ID generation
              id: `exp-${Date.now()}`,
              title: "",
              companyName: "",
              date: "",
              companyLocation: "",
              accomplishment: [""],
            })
          }
          className="bg-indigo-500 text-white px-5 py-2.5 rounded-md hover:bg-indigo-600 flex items-center text-md"
        >
          <PlusCircle size={20} className="mr-2" /> Add Experience
        </button>
      </FormSectionWrapper>

      <FormSectionWrapper title="Education">
        {formData.education.map((edu, i) => (
          <div
            key={edu.id || i}
            className="p-4 border rounded-md bg-white space-y-3 relative"
          >
            <button
              onClick={() => removeArrayItem("education", i)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 size={20} />
            </button>
            <Input
              label="Duration (e.g., 2020 - 2024)"
              value={edu.duration} // Use 'duration'
              onChange={(e) =>
                handleArrayFieldChange("education", i, "duration", e.target.value)
              }
            />
            <Input
              label="Degree/Certificate"
              value={edu.degree}
              onChange={(e) =>
                handleArrayFieldChange("education", i, "degree", e.target.value)
              }
            />
            <Input
              label="Institution Name"
              value={edu.institution}
              onChange={(e) =>
                handleArrayFieldChange(
                  "education", i, "institution", e.target.value
                )
              }
            />
            <Input
              label="Location"
              value={edu.location} // Use 'location'
              onChange={(e) =>
                handleArrayFieldChange(
                  "education", i, "location", e.target.value
                )
              }
            />
          </div>
        ))}
        <button
          onClick={() =>
            addArrayItem("education", { 
              // FIX 18: Use backticks for ID generation
              id: `edu-${Date.now()}`, 
              duration: "", 
              degree: "", 
              institution: "",
              location: ""
            })
          }
          className="bg-indigo-500 text-white px-5 py-2.5 rounded-md hover:bg-indigo-600 flex items-center text-md"
        >
          <PlusCircle size={20} className="mr-2" /> Add Education
        </button>
      </FormSectionWrapper>

      <FormSectionWrapper title="Skills">
        <Textarea
          label="Skills (comma-separated)"
          value={formData.skills.join(", ")}
          onChange={(e) => handleListChange("skills", e.target.value)}
          placeholder="e.g., React, JavaScript, Project Management"
        />
      </FormSectionWrapper>

      <FormSectionWrapper title="Languages">
        <Textarea
          label="Languages (comma-separated)"
          value={formData.languages.join(", ")} // Use string array
          onChange={(e) => handleListChange("languages", e.target.value)}
          placeholder="e.g., English, Spanish"
        />
      </FormSectionWrapper>

      <FormSectionWrapper title="Interests">
        <Textarea
          label="Interests (comma-separated)"
          value={formData.interests.join(", ")} // Use string array
          onChange={(e) => handleListChange("interests", e.target.value)}
          placeholder="e.g., Photography, Yoga, Blogging"
        />
      </FormSectionWrapper>
    </div>
  );
};

UserResumeEditForm.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

// --- Main Template Component (with Manual Save/Cancel) ---
const Template15 = () => {
  // 1. Get the REAL data from your context
  const { resumeData, setResumeData } = useResume();
  
  // 2. 'formData' is the TEMPORARY editing copy.
  const [formData, setFormData] = useState(null); 
  
  const [isEditing, setIsEditing] = useState(false);
  const [font, setFont] = useState("Inter");
  const [themeColor, setThemeColor] = useState("indigo");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const resumeRef = useRef(null);

  // 3. This effect syncs the local 'formData' with the context 'resumeData'
  useEffect(() => {
    if (resumeData) {
      setFormData(resumeData);
    }
  }, [resumeData]); // Runs when resumeData from context changes

  // 4. This is the SAVE function
  const handleSave = () => {
    // Save the temporary 'formData' to the context
    setResumeData(formData); // This triggers the save to localStorage in your context
    setIsEditing(false);
    
    setNotificationMessage("Resume saved successfully!");
    setNotificationType("success");
    setShowNotifications(true);
    setTimeout(() => setShowNotifications(false), 3000);
  };

  // --- PDF Download Function ---
  const handleDownload = async () => {
    if (!resumeRef.current) return;
    
    const originalZoom = zoomLevel;
    const wasEditing = isEditing;
    
    setIsEditing(false); // Show the saved preview
    setZoomLevel(1);
    
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for re-render

    try {
      const { default: jsPDF } = await import("jspdf");
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const downloadName = (resumeData.name || "My_Resume").replace(/\s+/g, "_");
      // FIX 19: Use backticks for download name
      pdf.save(`${downloadName}_Resume.pdf`);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      setNotificationMessage("Error downloading PDF. Please try again.");
      setNotificationType("error");
      setShowNotifications(true);
      setTimeout(() => setShowNotifications(false), 3000);
    } finally {
      setZoomLevel(originalZoom);
      setIsEditing(wasEditing);
    }
  };

  const handlePrint = () => {
    const wasEditing = isEditing;
    setIsEditing(false);

    setTimeout(() => {
      window.print();
      setIsEditing(wasEditing);
    }, 100);
  };

  // 5. This is the EDIT / CANCEL function
  const toggleEditing = () => {
    // Always reset the form to the last SAVED state ('resumeData')
    setFormData(resumeData);
    setIsEditing(!isEditing);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const availableFonts = [
    "Inter", "Roboto", "Open Sans", "Lato", "Poppins", "Montserrat",
    "Source Sans Pro", "Raleway", "Ubuntu", "Nunito",
  ];

  const availableColors = [
    "indigo", "blue", "green", "purple", "red", "orange",
    "teal", "pink", "yellow", "gray",
  ];

  // Show a loading state until both context and local form are ready
  if (!formData || !resumeData) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p>Loading Your Resume...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .printable-area, .printable-area * { visibility: visible; }
          .printable-area {
            position: absolute; left: 0; top: 0; width: 100%; height: 100%;
            margin: 0; padding: 0; box-shadow: none; border: none;
            transform: scale(1) !important;
          }
        }
      `}</style>

      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Template 15 - Modern Professional
              </h1>
              <p className="text-gray-600">
                A clean, modern template with excellent readability and
                professional styling.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  
                  <button
                    onClick={toggleEditing}
                    // FIX 20: Use backticks for button class
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      isEditing
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Eye size={20} className="mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit3 size={20} className="mr-2" />
                        Edit
                      </>
                    )}
                  </button>

                  {isEditing ? (
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        <Save size={20} className="mr-2" />
                        Save
                      </button>
                  ) : (
                  <>
                    <button
                      onClick={handleDownload}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Download size={20} className="mr-2" />
                      Download PDF
                    </button>

                    <button
                      onClick={handlePrint}
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      <Share2 size={20} className="mr-2" />
                      Print
                    </button>
                  </>
                  )}
                </div>

                {!isEditing && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Font:
                      </label>
                      <select
                        value={font}
                        onChange={(e) => setFont(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {availableFonts.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-sm font-medium text-gray-700">
                        Theme:
                      </label>
                      <select
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {availableColors.map((color) => (
                          <option key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleZoomOut}
                        className="p-1 text-gray-600 hover:text-gray-800"
                        title="Zoom Out"
                      >
                        <ZoomOut size={18} />
                      </button>
                      {/* FIX 21: Use backticks for percentage display */}
                      <span className="text-sm text-gray-700 min-w-[60px] text-center">
                        {Math.round(zoomLevel * 100)}%
                      </span>
                      <button
                        onClick={handleZoomIn}
                        className="p-1 text-gray-600 hover:text-gray-800"
                        title="Zoom In"
                      >
                        <ZoomIn size={18} />
                      </button>
                      <button
                        onClick={handleResetZoom}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                        title="Reset Zoom"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* --- LAYOUT CHANGE: This now REPLACES content like Template2 --- */}
            <div className="w-full">
              {isEditing ? (
                /* Show the form, centered */
                <div className="max-w-2xl mx-auto">
                  <UserResumeEditForm
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
              ) : (
                /* Show the preview */
                <UserResumePreview
                  ref={resumeRef}
                  // IMPORTANT: Pass formData (local state) to preview for real-time style updates
                  data={formData} 
                  font={font}
                  themeColor={themeColor}
                  zoomLevel={zoomLevel}
                />
              )}
            </div>
            {/* --- End of Layout Change --- */}

          </div>
        </div>
      </div>

      {/* Notifications */}
      {showNotifications && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            // FIX 22: Use backticks for notification class
            className={`px-6 py-4 rounded-lg shadow-lg text-white ${
              notificationType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notificationMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Template15;