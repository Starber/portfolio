import { motion } from "motion/react";

export function FloatingShapes() {
  const shapes = [
    {
      gradient: "linear-gradient(135deg, #FFB5A7 0%, #FF9A8B 100%)",
      size: 400,
      x: "5%",
      y: "15%",
      delay: 0,
    },
    {
      gradient: "linear-gradient(135deg, #FDD5CD 0%, #FFB5A7 100%)",
      size: 350,
      x: "75%",
      y: "5%",
      delay: 1,
    },
    {
      gradient: "linear-gradient(135deg, #C9B4D6 0%, #E5DBEF 100%)",
      size: 250,
      x: "85%",
      y: "65%",
      delay: 2,
    },
    {
      gradient: "linear-gradient(135deg, #FFDAB9 0%, #FFE8D1 100%)",
      size: 300,
      x: "10%",
      y: "75%",
      delay: 1.5,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            background: shape.gradient,
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}