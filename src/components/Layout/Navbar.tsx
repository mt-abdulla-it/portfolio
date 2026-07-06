"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import ThemeToggle from "@/components/ThemeToggle";

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
      rootMargin: "-20% 0px -70% 0px", // Adjust to trigger active state correctly
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

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 flex justify-center",
        scrolled ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
      )}
    >
      <div
        className={cn(
          "w-full max-w-[1200px] mx-4 md:mx-8 px-5 md:px-6 py-3 flex justify-between items-center transition-all duration-500 rounded-2xl",
          scrolled 
            ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-slate-200/50 dark:border-slate-700/50" 
            : "bg-transparent border-transparent"
        )}
      >
        {/* Logo */}
        <motion.a 
          href="#home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple hover:scale-105 transition-transform origin-left"
        >
          AT.
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
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-full hover:text-slate-900 dark:hover:text-white group",
                  isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Active Pill */}
                {isActive && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover Underline Animation (when not active) */}
                {!isActive && (
                  <span className="absolute left-1/2 bottom-1.5 h-[2px] w-0 -translate-x-1/2 bg-neonBlue transition-all duration-300 group-hover:w-[calc(100%-24px)] rounded-full"></span>
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700" />
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/mt-abdulla-it" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-all hover:scale-110 hover:rotate-6"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mt-abdulla-it/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-500 hover:text-[#0A66C2] dark:text-slate-400 dark:hover:text-[#0A66C2] transition-all hover:scale-110 hover:-rotate-6"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="ml-2 flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-slate-500/20 dark:hover:shadow-white/20"
          >
            <span>CV</span>
            <Download size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button 
            className="text-slate-800 dark:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? "open" : "closed"}
              className="relative w-6 h-6 flex items-center justify-center"
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
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[76px] md:top-[88px] bg-white/95 dark:bg-slate-950/95 backdrop-blur-[20px] z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-2 pb-24 h-full">
              {navLinks.map((link, index) => {
                const isActive = activeSection.toLowerCase() === link.name.toLowerCase();
                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-2xl font-bold py-4 border-b border-slate-200 dark:border-slate-800/50 transition-colors flex items-center justify-between",
                      isActive ? "text-neonBlue dark:text-neonBlue" : "text-slate-800 dark:text-slate-300 hover:text-neonPurple dark:hover:text-neonPurple"
                    )}
                  >
                    {link.name}
                    {isActive && <span className="w-2 h-2 rounded-full bg-neonBlue" />}
                  </motion.a>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                className="flex flex-col gap-6 mt-8"
              >
                <div className="flex items-center justify-center gap-6">
                  <a href="https://github.com/mt-abdulla-it" target="_blank" rel="noreferrer" className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-700 dark:text-slate-300 hover:text-neonBlue hover:scale-110 transition-all">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/mt-abdulla-it/" target="_blank" rel="noreferrer" className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-700 dark:text-slate-300 hover:text-[#0A66C2] hover:scale-110 transition-all">
                    <Linkedin size={24} />
                  </a>
                </div>
                
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  Download CV <Download size={20} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
