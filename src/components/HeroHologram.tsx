"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Database } from "lucide-react";
import Image from "next/image";

export default function HeroHologram() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full lg:w-1/2 relative min-h-[320px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center mt-8 md:mt-0 mb-16 md:mb-0"
    >
      {/* Core Glowing Sphere */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 dark:from-neonBlue dark:to-neonPurple blur-2xl md:blur-3xl"
        />
      </div>
      
      {/* Orbiting Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[240px] h-[240px] md:w-[450px] md:h-[450px] rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center transition-colors duration-500"
      >
        <div className="absolute top-0 w-2 h-2 md:w-3 md:h-3 bg-blue-500 dark:bg-neonBlue rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <div className="absolute bottom-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 dark:bg-neonPurple rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
      </motion.div>
      
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute w-[160px] h-[160px] md:w-[320px] md:h-[320px] rounded-full border border-slate-200/50 dark:border-white/5 flex items-center justify-center transition-colors duration-500"
      >
        <div className="absolute left-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
      </motion.div>

      {/* Central Hologram Component with Profile Picture */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 rounded-full p-1.5 md:p-2 w-48 h-48 md:w-72 md:h-72 flex items-center justify-center shadow-sm backdrop-blur-md group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 dark:from-neonBlue/10 dark:to-neonPurple/10 z-0 animate-pulse" />
        
        <div className="w-full h-full rounded-full overflow-hidden relative z-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
          <Image 
            src="/assets/profile.jpg" 
            alt="Abdulla Thaslim" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
        </div>
      </motion.div>

      {/* Floating Code Snippets */}
      <motion.div 
        animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 sm:top-0 md:top-[5%] -left-10 sm:-left-12 md:-left-16 z-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2.5 md:p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm min-w-[130px] sm:min-w-[140px] md:min-w-[220px] scale-90 sm:scale-100 origin-top-left"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="ml-2 flex items-center gap-1.5">
            <Code2 size={12} className="text-slate-400" />
            <span className="text-[10px] md:text-xs font-mono text-slate-500">frontend.tsx</span>
          </div>
        </div>
        <pre className="text-[9px] md:text-[11px] font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="text-purple-500 dark:text-purple-400">export default</span> <span className="text-blue-500 dark:text-blue-400">function</span> <span className="text-amber-500 dark:text-yellow-200">App</span>() {'{\n'}
          {'  '}<span className="text-purple-500 dark:text-purple-400">return</span> {'(\n'}
          {'    '}&lt;<span className="text-blue-500 dark:text-neonBlue">Hero</span> /&gt;{'\n'}
          {'  )'};{'\n'}
          {'}'}
        </pre>
      </motion.div>

      <motion.div 
        animate={{ y: [8, -8, 8], rotate: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 sm:bottom-0 md:bottom-[5%] -right-10 sm:-right-12 md:-right-16 z-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-2.5 md:p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm min-w-[130px] sm:min-w-[140px] md:min-w-[220px] scale-90 sm:scale-100 origin-bottom-right"
      >
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="ml-2 flex items-center gap-1.5">
            <Database size={12} className="text-slate-400" />
            <span className="text-[10px] md:text-xs font-mono text-slate-500">api.ts</span>
          </div>
        </div>
        <pre className="text-[9px] md:text-[11px] font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="text-purple-500 dark:text-purple-400">async</span> <span className="text-blue-500 dark:text-blue-400">function</span> <span className="text-amber-500 dark:text-yellow-200">fetch</span>() {'{\n'}
          {'  '}<span className="text-purple-500 dark:text-purple-400">await</span> <span className="text-blue-400 dark:text-blue-300">db</span>.<span className="text-amber-500 dark:text-yellow-200">connect</span>();{'\n'}
          {'  '}<span className="text-purple-500 dark:text-purple-400">return</span> <span className="text-green-500 dark:text-green-400">"Success"</span>;{'\n'}
          {'}'}
        </pre>
      </motion.div>

      <motion.div 
        animate={{ y: [-5, 5, -5], x: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -top-[5%] right-[5%] md:right-[10%] z-0 bg-white/50 dark:bg-slate-800/50 p-2 md:p-3 rounded-lg border border-slate-200 dark:border-white/10 opacity-60 backdrop-blur-sm"
      >
        <Terminal size={16} className="text-slate-400 md:w-5 md:h-5" />
      </motion.div>
    </motion.div>
  );
}
