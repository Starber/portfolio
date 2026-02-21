import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export function WorkPage() {
  const navigate = useNavigate();

  const projects = [
    {
      title: "Mindful App",
      description: "A meditation and wellness platform with calming animations",
      tags: ["UI/UX", "React", "Figma"],
      gradient: "from-[#F4743B] to-[#FF8E53]",
    },
    {
      title: "Clarity Dashboard",
      description: "Clean analytics interface focused on essential metrics",
      tags: ["Design System", "TypeScript", "Tailwind"],
      gradient: "from-[#5B8DEF] to-[#7BA4F3]",
    },
    {
      title: "Zen Commerce",
      description: "E-commerce experience with gentle micro-interactions",
      tags: ["React", "Animation", "UI Design"],
      gradient: "from-[#A076F9] to-[#B996FC]",
    },
    {
      title: "Focus Timer",
      description: "Productivity tool with smooth transitions and soft colors",
      tags: ["Web App", "React", "Motion"],
      gradient: "from-[#FDB750] to-[#FDCA6F]",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: "#5B8DEF", top: "10%", left: "-10%" }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back button */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2A44] hover:bg-[#263854] transition-colors duration-300 text-[#9CA3AF] hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 500 }}>Back</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 mb-4">
              <Sparkles className="w-4 h-4 text-[#5B8DEF]" />
              <span className="text-sm text-[#5B8DEF]" style={{ fontWeight: 500 }}>
                Featured Work
              </span>
            </div>
            <h2 className="mb-4">Projects</h2>
            <p
              className="text-lg max-w-2xl"
              style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.7 }}
            >
              A collection of carefully crafted digital experiences that prioritize
              user comfort and visual harmony.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-[#1F2A44] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Image placeholder with gradient */}
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="mb-2 text-white">{project.title}</h4>
                  <p
                    className="mb-4"
                    style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.6 }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full bg-[#2A3548] text-sm"
                        style={{ color: "#9CA3AF", fontWeight: 500 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
