"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Server } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              I am Abdulla Thaslim, a passionate Full Stack Developer focused on building modern web applications. 
              I specialize in bridging the gap between elegant frontend interfaces and robust backend architectures.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              With a strong foundation in problem-solving and a continuous learning mindset, I thrive on tackling complex challenges and optimizing performance to deliver seamless user experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-neonBlue/10 text-neonBlue rounded-lg">
                  <Layout size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Frontend</h4>
                  <p className="text-slate-400 text-sm">UI/UX, Responsive</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-neonPurple/10 text-neonPurple rounded-lg">
                  <Server size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Backend</h4>
                  <p className="text-slate-400 text-sm">APIs, Architecture</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
                  <Database size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Database</h4>
                  <p className="text-slate-400 text-sm">Design, Management</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-green-500/10 text-green-400 rounded-lg">
                  <Code2 size={24} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Clean Code</h4>
                  <p className="text-slate-400 text-sm">Optimization, Best Practices</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl glass-panel p-2 neon-glow-blue">
              <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center relative group">
                <Image
                  src="/assets/profile2.png"
                  alt="Abdulla Thaslim Profile 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-10">
                  <h3 className="text-4xl font-bold text-white mb-2 text-shadow-sm">3+</h3>
                  <p className="text-slate-200 uppercase tracking-widest text-sm font-semibold">Years Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
