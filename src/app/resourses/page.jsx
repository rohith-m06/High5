"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    title: "NASA Data & Resources",
    description:
      "A curated list of 608 full-text open-access Space Biology publications. Explore experiments, findings, and biological research insights.",
    link: "https://github.com/jgalazka/SB_publications/tree/main",
  },
  {
    title: "NASA Open Science Data Repository (OSDR)",
    description:
      "Access data from over 500 biological experiments performed in space or in preparation for space exploration.",
    link: "https://science.nasa.gov/biological-physical/data/",
  },
  {
    title: "NASA Space Life Sciences Library (NSLSL)",
    description:
      "A centralized global collection of space life sciences literature supporting research on biological systems in space environments.",
    link: "https://public.ksc.nasa.gov/nslsl/",
  },
  {
    title: "NASA Task Book",
    description:
      "An online database of research projects supported by NASA’s Biological and Physical Sciences Division and Human Research Program.",
    link: "https://taskbook.nasaprs.com/tbp/welcome.cfm",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-6">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-blue-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌌 NASA Bioscience Resources
      </motion.h1>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {resources.map((res, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800/60 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-lg p-8 hover:shadow-blue-600/30 transition-all duration-300 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

            {/* Content */}
            <h2 className="text-2xl font-semibold mb-3 text-blue-300 group-hover:text-blue-400 transition-colors">
              {res.title}
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {res.description}
            </p>

            {/* FIXED Button */}
            <motion.div whileHover={{ x: 5 }}>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Explore Resource <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-400 text-sm">
        ✨ Curated to support cutting-edge Space Biology research and exploration.
      </div>
    </div>
  );
}
