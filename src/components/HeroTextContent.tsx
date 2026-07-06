"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";

const roles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Developer",
  "API Developer",
];

export default function HeroTextContent() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <motion.div 
      className="w-full lg:w-1/2 flex flex-col items-start text-left gap-6 lg:gap-8 select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 shadow-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonBlue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-neonBlue"></span>
        </span>
        <span className="text-slate-800 dark:text-slate-300 text-xs font-medium tracking-wide">Hello, I'm</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight transition-colors duration-500"
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
        className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 h-[40px] flex items-center transition-colors duration-500"
      >
        <span className="mr-3">A</span>
        <span className="text-slate-900 dark:text-white transition-colors duration-500">{displayText}</span>
        <span className="animate-pulse w-0.5 h-6 md:h-8 bg-neonBlue ml-1"></span>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-slate-600 dark:text-slate-400 text-lg max-w-lg leading-relaxed font-light transition-colors duration-500"
      >
        I build fast, scalable, and secure web applications using modern technologies with a focus on clean design and powerful backend systems.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 items-center w-full justify-start"
      >
        <a
          href="#projects"
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-0.5 shadow-sm hover:shadow-md hover:bg-slate-800 dark:hover:bg-slate-100"
        >
          <span className="relative z-10">View Projects</span>
          <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#contact"
          className="w-full sm:w-auto text-center px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5"
        >
          Contact Me
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-row gap-4 items-center w-full justify-start"
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
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-sm"
          >
            <social.icon size={18} />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}
