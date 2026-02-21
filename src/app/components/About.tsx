import { motion } from "motion/react";

export function About() {
  return (
    <section id="about" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#FFFAF2]/80 to-[#FFE8D1]/60 backdrop-blur-sm rounded-[2rem] p-8 md:p-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFB5A7] to-[#C9B4D6] flex items-center justify-center text-5xl shadow-lg">
                👋
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-4">Hi, I'm Starber</h2>
              <p className="text-lg mb-4" style={{ color: "#6A6A7A", fontWeight: 400, lineHeight: 1.7 }}>
                I design and build clean, modern websites and interfaces focused on clarity, simplicity, and user comfort.
              </p>
              <p className="text-lg" style={{ color: "#6A6A7A", fontWeight: 400, lineHeight: 1.7 }}>
                My approach combines thoughtful design with smooth interactions to create digital experiences that feel natural and calm — never overwhelming.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}