"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ChevronDown, Code2, Terminal, Database, Cpu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Developer",
  "API Developer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

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
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500" 
      id="home"
    >
      {/* Dynamic Cursor Glow */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`
        }}
      />

      {/* Animated Gradient Background Ornaments */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-neonBlue/40 dark:bg-neonBlue/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-neonPurple/40 dark:bg-neonPurple/20 rounded-full blur-[150px]" 
        />
      </motion.div>

      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
          
          {/* Left Side: Text Content */}
          <motion.div 
            style={{ opacity: opacityText, y: yText }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left gap-6 lg:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-neonBlue/30 shadow-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonBlue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neonBlue"></span>
              </span>
              <span className="text-neonBlue font-mono text-sm tracking-wide font-medium">Hello, I'm</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.3] transition-colors duration-500"
            >
              Abdulla <br className="hidden md:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-neonBlue dark:via-cyan-400 dark:to-neonPurple">
                Thaslim
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold text-slate-700 dark:text-slate-300 h-[40px] md:h-[48px] flex items-center transition-colors duration-500"
            >
              <span className="mr-3">A</span>
              <span className="text-slate-900 dark:text-white font-mono transition-colors duration-500">{displayText}</span>
              <span className="animate-pulse w-1 h-8 md:h-10 bg-neonBlue ml-1"></span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-lg leading-[1.6] font-light transition-colors duration-500"
            >
              I build fast, scalable, and secure web applications using modern technologies with a focus on clean design and powerful backend systems.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-row gap-4 items-center w-full justify-start"
            >
              <a
                href="#projects"
                className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-white/5 dark:to-white/5 text-white font-semibold rounded-full border border-transparent dark:border-white/10 hover:border-neonBlue/50 transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-neonBlue/20 dark:to-neonPurple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-white">View Projects</span>
                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform text-white" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 glass-panel bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-200 hover:border-slate-300 dark:border-transparent dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                Contact Me
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-row gap-6 items-center w-full justify-start"
            >
              {[
                { icon: Github, href: "https://github.com/mt-abdulla-it" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mt-abdulla-it/" },
                { icon: Mail, href: "mailto:mt.abdulla.it@gmail.com" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 rounded-full glass-panel bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-neonBlue hover:border-blue-200 hover:shadow-md hover:-translate-y-1 dark:hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 group"
                >
                  <social.icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Abstract Tech UI */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
            className="w-full lg:w-1/2 relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
          >
            {/* Core Glowing Sphere */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 dark:from-neonBlue dark:to-neonPurple blur-[40px]"
              />
            </div>
            
            {/* Orbiting Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-slate-200/80 dark:border-slate-700/50 flex items-center justify-center transition-colors duration-500"
            >
              <div className="absolute top-0 w-4 h-4 bg-blue-500 dark:bg-neonBlue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              <div className="absolute bottom-0 w-3 h-3 bg-indigo-500 dark:bg-neonPurple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)] dark:shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            </motion.div>
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border border-slate-200 dark:border-slate-700/30 flex items-center justify-center transition-colors duration-500"
            >
              <div className="absolute left-0 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
            </motion.div>

            {/* Central Hologram Component with Profile Picture */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 glass-panel bg-white/70 dark:bg-white/5 border border-white dark:border-white/20 rounded-full p-2 w-56 h-56 md:w-72 md:h-72 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:shadow-[0_0_50px_rgba(59,130,246,0.4)] backdrop-blur-md group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neonBlue/10 to-neonPurple/10 dark:from-neonBlue/20 dark:to-neonPurple/20 z-0 animate-pulse" />
              
              <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-900 border-2 border-neonBlue/30 dark:border-neonBlue/50 shadow-inner">
                <Image 
                  src="/assets/profile.jpg" 
                  alt="Abdulla Thaslim" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neonBlue/5 to-neonPurple/10 dark:via-neonBlue/10 dark:to-neonPurple/20 mix-blend-overlay pointer-events-none" />
              </div>
            </motion.div>

            {/* Floating Code Snippets */}
            <motion.div 
              animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[5%] -left-4 md:-left-20 z-20 glass-panel bg-white/90 dark:bg-slate-900/90 p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xl max-w-[160px] md:max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-white/10">
                <Code2 size={14} className="text-neonBlue" />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">frontend.tsx</span>
              </div>
              <pre className="text-[9px] md:text-[10px] font-mono text-slate-600 dark:text-slate-400">
                <span className="text-pink-600 dark:text-pink-400">export default</span> function App() {'{\n'}
                {'  '}return {'(\n'}
                {'    '}&lt;<span className="text-neonBlue">Hero</span> /&gt;{'\n'}
                {'  )'};{'\n'}
                {'}'}
              </pre>
            </motion.div>

            <motion.div 
              animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[10%] -right-4 md:-right-10 z-20 glass-panel bg-white/90 dark:bg-slate-900/90 p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-xl max-w-[160px] md:max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-white/10">
                <Database size={14} className="text-neonPurple" />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">api.ts</span>
              </div>
              <pre className="text-[9px] md:text-[10px] font-mono text-slate-600 dark:text-slate-400">
                <span className="text-pink-600 dark:text-pink-400">async</span> function fetch() {'{\n'}
                {'  '}<span className="text-neonBlue">await</span> db.connect();{'\n'}
                {'  '}return <span className="text-green-600 dark:text-green-400">"Success"</span>;{'\n'}
                {'}'}
              </pre>
            </motion.div>

            <motion.div 
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -top-[5%] right-[5%] md:right-[10%] z-0 glass-panel bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50 opacity-60 blur-[1px]"
            >
              <Terminal size={20} className="text-slate-400" />
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
      >
        <span className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-neonBlue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
