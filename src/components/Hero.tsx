"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Enthusiast",
  "API Developer",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 12,
    },
  },
};

export default function Hero() {
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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonBlue/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonPurple/20 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="max-w-3xl lg:w-3/5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants} className="text-neonBlue font-mono mb-4 text-lg md:text-xl">
                Hi, I'm
              </motion.h2>
              <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Abdulla Thaslim.
              </motion.h1>
              <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-slate-400 mb-8 h-[40px] md:h-[60px]">
                I am a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">{displayText}</span><span className="animate-pulse">|</span>
              </motion.h3>
              
              <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                I build scalable, secure, and high-performance web applications with modern technologies. Passionate about crafting clean UI and powerful backend systems.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center">
                <a
                  href="#projects"
                  className="px-8 py-4 bg-gradient-to-r from-neonBlue to-neonPurple text-white font-semibold rounded-full hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-shadow flex items-center gap-2 group"
                >
                  View Projects
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 glass-panel text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  Contact Me
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex gap-6 mt-12">
                <a href="https://github.com/mt-abdulla-it" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/mt-abdulla-it/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:mt.abdulla.it@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
              </motion.div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.4 }}
            className="lg:w-2/5 flex justify-center lg:justify-end"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-r from-neonBlue to-neonPurple"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative">
                <Image 
                  src="/assets/profile.jpg" 
                  alt="Abdulla Thaslim" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
