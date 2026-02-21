import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { ArrowRight, Crown, LayoutTemplate, RefreshCw, Wrench } from "lucide-react";

const floatingStars = [
  { symbol: "✦", color: "#FDB750", delay: 0, x: "12%", y: "14%", size: "text-2xl" },
  { symbol: "★", color: "#F4743B", delay: 0.4, x: "86%", y: "12%", size: "text-3xl" },
  { symbol: "✧", color: "#FFDFA6", delay: 0.9, x: "8%", y: "42%", size: "text-xl" },
  { symbol: "✦", color: "#FDCB74", delay: 1.2, x: "92%", y: "39%", size: "text-2xl" },
  { symbol: "★", color: "#FDB750", delay: 1.8, x: "16%", y: "72%", size: "text-2xl" },
  { symbol: "✧", color: "#FFE5B8", delay: 2.2, x: "80%", y: "78%", size: "text-xl" },
  { symbol: "✦", color: "#F9BC62", delay: 2.6, x: "28%", y: "96%", size: "text-2xl" },
  { symbol: "★", color: "#FFCF86", delay: 3, x: "72%", y: "96%", size: "text-3xl" },
  { symbol: "✧", color: "#FFD79B", delay: 3.4, x: "48%", y: "95%", size: "text-xl" },
];

const deepSpaceStars = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 100}%`,
  size: index % 3 === 0 ? 3 : index % 3 === 1 ? 2 : 1,
  opacity: index % 4 === 0 ? 0.45 : 0.25,
  delay: (index % 10) * 0.45,
}));

const cometTrails = [
  { top: "18%", left: "-20%", delay: 0, duration: 9 },
  { top: "46%", left: "-30%", delay: 2.6, duration: 10 },
  { top: "86%", left: "-25%", delay: 1.3, duration: 11 },
];

const serviceOptions = [
  {
    id: "service-new-site",
    title: "New Site",
    description: "For customers that don't have a site yet but do have a brand.",
    icon: LayoutTemplate,
    accent: "#F4743B",
  },
  {
    id: "service-site-revision",
    title: "Site Revision",
    description: "For businesses with an existing site that needs a modern refresh and stronger usability.",
    icon: RefreshCw,
    accent: "#5B8DEF",
    featured: true,
  },
  {
    id: "service-site-management",
    title: "Site Management",
    description: "For teams that want ongoing updates, fixes, and support to keep everything running smoothly.",
    icon: Wrench,
    accent: "#A076F9",
  },
];

export function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 42, stiffness: 78, mass: 1.05 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      mouseX.set((clientX / innerWidth - 0.5) * 28);
      mouseY.set((clientY / innerHeight - 0.5) * 28);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const targetTop = section.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden px-6 pt-20 pb-0">
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
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 8%, rgba(255,255,255,0.05), transparent 40%), radial-gradient(circle at 80% 20%, rgba(120,160,255,0.07), transparent 42%), radial-gradient(circle at 52% 70%, rgba(244,116,59,0.08), transparent 45%)" }} />

        {deepSpaceStars.map((star, index) => (
          <motion.span
            key={`tiny-${index}`}
            className="absolute rounded-full"
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

        {cometTrails.map((comet, index) => (
          <motion.div
            key={`comet-${index}`}
            className="absolute h-px"
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

        {floatingStars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: star.x, top: star.y, color: star.color }}
            animate={{
              y: [0, -14, 4, -8, 0],
              rotate: [0, 4, -3, 2, 0],
              opacity: [0.38, 0.68, 0.42, 0.64, 0.38],
            }}
            transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
          >
            <span className={`${star.size} drop-shadow-[0_0_16px_rgba(249,162,74,0.45)]`}>{star.symbol}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-16 mt-4 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-3xl h-full flex flex-col"
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

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-auto"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative h-44 sm:h-56 flex-1 max-w-[280px] rounded-2xl border border-white/10 bg-[#1F2A44]/75 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_40%)]" />
                  <span className="absolute left-1/2 bottom-4 -translate-x-1/2 rounded-full bg-black/35 px-4 py-1.5 text-sm" style={{ color: "#E8E8ED", fontWeight: 600 }}>
                    Before
                  </span>
                </div>

                <ArrowRight className="h-8 w-8 shrink-0 text-[#FDB750]" />

                <div className="relative h-44 sm:h-56 flex-1 max-w-[280px] rounded-2xl border border-[#F4743B]/35 bg-[#1F2A44]/90 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(244,116,59,0.22),transparent_45%)]" />
                  <span className="absolute left-1/2 bottom-4 -translate-x-1/2 rounded-full bg-[#F4743B]/70 px-4 py-1.5 text-sm text-white" style={{ fontWeight: 600 }}>
                    After
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="pt-1"
          >
            <div className="space-y-4">
              {serviceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.title}
                    type="button"
                    onClick={() => scrollToSection(option.id)}
                    className={`block w-full min-h-[146px] text-left rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                      option.featured
                        ? "border-[#FDB750]/45 bg-[linear-gradient(160deg,rgba(36,50,79,0.95),rgba(28,40,65,0.95))] shadow-[0_10px_28px_rgba(253,183,80,0.22)] hover:border-[#FDB750]/70 hover:shadow-[0_14px_40px_rgba(253,183,80,0.45)]"
                        : "border-white/10 bg-white/5 hover:border-white/25 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: `${option.accent}22` }}>
                        <Icon className="h-4 w-4" style={{ color: option.accent }} />
                      </span>
                      <div>
                        <h4 className="text-xl mb-1 flex items-center gap-2" style={{ color: "#FFFFFF", fontWeight: 700 }}>
                          {option.title}
                          {option.featured && <Crown className="h-4 w-4 text-[#FDB750]" />}
                        </h4>
                        <p className="text-sm mb-3" style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.5 }}>
                          {option.description}
                        </p>
                        <p className="text-xs" style={{ color: option.featured ? "#FDB750" : "#C7CEDC", fontWeight: 500 }}>
                          Learn more
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.aside>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl mb-2" style={{ color: "#E8E8ED" }}>
              Services and pricing
            </h2>
          </div>

          <div className="space-y-8">
            <div id="service-new-site" className="rounded-[2rem] border border-white/10 bg-[#1F2A44]/88 p-7 md:p-10 min-h-[70vh] shadow-[0_12px_40px_rgba(8,12,26,0.4)] flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl" style={{ color: "#FFFFFF" }}>New Site</h3>
                <p className="text-sm mt-1" style={{ color: "#C7CEDC", fontWeight: 500 }}>$1,000 – $2,000</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>What this includes</p>
                  <ul className="space-y-2 text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    <li>• Full website design and build from scratch</li>
                    <li>• Mobile-responsive pages and clear site structure</li>
                    <li>• Brand-aligned visuals and call-to-action flow</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>Description template</p>
                  <p className="text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    Perfect for businesses with a strong brand but no existing website. We create a clean, modern site that clearly explains what you offer and helps customers take action.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4743B] to-[#FDB750] px-6 py-2.5 text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  style={{ fontWeight: 500 }}
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div id="service-site-revision" className="rounded-[2rem] border border-[#FDB750]/35 bg-[linear-gradient(160deg,rgba(36,50,79,0.95),rgba(28,40,65,0.95))] p-7 md:p-10 min-h-[70vh] shadow-[0_14px_45px_rgba(253,183,80,0.2)] flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl" style={{ color: "#FFFFFF" }}>Site Revision</h3>
                <p className="text-sm mt-1" style={{ color: "#C7CEDC", fontWeight: 500 }}>$300 – $800</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>What this includes</p>
                  <ul className="space-y-2 text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    <li>• Visual redesign and modern layout polish</li>
                    <li>• Better readability, flow, and navigation</li>
                    <li>• Improved interaction and conversion clarity</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>Description template</p>
                  <p className="text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    Best for companies that already have a website but need it updated to today&apos;s standards. We refresh the look, improve usability, and make your offer easier to understand.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4743B] to-[#FDB750] px-6 py-2.5 text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  style={{ fontWeight: 500 }}
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div id="service-site-management" className="rounded-[2rem] border border-white/10 bg-[#1F2A44]/88 p-7 md:p-10 min-h-[70vh] shadow-[0_12px_40px_rgba(8,12,26,0.4)] flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl" style={{ color: "#FFFFFF" }}>Site Management</h3>
                <p className="text-sm mt-1" style={{ color: "#C7CEDC", fontWeight: 500 }}>Custom monthly plan</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>What this includes</p>
                  <ul className="space-y-2 text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    <li>• Ongoing edits, content updates, and support</li>
                    <li>• Routine maintenance and issue prevention</li>
                    <li>• Continuous improvements as your business grows</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-3" style={{ color: "#E8E8ED", fontWeight: 600 }}>Description template</p>
                  <p className="text-sm" style={{ color: "#9CA3AF", lineHeight: 1.7 }}>
                    Ideal for teams that want long-term website support. We keep your site updated, functioning smoothly, and aligned with your current business goals.
                  </p>
                </div>
              </div>
              <div className="mt-auto pt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4743B] to-[#FDB750] px-6 py-2.5 text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  style={{ fontWeight: 500 }}
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pb-6"
        >
          <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(31,42,68,0.9),rgba(26,26,46,0.94))] p-7 md:p-10 shadow-[0_16px_50px_rgba(6,10,22,0.45)]">
            <h2 className="text-3xl md:text-4xl mb-2" style={{ color: "#E8E8ED" }}>
              Contact me
            </h2>

            <form className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm" style={{ color: "#E8E8ED", fontWeight: 500 }}>
                  Name
                </span>
                <input
                  type="text"
                  required
                  className="h-12 rounded-xl border border-white/12 bg-white/5 px-4 text-white outline-none transition focus:border-[#F4743B]"
                  placeholder="Your name"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm" style={{ color: "#E8E8ED", fontWeight: 500 }}>
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="h-12 rounded-xl border border-white/12 bg-white/5 px-4 text-white outline-none transition focus:border-[#F4743B]"
                  placeholder="you@company.com"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm" style={{ color: "#E8E8ED", fontWeight: 500 }}>
                  Project type
                </span>
                <select
                  className="h-12 rounded-xl border border-white/12 bg-[#1F2A44] px-4 text-white outline-none transition focus:border-[#F4743B]"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="redesign">Website redesign / modernization</option>
                  <option value="new-build">Brand-new website</option>
                  <option value="other">Other project</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm" style={{ color: "#E8E8ED", fontWeight: 500 }}>
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  className="rounded-xl border border-white/12 bg-white/5 p-4 text-white outline-none transition focus:border-[#F4743B]"
                  placeholder="Share a quick overview of your website goals."
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F4743B] to-[#FDB750] px-7 py-3 text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  style={{ fontWeight: 500 }}
                >
                  Send project details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
