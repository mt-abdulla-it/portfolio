"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 ml-4 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:ring-2 hover:ring-neonBlue/50 transition-all duration-300 overflow-hidden flex items-center justify-center w-10 h-10 shadow-sm"
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? -30 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: "backInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={20} className="text-amber-500" />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: theme === "dark" ? 0 : 30,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "backInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} className="text-neonBlue" />
      </motion.div>
    </button>
  );
}
