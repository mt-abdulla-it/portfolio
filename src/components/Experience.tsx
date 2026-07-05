"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const experiences = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Mars Tech International Pvt Ltd",
    date: "Oct 2025 - Present",
    description: [
      "Build full-stack web applications using modern frameworks",
      "Develop RESTful APIs with Node.js",
      "Improve performance and deployment workflows"
    ],
  },
  {
    id: 2,
    title: "System Administrator",
    company: "Mars Tech International Pvt Ltd",
    date: "Oct 2024 - Sep 2025",
    description: [
      "Managed IT infrastructure and server systems",
      "Provided technical support and troubleshooting",
      "Ensured system security and stability"
    ],
  },
  {
    id: 3,
    title: "Digital Marketing Executive",
    company: "Ideal IT Solutions Pvt Ltd",
    date: "Oct 2023 - Sep 2024",
    description: [
      "Managed digital marketing campaigns",
      "Improved brand visibility and engagement",
      "Optimized SEO and analytics performance"
    ],
  }
];

// Reusable component for each Experience Item
function ExperienceCard({ exp, index }: { exp: typeof experiences[0], index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
      className={`relative flex items-center justify-between w-full mb-12 last:mb-0 ${
        isEven ? "md:flex-row-reverse" : "md:flex-row"
      } flex-col pl-12 md:pl-0`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-6 md:left-1/2 top-6 md:top-8 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 border-2 border-neonBlue shadow-[0_0_15px_rgba(59,130,246,0.5)] z-20 flex items-center justify-center transition-transform hover:scale-125 duration-300">
        <div className="w-3 h-3 rounded-full bg-neonPurple animate-pulse" />
      </div>

      {/* Empty Space for Desktop Alternate Layout */}
      <div className="hidden md:block w-5/12" />

      {/* Experience Card */}
      <div className="w-full md:w-5/12">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-panel border border-white/5 rounded-2xl p-6 md:p-8 hover:border-neonBlue/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neonBlue transition-colors">
                {exp.title}
              </h3>
              <div className="flex items-center gap-2 text-slate-300 mt-1 font-medium">
                <Briefcase size={16} className="text-neonPurple" />
                <span>{exp.company}</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span className="inline-block px-3 py-1 bg-white/10 text-slate-300 text-xs font-mono rounded-full border border-white/5 whitespace-nowrap">
                {exp.date}
              </span>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }} 
                transition={{ duration: 0.3 }}
                className="text-slate-400 group-hover:text-neonBlue"
              >
                <ChevronDown size={20} />
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-3 mt-6 pt-4 border-t border-white/10">
                  {exp.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm md:text-base leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neonBlue/70 shrink-0 shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden" id="experience">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-neonBlue/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-neonPurple/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Experience</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A timeline of my professional journey, roles, and accomplishments. Click on any role to view details.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto py-10">
          {/* Central Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden">
            {/* Active glowing indicator that follows scroll */}
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-neonBlue via-cyan-400 to-neonPurple h-full"
              style={{ scaleY: scrollYProgress, originY: 0 }}
            />
          </div>

          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
