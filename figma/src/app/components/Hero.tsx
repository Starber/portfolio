import { motion } from "motion/react";
import { Sparkles, User, Briefcase, Mail, ArrowRight } from "lucide-react";

const infoCards = [
  {
    id: "about",
    icon: User,
    title: "About Me",
    description: "Designer & developer focused on creating calm, beautiful digital experiences",
    gradient: "from-[#FFB5A7] to-[#FDD5CD]",
    hoverGradient: "from-[#FF9A8B] to-[#FFB5A7]",
  },
  {
    id: "work",
    icon: Briefcase,
    title: "My Work",
    description: "Projects that bring clarity and comfort to users through thoughtful design",
    gradient: "from-[#A8D8EA] to-[#D1EBFA]",
    hoverGradient: "from-[#8FC8E0] to-[#A8D8EA]",
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Me",
    description: "Let's collaborate and create something wonderful together",
    gradient: "from-[#C9B4D6] to-[#E5DBEF]",
    hoverGradient: "from-[#B89FCE] to-[#C9B4D6]",
  },
];

export function Hero() {
  const handleCardClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB5A7]/40 to-[#FDD5CD]/40 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#FF8A7A]" />
            <span className="text-sm" style={{ fontWeight: 400 }}>
              Creative Digital Design
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-6"
            style={{
              background: "linear-gradient(135deg, #FF9A8B 0%, #FFB5A7 30%, #C9B4D6 70%, #A8D8EA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Starber
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl mb-4"
            style={{ color: "#6A6A7A", fontWeight: 400 }}
          >
            Designing calm, modern digital experiences
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(card.id)}
                className={`group relative bg-gradient-to-br ${card.gradient} rounded-[2rem] p-8 text-left shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
              >
                {/* Hover overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="mb-3 text-white">{card.title}</h3>
                  
                  <p 
                    className="text-white/90 mb-6" 
                    style={{ fontWeight: 400, lineHeight: 1.6 }}
                  >
                    {card.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all duration-300">
                    <span style={{ fontWeight: 500 }}>Explore</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-500" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
