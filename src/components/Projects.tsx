"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Search, Calendar, Code2, Image as ImageIcon } from "lucide-react";
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

// ProjectCard component handles the image fallback state
const ProjectCard = ({ repo, index }: { repo: Repo, index: number }) => {
  const [imgSrc, setImgSrc] = useState(`/projects/${repo.name}.jpg`);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    if (imgSrc.endsWith('.jpg')) {
      setImgSrc(`/projects/${repo.name}.png`);
    } else if (imgSrc.endsWith('.png')) {
      setImgSrc(`/projects/${repo.name}.jpeg`);
    } else {
      setImgError(true);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
      className="group relative bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800/60 rounded-3xl overflow-hidden hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_15px_35px_rgba(0,243,255,0.03)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      
      {/* Project Image Area */}
      <div className="relative w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        {!imgError ? (
          <Image 
            src={imgSrc} 
            alt={repo.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <ImageIcon size={48} className="text-slate-400/50 dark:text-slate-600/50" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-neonBlue transition-colors truncate pr-4" title={repo.name}>
            {repo.name}
          </h3>
          <div className="flex gap-2 shrink-0">
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-neonPurple hover:bg-neonPurple/10 transition-all duration-300" aria-label="Live Demo">
                <ExternalLink size={16} />
              </a>
            )}
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-neonBlue hover:bg-neonBlue/10 transition-all duration-300" aria-label="GitHub Repo">
              <Github size={16} />
            </a>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
          {repo.description || "No description provided for this repository."}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-neonBlue"></span>
            {repo.language || "Unknown"}
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5 hover:text-yellow-500 transition-colors cursor-default">
              <Star size={14} className="group-hover:fill-yellow-500/20" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-default">
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

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/mt-abdulla-it/repos?per_page=100");
        const data = await res.json();
        if (Array.isArray(data)) {
          const excludedProjects = [
            "mt-abdulla-it",
            "Mars-Tech-Assignment",
            "abdullah-dev",
            "Python",
            "OSINT-Blog-Post",
            "app",
            "DI_Serivce_Lifetime",
            "Flutter",
            "HTML-CSS-JS",
            "Application",
            "Artificial-Intelligence",
            "portfolio"
          ];
          
          let validRepos = data.filter(r => !r.fork && !excludedProjects.includes(r.name));
          
          // Manually add the requested subfolder projects from the Application repo
          const customProjects: Repo[] = [
            {
              id: 9999991,
              name: "Collage Management System",
              description: "A comprehensive college management system built to handle student and administrative tasks.",
              html_url: "https://github.com/mt-abdulla-it/Application/tree/main/Collage%20management%20system",
              homepage: "",
              stargazers_count: 0,
              forks_count: 0,
              language: "Full Stack",
              updated_at: new Date().toISOString(),
              fork: false
            },
            {
              id: 9999992,
              name: "Mars Tech",
              description: "An innovative application developed for Mars Tech assignment featuring modern UI.",
              html_url: "https://github.com/mt-abdulla-it/Application/tree/main/Mars%20Tech",
              homepage: "",
              stargazers_count: 0,
              forks_count: 0,
              language: "Full Stack",
              updated_at: new Date().toISOString(),
              fork: false
            }
          ];
          
          validRepos = [...validRepos, ...customProjects];
          
          setRepos(validRepos);
        }
      } catch (error) {
        console.error("Failed to fetch repos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const languages = ["All", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filteredRepos = useMemo(() => {
    let result = repos.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (r.description && r.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLang = filterLang === "All" || r.language === filterLang;
      return matchesSearch && matchesLang;
    });

    if (sortBy === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return result;
  }, [repos, searchTerm, filterLang, sortBy]);

  const featuredProject = filteredRepos.length > 0 ? filteredRepos[0] : null;
  const standardProjects = filteredRepos.slice(1);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-full h-full max-w-[1000px] pointer-events-none -z-10 opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-neonBlue blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-neonPurple blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">Projects</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A showcase of my recent work, open-source contributions, and side projects built with modern web technologies.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16"
        >
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neonBlue transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search projects by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-neonBlue/50 dark:focus:border-neonBlue/50 focus:ring-1 focus:ring-neonBlue/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative">
              <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              <select
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                className="w-full sm:w-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl py-3 pl-12 pr-10 focus:outline-none focus:border-neonPurple/50 focus:ring-1 focus:ring-neonPurple/50 transition-all appearance-none cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none"
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
                className="w-full sm:w-auto bg-white/70 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl py-3 px-6 pr-10 focus:outline-none focus:border-neonBlue/50 focus:ring-1 focus:ring-neonBlue/50 transition-all appearance-none cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none"
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
              <div key={i} className="bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 rounded-3xl overflow-hidden h-[400px] flex flex-col relative">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent z-20 pointer-events-none"></div>
                <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 shrink-0"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="w-1/3 h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-4"></div>
                  <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-md mb-2"></div>
                  <div className="w-5/6 h-4 bg-slate-200 dark:bg-slate-800 rounded-md mb-6"></div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="w-1/4 h-5 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                    <div className="w-1/3 h-6 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* Featured Project */}
            {featuredProject && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-6 md:p-10 rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,243,255,0.05)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 to-neonPurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  {/* Featured Image Area */}
                  <div className="w-full md:w-1/2 h-64 md:h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative shadow-lg">
                    <FeaturedProjectImage repoName={featuredProject.name} />
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neonBlue bg-neonBlue/10 rounded-full border border-neonBlue/20">
                        Featured Highlight
                      </span>
                      {featuredProject.language && (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                          <span className="w-2.5 h-2.5 rounded-full bg-neonPurple"></span>
                          {featuredProject.language}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neonBlue group-hover:to-neonPurple transition-all duration-300">
                      {featuredProject.name}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl leading-relaxed">
                      {featuredProject.description || "A feature-rich repository showcasing advanced development patterns and high-quality code structure."}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <a 
                        href={featuredProject.html_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
                      >
                        <Github size={18} />
                        View Source
                      </a>
                      {featuredProject.homepage && (
                        <a 
                          href={featuredProject.homepage} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-semibold hover:border-neonPurple/50 hover:text-neonPurple transition-all duration-300 hover:-translate-y-1 active:scale-95"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>

                    <div className="flex flex-row flex-wrap gap-4 pt-6 border-t border-slate-200 dark:border-slate-800/50">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                        <Star size={16} className="text-yellow-500" />
                        <span className="font-semibold">{featuredProject.stargazers_count}</span> Stars
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                        <GitFork size={16} className="text-blue-500" />
                        <span className="font-semibold">{featuredProject.forks_count}</span> Forks
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
                        <Calendar size={16} className="text-purple-500" />
                        Updated <span className="font-semibold">{formatDate(featuredProject.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid for standard projects */}
            {standardProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence>
                  {standardProjects.map((repo, index) => (
                    <ProjectCard key={repo.id} repo={repo} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            )}
            
            {!featuredProject && standardProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// A small component just for the featured project image logic to keep it clean
const FeaturedProjectImage = ({ repoName }: { repoName: string }) => {
  const [imgSrc, setImgSrc] = useState(`/projects/${repoName}.jpg`);
  const [imgError, setImgError] = useState(false);
  
  const handleImageError = () => {
    if (imgSrc.endsWith('.jpg')) {
      setImgSrc(`/projects/${repoName}.png`);
    } else if (imgSrc.endsWith('.png')) {
      setImgSrc(`/projects/${repoName}.jpeg`);
    } else {
      setImgError(true);
    }
  };

  if (!imgError) {
    return (
      <Image 
        src={imgSrc} 
        alt={repoName}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        onError={handleImageError}
      />
    );
  }
  
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
      <ImageIcon size={64} className="text-slate-400/50 dark:text-slate-600/50" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
    </div>
  );
};
