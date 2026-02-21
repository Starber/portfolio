import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const floatingStars = [
  { symbol: "✦", color: "#FDB750", delay: 0, x: "12%", y: "14%", size: "text-2xl" },
  { symbol: "★", color: "#F4743B", delay: 0.4, x: "86%", y: "12%", size: "text-3xl" },
  { symbol: "✧", color: "#FFDFA6", delay: 0.9, x: "8%", y: "42%", size: "text-xl" },
  { symbol: "✦", color: "#FDCB74", delay: 1.2, x: "92%", y: "39%", size: "text-2xl" },
  { symbol: "★", color: "#FDB750", delay: 1.8, x: "16%", y: "72%", size: "text-2xl" },
  { symbol: "✧", color: "#FFE5B8", delay: 2.2, x: "80%", y: "78%", size: "text-xl" },
  { symbol: "✦", color: "#F9BC62", delay: 2.6, x: "28%", y: "110%", size: "text-2xl" },
  { symbol: "★", color: "#FFCF86", delay: 3, x: "72%", y: "118%", size: "text-3xl" },
  { symbol: "✧", color: "#FFD79B", delay: 3.4, x: "48%", y: "126%", size: "text-xl" },
];

const deepSpaceStars = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 140}%`,
  size: index % 3 === 0 ? 3 : index % 3 === 1 ? 2 : 1,
  opacity: index % 4 === 0 ? 0.45 : 0.25,
  delay: (index % 10) * 0.45,
}));

const cometTrails = [
  { top: "18%", left: "-20%", delay: 0, duration: 9 },
  { top: "46%", left: "-30%", delay: 2.6, duration: 10 },
  { top: "86%", left: "-25%", delay: 1.3, duration: 11 },
];

export function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [trailPoints, setTrailPoints] = useState<{ id: number; x: number; y: number }[]>([]);
  const trailIdRef = useRef(0);
  
  const springConfig = { damping: 42, stiffness: 78, mass: 1.05 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      mouseX.set((clientX / innerWidth - 0.5) * 28);
      mouseY.set((clientY / innerHeight - 0.5) * 28);
      setTrailPoints((prev) => [{ id: trailIdRef.current++, x: clientX, y: clientY }, ...prev].slice(0, 26));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-[145vh] flex flex-col justify-start px-6 pt-20 pb-12 overflow-hidden relative">
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 8%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 80% 20%, rgba(120,160,255,0.07), transparent 42%), radial-gradient(circle at 52% 70%, rgba(244,116,59,0.08), transparent 45%)" }} />
      </div>

      {/* Tiny deep-space stars */}
      {deepSpaceStars.map((star, index) => (
        <motion.span
          key={`tiny-${index}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "#fff7e6",
            opacity: star.opacity,
            boxShadow: "0 0 10px rgba(255, 207, 134, 0.5)",
          }}
          animate={{ opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        />
      ))}

      {/* Soft comet streaks */}
      {cometTrails.map((comet, index) => (
        <motion.div
          key={`comet-${index}`}
          className="absolute pointer-events-none h-px"
          style={{
            top: comet.top,
            left: comet.left,
            width: "180px",
            background: "linear-gradient(90deg, rgba(255,245,220,0) 0%, rgba(255,209,147,0.55) 65%, rgba(255,209,147,0) 100%)",
            filter: "blur(0.2px)",
            transform: "rotate(-14deg)",
          }}
          animate={{ x: [0, 1450], opacity: [0, 0.55, 0] }}
          transition={{ duration: comet.duration + 2, repeat: Infinity, ease: "easeInOut", delay: comet.delay }}
        />
      ))}

      {/* Cursor path trail */}
      {trailPoints.map((point, index) => {
        const factor = 1 - index / 26;
        return (
          <span
            key={point.id}
            className="fixed pointer-events-none z-[3] rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: `${2 + factor * 7}px`,
              height: `${2 + factor * 7}px`,
              transform: "translate(-50%, -50%)",
              opacity: factor * 0.42,
              background: "radial-gradient(circle, rgba(255,225,169,0.95) 0%, rgba(255,178,93,0.55) 45%, rgba(255,146,60,0) 85%)",
              filter: "blur(0.4px)",
            }}
          />
        );
      })}

      {/* Floating decorative stars */}
      {floatingStars.map((star, index) => {
        return (
          <motion.div
            key={index}
            className="absolute pointer-events-none"
            style={{
              left: star.x,
              top: star.y,
              color: star.color,
            }}
            animate={{
              y: [0, -14, 4, -8, 0],
              rotate: [0, 4, -3, 2, 0],
              opacity: [0.38, 0.68, 0.42, 0.64, 0.38],
            }}
            transition={{
              duration: 8.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          >
            <span className={`${star.size} drop-shadow-[0_0_16px_rgba(249,162,74,0.45)]`}>{star.symbol}</span>
          </motion.div>
        );
      })}

      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="mb-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6 max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative text-4xl md:text-6xl mb-4 leading-tight"
              style={{ color: "#E8E8ED", fontWeight: 600 }}
            >
              Hey, I&apos;m <span style={{ color: "#F4743B" }}>Carver</span>{" "}
              <motion.span
                style={{ display: "inline-block", transformOrigin: "70% 70%" }}
                animate={{ rotate: [0, 18, -8, 18, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              >
                👋
              </motion.span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative text-lg max-w-2xl mb-2 text-left"
              style={{ color: "#FFFFFF", fontWeight: 400, lineHeight: 1.7 }}
            >
              I&apos;m a designer and developer who believes the best interfaces are the ones you don&apos;t even notice.
              I create calm, modern digital experiences that feel natural and never overwhelming.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
