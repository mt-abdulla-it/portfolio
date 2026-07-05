"use client";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import { GraduationCap, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

const educationDetails = [
  {
    id: 1,
    degree: "Bachelor of Information Technology (BIT) External Degree",
    institution: "University of Moratuwa",
    date: "Feb 2025 - Dec 2027",
    description: [
      "Comprehensive study of modern software engineering principles and scalable system architecture",
      "Hands-on projects focusing on full-stack development, database optimization, and algorithm design",
      "Developing analytical and problem-solving skills for complex technological challenges"
    ],
  },
  {
    id: 2,
    degree: "Artificial Intelligence Internship Training",
    institution: "Mars Tech Campus",
    date: "Nov 2023 - Present",
    description: [
      "Practical training in developing and deploying Machine Learning models and AI algorithms",
      "Working with large datasets for data preprocessing, feature engineering, and predictive modeling",
      "Exploring real-world AI applications including natural language processing and computer vision"
    ],
  },
  {
    id: 3,
    degree: "Cyber Security Internship Training",
    institution: "Mars Tech Campus",
    date: "Nov 2023 - Present",
    description: [
      "Conducting comprehensive vulnerability assessments and threat modeling for web applications",
      "Applying ethical hacking methodologies to identify and mitigate network security risks",
      "Learning advanced cryptographic protocols, access control mechanisms, and incident response"
    ],
  },
  {
    id: 4,
    degree: "Computer Hardware Technician (NVQ Level 4)",
    institution: "Insight - Mawanella Centre for Technical Training",
    date: "Oct 2023 - Apr 2025",
    description: [
      "Mastered component-level diagnostics, assembly, and repair of complex computing systems",
      "Configured and maintained local area networks (LANs), ensuring high availability and security",
      "Provided technical support and preventative maintenance to optimize hardware performance"
    ],
  }
];

// Reusable component for each Education Item
function EducationCard({ edu, index }: { edu: typeof educationDetails[0], index: number }) {
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
      <div className="absolute left-6 md:left-1/2 top-6 md:top-8 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white dark:bg-slate-900 border-2 border-neonPurple shadow-[0_0_15px_rgba(168,85,247,0.3)] dark:shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20 flex items-center justify-center transition-transform hover:scale-125 duration-300">
        <div className="w-3 h-3 rounded-full bg-neonBlue animate-pulse" />
      </div>

      {/* Empty Space for Desktop Alternate Layout */}
      <div className="hidden md:block w-5/12" />

      {/* Education Card */}
      <div className="w-full md:w-5/12">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="glass-panel bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 hover:border-neonPurple/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] transition-all duration-300 group cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-neonPurple dark:group-hover:text-neonPurple transition-colors">
                {edu.degree}
              </h3>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 mt-2 font-medium">
                <GraduationCap size={16} className="text-neonBlue min-w-[16px]" />
                <span>{edu.institution}</span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
              <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono rounded-full border border-slate-300 dark:border-white/5 whitespace-nowrap">
                {edu.date}
              </span>
              <motion.div 
                animate={{ rotate: isExpanded ? 180 : 0 }} 
                transition={{ duration: 0.3 }}
                className="text-slate-500 dark:text-slate-400 group-hover:text-neonPurple"
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
                <ul className="space-y-3 mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  {edu.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neonPurple/70 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
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

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500" id="education">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-neonPurple/5 dark:bg-neonPurple/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-neonBlue/5 dark:bg-neonBlue/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-500">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPurple to-neonBlue">Education</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto transition-colors duration-500">
            A chronological timeline of my academic background and professional training.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-5xl mx-auto py-10">
          {/* Central Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-300 dark:bg-slate-800 -translate-x-1/2 rounded-full overflow-hidden transition-colors duration-500">
            {/* Active glowing indicator that follows scroll */}
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-neonPurple via-purple-400 to-neonBlue h-full"
              style={{ scaleY: scrollYProgress, originY: 0 }}
            />
          </div>

          {educationDetails.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
