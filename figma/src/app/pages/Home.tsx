import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { User, Briefcase, Mail, ArrowRight, Star, Sparkles, Code, Palette, Coffee } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const infoCards = [
  {
    id: "about",
    path: "/about",
    icon: User,
    title: "More About Me",
    description: "Dive deeper into my journey, process, and what makes me tick",
    gradient: "from-[#F4743B] to-[#FF8E53]",
  },
  {
    id: "work",
    path: "/work",
    icon: Briefcase,
    title: "My Work",
    description: "Projects that bring clarity and comfort through thoughtful design",
    gradient: "from-[#5B8DEF] to-[#7BA4F3]",
  },
  {
    id: "contact",
    path: "/contact",
    icon: Mail,
    title: "Contact Me",
    description: "Let's collaborate and create something wonderful together",
    gradient: "from-[#A076F9] to-[#B996FC]",
  },
];

const floatingIcons = [
  { icon: Star, color: "#FDB750", delay: 0, x: "15%", y: "20%" },
  { icon: Sparkles, color: "#F4743B", delay: 0.5, x: "80%", y: "15%" },
  { icon: Code, color: "#5B8DEF", delay: 1, x: "10%", y: "70%" },
  { icon: Palette, color: "#A076F9", delay: 1.5, x: "85%", y: "75%" },
  { icon: Coffee, color: "#FDB750", delay: 2, x: "50%", y: "10%" },
];

export function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
      
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Interactive background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{ 
            background: "#F4743B", 
            top: "-10%", 
            left: "-10%",
            x,
            y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20"
          style={{ 
            background: "#5B8DEF", 
            bottom: "-10%", 
            right: "-10%",
            x: useTransform(x, (value) => -value * 0.5),
            y: useTransform(y, (value) => -value * 0.5),
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating decorative icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{
              left: item.x,
              top: item.y,
              color: item.color,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
        );
      })}

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header with Character */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-block"
          >
            {/* Animated Character/Avatar */}
            <motion.div
              className="relative w-32 h-32 mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F4743B] to-[#FF8E53] blur-xl opacity-50" />
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#F4743B] to-[#FF8E53] flex items-center justify-center text-6xl shadow-2xl border-4 border-white/10">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⭐
                </motion.div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-3"
              style={{
                background: "linear-gradient(135deg, #F4743B 0%, #FF8E53 50%, #FDB750 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Starber
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-4"
              style={{ color: "#9CA3AF", fontWeight: 400 }}
            >
              Designer & Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg max-w-2xl mx-auto mb-6"
              style={{ color: "#6B7280", fontWeight: 400, lineHeight: 1.6 }}
            >
              I craft calm, modern digital experiences that feel natural and never overwhelming. 
              My work blends thoughtful design with smooth interactions to create interfaces people actually enjoy using.
            </motion.p>

            {/* Quick stats/badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center mb-8"
            >
              {["React", "TypeScript", "Figma", "Tailwind", "Motion"].map((skill, index) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full bg-[#1F2A44] border border-[#F4743B]/20 text-sm"
                  style={{ color: "#F4743B", fontWeight: 500 }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(card.path)}
                className="group relative bg-[#1F2A44] rounded-[2rem] p-8 text-left hover:bg-[#263854] transition-all duration-300 cursor-pointer overflow-hidden border border-white/5"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="mb-3 text-white">{card.title}</h3>

                  <p
                    className="mb-6"
                    style={{
                      fontWeight: 400,
                      lineHeight: 1.6,
                      color: "#9CA3AF",
                    }}
                  >
                    {card.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-[#F4743B] group-hover:gap-3 transition-all duration-300">
                    <span style={{ fontWeight: 500 }}>Explore</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Decorative glow */}
                <div
                  className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
