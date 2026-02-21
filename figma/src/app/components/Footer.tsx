import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Dribbble } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
  ];

  return (
    <footer className="relative py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFFAF2]/90 to-[#FFE8D1]/80 backdrop-blur-sm flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
              >
                <social.icon className="w-5 h-5" style={{ color: "#4A4A5A" }} />
              </motion.a>
            ))}
          </div>

          {/* Brand */}
          <div className="text-center">
            <p className="mb-2" style={{ fontWeight: 500, color: "#4A4A5A" }}>
              Starber
            </p>
            <p className="text-sm" style={{ color: "#9191A0", fontWeight: 400 }}>
              Designing calm, modern digital experiences
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-[#4A4A5A]/10 pt-6 w-full">
            <p className="text-sm" style={{ color: "#9191A0", fontWeight: 400 }}>
              © {currentYear} Starber. Made with care and creativity.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}