import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Crown, LayoutTemplate, Plus, RefreshCw, Wrench } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { sendContactEmail } from "../services/email";
import { CometDivider } from "../components/CometDivider";
import { applySeoForPath } from "../seo";

const floatingStars = [
  { symbol: "✦", color: "#FDB750", delay: 0, x: "3%", y: "8%", size: "text-2xl" },
  { symbol: "★", color: "#F4743B", delay: 0.4, x: "97%", y: "10%", size: "text-3xl" },
  { symbol: "✧", color: "#FFDFA6", delay: 0.9, x: "2%", y: "28%", size: "text-xl" },
  { symbol: "✦", color: "#FDCB74", delay: 1.2, x: "98%", y: "34%", size: "text-2xl" },
  { symbol: "★", color: "#FDB750", delay: 1.8, x: "4%", y: "56%", size: "text-2xl" },
  { symbol: "✧", color: "#FFE5B8", delay: 2.2, x: "96%", y: "62%", size: "text-xl" },
  { symbol: "✦", color: "#F9BC62", delay: 2.6, x: "5%", y: "84%", size: "text-2xl" },
  { symbol: "★", color: "#FFCF86", delay: 3, x: "95%", y: "90%", size: "text-3xl" },
  { symbol: "✧", color: "#FFD79B", delay: 3.4, x: "2%", y: "96%", size: "text-xl" },
];

const deepSpaceStars = Array.from({ length: 44 }, (_, index) => ({
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 100}%`,
  size: index % 3 === 0 ? 3 : index % 3 === 1 ? 2 : 1,
  opacity: index % 4 === 0 ? 0.45 : 0.25,
  delay: (index % 10) * 0.45,
}));

const serviceOptions = [
  {
    id: "service-new-site",
    title: "Create new site",
    description: "When you don't have a site yet but do have a brand.",
    icon: LayoutTemplate,
    accent: "#F4743B",
  },
  {
    id: "service-site-revision",
    title: "Site Revision",
    description: "You have an existing site that needs a modern refresh.",
    icon: RefreshCw,
    accent: "#5B8DEF",
    featured: true,
  },
  {
    id: "service-site-management",
    title: "Site Management",
    description: "Avoid the hassle of hosting and updates. I got you covered!",
    icon: Wrench,
    accent: "#A076F9",
  },
];

const faqItems = [
  {
    id: "faq-code-delivery",
    question: "What files or code do you deliver when you are done building my site?",
    answer: "Your choice of client-side JavaScript output: React, Angular, Vue, or plain HTML/CSS/JavaScript.",
  },
  {
    id: "faq-brand",
    question: "Can you create a logo and brand identity for my business?",
    answer: "No. I design the site around your existing brand. I can help with minor things and offer suggestions, but I do not provide logos or overall brand creation.",
  },
  {
    id: "faq-shopping-cart-ecommerce",
    question: "Can you build an online shopping/purachse system for my site?",
    answer: "No. I help local businesses get more customers to their physical location by providing a great online presence and identity. There are many online providers of ecommerce systems, shopping carts, etc, that might be better to serve your online sales needs.",
  },
  {
    id: "faq-technologies",
    question: "Can you update my Wordpress, WIX or other existing site?",
    answer: "No. I produce clean, modern HTML and Javascript code that can run on any hosting provider. Sites like Wordpress are more complex and expesive to run, and sites like WIX are proprietary and not compatible with standard web code.",
  },
  {
    id: "faq-build-and-manage",
    question: "If you revise or build my site, can I also have you host and mange it?",
    answer: "Yes, you have the option to choose both site construction and ongoing management services. I can build your site and then handle all hosting, updates, and maintenance for you so you can focus on your business without worrying about the technical side.",
  },
  {
    id: "faq-domain-management",
    question: "If I have you host my site, how do you handle domain management?",
    answer: "You have two options in this case: 1) You can keep your domain with your current provider under your control and I'll just walk you through some one-time configuration steps, or 2) you can provide me with access to your domain provider and I can handle the configuration for you. Don't worry, your domain is safe and starber.net would be under contract with what you allow regarding your domain name.",
  },
  {
    id: "faq-payment-methods",
    question: "What payment methods do you accept?",
    answer: (
      <>
        I accept Venmo, and credit/debit cards over the phone or via online invoicing from my trusted payment
        provider (
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noreferrer"
          className="text-accent-secondary underline underline-offset-2 hover:text-accent-primary"
        >
          Stripe
        </a>
        ).
      </>
    ),
  },
  {
    id: "faq-existing-site",
    question: "But, wont I offend my nephew Timmy who built my current site?",
    answer: "Perhaps. But think of it more positively: Timmy provided the core concept that was vital as a starting point for the enhancements that you now get from starber.net! Thank him for that, he did great work. Now let us build on his legacy!",
  },


];

const MESSAGE_MAX_LENGTH = 2000;
const MESSAGE_COUNTER_WARNING_AT = 300;

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [expandedImage, setExpandedImage] = useState<{ src: string; label: "Before" | "After" } | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    applySeoForPath("/");
  }, []);

  const dismissSubmitStatus = () => {
    setSubmitStatus(null);
  };

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

  const scrollToServicesSection = () => {
    const section = document.getElementById("services");
    if (!section) {
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionCenter = sectionTop + section.offsetHeight / 2;
    const viewportCenter = window.innerHeight / 2;
    const targetTop = Math.max(sectionCenter - viewportCenter, 0);

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const openFaqAndScroll = (faqId: string) => {
    setOpenFaqId(faqId);
    window.setTimeout(() => {
      scrollToSection("faq-section");
    }, 0);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const projectTypeSelect = form.elements.namedItem("project_type") as HTMLSelectElement | null;
    const selectedProjectTypeText = projectTypeSelect?.selectedOptions?.[0]?.text ?? "";

    const templateParams = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      title: selectedProjectTypeText,
      message: messageValue,
    };

    setIsSending(true);

    try {
      await sendContactEmail(templateParams);
      setSubmitStatus({ type: "success", message: "Message sent successfully." });
      form.reset();
      setMessageValue("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send message";
      setSubmitStatus({ type: "error", message: `Failed to send message: ${message}` });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (!submitStatus) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [submitStatus]);

  useEffect(() => {
    if (!submitStatus) {
      return;
    }

    const handleEscapeDismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissSubmitStatus();
      }
    };

    window.addEventListener("keydown", handleEscapeDismiss);
    return () => window.removeEventListener("keydown", handleEscapeDismiss);
  }, [submitStatus]);

  useEffect(() => {
    const routeState = location.state as { scrollTo?: string } | null;
    const hashTarget = location.hash ? location.hash.replace("#", "") : "";
    const targetId = routeState?.scrollTo ?? hashTarget;

    if (!targetId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      if (targetId === "services") {
        scrollToServicesSection();
        return;
      }

      scrollToSection(targetId);
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [location.key, location.hash, location.state]);

  return (
    <div className="relative min-h-screen overflow-x-hidden px-6 pt-20 pb-0">
      <div className="fixed top-5 right-6 z-40 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          onClick={() => navigate("/about")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          About me
        </button>
        <button
          type="button"
          onClick={scrollToServicesSection}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          Services
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("faq-section")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          FAQ
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("contact-form")}
          className="rounded-full border border-white/15 bg-card/75 px-4 py-2 text-sm text-subtle backdrop-blur-[2px] transition-colors hover:text-white"
        >
          Contact me
        </button>
      </div>

      {submitStatus && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
            onClick={dismissSubmitStatus}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-status-title"
            className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[linear-gradient(160deg,rgba(31,42,68,0.95),rgba(26,26,46,0.96))] p-6 md:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-start gap-4">
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  submitStatus.type === "success"
                    ? "bg-[#A076F9]/30 text-white"
                    : "bg-[#F4743B]/30 text-white"
                }`}
              >
                {submitStatus.type === "success" ? "✓" : "!"}
              </span>

              <div className="flex-1">
                <h3 id="contact-status-title" className="text-lg font-semibold text-white">
                  {submitStatus.type === "success" ? "Message sent" : "Message not sent"}
                </h3>
                <p className="mt-1 text-sm md:text-base text-subtle leading-[1.6]">
                  {submitStatus.message}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={dismissSubmitStatus}
                className="inline-flex items-center justify-center rounded-full btn-gradient px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.01]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {expandedImage && (
        <button
          type="button"
          aria-label={`Close expanded ${expandedImage.label} image`}
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
        >
          <div className="relative w-full max-w-5xl">
            <img
              src={expandedImage.src}
              alt={expandedImage.label}
              className="w-full max-h-[85vh] rounded-2xl object-contain border border-white/20"
            />
            <span
              className="absolute left-1/2 bottom-5 -translate-x-1/2 rounded-full bg-black/65 px-7 py-3 text-base font-semibold"
            >
              {expandedImage.label}
            </span>
          </div>
        </button>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 bg-[#F4743B] top-[-10%] left-[-10%]"
          style={{ x, y }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 bg-[#5B8DEF] bottom-[-10%] right-[-10%]"
          style={{
            x: useTransform(x, (value) => -value * 0.5),
            y: useTransform(y, (value) => -value * 0.5),
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute inset-0 bg-radial-glow" />

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
        {/* Hero */}
        <motion.div
          id="about-me"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 mt-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl mb-5 leading-tight"
          >
            Amazing websites for{" "}
            <span className="text-[#F4743B]">local businesses</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[1.13rem] md:text-xl max-w-2xl mx-auto text-subtle font-normal leading-[1.7]"
          >
            Hey, im <span className="text-[#F4743B] font-bold">Carver</span>. I design and build clean, modern
            websites that help local businesses stand out online, attract more customers, and grow with
            confidence.
          </motion.h2>
        </motion.div>

       

        {/* Before & After */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6">
            <div className="flex-1">
              <div className="mb-3 flex justify-center md:hidden">
                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 text-sm">
                  <span className="font-semibold text-accent-primary">Before:</span>
                  <span className="text-subtle">Old and crusty</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedImage({ src: "/image.png", label: "Before" })}
                className="relative w-full rounded-2xl border border-white/10 bg-[#1F2A44]/75 overflow-hidden cursor-zoom-in"
              >
                <img
                  src="/image.png"
                  alt="Before"
                  className="w-full h-auto object-cover"
                />
              </button>
            </div>

            <ArrowDown className="h-10 w-10 shrink-0 justify-self-center text-[#FDB750] md:hidden" />
            <ArrowRight className="hidden h-10 w-10 shrink-0 text-[#FDB750] md:block" />

            <div className="flex-1">
              <div className="mb-3 flex justify-center md:hidden">
                <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 text-sm">
                  <span className="font-semibold text-accent-secondary">After:</span>
                  <span className="text-subtle">New hotness</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExpandedImage({ src: "/image1.png", label: "After" })}
                className="relative w-full rounded-2xl border border-[#F4743B]/35 bg-[#1F2A44]/90 overflow-hidden cursor-zoom-in"
              >
                <img
                  src="/image1.png"
                  alt="After"
                  className="w-full h-auto object-cover"
                />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 mt-4">
            <div className="flex flex-1 justify-center">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 text-sm">
                <span className="font-semibold text-accent-primary">Before:</span>
                <span className="text-subtle">Old and crusty</span>
              </div>
            </div>

            <div className="w-10 shrink-0" />

            <div className="flex flex-1 justify-center">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2 text-sm">
                <span className="font-semibold text-accent-secondary">After:</span>
                <span className="text-subtle">New hotness</span>
              </div>
            </div>
          </div>
        </motion.section>

        <CometDivider count={2} height="h-12" />

        {/* Services and Pricing — horizontal */}
        <motion.section
          id="services"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl mb-2">
              Services and pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* New Site */}
            <div
              id="service-new-site"
              className="relative rounded-2xl border border-white/10 border-t-2 border-t-[var(--color-blue)] bg-[#1F2A44]/88 p-6 shadow-[0_12px_40px_rgba(8,12,26,0.4)] flex flex-col"
            >
              <span className="pointer-events-none absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-blue)]/35 bg-[var(--color-blue)]/12 text-[var(--color-blue)]">
                <LayoutTemplate className="h-4 w-4" />
              </span>
              <div className="mb-4">
                <h3 className="text-[1.35rem] md:text-[2.05rem] text-accent-secondary">Create new Site</h3>
                <p className="text-sm mt-1 text-subtle font-medium">
                  $1,000+
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm mt-1 text-[var(--color-blue)] font-medium">
                  When you need a new site for a new or existing business.
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What this includes
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-blue)]">✓</span><span>Full, modern website built from scratch; mobile-friendly</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-blue)]">✓</span><span>Optimized for search engines (SEO) and clear value to customers</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-blue)]">✓</span><span>Complete set of code ready for your host provider*</span></li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What you provide
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-accent-secondary">•</span><span>Brand assets (logo, colors, images)</span></li>
                  <li className="flex items-start gap-2"><span className="text-accent-secondary">•</span><span>Description of your business and goals</span></li>
                  <li className="flex items-start gap-2"><span className="text-accent-secondary">•</span><span>Preferences on look and feel (the vibe)</span></li>
                </ul>
              </div>
              <p className="text-sm mb-6 text-subtle leading-[1.7]">
                Perfect when you need a complete web presence that brings people to your business location.
                You own the finished site and codebase — it is your project, not mine.
              </p>

              <div className="mt-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-2 text-sm text-white transition-all duration-300 hover:scale-[1.01] font-medium"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Site Revision */}
            <div
              id="service-site-revision"
              className="relative rounded-2xl border border-white/10 border-t-2 border-t-[var(--color-orange)] bg-[linear-gradient(160deg,rgba(36,50,79,0.95),rgba(28,40,65,0.95))] p-6 shadow-[0_12px_40px_rgba(8,12,26,0.4)] flex flex-col"
            >
              <span className="pointer-events-none absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-orange)]/40 bg-[var(--color-orange)]/12 text-[var(--color-orange)]">
                <RefreshCw className="h-4 w-4" />
              </span>
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[1.35rem] md:text-[2.05rem] text-accent-primary">Site Revision</h3>
                </div>
                <p className="text-sm mt-1 text-subtle font-medium">
                  $300 – $1,000
                </p>
              
              </div>
              <div className="mb-4">
                <p className="text-sm mt-1 text-[var(--color-blue)] font-medium">
                  When you have an existing site that needs a modern refresh.
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What this includes
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">↻</span><span>Visual redesign and modern layout; mobile-friendly</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">✓</span><span>Optimized for search engines (SEO) and clear value to customers</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">✓</span><span>Complete set of code ready for your host provider*</span></li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What you provide
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">•</span><span>Brand assets (logo, colors, images)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">•</span><span>Description of your business and goals</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-orange)]">•</span><span>Preferences on look and feel (the vibe)</span></li>
                </ul>
              </div>
              <p className="text-sm mb-6 text-subtle leading-[1.7]">
                Best when you want a modern, up-to-date version of your existing website without starting over.
                I refresh design, layout, and usability to current standards, and all code remains yours.
              </p>
              <div className="mt-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-2 text-sm text-white transition-all duration-300 hover:scale-[1.01] font-medium"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Site Management */}
            <div
              id="service-site-management"
              className="relative rounded-2xl border border-white/10 border-t-2 border-t-[var(--color-purple)] bg-[#1F2A44]/88 p-6 shadow-[0_12px_40px_rgba(8,12,26,0.4)] flex flex-col"
            >
              <span className="pointer-events-none absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-purple)]/40 bg-[var(--color-purple)]/14 text-[var(--color-purple)]">
                <Wrench className="h-4 w-4" />
              </span>
              <div className="mb-4">
                <h3 className="text-[1.35rem] md:text-[2.05rem] text-accent-tertiary">Site Management</h3>
                <p className="text-sm mt-1 text-subtle font-medium">
                  $25/month + Flat fees*
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm mt-1 text-[var(--color-blue)] font-medium">
                  When you want hands-off website operation and ongoing updates handled for you.
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What this includes
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">🔧</span><span>Hosting and updating your site - I handle the technical aspects so you don't have to</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">↻</span><span>Keep current with rapidly changing search engines (SEO)</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">⏱</span><span>24-hour turn-around for requested changes*</span></li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="mb-2 text-base font-semibold">
                  What you provide
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">•</span><span>Domain name or configuration details <button type="button" onClick={() => openFaqAndScroll("faq-domain-management")} className="text-[var(--color-blue)] transition-all duration-200 hover:text-[var(--color-orange)] hover:drop-shadow-[0_0_10px_rgba(91,141,239,0.35)] hover:-translate-y-[1px]">(see FAQ)</button></span></li>

                </ul>
              </div>
              <p className="text-sm mb-6 text-subtle leading-[1.7]">
                This is the leave-it-to-me option: I handle the tech stuff, you just focus on your business.
              </p>
              <div className="mb-4">
                <p className="mb-2 text-body">
                  *Flat-rate edits: 
                </p>
                <ul className="space-y-1.5 text-sm text-body leading-[1.7]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">•</span><span>$20 minor changes</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">•</span><span>$50 page revisions</span></li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-purple)]">•</span><span>$100 major revisions</span></li>

                </ul>
              </div>
              
              <div className="mt-auto flex justify-end">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact-form")}
                  className="inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-2 text-sm text-white transition-all duration-300 hover:scale-[1.01] font-medium"
                >
                  Contact me
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          id="faq-section"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl mb-2">
              Frequently asked questions
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1F2A44]/72 backdrop-blur-[2px] overflow-hidden">
            {faqItems.map((item) => {
              const isOpen = openFaqId === item.id;

              return (
                <div
                  key={item.id}
                  className={`border-b border-white/10 last:border-b-0 transition-colors ${isOpen ? "bg-[var(--color-blue)]/8" : "bg-transparent"}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                    className="w-full px-5 md:px-7 py-5 text-left flex items-center gap-4 transition-colors hover:bg-white/[0.03]"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                  >
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm border-[#5B8DEF] text-subtle font-medium"
                    >
                      Q
                    </span>
                    <span className="flex-1 text-base md:text-[1.08rem] font-normal">
                      {item.question}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 text-subtle ${isOpen ? "rotate-45" : "rotate-0"}`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`${item.id}-content`}
                      className="border-l border-[var(--color-blue)]/35 px-5 md:px-7 pb-5 md:pb-6 pl-[4.5rem] md:pl-[4.75rem]"
                    >
                      <p className="text-sm md:text-base text-body leading-[1.7]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          id="contact-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pb-6"
        >

          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl mb-2">
              Contact me
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(31,42,68,0.9),rgba(26,26,46,0.94))] p-7 md:p-10 shadow-[0_16px_50px_rgba(6,10,22,0.45)]">
            <form className="grid gap-5 md:grid-cols-2" onSubmit={handleContactSubmit}>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  className="h-12 rounded-xl border border-white/12 bg-white/5 px-4 text-white outline-none transition focus:border-[#F4743B]"
                  placeholder="Your name"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  className="h-12 rounded-xl border border-white/12 bg-white/5 px-4 text-white outline-none transition focus:border-[#F4743B]"
                  placeholder="you@company.com"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">
                  Project type
                </span>
                <select
                  name="project_type"
                  className="h-12 rounded-xl border border-white/12 bg-[#1F2A44] px-4 text-white outline-none transition focus:border-[#F4743B]"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select one option
                  </option>
                  <option value="redesign">Website redesign / modernization</option>
                  <option value="new-build">Brand-new website</option>
                  <option value="site-management">Site management</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  maxLength={MESSAGE_MAX_LENGTH}
                  rows={5}
                  value={messageValue}
                  onChange={(e) => setMessageValue(e.target.value)}
                  className="rounded-xl border border-white/12 bg-white/5 p-4 text-white outline-none transition focus:border-[#F4743B] resize-none"
                  placeholder="Share a quick overview of your website goals."
                />
                {MESSAGE_MAX_LENGTH - messageValue.length <= MESSAGE_COUNTER_WARNING_AT && (
                  <div className="flex justify-end">
                    <span
                      className={`text-xs ${
                        messageValue.length >= MESSAGE_MAX_LENGTH
                          ? "text-[#F4743B]"
                          : MESSAGE_MAX_LENGTH - messageValue.length <= 100
                            ? "text-[#FDB750]"
                            : "text-body"
                      }`}
                    >
                      {messageValue.length}/{MESSAGE_MAX_LENGTH}
                    </span>
                  </div>
                )}
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 rounded-full btn-gradient px-7 py-3 text-white transition-all duration-300 hover:scale-[1.01] font-medium"
                >
                  {isSending ? "Sending..." : "Send project details"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-body">
              © {new Date().getFullYear()} Starber Tech. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/starber.net-contract.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-body transition-colors hover:text-white"
              >
                Contract
              </a>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-sm text-body transition-colors hover:text-white"
              >
                Back to top
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
