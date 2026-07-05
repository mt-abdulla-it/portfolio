"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// Mock certificates since we don't have images yet
const certificates = [
  { id: 1, title: "Full Stack Web Development", issuer: "Coursera", date: "2024", image: "" },
  { id: 2, title: "React Developer Certification", issuer: "Meta", date: "2023", image: "" },
  { id: 3, title: "Backend API Design", issuer: "Udemy", date: "2023", image: "" },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const activeCert = certificates.find(c => c.id === selectedCert);

  return (
    <section id="certificates" className="py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Certificates</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => setSelectedCert(cert.id)}
            >
              <div className="aspect-video bg-slate-800 relative flex items-center justify-center">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="text-slate-500 font-medium">Certificate Image Placeholder</div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white w-12 h-12" />
                </div>
              </div>
              <div className="p-6 border-t border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <div className="flex justify-between text-slate-400 text-sm">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-neonBlue transition-colors"
              onClick={() => setSelectedCert(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[4/3] bg-slate-800 flex items-center justify-center">
                {activeCert.image ? (
                  <img src={activeCert.image} alt={activeCert.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="text-slate-500 font-medium text-2xl">Certificate Image Placeholder</div>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{activeCert.title}</h3>
                <p className="text-slate-400">{activeCert.issuer} • {activeCert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
