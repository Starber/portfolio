import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "Mindful Dashboard",
    description: "A wellness app dashboard focused on simplicity and mental clarity. Designed with soft gradients and breathing animations.",
    image: "https://images.unsplash.com/photo-1764601842171-3d6fba7c3830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxNTM4ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-[#FEF0ED] to-[#E8F6FF]",
  },
  {
    title: "Creative Workspace",
    description: "A collaborative design tool interface with rounded elements and playful micro-interactions. Built for creative teams.",
    image: "https://images.unsplash.com/photo-1663153206138-cc0f166f82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFwcCUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzE1NDYxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-[#F3EEF9] to-[#FFF9D1]",
  },
  {
    title: "Peaceful Portfolio",
    description: "A minimal portfolio site with generous whitespace and calming color transitions. Perfect for showcasing visual work.",
    image: "https://images.unsplash.com/photo-1734208682292-df2643d0c8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZGlnaXRhbCUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzE1NDYxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    gradient: "from-[#D1EBFA] to-[#E5DBEF]",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Featured Work</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6A6A7A", fontWeight: 400 }}>
            A selection of projects that bring calm and clarity to digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br ${project.gradient} rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2">{project.title}</h3>
                <p className="text-sm mb-4" style={{ color: "#6A6A7A", fontWeight: 400, lineHeight: 1.6 }}>
                  {project.description}
                </p>
                <button className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/60 hover:bg-white/80 transition-colors duration-300">
                  View Case Study
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
