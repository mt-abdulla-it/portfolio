"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileCode2, FileType2, FileJson, Layers, LayoutTemplate, Layout, Blocks,
  Server, Network, Code2, Cpu,
  Database, GitBranch, Github, Code, Box,
  Globe, ShieldCheck, Smartphone, PenTool, Search
} from "lucide-react";

const skillCategories = ["All", "Frontend", "Backend", "Database", "Tools", "Other"];

const skillsData = [
  // Frontend
  { name: "HTML5", category: "Frontend", level: 95, icon: FileCode2, desc: "Semantic, accessible markup" },
  { name: "CSS3", category: "Frontend", level: 90, icon: LayoutTemplate, desc: "Modern layouts & animations" },
  { name: "JavaScript", category: "Frontend", level: 92, icon: FileJson, desc: "ES6+, async programming" },
  { name: "TypeScript", category: "Frontend", level: 88, icon: FileType2, desc: "Strong static typing" },
  { name: "React.js", category: "Frontend", level: 90, icon: Blocks, desc: "Component-based UI" },
  { name: "Next.js", category: "Frontend", level: 85, icon: Layers, desc: "SSR & SSG framework" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, icon: PenTool, desc: "Utility-first styling" },
  { name: "Bootstrap", category: "Frontend", level: 80, icon: Layout, desc: "Responsive component library" },
  
  // Backend
  { name: "Node.js", category: "Backend", level: 88, icon: Server, desc: "Server-side JavaScript" },
  { name: "Express.js", category: "Backend", level: 85, icon: Network, desc: "Fast minimalist web framework" },
  { name: "PHP", category: "Backend", level: 75, icon: Code2, desc: "Server-side scripting" },
  { name: "Python", category: "Backend", level: 70, icon: Cpu, desc: "Scripting & data processing" },

  // Database
  { name: "MySQL", category: "Database", level: 85, icon: Database, desc: "Relational database" },
  { name: "PostgreSQL", category: "Database", level: 80, icon: Database, desc: "Advanced object-relational DB" },
  { name: "MongoDB", category: "Database", level: 88, icon: Database, desc: "NoSQL document database" },

  // Tools
  { name: "Git", category: "Tools", level: 92, icon: GitBranch, desc: "Version control system" },
  { name: "GitHub", category: "Tools", level: 90, icon: Github, desc: "Code hosting & collaboration" },
  { name: "VS Code", category: "Tools", level: 95, icon: Code, desc: "Primary code editor" },
  { name: "Postman", category: "Tools", level: 85, icon: Network, desc: "API testing & documentation" },
  { name: "Docker", category: "Tools", level: 75, icon: Box, desc: "Containerization platform" },

  // Other Skills
  { name: "REST API Development", category: "Other", level: 90, icon: Server, desc: "Scalable API architecture" },
  { name: "Authentication (JWT)", category: "Other", level: 85, icon: ShieldCheck, desc: "Secure user sessions" },
  { name: "Responsive Web Design", category: "Other", level: 95, icon: Smartphone, desc: "Mobile-first approach" },
  { name: "UI/UX Design", category: "Other", level: 80, icon: PenTool, desc: "User-centric interfaces" },
  { name: "SEO Optimization", category: "Other", level: 85, icon: Search, desc: "Search engine visibility" },
  { name: "WordPress Development", category: "Other", level: 80, icon: Globe, desc: "CMS development & themes" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#050505]">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-neonBlue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-neonPurple/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical expertise, categorized by domain. Hover over cards for details.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? "text-white"
                  : "text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-white/10"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-neonBlue/80 to-neonPurple/80 rounded-full -z-10 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative group glass-panel p-6 rounded-2xl border border-white/5 hover:border-neonBlue/40 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] transition-all duration-300"
              >
                {/* Custom Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-slate-800 text-xs text-white px-3 py-1.5 rounded-lg whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.3)] z-20 translate-y-2 group-hover:translate-y-0">
                  {skill.desc}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900/80 flex items-center justify-center text-cyan-400 group-hover:text-neonBlue group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 border border-white/5 group-hover:border-neonBlue/30">
                    <skill.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neonBlue group-hover:to-cyan-400 transition-all">
                      {skill.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-slate-400 text-xs">{skill.category}</span>
                      <span className="text-neonBlue text-xs font-mono font-bold">{skill.level}%</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-neonBlue to-neonPurple rounded-full relative shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  >
                    {/* Animated shine effect */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      className="absolute top-0 bottom-0 left-0 w-6 bg-white/30 blur-[3px] skew-x-12"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
