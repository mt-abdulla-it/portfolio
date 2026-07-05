"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Search } from "lucide-react";

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
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLang, setFilterLang] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/mt-abdulla-it/repos");
        const data = await res.json();
        if (Array.isArray(data)) {
          setRepos(data);
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
    } else {
      result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    }

    return result;
  }, [repos, searchTerm, filterLang, sortBy]);

  return (
    <section id="projects" className="py-12 relative bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-neonBlue dark:to-neonPurple mx-auto rounded-full shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500 dark:focus:border-neonBlue transition-colors shadow-sm"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select
              value={filterLang}
              onChange={(e) => setFilterLang(e.target.value)}
              className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-full py-3 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-neonBlue transition-colors appearance-none shadow-sm"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-full py-3 px-4 focus:outline-none focus:border-blue-500 dark:focus:border-neonBlue transition-colors appearance-none shadow-sm"
            >
              <option value="recent">Recent</option>
              <option value="stars">Stars</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-blue-500 dark:border-t-neonBlue rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 p-6 rounded-2xl hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:border-blue-300 dark:hover:border-neonBlue/40 transition-all duration-300 flex flex-col h-full shadow-sm group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-neonBlue transition-colors truncate pr-4" title={repo.name}>
                    {repo.name}
                  </h3>
                  <div className="flex gap-3">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600 dark:hover:text-neonBlue transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow transition-colors">
                  {repo.description || "No description provided."}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-neonPurple"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
