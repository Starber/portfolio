import { motion } from "motion/react";
import { Mail, MessageCircle, Heart } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#FFE8D1]/60 via-[#FDD5CD]/40 to-[#E5DBEF]/50 rounded-[2.5rem] p-12 text-center shadow-lg"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-12 h-12 text-[#FFB5A7]" />
            </motion.div>
          </div>

          <h2 className="mb-4">Let's create something great together</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#6A6A7A", fontWeight: 400 }}>
            Whether you have a project in mind or just want to chat about design, I'd love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="mailto:hello@starber.design"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFB5A7] to-[#FDD5CD] text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              <Mail className="w-5 h-5" />
              hello@starber.design
            </a>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FFFAF2]/90 backdrop-blur-sm hover:bg-[#FFFAF2] hover:shadow-lg hover:scale-105 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
              <span style={{ fontWeight: 500, color: "#4A4A5A" }}>Schedule a Call</span>
            </button>
          </div>

          <p className="text-sm" style={{ color: "#9191A0", fontWeight: 400 }}>
            Response time: Usually within 24 hours ☕
          </p>
        </motion.div>
      </div>
    </section>
  );
}