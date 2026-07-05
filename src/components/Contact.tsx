"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, Copy, CheckCircle2, ExternalLink } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("mt.abdulla.it@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-neonBlue/5 dark:bg-neonBlue/10 rounded-full blur-[120px] mix-blend-screen transition-colors duration-500"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-neonPurple/5 dark:bg-neonPurple/10 rounded-full blur-[150px] mix-blend-screen transition-colors duration-500"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-500">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonBlue to-neonPurple">Touch</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg transition-colors duration-500">
            Have a project in mind or looking to collaborate? I'm always open to discussing new opportunities and creative ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 max-w-6xl mx-auto items-start">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Email Card */}
            <div className="glass-panel bg-white/70 dark:bg-white/5 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 relative group overflow-hidden transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-neonBlue/5 dark:from-neonBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 flex items-center justify-center text-neonBlue mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Mail size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">Email Me</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-500">Drop me an email and I'll get back to you as soon as possible.</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="mailto:mt.abdulla.it@gmail.com"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-neonBlue/5 dark:bg-neonBlue/10 hover:bg-neonBlue/10 dark:hover:bg-neonBlue/20 text-neonBlue border border-neonBlue/20 dark:border-neonBlue/30 rounded-xl font-medium transition-colors"
                  >
                    Write Message <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-2 py-3 px-6 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-medium transition-colors border border-slate-300 dark:border-white/5 relative"
                  >
                    {copied ? <CheckCircle2 size={18} className="text-green-500 dark:text-green-400" /> : <Copy size={18} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* GitHub */}
              <a 
                href="https://github.com/mt-abdulla-it" 
                target="_blank" 
                rel="noreferrer"
                className="glass-panel bg-white/70 dark:bg-transparent p-6 rounded-3xl border border-slate-200 dark:border-white/5 group relative overflow-hidden flex flex-col items-center justify-center gap-4 hover:border-slate-400 dark:hover:border-slate-500/50 transition-colors duration-300 text-center"
              >
                <div className="absolute inset-0 bg-slate-200/50 dark:bg-slate-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-white group-hover:bg-slate-800 dark:group-hover:bg-slate-700 transition-all duration-300 border border-slate-200 dark:border-transparent">
                  <Github size={24} />
                </div>
                <div className="relative z-10">
                  <span className="block text-slate-900 dark:text-white font-semibold transition-colors duration-500">GitHub</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-500">@mt-abdulla-it</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/mt-abdulla-it/" 
                target="_blank" 
                rel="noreferrer"
                className="glass-panel bg-white/70 dark:bg-transparent p-6 rounded-3xl border border-slate-200 dark:border-white/5 group relative overflow-hidden flex flex-col items-center justify-center gap-4 hover:border-neonPurple/50 transition-colors duration-300 text-center"
              >
                <div className="absolute inset-0 bg-neonPurple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-white group-hover:bg-[#0A66C2] transition-all duration-300 border border-slate-200 dark:border-transparent group-hover:shadow-[0_0_15px_rgba(10,102,194,0.5)]">
                  <Linkedin size={24} />
                </div>
                <div className="relative z-10">
                  <span className="block text-slate-900 dark:text-white font-semibold transition-colors duration-500">LinkedIn</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-500">Let's connect</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel bg-white/70 dark:bg-white/5 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-white/5 relative transition-colors duration-500">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 transition-colors duration-500">Send me a message</h3>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center h-[380px]"
                  >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500 dark:text-green-400" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-500">Message Sent!</h4>
                    <p className="text-slate-600 dark:text-slate-400 transition-colors duration-500">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="flex flex-col gap-6 relative z-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label htmlFor="name" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name ? '-top-2.5 text-xs bg-white dark:bg-[#0a0a0a] px-2 text-neonBlue rounded' : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'}`}>Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all shadow-sm dark:shadow-inner"
                        />
                      </div>
                      <div className="relative group">
                        <label htmlFor="email" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email ? '-top-2.5 text-xs bg-white dark:bg-[#0a0a0a] px-2 text-neonBlue rounded' : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'}`}>Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-white dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all shadow-sm dark:shadow-inner"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="subject" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'subject' || formData.subject ? '-top-2.5 text-xs bg-white dark:bg-[#0a0a0a] px-2 text-neonBlue rounded' : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'}`}>Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all shadow-sm dark:shadow-inner"
                      />
                    </div>
                    
                    <div className="relative group">
                      <label htmlFor="message" className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message ? '-top-2.5 text-xs bg-white dark:bg-[#0a0a0a] px-2 text-neonBlue rounded' : 'top-3.5 text-sm text-slate-500 dark:text-slate-400'}`}>Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-white dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-neonBlue focus:ring-1 focus:ring-neonBlue/50 transition-all resize-none shadow-sm dark:shadow-inner"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-4 mt-2 overflow-hidden rounded-xl bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Send Message
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
