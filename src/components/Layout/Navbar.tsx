"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import ThemeToggle from "@/components/ThemeToggle";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Navigation Reordered to exact requested order
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setHidden(true);
      setIsOpen(false);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const observers = new Map();
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -70% 0px",
    });

    navLinks.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        observers.set(id, element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Framer Motion variants for mobile menu
  const mobileMenuVars = {
    initial: { opacity: 0, backdropFilter: "blur(0px)" },
    open: { opacity: 1, backdropFilter: "blur(30px)", transition: { duration: 0.4 } },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }
  };
  
  const containerVars = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };
  
  const mobileLinkVars = {
    initial: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { y: 20, opacity: 0 }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 flex justify-center w-full pointer-events-none transition-all duration-500",
        scrolled ? "pt-4 md:pt-6" : "pt-6 md:pt-8"
      )}
    >
      {/* 2. Floating Glassmorphism Pill */}
      <div
        className={cn(
          "pointer-events-auto flex justify-between items-center transition-all duration-700 ease-out",
          scrolled 
            ? "w-[92%] md:w-[90%] max-w-[1200px] px-6 py-3.5 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,243,255,0.05)] border border-white/80 dark:border-white/10" 
            : "w-full max-w-[1200px] px-6 md:px-12 py-4 rounded-none bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <motion.a 
          href="#home"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative group text-2xl font-black tracking-tighter flex items-center gap-1"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple group-hover:scale-105 transition-transform duration-300">
            AT.
          </span>
          <Sparkles size={16} className="text-neonPurple opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 translate-x-1 absolute -right-4" />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => {
            const isActive = activeSection.toLowerCase() === link.name.toLowerCase();
            return (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={link.name}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-bold tracking-wide transition-colors rounded-full group",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Active Pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_0_20px_rgba(0,243,255,0.15)] border border-slate-200/50 dark:border-white/5 -z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                
                {/* Hover Underline Animation (when not active) */}
                {!isActive && (
                  <span className="absolute left-1/2 bottom-1.5 h-[3px] w-0 -translate-x-1/2 bg-gradient-to-r from-neonBlue to-neonPurple transition-all duration-300 group-hover:w-[16px] rounded-full opacity-0 group-hover:opacity-100"></span>
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700/80" />
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/mt-abdulla-it" 
              target="_blank" 
              rel="noreferrer" 
              className="relative flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all hover:scale-110 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mt-abdulla-it/" 
              target="_blank" 
              rel="noreferrer" 
              className="relative flex items-center justify-center p-2 text-slate-500 hover:text-[#0A66C2] dark:text-slate-400 dark:hover:text-[#0A66C2] transition-all hover:scale-110 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          {/* 3. Futuristic CV Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="group relative ml-2 flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-extrabold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">CV</span>
            <Download size={16} className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="text-slate-800 dark:text-slate-200 p-2.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="relative w-5 h-5 flex items-center justify-center"
            >
              <AnimatePresence mode="popLayout">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </div>
      </div>

      {/* 4. Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVars}
            initial="initial"
            animate="open"
            exit="exit"
            className="fixed inset-0 top-0 bg-white/90 dark:bg-slate-950/90 z-40 lg:hidden overflow-y-auto flex flex-col pt-28 pointer-events-auto"
          >
            <motion.div 
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="exit"
              className="flex flex-col px-8 gap-1 pb-32 h-full"
            >
              {navLinks.map((link) => {
                const isActive = activeSection.toLowerCase() === link.name.toLowerCase();
                return (
                  <motion.a
                    variants={mobileLinkVars}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "relative text-3xl font-black py-4 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors flex items-center justify-between group",
                      isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    <span className={cn(
                      "transition-transform duration-300 group-hover:translate-x-2",
                      isActive && "bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple"
                    )}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.span 
                        layoutId="mobileActive"
                        className="w-2.5 h-2.5 rounded-full bg-neonBlue shadow-[0_0_10px_rgba(0,243,255,0.8)]" 
                      />
                    )}
                  </motion.a>
                );
              })}
              
              <motion.div 
                variants={mobileLinkVars}
                className="flex flex-col gap-6 mt-10"
              >
                <div className="flex items-center justify-center gap-6">
                  <a href="https://github.com/mt-abdulla-it" target="_blank" rel="noreferrer" className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-300 shadow-sm">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/mt-abdulla-it/" target="_blank" rel="noreferrer" className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-700 dark:text-slate-300 hover:text-white hover:bg-[#0A66C2] transition-all duration-300 shadow-sm">
                    <Linkedin size={24} />
                  </a>
                </div>
                
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-extrabold text-lg transition-all duration-300 overflow-hidden shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Download CV</span>
                  <Download size={20} className="relative z-10 group-hover:text-white transition-colors duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
