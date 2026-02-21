import { motion } from "motion/react";

const skills = [
  "UI Design",
  "Web Design",
  "Frontend Development",
  "UX Thinking",
  "Motion Design",
  "Design Systems",
  "React",
  "Tailwind CSS",
  "Figma",
  "Prototyping",
];

export function Skills() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Skills & Services</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6A6A7A", fontWeight: 400 }}>
            What I bring to every project
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FFFAF2]/90 to-[#FFE8D1]/80 backdrop-blur-sm border border-[#FFB5A7]/20 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span style={{ fontWeight: 500, color: "#4A4A5A" }}>{skill}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}