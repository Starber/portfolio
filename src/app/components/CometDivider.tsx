import { motion } from "motion/react";

interface CometDividerProps {
  count?: number;
  height?: string;
}

export function CometDivider({ count = 3, height = "h-16" }: CometDividerProps) {
  // Generate comet trails based on count
  const cometTrails = Array.from({ length: count }, (_, index) => {
    const positions = [
      { top: "18%", left: "-20%", delay: 0, duration: 9 },
      { top: "46%", left: "-30%", delay: 2.6, duration: 10 },
      { top: "86%", left: "-25%", delay: 1.3, duration: 11 },
      { top: "25%", left: "-25%", delay: 1.4, duration: 9.5 },
      { top: "65%", left: "-20%", delay: 0.8, duration: 10.5 },
    ];
    return positions[index % positions.length];
  });

  return (
    <div className={`relative ${height} overflow-hidden`} aria-hidden="true">
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
    </div>
  );
}
