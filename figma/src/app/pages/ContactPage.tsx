import { motion } from "motion/react";
import { ArrowLeft, Mail, MessageCircle, Github, Twitter, Linkedin, Dribbble, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export function ContactPage() {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "#E8E8ED" },
    { icon: Twitter, href: "#", label: "Twitter", color: "#5B8DEF" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "#5B8DEF" },
    { icon: Dribbble, href: "#", label: "Dribbble", color: "#F4743B" },
  ];

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: "#A076F9", top: "30%", left: "50%", transform: "translateX(-50%)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back button */}
      <div className="max-w-4xl mx-auto w-full mb-8">
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
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A076F9]/10 border border-[#A076F9]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#A076F9]" />
              <span className="text-sm text-[#A076F9]" style={{ fontWeight: 500 }}>
                Get In Touch
              </span>
            </div>
            
            <motion.div
              className="inline-block mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F4743B] to-[#FF8E53] flex items-center justify-center text-4xl">
                👋
              </div>
            </motion.div>

            <h2 className="mb-4">Let's create something great</h2>
            <p
              className="text-lg max-w-2xl mx-auto mb-8"
              style={{ color: "#9CA3AF", fontWeight: 400, lineHeight: 1.7 }}
            >
              Whether you have a project in mind or just want to chat about design,
              I'd love to hear from you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.a
              href="mailto:hello@starber.design"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F4743B] to-[#FF8E53] text-white hover:shadow-xl hover:shadow-[#F4743B]/20 transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <Mail className="w-5 h-5" />
              hello@starber.design
            </motion.a>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1F2A44] hover:bg-[#263854] border border-white/10 text-white hover:shadow-xl transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <MessageCircle className="w-5 h-5" />
              Schedule a Call
            </motion.button>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <p className="text-sm mb-6" style={{ color: "#6B7280", fontWeight: 500 }}>
              Or connect with me on
            </p>
            <div className="flex gap-4 justify-center">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#1F2A44] hover:bg-[#263854] border border-white/5 hover:border-white/20 flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-[#9CA3AF] hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-sm mt-12"
            style={{ color: "#6B7280", fontWeight: 400 }}
          >
            Response time: Usually within 24 hours ☕
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
