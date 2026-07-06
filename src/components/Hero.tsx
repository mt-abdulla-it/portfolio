"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroCursorGlow from "./HeroCursorGlow";
import HeroTextContent from "./HeroTextContent";
import HeroHologram from "./HeroHologram";

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500" 
      id="home"
    >
      <HeroCursorGlow />

      <div className="container mx-auto max-w-7xl px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <HeroTextContent />
          <HeroHologram />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-slate-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
