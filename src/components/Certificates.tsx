"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// Generated certificates from the assets folder
const certificates = [
  { id: 1, title: "Software Engineer (Basic)", issuer: "HackerRank", date: "2026", image: "/assets/certificates/certificates.jpeg" },
  { id: 2, title: "JavaScript (Basic)", issuer: "HackerRank", date: "2026", image: "/assets/certificates/certificates1.jpeg" },
  { id: 3, title: "CSS (Basic)", issuer: "HackerRank", date: "2026", image: "/assets/certificates/certificates2.jpeg" },
  { id: 4, title: "Frontend Developer (React)", issuer: "HackerRank", date: "2026", image: "/assets/certificates/certificates3.jpeg" },
  { id: 5, title: "Multicloud Network Associate", issuer: "Aviatrix", date: "2025", image: "/assets/certificates/certificates4.jpeg" },
  { id: 6, title: "Ethical Hacking 101", issuer: "Simplilearn", date: "2025", image: "/assets/certificates/certificates5.jpeg" },
  { id: 7, title: "Machine Learning Using Python", issuer: "Simplilearn", date: "2025", image: "/assets/certificates/certificates6.jpeg" },
  { id: 8, title: "Introduction to Artificial Intelligence", issuer: "Simplilearn", date: "2025", image: "/assets/certificates/certificates7.jpeg" },
  { id: 9, title: "Get Started with SQL Analytics and BI on Databricks", issuer: "Simplilearn", date: "2025", image: "/assets/certificates/certificates8.jpeg" },
  { id: 10, title: "Introduction to C#", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates9.jpeg" },
  { id: 11, title: "Cybersecurity Foundations", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates10.jpeg" },
  { id: 12, title: "Introduction to C", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates11.jpeg" },
  { id: 13, title: "Cybersecurity Foundations", issuer: "LinkedIn Learning", date: "Apr 22, 2025", image: "/assets/certificates/certificates12.jpeg" },
  { id: 14, title: "Introduction to C", issuer: "Sololearn", date: "April 18, 2025", image: "/assets/certificates/certificates13.jpeg" },
  { id: 15, title: "Administrative Professional Foundations", issuer: "LinkedIn Learning", date: "Apr 16, 2025", image: "/assets/certificates/certificates14.jpeg" },
  { id: 16, title: "IT Security Foundations", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates15.jpeg" },
  { id: 17, title: "Web Development Foundations", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates16.jpeg" },
  { id: 18, title: "Network Security Basics", issuer: "LinkedIn Learning", date: "2025", image: "/assets/certificates/certificates17.jpeg" },
  { id: 19, title: "Computer Hardware Basics", issuer: "Cisco Networking Academy", date: "June 26, 2023", image: "/assets/certificates/certificates18.jpg" },
  { id: 20, title: "Introduction to Microsoft Excel", issuer: "Coursera", date: "Oct 19, 2024", image: "/assets/certificates/certificates19.jpg" },
  { id: 21, title: "Increase SEO Traffic with WordPress", issuer: "Coursera", date: "Oct 5, 2024", image: "/assets/certificates/certificates20.jpg" },
  { id: 22, title: "Build a free website with WordPress", issuer: "Coursera", date: "Oct 6, 2024", image: "/assets/certificates/certificates21.jpg" },
  { id: 23, title: "Cyber Threat Management", issuer: "Cisco Networking Academy", date: "June 26, 2023", image: "/assets/certificates/certificates22.jpg" },
  { id: 24, title: "Ethical Hacker", issuer: "Cisco Networking Academy", date: "July 02, 2024", image: "/assets/certificates/certificates23.jpg" },
  { id: 25, title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "June 25, 2023", image: "/assets/certificates/certificates24.jpg" },
  { id: 26, title: "Introduction to Data Science", issuer: "Cisco Networking Academy", date: "June 26, 2023", image: "/assets/certificates/certificates25.jpg" },
  { id: 27, title: "Introduction to Internet of Things", issuer: "Cisco Networking Academy", date: "July 03, 2023", image: "/assets/certificates/certificates26.jpg" },
  { id: 28, title: "Network Addressing and Basic Troubleshooting", issuer: "Cisco Networking Academy", date: "July 04, 2024", image: "/assets/certificates/certificates27.jpg" },
  { id: 29, title: "Network Defense", issuer: "Cisco Networking Academy", date: "July 26, 2024", image: "/assets/certificates/certificates28.jpg" },
  { id: 30, title: "Network Support and Security", issuer: "Cisco Networking Academy", date: "August 21, 2024", image: "/assets/certificates/certificates29.jpg" },
  { id: 31, title: "Networking Basics", issuer: "Cisco Networking Academy", date: "July 04, 2023", image: "/assets/certificates/certificates30.jpg" },
  { id: 32, title: "Operating Systems Basics", issuer: "Cisco Networking Academy", date: "June 26, 2023", image: "/assets/certificates/certificates31.jpg" },
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
      className="relative w-[300px] md:w-[380px] shrink-0 glass-panel rounded-2xl cursor-pointer group transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-slate-700/50 hover:border-neonBlue/50"
      onClick={onClick}
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="aspect-[4/3] bg-slate-900/80 relative flex items-center justify-center rounded-t-2xl overflow-hidden"
      >
        {cert.image ? (
          <img src={cert.image} alt={cert.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
        ) : (
          <div className="text-slate-500 font-medium">Image Placeholder</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <ZoomIn className="text-neonBlue w-12 h-12 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        </div>
      </div>
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="p-6 bg-slate-800/40 rounded-b-2xl backdrop-blur-sm"
      >
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neonBlue transition-colors">{cert.title}</h3>
        <div className="flex justify-between text-slate-400 text-sm">
          <span className="font-medium text-neonPurple">{cert.issuer}</span>
          <span>{cert.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Background Particles Component
function ParticlesBackground() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-neonBlue/30 rounded-full blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.1, 0.6, 0.1],
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "ArrowRight") setSelectedIdx((selectedIdx + 1) % certificates.length);
      if (e.key === "ArrowLeft") setSelectedIdx((selectedIdx - 1 + certificates.length) % certificates.length);
      if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  return (
    <section id="certificates" className="py-24 relative bg-slate-950 overflow-hidden">
      {/* CSS for infinite marquee and pause-on-hover */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: scrollMarquee 150s linear infinite;
        }
        .marquee-wrapper:hover .marquee-container {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .marquee-container {
            animation-duration: 200s;
          }
        }
      `}} />

      <ParticlesBackground />
      
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neonBlue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neonPurple/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6 tracking-tight uppercase">
            CERTIFICATES
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-8 text-slate-400 max-w-2xl mx-auto text-lg">
            A showcase of my continuous learning journey, certifications, and verified skills from industry-leading platforms.
          </p>
        </motion.div>
      </div>

      {/* Adding a subtle rotate and scale creates a multi-directional parallax feel */}
      <div className="marquee-wrapper overflow-hidden relative w-full pb-16 pt-8 -rotate-[1deg] scale-105" style={{ perspective: "1000px" }}>
        {/* Deep gradient fades for edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20 pointer-events-none"></div>
        
        <div className="marquee-container flex items-center">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="flex gap-8 pr-8">
              {certificates.map((cert, index) => (
                <TiltCard 
                  key={`${cert.id}-${setIndex}`} 
                  cert={cert} 
                  onClick={() => setSelectedIdx(index)} 
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedIdx !== null && activeCert && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-slate-950/90 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedIdx(null)}
          >
            <button 
              className="absolute top-6 right-6 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full transition-all z-50"
              onClick={() => setSelectedIdx(null)}
            >
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            <button 
              className="absolute left-4 md:left-12 text-slate-400 hover:text-neonBlue bg-slate-900/50 hover:bg-slate-900 p-3 rounded-full transition-all z-50 border border-slate-700 hover:border-neonBlue hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              onClick={handlePrev}
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              className="absolute right-4 md:right-12 text-slate-400 hover:text-neonBlue bg-slate-900/50 hover:bg-slate-900 p-3 rounded-full transition-all z-50 border border-slate-700 hover:border-neonBlue hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              onClick={handleNext}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-w-5xl w-full bg-slate-900/80 rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 pointer-events-none"></div>
              <div className="aspect-[16/10] md:aspect-[21/9] bg-slate-950 flex items-center justify-center p-2 md:p-8">
                {activeCert.image ? (
                  <img src={activeCert.image} alt={activeCert.title} className="w-full h-full object-contain drop-shadow-2xl" />
                ) : (
                  <div className="text-slate-600 font-medium text-2xl">No Image Provided</div>
                )}
              </div>
              <div className="p-8 md:p-10 text-center relative z-10 border-t border-slate-800 bg-slate-900/50">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">{activeCert.title}</h3>
                <div className="flex items-center justify-center gap-4 text-slate-400 text-lg">
                  <span className="text-neonPurple font-semibold">{activeCert.issuer}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                  <span>{activeCert.date}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
