import { motion } from "motion/react";
import { Code2, Palette, Globe, MonitorSmartphone, Search, Wrench } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const skills = [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      category: "Design",
      items: ["Figma", "Layout Systems", "Responsive Design", "UX Writing"],
    },
    {
      category: "Website Operations",
      items: ["SEO Basics", "Hosting", "Site Maintenance", "Performance Basics"],
    },
  ];

  const services = [
    {
      icon: Globe,
      title: "New Website Builds",
      description: "Full design and development of modern, mobile-friendly websites from scratch.",
      accent: "#F4743B",
      accentBg: "bg-[#F4743B]/14",
      accentBorder: "border-[#F4743B]/30",
    },
    {
      icon: MonitorSmartphone,
      title: "Site Redesigns",
      description: "Modernizing outdated sites with current design standards and responsive layouts.",
      accent: "#5B8DEF",
      accentBg: "bg-[#5B8DEF]/14",
      accentBorder: "border-[#5B8DEF]/30",
    },
    {
      icon: Wrench,
      title: "Ongoing Management",
      description: "Hosting, maintenance, and content updates so you can focus on your business.",
      accent: "#A076F9",
      accentBg: "bg-[#A076F9]/16",
      accentBorder: "border-[#A076F9]/30",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Ensuring your site ranks well and reaches the right local customers.",
      accent: "#FDB750",
      accentBg: "bg-[#FDB750]/16",
      accentBorder: "border-[#FDB750]/30",
    },
  ];

  const edgeStars = [
    { symbol: "✦", left: "3%", top: "10%", color: "#FDB750", size: "text-xl", delay: 0.2 },
    { symbol: "✧", left: "96%", top: "12%", color: "#FFDFA6", size: "text-lg", delay: 0.8 },
    { symbol: "★", left: "2%", top: "35%", color: "#F4743B", size: "text-xl", delay: 1.3 },
    { symbol: "✦", left: "97%", top: "42%", color: "#FDCB74", size: "text-2xl", delay: 1.9 },
    { symbol: "✧", left: "4%", top: "72%", color: "#FFE5B8", size: "text-lg", delay: 2.4 },
    { symbol: "★", left: "95%", top: "80%", color: "#FFCF86", size: "text-2xl", delay: 3.1 },
    { symbol: "✦", left: "3%", top: "93%", color: "#FDB750", size: "text-xl", delay: 3.6 },
    { symbol: "✧", left: "96%", top: "94%", color: "#FFD79B", size: "text-lg", delay: 4.1 },
  ];

  const goToHomeSection = (id: string) => {
    navigate(
      {
        pathname: "/",
        hash: `#${id}`,
      },
      {
        state: { scrollTo: id },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 overflow-hidden relative">
      <div className="fixed top-5 right-6 z-40 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-white backdrop-blur-[2px] transition-colors"
        >
          About me
        </button>
        <button
          type="button"
          onClick={() => goToHomeSection("services")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          Services
        </button>
        <button
          type="button"
          onClick={() => goToHomeSection("faq-section")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          FAQ
        </button>
        <button
          type="button"
          onClick={() => goToHomeSection("contact-form")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          Contact me
        </button>
      </div>

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

        {edgeStars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: star.left, top: star.top, color: star.color }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.35, 0.72, 0.35],
              rotate: [0, 6, 0],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
          >
            <span className={`${star.size} drop-shadow-[0_0_14px_rgba(249,162,74,0.45)]`}>{star.symbol}</span>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full flex-1 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl mb-5 leading-tight">
              Hey, I'm{" "}
              <span className="text-[#F4743B]">Carver</span>
            </h1>
            <p
              className="text-lg max-w-2xl leading-[1.75]"
              style={{ color: "#9CA3AF", fontWeight: 400 }}
            >
              I design, build, and manage websites for local
              businesses. I focus on simple, understandable UX and modern design that keeps up with
              today's standards helping real businesses stand out online and reach more customers.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mb-16" />

          {/* Skills */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <Code2 className="w-6 h-6 text-[#F4743B]" />
              Skills
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-[#1F2A44]/60 p-5"
                >
                  <h4 className="mb-3 text-white font-semibold">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/15 bg-[#2A3548]/70 px-3 py-1 text-xs text-[#D2D6E0]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* What I Do */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <Palette className="w-6 h-6 text-[#F4743B]" />
              What I Do
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {services.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                    className="rounded-2xl border border-white/8 bg-[#1F2A44]/60 p-5 flex gap-4"
                  >
                    <div className={`w-10 h-10 shrink-0 rounded-xl border ${item.accentBorder} ${item.accentBg} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" style={{ color: item.accent }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm leading-[1.6]" style={{ color: "#9CA3AF" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl mb-8 flex items-center gap-3">
              <span className="text-[#F4743B] text-2xl">⚡</span>
              Quick Facts
            </h2>
            <ul className="space-y-3 text-[#9CA3AF] text-base leading-[1.7]">
              <li className="flex items-start gap-3">
                <span className="text-[#F4743B] mt-1.5">•</span>
                <span>Based in the U.S. — available for remote and local projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F4743B] mt-1.5">•</span>
                <span>Self-taught designer and developer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F4743B] mt-1.5">•</span>
                <span>Focused exclusively on helping local businesses grow their online presence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#F4743B] mt-1.5">•</span>
                <span>You own the code — every project is yours to keep</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}