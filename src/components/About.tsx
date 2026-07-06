"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Layers, Sparkles, Zap, CheckCircle2, Award } from "lucide-react";
import Image from "next/image";

const highlights = [
  "Full Stack Web Development (Frontend + Backend)",
  "REST API development and integration",
  "Responsive and modern UI design",
  "Database design and management",
  "Performance optimization",
  "Clean and maintainable code",
  "Problem-solving mindset",
  "Continuous learning and improvement"
];

const stats = [
  { label: "Years Experience", value: "2.5+", icon: Terminal, color: "text-neonBlue" },
  { label: "Projects Completed", value: "18+", icon: Layers, color: "text-neonPurple" },
  { label: "Tech Mastered", value: "15+", icon: Cpu, color: "text-cyan-400" },
  { label: "Certificates", value: "40+", icon: Award, color: "text-neonBlue" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="py-12 relative overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-neonPurple/5 dark:bg-neonPurple/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-neonBlue/5 dark:bg-neonBlue/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors duration-500">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center lg:items-start">

          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-7/12 flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-500">
                I am Abdulla Thaslim, a passionate <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-cyan-500 dark:to-cyan-400">Full Stack Developer</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light transition-colors duration-500">
                focused on building modern, scalable, and secure web applications.
                I bridge the gap between elegant user interfaces and robust backend architectures to deliver complete digital solutions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2 transition-colors duration-500">
                <Zap size={20} className="text-neonPurple" />
                Core Highlights
              </h4>
              <div className="grid md:grid-cols-2 gap-x-4 gap-y-4">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-neonBlue/10 flex items-center justify-center border border-neonBlue/30 group-hover:bg-neonBlue/20 dark:group-hover:bg-neonBlue/30 transition-colors">
                      <CheckCircle2 size={12} className="text-neonBlue" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-neonBlue transition-colors">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="glass-panel bg-white/70 dark:bg-white/5 relative p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-transparent border-l-4 border-l-neonPurple bg-gradient-to-r from-neonPurple/5 to-transparent hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-shadow duration-300">
                <Sparkles size={24} className="absolute top-4 right-4 text-neonPurple/40" />
                <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 italic font-light leading-relaxed relative z-10 transition-colors duration-500">
                  "I enjoy turning complex problems into simple, efficient, and user-friendly digital solutions."
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Profile & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-5/12 flex flex-col items-center gap-8"
          >
            {/* Image Container */}
            <div className="relative w-full max-w-sm aspect-[4/5] glass-panel bg-white/70 dark:bg-white/5 rounded-2xl p-3 border border-slate-200 dark:border-white/10 group shadow-sm hover:shadow-md transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 rounded-2xl z-0" />
              <div className="w-full h-full rounded-2xl overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-white/5">
                <Image
                  src="/assets/profile2.png"
                  alt="Abdulla Thaslim"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-200 dark:from-[#050505] via-transparent to-transparent opacity-80 mix-blend-multiply" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel bg-white/70 dark:bg-white/5 p-4 rounded-2xl border-slate-200 dark:border-white/5 hover:border-neonBlue/50 dark:hover:border-neonBlue/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <stat.icon size={28} className={`${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`} />
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-500">{stat.value}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider transition-colors duration-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
