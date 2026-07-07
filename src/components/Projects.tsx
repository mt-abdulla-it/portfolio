"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Search, Calendar, Code2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  fork: boolean;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatProjectName = (name: string) => {
  let formatted = name.replace(/[-_]/g, ' ');
  formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
  formatted = formatted.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  if (formatted === 'Edu Quiz' || formatted === 'Eduquiz') return 'Interactive Quiz Platform';
  if (formatted === 'Mars Tech') return 'Mars Tech App';
  if (formatted === 'Bulky' || formatted.toLowerCase().includes('bulky')) return 'E-Commerce Web App';
  
  return formatted;
};

const getProjectDescription = (name: string, originalDesc: string) => {
  if (originalDesc && originalDesc.length > 20) return originalDesc;
  
  const formatted = formatProjectName(name);
  switch(formatted) {
    case 'Interactive Quiz Platform': return 'A dynamic and engaging platform for creating and taking interactive quizzes.';
    case 'E-Commerce Web App': return 'A full-featured E-Commerce web application featuring robust product management and a secure checkout process.';
    case 'Perception Mapper': return 'An advanced mapping tool for visualizing and analyzing complex data structures and networks.';
    case 'Payroll Management System': return 'A comprehensive system designed to streamline employee payroll, calculations, and management.';
    case 'Operating System': return 'A low-level operating system concept demonstrating core OS principles and system architecture.';
    default: return 'A modern application built with a strong focus on clean code, performance, and premium user experience.';
  }
};

// --- FALLBACK DATA ---
const fallbackProjects: Repo[] = [
  {
    id: 101, name: "Edu Quiz", description: "", html_url: "https://github.com/mt-abdulla-it/Edu-Quiz", homepage: "",
    stargazers_count: 15, forks_count: 3, language: "TypeScript", updated_at: new Date().toISOString(), fork: false
  },
  {
    id: 102, name: "Bulky", description: "", html_url: "https://github.com/mt-abdulla-it/Bulky", homepage: "",
    stargazers_count: 12, forks_count: 2, language: "C#", updated_at: new Date(Date.now() - 86400000).toISOString(), fork: false
  },
  {
    id: 103, name: "Perception Mapper", description: "", html_url: "https://github.com/mt-abdulla-it/Perception-Mapper", homepage: "",
    stargazers_count: 8, forks_count: 1, language: "JavaScript", updated_at: new Date(Date.now() - 172800000).toISOString(), fork: false
  },
  {
    id: 104, name: "Collage Management System", description: "A comprehensive college management system built to handle student and administrative tasks.", html_url: "https://github.com/mt-abdulla-it/Application/tree/main/Collage%20management%20system", homepage: "",
    stargazers_count: 5, forks_count: 1, language: "Full Stack", updated_at: new Date(Date.now() - 259200000).toISOString(), fork: false
  }
];

// Explicitly define top projects to feature
const FEATURED_PRIORITY = ["Interactive Quiz Platform", "E-Commerce Web App", "Mars Tech App", "Collage Management System"];

// --- COMPONENTS ---

const ProjectImage = ({ repoName, className }: { repoName: string, className?: string }) => {
  const imageVariations = useMemo(() => {
    const formattedName = formatProjectName(repoName);
    const unhyphenatedName = formattedName.replace(/-/g, ' ');
    
    return [
      `/projects/${repoName}.jpg`,
      `/projects/${repoName}.png`,
      `/projects/${repoName}.jpeg`,
      `/projects/${formattedName}.jpg`,
      `/projects/${formattedName}.png`,
      `/projects/${formattedName}.jpeg`,
      `/projects/${unhyphenatedName}.jpg`,
      `/projects/${unhyphenatedName}.png`,
      `/projects/${unhyphenatedName}.jpeg`,
      `/projects/${repoName.toLowerCase()}.jpg`,
      `/projects/${repoName.toLowerCase()}.png`
    ];
  }, [repoName]);

  const [imgIndex, setImgIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (imgIndex < imageVariations.length - 1) {
      setImgIndex(prev => prev + 1);
    } else {
      setImgError(true);
    }
  };

  if (!imgError) {
    return (
      <Image 
        src={imageVariations[imgIndex]} 
        alt={repoName}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={cn("object-cover transition-transform duration-700", className)}
        onError={handleImageError}
        priority={className?.includes('featured')}
      />
    );
  }
  
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      <ImageIcon size={48} className="text-slate-400/50 dark:text-slate-600/50" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
    </div>
  );
};

const ProjectCard = ({ repo, index }: { repo: Repo, index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      className="group relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_40px_rgba(0,243,255,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/60 dark:to-slate-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Project Image Area */}
      <div className="relative w-full h-52 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <ProjectImage repoName={repo.name} className="group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-neonBlue transition-colors truncate pr-4" title={formatProjectName(repo.name)}>
            {formatProjectName(repo.name)}
          </h3>
          <div className="flex gap-2 shrink-0">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-2 bg-slate-100/80 dark:bg-slate-800/80 rounded-full text-slate-500 hover:text-neonBlue hover:bg-neonBlue/10 transition-all duration-300 backdrop-blur-sm" aria-label="GitHub Repo">
              <Github size={16} />
            </a>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
          {getProjectDescription(repo.name, repo.description)}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-700/50">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-inner dark:shadow-none border border-slate-200/50 dark:border-transparent">
            <span className="w-2 h-2 rounded-full bg-neonBlue animate-pulse"></span>
            {repo.language || "Unknown"}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors cursor-default bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
              <Star size={14} className="group-hover:fill-yellow-500/20" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-default bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
              <GitFork size={14} /> {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLang, setFilterLang] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/mt-abdulla-it/repos?per_page=100");
        if (!res.ok) throw new Error("API rate limit or error");
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          const excludedProjects = [
            "mt-abdulla-it", "Mars-Tech-Assignment", "abdullah-dev", "Python", 
            "OSINT-Blog-Post", "app", "DI_Serivce_Lifetime", "Flutter", 
            "HTML-CSS-JS", "Application", "Artificial-Intelligence", "portfolio", 
            "Network-Scanner", "Network_Scanner", "NetworkScanner", "Network Scanner"
          ];
          
          let validRepos = data.filter(r => !r.fork && !excludedProjects.includes(r.name));
          
          // Manually add the requested subfolder projects
          const customProjects: Repo[] = [
            {
              id: 9999991, name: "Collage Management System", description: "A comprehensive college management system built to handle student and administrative tasks.", html_url: "https://github.com/mt-abdulla-it/Application/tree/main/Collage%20management%20system", homepage: "",
              stargazers_count: 0, forks_count: 0, language: "Full Stack", updated_at: new Date().toISOString(), fork: false
            },
            {
              id: 9999992, name: "Mars Tech", description: "An innovative application developed for Mars Tech assignment featuring modern UI.", html_url: "https://github.com/mt-abdulla-it/Application/tree/main/Mars%20Tech", homepage: "",
              stargazers_count: 0, forks_count: 0, language: "Full Stack", updated_at: new Date().toISOString(), fork: false
            }
          ];
          
          validRepos = [...validRepos, ...customProjects];
          setRepos(validRepos);
        } else {
          throw new Error("Invalid format");
        }
      } catch (error) {
        console.error("Failed to fetch repos, using fallback data", error);
        setRepos(fallbackProjects);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filteredRepos = useMemo(() => {
    let result = repos.filter((r) => {
      const matchesSearch = formatProjectName(r.name).toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLang = filterLang === "All" || r.language === filterLang;
      return matchesSearch && matchesLang;
    });

    if (sortBy === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "name") {
      result.sort((a, b) => formatProjectName(a.name).localeCompare(formatProjectName(b.name)));
    } else {
      result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return result;
  }, [repos, searchTerm, filterLang, sortBy]);

  // Determine the best featured projects based on the priority list, falling back to the first available
  const { featuredProjects, standardProjects } = useMemo(() => {
    if (filteredRepos.length === 0) return { featuredProjects: [], standardProjects: [] };

    let featuredIndices: number[] = [];
    
    // Only apply priority logic if sorting by recent (default) or stars
    if (sortBy === "recent" || sortBy === "stars") {
      for (const priorityName of FEATURED_PRIORITY) {
        const index = filteredRepos.findIndex(r => formatProjectName(r.name) === priorityName);
        if (index !== -1 && !featuredIndices.includes(index)) {
          featuredIndices.push(index);
          if (featuredIndices.length === 2) break;
        }
      }
    }

    // Fill the rest up to 2 if there aren't enough priorities found
    let i = 0;
    while (featuredIndices.length < 2 && i < filteredRepos.length) {
      if (!featuredIndices.includes(i)) {
        featuredIndices.push(i);
      }
      i++;
    }

    const featureds = featuredIndices.map(idx => filteredRepos[idx]);
    const standards = filteredRepos.filter((_, idx) => !featuredIndices.includes(idx));
    
    return { featuredProjects: featureds, standardProjects: standards };
  }, [filteredRepos, sortBy]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-full h-full max-w-[1000px] pointer-events-none -z-10 opacity-40">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-neonBlue/80 blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-neonPurple/80 blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-[1200px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neonBlue/10 border border-neonBlue/20 text-neonBlue text-sm font-semibold mb-6">
            <Star size={16} className="fill-neonBlue" />
            <span>Portfolio Showcase</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed">
            A curated showcase of my best work, open-source contributions, and robust applications built with modern web technologies.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16 p-4 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg border border-white/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
        >
          <div className="relative w-full lg:w-[28rem] group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neonBlue transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl py-3.5 pl-14 pr-4 focus:outline-none focus:border-neonBlue/60 focus:ring-2 focus:ring-neonBlue/20 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              <select
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                className="w-full sm:w-44 bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl py-3.5 pl-12 pr-10 focus:outline-none focus:border-neonPurple/60 focus:ring-2 focus:ring-neonPurple/20 transition-all appearance-none cursor-pointer font-medium"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{lang}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-48 bg-white/60 dark:bg-slate-950/50 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl py-3.5 px-6 pr-10 focus:outline-none focus:border-neonBlue/60 focus:ring-2 focus:ring-neonBlue/20 transition-all appearance-none cursor-pointer font-medium"
              >
                <option value="recent" className="bg-white dark:bg-slate-900">Recently Updated</option>
                <option value="stars" className="bg-white dark:bg-slate-900">Most Stars</option>
                <option value="name" className="bg-white dark:bg-slate-900">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 rounded-3xl overflow-hidden h-[450px] flex flex-col relative shadow-sm">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 dark:via-white/5 to-transparent z-20 pointer-events-none"></div>
                <div className="w-full h-52 bg-slate-200/80 dark:bg-slate-800/80 shrink-0"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="w-1/2 h-7 bg-slate-200/80 dark:bg-slate-800/80 rounded-lg mb-4"></div>
                  <div className="w-full h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-md mb-3"></div>
                  <div className="w-full h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-md mb-3"></div>
                  <div className="w-3/4 h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-md mb-6"></div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="w-1/4 h-8 bg-slate-200/80 dark:bg-slate-800/80 rounded-full"></div>
                    <div className="w-1/3 h-8 bg-slate-200/80 dark:bg-slate-800/80 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            
            {/* Featured Projects Grid */}
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredProjects.map((featuredProject, index) => (
                  <motion.div
                    key={featuredProject.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/60 p-6 md:p-8 rounded-[2.5rem] overflow-hidden hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_rgba(0,243,255,0.07)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/10 via-transparent to-neonPurple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Featured Image Area */}
                      <div className="w-full h-64 md:h-72 bg-slate-200 dark:bg-slate-800 rounded-[2rem] overflow-hidden relative shadow-lg shrink-0 group-hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-shadow duration-500 border border-white/20 dark:border-white/5 mb-6 md:mb-8">
                        <ProjectImage repoName={featuredProject.name} className="featured group-hover:scale-105" />
                      </div>

                      <div className="flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-5">
                          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neonBlue bg-neonBlue/10 rounded-full border border-neonBlue/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                            Star Project
                          </span>
                          {featuredProject.language && (
                            <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full">
                              <span className="w-2.5 h-2.5 rounded-full bg-neonPurple animate-pulse"></span>
                              {featuredProject.language}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neonBlue group-hover:to-neonPurple transition-all duration-300 leading-tight">
                          {formatProjectName(featuredProject.name)}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-6 flex-grow leading-relaxed">
                          {getProjectDescription(featuredProject.name, featuredProject.description)}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 mb-6 md:mb-8 mt-auto">
                          <a 
                            href={featuredProject.html_url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xl hover:shadow-[0_10px_30px_rgba(0,243,255,0.2)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
                          >
                            <Github size={20} />
                            Source Code
                          </a>
                        </div>

                        <div className="flex flex-row flex-wrap gap-3 pt-5 md:pt-6 border-t border-slate-200 dark:border-slate-700/60">
                          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-medium">
                            <Star size={16} className="text-yellow-500 fill-yellow-500/20" />
                            <span className="font-bold md:text-base">{featuredProject.stargazers_count}</span> Stars
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-medium">
                            <GitFork size={16} className="text-blue-500" />
                            <span className="font-bold md:text-base">{featuredProject.forks_count}</span> Forks
                          </div>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 font-medium">
                            <Calendar size={16} className="text-purple-500" />
                            <span className="font-bold text-slate-900 dark:text-white">{formatDate(featuredProject.updated_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Grid for standard projects */}
            {standardProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {standardProjects.map((repo, index) => (
                    <ProjectCard key={repo.id} repo={repo} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {/* Empty State */}
            {featuredProjects.length === 0 && standardProjects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white/40 dark:bg-slate-900/30 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No projects found</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md">
                  We couldn't find any projects matching your current filters. Try adjusting your search term or language filter.
                </p>
                <button 
                  onClick={() => { setSearchTerm(""); setFilterLang("All"); }}
                  className="mt-8 px-6 py-3 bg-neonBlue/10 text-neonBlue font-semibold rounded-full hover:bg-neonBlue/20 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
            
            {/* Premium GitHub CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 relative max-w-4xl mx-auto w-full px-4 md:px-0"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/20 via-transparent to-neonPurple/20 blur-2xl -z-10 rounded-[2.5rem]"></div>
              
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl p-8 md:p-12 shadow-2xl group/card flex flex-col md:flex-row items-center justify-between gap-10">
                
                {/* Floating subtle shapes */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-neonBlue/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-neonPurple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                  <motion.div 
                    className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 dark:bg-white shadow-lg border border-slate-800 dark:border-slate-100"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                  >
                    <Github size={40} className="text-white dark:text-slate-900" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                      Want to see more?
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md font-medium">
                      Explore all my open-source contributions, scripts, and complete project history on GitHub.
                    </p>
                  </div>
                </div>
                
                <a 
                  href="https://github.com/mt-abdulla-it" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-shrink-0 group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:border-transparent hover:shadow-[0_0_40px_rgba(0,243,255,0.4)] overflow-hidden z-10 w-full md:w-auto"
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neonBlue to-neonPurple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">View GitHub Profile</span>
                  <ExternalLink size={20} className="relative z-10 group-hover:text-white transition-all duration-500 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
