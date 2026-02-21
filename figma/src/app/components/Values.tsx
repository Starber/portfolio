import { motion } from "motion/react";

const values = [
  {
    emoji: "✨",
    title: "Clarity over clutter",
    description: "Every element has a purpose. Nothing extra, nothing missing.",
    gradient: "from-[#FFB5A7] to-[#FDD5CD]",
  },
  {
    emoji: "🌿",
    title: "Calm over chaos",
    description: "Interfaces should breathe. Design with space, not noise.",
    gradient: "from-[#A8D8EA] to-[#D1EBFA]",
  },
  {
    emoji: "🧭",
    title: "Usability over flash",
    description: "Beautiful is functional. Form follows feeling and flow.",
    gradient: "from-[#C9B4D6] to-[#E5DBEF]",
  },
];

export function Values() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Design Philosophy</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6A6A7A", fontWeight: 400 }}>
            The principles that guide every decision
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br ${value.gradient} rounded-[2rem] p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="text-5xl mb-4">{value.emoji}</div>
              <h3 className="mb-3">{value.title}</h3>
              <p style={{ color: "#6A6A7A", fontWeight: 400, lineHeight: 1.6 }}>
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}