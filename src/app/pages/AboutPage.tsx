import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Coffee, Heart, Zap, Target } from "lucide-react";
import { useNavigate } from "react-router";

export function AboutPage() {
  const navigate = useNavigate();

  const values = [
    {
      emoji: "✨",
      title: "Clarity over clutter",
      description: "Every element has a purpose. Nothing extra, nothing missing.",
    },
    {
      emoji: "🌿",
      title: "Calm over chaos",
      description: "Interfaces should breathe. Design with space, not noise.",
    },
    {
      emoji: "🧭",
      title: "Usability over flash",
      description: "Beautiful is functional. Form follows feeling and flow.",
    },
  ];

  const journey = [
    {
      icon: Coffee,
      title: "The Beginning",
      description: "Started as a curious designer wondering why so many apps felt stressful to use. Decided to do something about it.",
    },
    {
      icon: Heart,
      title: "The Philosophy",
      description: "Discovered that the best digital experiences feel invisible – they just work, without demanding attention or causing anxiety.",
    },
    {
      icon: Zap,
      title: "The Approach",
      description: "Now I combine design psychology with modern tech to build interfaces that feel like a breath of fresh air.",
    },
  ];

  const skills = [
    { category: "Design", tools: ["Figma", "Adobe XD", "Sketch", "Prototyping"] },
    { category: "Development", tools: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
    { category: "Motion", tools: ["Framer Motion", "GSAP", "CSS Animations", "Lottie"] },
  ];

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "#F4743B", top: "20%", right: "-15%" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back button */}
      <div className="max-w-5xl mx-auto w-full mb-8">
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
      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-start gap-6 mb-16">
            <motion.div 
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F4743B] to-[#FF8E53] flex items-center justify-center text-5xl flex-shrink-0"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              ⭐
            </motion.div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4743B]/10 border border-[#F4743B]/20 mb-4">
                <Sparkles className="w-4 h-4 text-[#F4743B]" />
                <span className="text-sm text-[#F4743B]" style={{ fontWeight: 500 }}>
                  About Me
                </span>
              </div>
              <h2 className="mb-4">Hi, I'm Starber</h2>
              <p
                className="text-lg max-w-2xl mb-4"
                style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.7 }}
              >
                I'm a designer and developer who believes the best interfaces are the ones you don't even notice. 
                I create calm, modern digital experiences that feel natural and never overwhelming.
              </p>
              <p
                className="text-lg max-w-2xl"
                style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.7 }}
              >
                My work blends thoughtful design with smooth interactions using tools like React, TypeScript, Figma, and Tailwind CSS 
                to build interfaces people actually enjoy using.
              </p>
            </div>
          </div>

          {/* Journey */}
          <div className="mb-16">
            <h3 className="mb-8 text-[#E8E8ED]">My Journey</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {journey.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="bg-[#1F2A44] rounded-2xl p-6 border border-white/5 hover:border-[#F4743B]/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F4743B]/20 to-[#FF8E53]/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#F4743B]" />
                    </div>
                    <h4 className="mb-3 text-white" style={{ fontWeight: 600 }}>
                      {item.title}
                    </h4>
                    <p style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h3 className="mb-8 text-[#E8E8ED]">What I Work With</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skillSet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-[#1F2A44] rounded-2xl p-6 border border-white/5"
                >
                  <h4 className="mb-4 text-[#F4743B]" style={{ fontWeight: 600 }}>
                    {skillSet.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillSet.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 rounded-full bg-[#2A3548] text-sm"
                        style={{ color: "#9CA3AF", fontWeight: 500 }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="mb-8 text-[#E8E8ED]">My Philosophy</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="bg-[#1F2A44] rounded-2xl p-6 border border-white/5 hover:border-[#F4743B]/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.emoji}</div>
                  <h4 className="mb-3 text-white" style={{ fontWeight: 600 }}>
                    {value.title}
                  </h4>
                  <p style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.6 }}>
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}