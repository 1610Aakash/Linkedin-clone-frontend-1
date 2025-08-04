const Jobs = () => {
  const jobs = [
    {
      title: "💻 Frontend Developer",
      company: "TechSpark",
      description:
        "TechSpark is a fast-growing product company building next-gen UI platforms. We’re looking for a creative React.js developer who can translate high-fidelity designs into smooth, accessible interfaces.",
    },
    {
      title: "🧠 Backend Developer",
      company: "NodeNest",
      description:
        "NodeNest builds scalable backend architectures. We're hiring skilled Node.js developers to create high-performance APIs, implement authentication flows, and optimize MongoDB databases.",
    },
    {
      title: "🌐 Full Stack Engineer",
      company: "DevBridge",
      description:
        "DevBridge delivers full-stack digital solutions. Work on real-time apps using React.js & Node.js, take ownership of modules, write reusable code, and deploy independently.",
    },
    {
      title: "🎨 UI/UX Designer",
      company: "PixelCraft",
      description:
        "PixelCraft is a design-first startup. We're looking for a designer to craft intuitive user journeys, interactive wireframes, and clean design systems for SaaS & eCommerce clients.",
    },
    {
      title: "🛠️ DevOps Engineer",
      company: "CloudLink",
      description:
        "CloudLink helps startups scale using modern DevOps. We're hiring DevOps engineers with Docker, Kubernetes, AWS, and CI/CD experience to automate, monitor, and secure deployments.",
    },
    {
      title: "🔍 Software Intern (Remote)",
      company: "CodeLaunch",
      description:
        "CodeLaunch is a remote ed-tech startup. Our 3-month paid internship lets you work on real projects, contribute to GitHub repos, and gain hands-on experience with senior devs.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">🚀 Top Picks For You</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-blue-800 mb-2">{job.title}</h3>
            <p className="text-sm text-gray-600 mb-3 font-medium">
              <span className="text-gray-800 font-semibold">Company:</span> {job.company}
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
