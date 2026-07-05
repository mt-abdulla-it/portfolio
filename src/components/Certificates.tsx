"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Generated certificates from the assets folder with added categories
const certificates = [
  { id: 1, title: "Java (Basic)", issuer: "HackerRank", date: "May 06, 2026", category: "Software Eng", image: "/assets/certificates/certificates1.jpeg" },
  { id: 2, title: "CSS (Basic)", issuer: "HackerRank", date: "Feb 21, 2026", category: "Software Eng", image: "/assets/certificates/certificates2.jpeg" },
  { id: 3, title: "Frontend Developer (React)", issuer: "HackerRank", date: "Feb 21, 2026", category: "Web Dev", image: "/assets/certificates/certificates3.jpeg" },
  { id: 4, title: "Multicloud Network Associate", issuer: "Aviatrix", date: "Sep 23, 2025", category: "Cloud", image: "/assets/certificates/certificates4.jpeg" },
  { id: 5, title: "Ethical Hacking 101", issuer: "Simplilearn", date: "Aug 12, 2025", category: "Cybersecurity", image: "/assets/certificates/certificates5.jpeg" },
  { id: 6, title: "Machine Learning Using Python", issuer: "Simplilearn", date: "Jul 16, 2025", category: "Data & AI", image: "/assets/certificates/certificates6.jpeg" },
  { id: 7, title: "Introduction to Artificial Intelligence", issuer: "Simplilearn", date: "May 21, 2025", category: "Data & AI", image: "/assets/certificates/certificates7.jpeg" },
  { id: 8, title: "SQL Analytics and BI on Databricks", issuer: "Simplilearn", date: "May 12, 2025", category: "Data & AI", image: "/assets/certificates/certificates8.jpeg" },
  { id: 9, title: "Introduction to C#", issuer: "Sololearn", date: "May 05, 2025", category: "Software Eng", image: "/assets/certificates/certificates9.jpeg" },
  { id: 10, title: "Cybersecurity Foundations", issuer: "LinkedIn Learning", date: "Apr 23, 2025", category: "Cybersecurity", image: "/assets/certificates/certificates10.jpeg" },
  { id: 11, title: "Cybersecurity Foundations", issuer: "LinkedIn Learning", date: "Apr 22, 2025", category: "Cybersecurity", image: "/assets/certificates/certificates11.jpeg" },
  { id: 12, title: "Cybersecurity Foundations", issuer: "LinkedIn Learning", date: "Apr 22, 2025", category: "Cybersecurity", image: "/assets/certificates/certificates12.jpeg" },
  { id: 13, title: "Introduction to C", issuer: "Sololearn", date: "April 18, 2025", category: "Software Eng", image: "/assets/certificates/certificates13.jpeg" },
  { id: 14, title: "Administrative Professional Foundations", issuer: "LinkedIn Learning", date: "Apr 16, 2025", category: "Professional Skills", image: "/assets/certificates/certificates14.jpeg" },
  { id: 15, title: "AI for Beginners", issuer: "HP LIFE", date: "Apr 9, 2025", category: "Data & AI", image: "/assets/certificates/certificates15.jpeg" },
  { id: 16, title: "Computer Hardware Technician", issuer: "Insight Institute of Mgt & Tech", date: "Apr 07, 2025", category: "Hardware", image: "/assets/certificates/certificates.jpeg" },
  { id: 17, title: "Introduction to Cybersecurity Awareness", issuer: "HP LIFE", date: "Apr 5, 2025", category: "Cybersecurity", image: "/assets/certificates/certificates16.jpeg" },
  { id: 18, title: "Introduction to Microsoft Excel", issuer: "Coursera", date: "Oct 19, 2024", category: "Professional Skills", image: "/assets/certificates/certificates19.jpg" },
  { id: 19, title: "Build a free website with WordPress", issuer: "Coursera", date: "Oct 6, 2024", category: "Web Dev", image: "/assets/certificates/certificates21.jpg" },
  { id: 20, title: "Increase SEO Traffic with WordPress", issuer: "Coursera", date: "Oct 5, 2024", category: "Web Dev", image: "/assets/certificates/certificates20.jpg" },
  { id: 21, title: "Network Support and Security", issuer: "Cisco", date: "August 21, 2024", category: "Networking", image: "/assets/certificates/certificates29.jpg" },
  { id: 22, title: "Network Defense", issuer: "Cisco", date: "July 26, 2024", category: "Networking", image: "/assets/certificates/certificates28.jpg" },
  { id: 23, title: "Network Addressing and Basic Troubleshooting", issuer: "Cisco", date: "July 04, 2024", category: "Networking", image: "/assets/certificates/certificates27.jpg" },
  { id: 24, title: "Ethical Hacker", issuer: "Cisco", date: "July 02, 2024", category: "Cybersecurity", image: "/assets/certificates/certificates23.jpg" },
  { id: 25, title: "Python for Beginners", issuer: "University of Moratuwa", date: "Sep 13, 2023", category: "Software Eng", image: "/assets/certificates/certificates17.jpeg" },
  { id: 26, title: "Networking Basics", issuer: "Cisco", date: "July 04, 2023", category: "Networking", image: "/assets/certificates/certificates30.jpg" },
  { id: 27, title: "Introduction to Internet of Things", issuer: "Cisco", date: "July 03, 2023", category: "IoT", image: "/assets/certificates/certificates26.jpg" },
  { id: 28, title: "Computer Hardware Basics", issuer: "Cisco", date: "June 26, 2023", category: "IT Support", image: "/assets/certificates/certificates18.jpg" },
  { id: 29, title: "Cyber Threat Management", issuer: "Cisco", date: "June 26, 2023", category: "Cybersecurity", image: "/assets/certificates/certificates22.jpg" },
  { id: 30, title: "Introduction to Data Science", issuer: "Cisco", date: "June 26, 2023", category: "Data & AI", image: "/assets/certificates/certificates25.jpg" },
  { id: 31, title: "Operating Systems Basics", issuer: "Cisco", date: "June 26, 2023", category: "IT Support", image: "/assets/certificates/certificates31.jpg" },
  { id: 32, title: "Software Engineering Job Simulation", issuer: "Electronic Arts", date: "February 19th, 2026", category: "Software Eng", image: "/assets/certificates/certificates32.jpg" },
  { id: 33, title: "Software Engineering Job Simulation", issuer: "Wells Fargo", date: "February 17th, 2026", category: "Software Eng", image: "/assets/certificates/certificates33.jpg" },
  { id: 34, title: "Software Engineering Job Simulation", issuer: "Hewlett Packard Enterprise", date: "February 18th, 2026", category: "Software Eng", image: "/assets/certificates/certificates34.jpg" },
  { id: 35, title: "Software Engineering Job Simulation", issuer: "JPMorgan Chase & Co.", date: "February 20th, 2026", category: "Software Eng", image: "/assets/certificates/certificates35.jpg" },
  { id: 36, title: "Front-End Software Engineering Job Simulation", issuer: "Skyscanner", date: "February 17th, 2026", category: "Software Eng", image: "/assets/certificates/certificates36.jpg" },
  { id: 37, title: "Advanced Software Engineering Job Simulation", issuer: "Walmart Global Tech", date: "February 18th, 2026", category: "Software Eng", image: "/assets/certificates/certificates37.jpg" },
  { id: 38, title: "Software Engineering Job Simulation", issuer: "Skyscanner", date: "February 18th, 2026", category: "Software Eng", image: "/assets/certificates/certificates38.jpg" },
  { id: 39, title: "Cybersecurity Job Simulation", issuer: "Mastercard", date: "February 17th, 2026", category: "Cybersecurity", image: "/assets/certificates/certificates39.jpg" },
  { id: 40, title: "Introduction to Software Engineering Job Simulation", issuer: "Commonwealth Bank", date: "February 19th, 2026", category: "Software Eng", image: "/assets/certificates/certificates40.jpg" },
  { id: 41, title: "IT & Cybersecurity Certificate", issuer: "Cisco", date: "2024", category: "Cybersecurity", image: "/assets/certificates/certificates24.jpg" },
];

// Reusable TiltCard Component
function TiltCard({ cert, onClick }: { cert: typeof certificates[0], onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full shrink-0 bg-white dark:bg-white/5 rounded-2xl cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-slate-200 dark:border-slate-700/50 hover:border-blue-300 hover:dark:border-neonBlue/80"
      onClick={onClick}
      role="button"
      aria-label={`View certificate for ${cert.title}`}
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter') onClick(); }}
    >
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/80 relative flex items-center justify-center rounded-t-2xl overflow-hidden border-b border-slate-200 dark:border-white/5"
      >
        {cert.image ? (
          <img src={cert.image} alt={cert.title} loading="lazy" className="object-cover w-full h-full opacity-95 dark:opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110 pointer-events-none" />
        ) : (
          <div className="text-slate-500 font-medium">Image Placeholder</div>
        )}
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-blue-500/20 dark:bg-neonBlue/20 p-4 rounded-full border border-blue-500/50 dark:border-neonBlue/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="text-blue-600 dark:text-neonBlue w-8 h-8" />
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full text-slate-700 dark:text-slate-300 group-hover:border-blue-300 dark:group-hover:border-neonPurple/50 group-hover:text-blue-600 dark:group-hover:text-white transition-colors shadow-sm">
          {cert.category}
        </div>
      </div>
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-6 bg-white dark:bg-slate-800/60 rounded-b-2xl relative flex flex-col h-[180px]"
      >
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-neonBlue transition-colors line-clamp-2 min-h-[3.5rem] pointer-events-none">{cert.title}</h3>
        
        <div className="flex justify-between items-center text-sm mb-auto pointer-events-none">
          <span className="font-semibold text-blue-600 dark:text-neonPurple">{cert.issuer}</span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">{cert.date}</span>
        </div>
        
        {/* View Button */}
        <button className="w-full py-2.5 mt-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-neonBlue/10 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-neonBlue/50 text-slate-700 dark:text-white font-medium flex items-center justify-center gap-2 transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] pointer-events-none">
          <span>View Certificate</span>
          <ExternalLink size={16} className="text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-neonBlue transition-colors" />
        </button>
      </div>
    </motion.div>
  );
}

// Background Particles Component
function ParticlesBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-neonBlue/40 rounded-full blur-[2px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Certificates() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const activeCert = selectedIdx !== null ? certificates[selectedIdx] : null;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % certificates.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + certificates.length) % certificates.length);
    }
  };

  const MarqueeTrack = ({ items, direction, duration, rowIndex }: { items: typeof certificates, direction: 'left' | 'right', duration: string, rowIndex: number }) => {
    const duplicatedItems = [...items, ...items];
    return (
      <div className="flex w-full overflow-hidden group py-4">
        <div 
          className={`flex gap-6 lg:gap-8 pr-6 lg:pr-8 w-max ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover:[animation-play-state:paused]`}
          style={{ '--duration': duration } as React.CSSProperties}
        >
          {duplicatedItems.map((cert, idx) => {
            const originalIndex = certificates.findIndex(c => c.id === cert.id);
            return (
              <div key={`${cert.id}-${idx}`} className="w-[300px] md:w-[380px] shrink-0">
                <TiltCard cert={cert} onClick={() => setSelectedIdx(originalIndex)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const { scrollYProgress: parallaxProgress } = useScroll();
  const yParallax = useTransform(parallaxProgress, [0, 1], [0, -40]);

  return (
    <section id="certificates" className="pt-12 pb-0 relative bg-slate-50 dark:bg-[#0a0f1d] overflow-hidden transition-colors duration-500">
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neonBlue to-neonPurple z-50 origin-left"
        style={{ scaleX }}
      />

      <ParticlesBackground />
      
      {/* Background soft gradient light rays */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neonBlue/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neonPurple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/5 rounded-[100%] blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6 tracking-tight uppercase drop-shadow-sm transition-colors duration-500">
            CERTIFICATES
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
          <p className="mt-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed transition-colors duration-500">
            A showcase of my continuous learning journey, certifications, and verified skills from industry-leading platforms.
          </p>
        </motion.div>
      </div>

      {/* Clean Infinite Marquee Scroll without Parallax to remove bottom gap */}
      <motion.div className="w-full pb-0 relative flex flex-col gap-2">
        
        {/* Deep gradient fades for edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 dark:from-[#0a0f1d] to-transparent z-20 pointer-events-none transition-colors duration-500"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 dark:from-[#0a0f1d] to-transparent z-20 pointer-events-none transition-colors duration-500"></div>
        
        {/* Single Marquee Track */}
        <MarqueeTrack items={certificates} direction="left" duration="150s" rowIndex={0} />
        
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedIdx !== null && activeCert && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-white/90 dark:bg-[#0a0f1d]/90 flex items-center justify-center p-4 md:p-8 transition-colors duration-500"
            onClick={() => setSelectedIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Certificate Image Viewer"
          >
            <button 
              className="absolute top-6 right-6 text-slate-500 dark:text-slate-400 hover:text-slate-900 hover:dark:text-white bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 hover:dark:bg-slate-700 p-3 rounded-full transition-all z-50 border border-slate-300 dark:border-slate-700 hover:border-slate-400 hover:dark:border-white/20 shadow-sm"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close modal"
            >
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-12 text-slate-500 dark:text-slate-400 hover:text-neonBlue bg-slate-100/80 dark:bg-slate-900/80 hover:bg-white hover:dark:bg-slate-800 p-4 rounded-full transition-all z-50 border border-slate-300 dark:border-slate-700 hover:border-neonBlue hover:dark:border-neonBlue hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group backdrop-blur-md shadow-sm"
              onClick={handlePrev}
              aria-label="Previous certificate"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              className="absolute right-4 md:right-12 text-slate-500 dark:text-slate-400 hover:text-neonBlue bg-slate-100/80 dark:bg-slate-900/80 hover:bg-white hover:dark:bg-slate-800 p-4 rounded-full transition-all z-50 border border-slate-300 dark:border-slate-700 hover:border-neonBlue hover:dark:border-neonBlue hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group backdrop-blur-md shadow-sm"
              onClick={handleNext}
              aria-label="Next certificate"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-5xl w-full bg-white/95 dark:bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/50 shadow-2xl relative transition-colors duration-500"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 dark:from-neonBlue/10 dark:to-neonPurple/10 pointer-events-none mix-blend-overlay"></div>
              
              <div className="aspect-[16/10] md:aspect-[21/9] bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-2 md:p-8 relative transition-colors duration-500">
                {activeCert.image ? (
                  <img 
                    src={activeCert.image} 
                    alt={activeCert.title} 
                    className="w-full h-full object-contain drop-shadow-2xl rounded-xl" 
                  />
                ) : (
                  <div className="text-slate-400 dark:text-slate-600 font-medium text-2xl flex flex-col items-center gap-4">
                    <ZoomIn size={48} className="text-slate-300 dark:text-slate-700" />
                    <span>No High-Res Image Provided</span>
                  </div>
                )}
              </div>
              
              <div className="p-8 md:p-10 text-center relative z-10 border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-500">
                <div className="text-left flex-1">
                  <div className="inline-block bg-neonBlue/10 dark:bg-neonBlue/20 text-neonBlue text-sm font-semibold px-3 py-1 rounded-full mb-3 border border-neonBlue/20 dark:border-neonBlue/30 transition-colors duration-500">
                    {activeCert.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight drop-shadow-sm transition-colors duration-500">{activeCert.title}</h3>
                  <div className="text-slate-600 dark:text-slate-400 text-lg flex items-center gap-3 transition-colors duration-500">
                    <span className="text-slate-800 dark:text-slate-300 font-medium">{activeCert.issuer}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span>{activeCert.date}</span>
                  </div>
                </div>
                
                <a 
                  href={activeCert.image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-neonBlue/10 to-neonPurple/10 hover:from-neonBlue hover:to-neonPurple hover:text-white dark:from-neonBlue/20 dark:to-neonPurple/20 border border-neonBlue/30 dark:border-neonBlue/50 text-neonBlue font-semibold rounded-xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)] dark:shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-2 group"
                >
                  <span>Open Full Size</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
