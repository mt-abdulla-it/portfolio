"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroCursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: clientX - left,
        y: clientY - top
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.05), transparent 40%)`
        }}
      />
      
      {/* Animated Gradient Background Ornaments */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-10 w-96 h-96 bg-neonBlue/40 dark:bg-neonBlue/20 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-neonPurple/40 dark:bg-neonPurple/20 rounded-full blur-3xl" 
      />
    </div>
  );
}
