import React from "react";

const Template28 = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <header className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Naga Jyothi Padarthi</h1>
        <h2 className="text-lg text-blue-600">Full Stack Developer</h2>
        <p className="text-sm text-gray-600 mt-2">
          📞 123-456-7890 | 📧 padarthinagajyothi05@gmail.com | 🌐 linkedin.com/in/nagajyothi | 📍 Pune
        </p>
      </header>

      <section className="mb-6">
        <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">SUMMARY</h3>
        <p className="text-gray-700">
          Passionate full-stack developer with 3+ years of experience building scalable web applications.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">EXPERIENCE</h3>
        <div>
          <h4 className="font-semibold text-gray-900">Software Developer</h4>
          <p className="text-blue-600">ABC Pvt Ltd</p>
          <p className="text-gray-600 text-sm">2020 - Present | Mumbai</p>
          <p className="text-gray-700 mt-2">
            Built scalable MERN applications used by 10k+ users and improved API performance by 40%.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">EDUCATION</h3>
        <div>
          <h4 className="font-semibold text-gray-900">B.Tech in Computer Science</h4>
          <p className="text-blue-600">XYZ University</p>
          <p className="text-gray-600 text-sm">2016 - 2020 | Pune</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">ACHIEVEMENTS</h3>
          <ul className="text-gray-700 list-disc pl-5">
            <li>🏆 Winner - Hackathon 2022</li>
            <li>Top 5% in Google Code Jam 2023</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 border-b pb-1 mb-2">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"].map((skill) => (
              <span
                key={skill}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-right text-xs text-gray-400 mt-6">
        Made by NagaJyothi Padarthi
      </footer>
    </div>
  );
};

export default Template28;