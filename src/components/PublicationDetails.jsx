'use client';

import { useState } from 'react';
import AIInsightsPanel from './AIInsightsPanel';
import GraphicalAnalysis from './GraphicalAnalysis/GraphicalAnalysis';
import MindMap from './MindMap/MindMap';

export default function PublicationDetails({ publication }) {
  const [showVisualization, setShowVisualization] = useState(false);
  const [showAbstract, setShowAbstract] = useState(true);
  const [showSource, setShowSource] = useState(true);

  return (
    <div className="max-w-6xl mx-auto my-8 p-4 md:p-6 space-y-6">
      {/* Card */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 border-2 border-blue-900 rounded-3xl shadow-2xl shadow-blue-900/50 overflow-hidden">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-950 to-black p-6 border-b-2 border-blue-800">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-cyan-400 text-xs font-mono mb-2 tracking-widest flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              RESEARCH DOCUMENT - DETAILED VIEW
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight hover:text-cyan-300 transition-colors">
              {publication.title || "Untitled Publication"}
            </h1>

            {/* Metadata & Actions */}
            <div className="flex flex-wrap gap-3 items-center">
              {publication.pmcid && (
                <div className="px-4 py-2 bg-blue-950 border border-blue-700 rounded-full text-blue-300 font-mono text-sm hover:bg-blue-800 transition">
                  <span className="text-blue-500 font-bold">PMCID:</span> {publication.pmcid}
                </div>
              )}

              {publication.source_url && (
                <a
                  href={publication.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-full text-gray-300 hover:text-white hover:border-cyan-500 transition-all flex items-center gap-2 text-sm group"
                >
                  <span>View Source</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}

              <button
                onClick={() => setShowVisualization(prev => !prev)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-mono transition shadow-md hover:shadow-lg"
              >
                {showVisualization ? "Hide Visualization" : "Visualize"}
              </button>

              <button
                onClick={() => setShowAbstract(prev => !prev)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-mono transition shadow-md hover:shadow-lg"
              >
                {showAbstract ? "Hide Abstract" : "Show Abstract"}
              </button>

              <button
                onClick={() => setShowSource(prev => !prev)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-mono transition shadow-md hover:shadow-lg"
              >
                {showSource ? "Hide Source" : "Show Source"}
              </button>
            </div>
          </div>
        </div>

        {/* Abstract Panel */}
        {showAbstract && publication.abstract && (
          <div className="p-6 md:p-8 bg-black/30 border-t border-blue-900/50">
            <h2 className="text-xl font-bold text-blue-300 tracking-wider uppercase mb-2">📄 Abstract</h2>
            <p className="text-gray-300 leading-relaxed">{publication.abstract}</p>
          </div>
        )}

        {/* Source URL Panel */}
        {showSource && publication.source_url && (
          <div className="p-6 md:p-8 bg-black/20 border-t border-blue-800 rounded-b-xl flex flex-col md:flex-row gap-4 items-center">
            <span className="text-cyan-300 font-bold">Source URL:</span>
            <a
              href={publication.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-cyan-400 break-all"
            >
              {publication.source_url}
            </a>
          </div>
        )}

        {/* AI Insights Panel */}
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-cyan-300 tracking-wider uppercase mb-4">🤖 AI Analysis</h2>
          <AIInsightsPanel publication={publication} />
        </div>

        {/* Visualizations */}
        {showVisualization && (
          <div className="p-6 md:p-8 space-y-12">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">📊 Scientific Knowledge Graph</h2>
            <GraphicalAnalysis publication={publication} />

            <h2 className="text-2xl font-bold text-cyan-300 mb-4">🧠 Interactive Mind Map</h2>
            <MindMap publication={publication} />
          </div>
        )}

        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
      </div>
    </div>
  );
}
