"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Loading Portfolio...",
  "Initializing Systems...",
  "Preparing Experience...",
  "Almost There..."
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  // Handle Progress Simulation
  useEffect(() => {
    const duration = 2800; // total ms for loading
    const intervalTime = 30; // update every 30ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.floor((currentStep / steps) * 100));
      
      // Add slight easing to make the counter feel more natural
      const easedProgress = Math.floor(currentProgress + (Math.sin(currentProgress * Math.PI / 100) * 10));
      setProgress(Math.min(100, Math.max(0, easedProgress)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(onComplete, 500); // Wait a half second at 100% before finishing
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Handle Text Changing
  useEffect(() => {
    const textTimer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => clearInterval(textTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-50">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-neonBlue/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-neonPurple/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Floating Particles (Simple CSS animation representation) */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            opacity: Math.random() * 0.5 + 0.1,
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Rings & Logo */}
        <div className="relative w-40 h-40 flex items-center justify-center mb-12">
          
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-neonBlue border-opacity-50"
          ></motion.div>
          
          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-neonPurple border-opacity-50"
          ></motion.div>

          {/* Central Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-24 h-24 bg-slate-900/50 backdrop-blur-md rounded-full border border-slate-800 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.2)]"
          >
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-neonBlue to-neonPurple tracking-tighter"
            >
              AT
            </motion.span>
          </motion.div>
        </div>

        {/* Progress Display */}
        <div className="flex flex-col items-center w-64">
          <div className="flex justify-between w-full mb-3 px-1">
            <span className="text-slate-400 text-xs uppercase tracking-[0.2em] font-medium">System Boot</span>
            <span className="text-neonBlue text-xs font-bold tracking-wider">{progress}%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden mb-6 relative shadow-inner">
            {/* Progress Bar Fill */}
            <motion.div 
              className="h-full bg-gradient-to-r from-neonBlue via-cyan-400 to-neonPurple relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px]"></div>
            </motion.div>
          </div>

          {/* Typing Text Simulation */}
          <div className="h-6 relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-slate-500 text-sm tracking-wide font-mono absolute"
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
