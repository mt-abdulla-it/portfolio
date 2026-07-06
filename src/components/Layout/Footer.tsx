"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-slate-950 pt-24 pb-12 border-t border-slate-200 dark:border-slate-800/50">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neonBlue/10 dark:bg-neonBlue/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-neonPurple/10 dark:bg-neonPurple/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
        >
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="#home" className="inline-block text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neonBlue via-cyan-400 to-neonPurple mb-2 hover:scale-105 transition-transform origin-center md:origin-left">
              Abdulla Thaslim
            </a>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
              Full Stack Developer
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Building modern, scalable, and high-performance web applications with clean code and exceptional user experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-neonBlue transition-all duration-300 group-hover:w-full rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect With Me */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Connect With Me
            </h4>
            <div className="flex items-center gap-4 mb-8">
              <a 
                href="https://github.com/mt-abdulla-it" 
                target="_blank" 
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:border-neonBlue/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                aria-label="GitHub"
              >
                <div className="absolute inset-0 bg-neonBlue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Github size={20} className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-neonBlue transition-colors group-hover:scale-110 duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mt-abdulla-it/" 
                target="_blank" 
                rel="noreferrer"
                className="group relative p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_0_15px_rgba(10,102,194,0.3)] hover:border-[#0A66C2]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-[#0A66C2]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Linkedin size={20} className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-[#0A66C2] transition-colors group-hover:scale-110 duration-300" />
              </a>
              <a 
                href="mailto:mt.abdulla.it@gmail.com" 
                className="group relative p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] hover:border-neonPurple/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                aria-label="Email"
              >
                <div className="absolute inset-0 bg-neonPurple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Mail size={20} className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-neonPurple transition-colors group-hover:scale-110 duration-300" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-10" />

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400"
        >
          <p>© 2026 Abdulla Thaslim. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Developed by <span className="font-semibold text-slate-700 dark:text-slate-200 bg-clip-text">Abdulla Thaslim</span>
          </p>
        </motion.div>
      </div>

      {/* Sticky Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
